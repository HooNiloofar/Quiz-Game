import Link from "next/link";

 
export default function Start() {
 
  return (
    <div className="flex flex-col items-center ">
      <p>به بازی کوئیز خوش آمدید، برای شروع کلیک کنید!</p>
      <Link href={"/category"} className="bg-lime-500 px-3 py-1 rounded-lg mt-5">بزن بریم</Link>
    </div>
  )
}