const Page = () => {
    const handleForm = async (formData)=> {
        "use server"
        console.log("Hello")
        console.log(formData)
    }
    return (
    <div>
        <form action={handleForm}>
            <input type="text" name="surname" />
            <button>Send</button>
        </form>
    </div>
  )
}

export default Page