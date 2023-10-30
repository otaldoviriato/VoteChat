import ListPendentes from "../../components/listPendentes/listPendentes"

export default async function pendentes({params}) {
  return (
    <div className="grid place-items-center h-full space-y-4">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6 ">
        <ListPendentes id_sala={params.id} />
      </div>
    </div>
  )
}