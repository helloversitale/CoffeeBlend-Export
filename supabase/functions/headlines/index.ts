import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface Headline {
  id: string;
  ref: string;
  headline: string;
  created_at: string;
  updated_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const ref = url.searchParams.get('ref') || 'default';

    const { data, error } = await supabase
      .from('headlines')
      .select('*')
      .eq('ref', ref)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);

      const { data: defaultData } = await supabase
        .from('headlines')
        .select('*')
        .eq('ref', 'default')
        .maybeSingle();

      return new Response(
        JSON.stringify({
          success: true,
          headline: defaultData?.headline || 'Discover Your Perfect Cup',
          ref: 'default',
          fallback: true,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!data) {
      const { data: defaultData } = await supabase
        .from('headlines')
        .select('*')
        .eq('ref', 'default')
        .maybeSingle();

      return new Response(
        JSON.stringify({
          success: true,
          headline: defaultData?.headline || 'Discover Your Perfect Cup',
          ref: 'default',
          fallback: true,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        headline: data.headline,
        ref: data.ref,
        fallback: false,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        headline: 'Discover Your Perfect Cup',
        ref: 'default',
        fallback: true,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
