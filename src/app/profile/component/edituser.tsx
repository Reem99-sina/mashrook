"use client"
const EditUser=({title,name}:{title:string,name:string})=>{
    return (
        <div className="flex flex-row justify-between items-center mx-4 my-5  ">
            <div className="flex flex-col items-start">
                <h3 className="font-bold">
                    {title}
                </h3>
                <p className="text-gray-600">{name}</p>
            </div>
            <div >
                <a href="/" className="text-blue-450 underline-offset-2">تعديل</a>
            </div>
        </div>
    )
}
export default EditUser