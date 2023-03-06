import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const AuthorizedPage = () => {
	const navigate = useNavigate();

	const onclick = () => {
		navigate('/login');
	}

	return (
		<Result
			status="403"
			title="403"
			subTitle="Xin lỗi, Bạn không có quyền truy cập trang web này"
			extra={<Button type="primary" onClick={onclick}>Đăng nhập</Button>}
		/>
	);
}
export default AuthorizedPage;