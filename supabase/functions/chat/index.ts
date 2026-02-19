import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  response: string;
  success: boolean;
}

function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();

  if (message.includes('hello') || message.includes('hi')) {
    return 'Hello! Welcome to our Headlines widget. I can help you explore different headline variations. Try asking me about headlines, coffee marketing, or request the next headline!';
  }

  if (message.includes('next') || message.includes('more') || message.includes('show')) {
    return 'Great! Click the "Next Headline" button below to see the next variation. Each one is designed to resonate with different audience segments.';
  }

  if (message.includes('headline')) {
    return 'Our headlines are carefully crafted for different marketing channels. Each variant (email, Facebook, Google, Instagram) is optimized for that specific platform. Which channel interests you?';
  }

  if (message.includes('email') || message.includes('facebook') || message.includes('google') || message.includes('instagram')) {
    return 'Great question! Different platforms have different user behaviors. We test each headline to see which performs best on that specific channel. Would you like to see how they perform?';
  }

  if (message.includes('test') || message.includes('try')) {
    return 'Perfect! You can test each headline by clicking the "Test this" button on any headline card. This will show you how it looks in action. Try it out!';
  }

  if (message.includes('coffee')) {
    return 'Coffee is a great category for A/B testing headlines! Different audiences connect with different messaging - some prefer quality, others community, and some want convenience. That\'s why we have multiple variants.';
  }

  if (message.includes('why') || message.includes('purpose')) {
    return 'This widget helps you understand how different headlines perform across different channels and audiences. By testing variants, you can find what resonates most with your customers.';
  }

  return 'That\'s an interesting question! I\'m here to help you explore our headline variations. Ask me about specific headlines, channels, or how to test them. What would you like to know?';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message } = (await req.json()) as ChatRequest;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          response: 'Please send a valid message.',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const response = generateResponse(message);

    return new Response(
      JSON.stringify({
        success: true,
        response,
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
        response: 'Something went wrong. Please try again.',
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