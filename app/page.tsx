import { SearchInput } from "@/components/SearchInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between my-20">
      <div className="bg-blue-600 p-24 flex flex-col items-center justify-center gap-7 rounded-md">
        <div className="flex flex-col items-center justify-center align-middle">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center mb-8">
            We invest in the{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              world’s potential
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-balance max-w-5xl text-center">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>

        <SearchInput />
      </div>
    </main>
  );
}
