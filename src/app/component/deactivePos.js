import { useRouter } from "next/navigation";

export default function DeactivePos() {
  const router = useRouter();
  function deleteLocaleStorage() {
    localStorage.removeItem("playedCategory");
    router.push("/", { scroll: false });
  }
  function totalScore() {
   
    router.push("/totalscore", { scroll: false });
  }

  return (
    <>
      <div className=" flex justify-center item-center  p-5 ">
        <button className="text-white text-sm p-3 "onClick={totalScore}>مشاهده ی نتایج کلی </button>
        <button className="text-white text-sm " onClick={deleteLocaleStorage}>
          از سرگیری بازی ها{" "}
        </button>
      </div>
    </>
  );
}
