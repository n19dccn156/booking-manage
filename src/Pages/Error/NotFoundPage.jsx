import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	const onclick = () => {
		navigate(-1);
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle="Xin lỗi, Trang bạn tìm không tồn tại"
			extra={<Button type="primary" onClick={onclick}>Quay Lại</Button>}
		/>
	);
}
export default NotFoundPage;