'use client';

import { useState, useEffect } from 'react';

interface HeadlineResponse {
  success: boolean;
  headline: string;
  ref: string;
  fallback: boolean;
}

export const useHeadline = () => {
  const [headline, setHeadline] = useState<string>('Discover Your Perfect Cup');
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState<string>('default');
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
        const refParam = urlParams.get('ref') || 'default';

        console.log(`🔍 Detected ref source: ${refParam}`);

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          setLoading(false);
          return;
        }

        const apiUrl = `${supabaseUrl}/functions/v1/headlines?ref=${refParam}`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        });

        const data: HeadlineResponse = await response.json();

        if (data.success) {
          setHeadline(data.headline);
          setRef(data.ref);
          setIsFallback(data.fallback);

          if (data.fallback) {
            console.log(`⚠️ Ref "${refParam}" not found, using default headline`);
          } else {
            console.log(`✅ Successfully loaded headline for ref: ${data.ref}`);
          }
        }
      } catch (error) {
        console.error('Error fetching headline:', error);
        setHeadline('Discover Your Perfect Cup');
      } finally {
        setLoading(false);
      }
    };

    fetchHeadline();
  }, []);

  return { headline, loading, ref, isFallback };
};
