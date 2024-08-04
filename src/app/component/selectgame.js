import Link from "next/link";
import { useRouter } from "next/navigation";
import { list } from "postcss";

export default function SelectGame({ categories }) {
  const router = useRouter();
  return (
    <div className="">
      <h3 className="text-center text-white py-9 font-bold">
        از دسته بندی های زیر یک گروه را انتخاب کنید :
      </h3>
      <section className="m-auto grid grid-rows-2 grid-cols-2 gap-2">
        {categories.map((item) => {
          return (
            <button
              onClick={() => {
                router.push("/game/" + item.id, { scroll: false });
              }}
              disabled={item.isplaied}
              // className="bg-lime-400 h-20 text-white flex items-center justify-center rounded-xl"
              className={
                "bg-lime-400 h-20 text-white flex items-center justify-center rounded-xl " +
                " disabled:bg-gray-500/40 disabled:border-gray-600/40 disabled:text-gray-600/60 disabled:cursor-default"
              }
              key={item}
            >
              {item.title}
            </button>
          );
        })}
      </section>
    </div>
  );
}
