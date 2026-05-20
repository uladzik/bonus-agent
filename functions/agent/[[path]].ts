export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const targetUrl = new URL(url.pathname + url.search, 'https://cademcio.vercel.app');

  const headers = new Headers(context.request.headers);
  headers.delete('host');

  const response = await fetch(targetUrl.toString(), {
    method: context.request.method,
    headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    redirect: 'manual',
  });

  const responseHeaders = new Headers(response.headers);
  const location = responseHeaders.get('location');
  if (location?.startsWith('https://cademcio.vercel.app')) {
    responseHeaders.set(
      'location',
      location.replace('https://cademcio.vercel.app', 'https://upready-cadence.pages.dev')
    );
  }

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};
