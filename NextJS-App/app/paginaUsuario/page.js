import GetSession from "../components/GetSession/getSession"
import UploadImagem from "../components/uploadImagem/uploadImagem.js"
import ListFotos from "../components/listFotos/listFotos"
import SignOutButton from "../components/signOutButton/signOutButton"
import Link from "next/link"

export default function UserInfo() {

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <Link href="/mainPage" type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Minhas salas</Link>
        <SignOutButton />
        <GetSession />
        <UploadImagem />
        <ListFotos />
      </div>
    </div>
  )
}