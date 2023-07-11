/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const interRegular = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const calSansSemiBold = fetch(
    new URL('../../../../public/fonts/CalSans-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const fontRegular = await interRegular;
    const fontBold = await calSansSemiBold;

    const { searchParams } = new URL(req.url);

    const values = Object.fromEntries(searchParams);

    const {
      title = 'Masca | EthCC[6] Workshop',
      description = 'Claim your unique EthCC[6] Verifiable Credential from Masca team and chat with other participants.',
    } = values;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(0deg, rgba(255,175,138,1) 0%, rgba(255,171,185,1) 100%)',
          }}
        >
          <div tw="flex">
            <div tw="flex w-full flex-col p-12 md:flex-row md:items-center">
              <div tw="flex flex-3 flex-col">
                <h2
                  tw="text-6xl"
                  style={{
                    fontFamily: 'Cal Sans SemiBold',
                    fontWeight: 'bold',
                  }}
                >
                  {title}
                </h2>
                <div
                  tw="tracking-tight text-2xl"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 'normal',
                  }}
                >
                  {description}
                </div>
              </div>
              <div tw="h-[128px] w-[2px] bg-gray-600 mx-8" />
              <div tw="flex flex-2 flex-col items-center justify-center">
                <img
                  alt="Masca logo"
                  width={256}
                  src="https://masca.io/images/masca_black.svg"
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Cal Sans SemiBold',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
