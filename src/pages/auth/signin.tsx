import { InferGetServerSidePropsType } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Head from "next/head";

export default function signin({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In Page</title>
      </Head>
      <div className="w-[100vw] h-[100vh] flex items-center gap-5 justify-center">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                className="py-4 px-5 bg-blue-500 rounded-full"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
