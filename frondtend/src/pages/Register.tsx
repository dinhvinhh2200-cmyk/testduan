import { useForm } from "react-hook-form";
import { authApi, type registerPayLoad } from "../api/authApi";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<registerPayLoad>()
    const onSubmit = async (data: registerPayLoad) => {
        try {
            const res = await authApi.register(data)
            if (res.success) {
                alert(res.message)
            }
            
        } catch (error) {
            console.error('thông báo lỗi', error)
            alert('Đăng ký thất bại vui lòng đăng kí lại')
        }
    }
    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <h2>Đăng kí thành viên</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Ho va ten</label>
                    <input type="text" {...register('name', {required: 'Ten la bat buoc'})} />
                    {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="">email</label>
                    <input type="text" {...register('email', {required: 'email la bat buoc'})} />
                    {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="">password</label>
                    <input type="text" {...register('password', {required: 'password la bat buoc'})} />
                    {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                </div>
                <button type="submit" style={{ marginTop: "10px" }}>Đăng kí</button>
            </form>
        </div>
    );
};

export default Register;