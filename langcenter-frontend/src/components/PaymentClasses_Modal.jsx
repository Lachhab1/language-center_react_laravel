import { useEffect,useState  } from "react"
import { Modal,Form,Row,Col } from "react-bootstrap"
import axios from "../api/axios"
import { Ellipsis } from 'react-awesome-spinners'
export default function PaymentClasses_Modal({showModal,handleClose,selectedItem,id}) {
    const [data,setData]=useState([]);
    const [pending, setPending] = useState(true);
    let totalPaid = 0;
    //fetch payment details for classe
    useEffect (()=>{
        //fetch data
        const fetchData = async () => {
        const response = await axios.post(`/api/getPayment/${selectedItem}`,{etudiantId:id});
        setData(response?.data);
        setPending(false);
        }
        if (showModal )
        { 
        fetchData();
        }
    },[selectedItem])

  return (
      <Modal show={showModal} onHide={handleClose} size="lg">
        {pending ? 
        
        <div className="mx-auto">
        <Ellipsis size={64}
                        color='#D60A0B'
                        sizeUnit='px' /> 
        </div>
        
        : 
            (
                <>
                    <Modal.Header closeButton>
            <Modal.Title>Payment Classes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Row>
                    <Col>
                        <div>
                            <h5>Payment Details</h5>
                            <hr/>
                            <div className="d-flex w-50 justify-content-between">
                            <div className="text-muted">
                                Agreed Price : {data?.negotiated_price}
                            </div>
                            <div className="text-muted">
                                Status : {data?.status}
                            </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Remaining</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data["payment"]?.map(
                                        (item,index)=>(
                                            totalPaid = totalPaid + +item?.amount,
                                            <tr key={index}>
                                                <td>{item?.payment_date}</td>
                                                <td>{item?.amount ? item?.amount : 0}</td>
                                                <td>{item?.type}</td>
                                                <td>{+data?.negotiated_price - totalPaid}</td>
                                                <td>{data?.status}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
        </Modal.Footer>
                </>
            )
        }
    </Modal>
  )
}
