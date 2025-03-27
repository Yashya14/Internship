import { FadeLoader } from 'react-spinners';

// Custom spinner component
const CenteredSpinner:React.FC = () => (
    <div className='custom-spinner'>
        <FadeLoader color='#007bff' />
    </div>
);

export default CenteredSpinner;