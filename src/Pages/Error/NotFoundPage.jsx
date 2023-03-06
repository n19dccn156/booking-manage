import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	const onclick = () => {
		navigate('/');
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle="Xin lỗi, Trang bạn tìm không tồn tại"
			extra={<Button type="primary" onClick={onclick}>Trang chủ</Button>}
		/>
	);
}
export default NotFoundPage;