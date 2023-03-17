import { InferGetServerSidePropsType } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

export default function signin({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="">
      <div>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                className="p-2 bg-blue-500 rounded-full"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
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
