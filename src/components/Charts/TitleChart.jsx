import './chart.css';

export default function TitleChartSection({ text, img }) {
    return (
        <div
            className='TitleChartSection'
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`,
            }}
        >
            <h3>{text}</h3>
        </div>
    );
}
