const Page = () => {
    const handleForm = async (formData)=> {
        "use server"
        console.log("Hello")
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