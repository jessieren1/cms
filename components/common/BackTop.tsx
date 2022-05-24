import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#808080',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
export default function CustomBackTop({
  targetId,
  visibilityHeight,
}: {
  targetId: string;
  visibilityHeight: number;
}) {
  return (
    <BackTop
      target={() => document.getElementById(targetId) || window}
      visibilityHeight={visibilityHeight}
    >
      <div style={style}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  );
}
