import './dashboard.css'
import { data } from './data';
import CardDashboardSample from "../../components/CardDashboardSample/CardDashboardSample"
import TitleChartSection from '../../components/Charts/TitleChart';

//MATERIAL UI
import TaskIcon from '@mui/icons-material/Task';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import Barchart from '../../components/Charts/Barchart'
import Linechart from '../../components/Charts/Linechart'
import DoughnutChart from '../../components/Charts/DoughnutChart'
import Menu from '../../components/menu';


export default function Dashboard() {
    return (
        <div className="content">
            <Menu/>
            <div className='dashboard-container'>
                <div className="dashboard-header">
                    <img src='https://github.com/WallaceHS20/IMAGE-REPOSITORY/blob/main/vecteezy_3d-girl-character-standing-riding-a-rocket_35680942.png?raw=true' />
                    <h1>Dashboard</h1>
                </div>
                <div className="container">
                    <div className="cardTotal">
                        <CardDashboardSample dataCard={data.kinds_counts_Sum}>
                            <ShoppingCartIcon className="icon-card-sample" style={{ fontSize: '50px' }} />
                        </CardDashboardSample>
                    </div>
                    <div className="cardSucces">
                        <CardDashboardSample dataCard={data.active_counts_sum}>
                            <TaskIcon className="icon-card-sample" style={{ fontSize: '50px' }} />
                        </CardDashboardSample>
                    </div>
                    <div className="cardFail">
                        <CardDashboardSample dataCard={data.cancelados_counts_sum}>
                            <NewReleasesIcon className="icon-card-sample" style={{ fontSize: '50px' }} />
                        </CardDashboardSample>
                    </div>
                    <div className="sectionTime">
                        <TitleChartSection img={'https://images.pexels.com/photos/6623836/pexels-photo-6623836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} text={'Análise Temporal'} />
                    </div>
                    <div className="servicesEstado">
                        <Linechart chartData={data.finished_counts} />
                    </div>
                    <div className="kindEstado">
                        <Linechart chartData={data.cancelados_counts} />
                    </div>
                    <div className="mais-TransacoesServicesGoods">
                        <Linechart chartData={data.serviceAndgood} />
                    </div>
                    <div className="sectionKind">
                        <TitleChartSection img={'https://images.pexels.com/photos/11808269/pexels-photo-11808269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} text={'Análise Categórica'} />
                    </div>
                    <div className="EstadoCampeaoGoods">
                        <Barchart chartData={data.qtd_estado_goods} />
                    </div>
                    <div className="EstadoCampeaoGoodsFinished">
                        <Barchart chartData={data.qtd_estados_finished_goods} />
                    </div>
                    <div className="EstadoCampeaoGoodsCanceled">
                        <Barchart chartData={data.qtd_estados_canceled_goods} />
                    </div>
                    <div className="EstadoCampeaoServices">
                        <Barchart chartData={data.qtd_estado_services} />
                    </div>
                    <div className="EstadoCampeaoServicesFinished">
                        <Barchart chartData={data.qtd_estados_finished_services} />
                    </div>
                    <div className="EstadoCampeaoServicesCanceled">
                        <Barchart chartData={data.qtd_estados_cancelados_services} />
                    </div>
                </div>
            </div>
        </div>
    )
}