import { Fragment, useState, useEffect } from 'react'
import { 
    Card, 
    Row, 
    Col, 
    FormGroup, 
    Button, 
    Form, 
    Label, 
    Input, 
    CustomInput,
    CardBody,
    CardText
} from 'reactstrap'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import axios from 'axios'
import { Plus, Edit, Printer, Download, MoreHorizontal, X } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import Sidebar from '@components/sidebar'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
const AddCard = () => {
    const [addCustomerOpen, setAddCustomerOpen] = useState(false)
    const [customerName, setCustomerName] = useState({})
    const [customer, setCustomer] = useState({ address: '', postal: '', taxNo: '', country: '' })
    const [customerList, setCustomerList] = useState([])
    const [picker, setPicker] = useState(new Date())
    const [discount, setDiscount] = useState(false)
    const [tax, setTax] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [count, setCount] = useState(3)
    const [options, setOptions] = useState([
        {
            value: 'add-new',
            label: 'Add New Customer',
            type: 'button',
            color: 'flat-success'
        }
    ])
    useEffect(() => {
        axios.get('/api/invoice/clients').then(res => {
            const arr = options
            res.data.map(item => arr.push({ value: item.name, label: item.name }))
            setOptions(arr)
            setCustomerList(res.data)
        })
        const data = []
        for (let i = 1; i < 4; i++) {
            data.push({ id: i, productName: '', productDetail: '', discountValue: '', taxValue: '', amount: '', amountUnit: '' })
        }
        setDataTable([...data])
    }, [])
    const countryOptions = [
        { value: 'australia', label: 'Australia' },
        { value: 'canada', label: 'Canada' },
        { value: 'russia', label: 'Russia' },
        { value: 'saudi-arabia', label: 'Saudi Arabia' },
        { value: 'singapore', label: 'Singapore' },
        { value: 'sweden', label: 'Sweden' },
        { value: 'switzerland', label: 'Switzerland' },
        { value: 'united-kingdom', label: 'United Kingdom' },
        { value: 'united-arab-emirates', label: 'United Arab Emirates' },
        { value: 'united-states-of-america', label: 'United States of America' }
    ]
    const OptionComponent = ({ data, ...props }) => {
        if (data.type === 'button') {
            return (
                <Button className='text-left rounded-0' color={data.color} block onClick={() => setAddCustomerOpen(true)}>
                    <Plus size={14} /> <span className='align-middle ml-50'>{data.label}</span>
                </Button>
            )
        } else {
            return <components.Option {...props}> {data.label} </components.Option>
        }
    }

    const ActionButtonComponent = (type, label) => {
        return (
            <Button className='icon-action-button'>
                {type === 'Printer' ? <Printer /> : type === 'Download' ? <Download /> : <MoreHorizontal />}
                {label}
            </Button>
        )
    }

    const handleCheckbox = action => {
        action === 'discount' ? setDiscount(!discount) : setTax(!tax)
    }

    const handleRemoveItem = (item) => {
        const res = dataTable.filter((data, i) => item !== data)
        console.log(res)
        setDataTable(res)
    }

    const deleteForm = e => {
        e.preventDefault()
        e.target.closest('.repeater-wrapper').remove()
      }
    return (
        <Fragment>
            <Card className='pb-2'>
                <Row className='pl-1 pr-1'>
                    <Col className='col-4 billing-padding'>
                        <FormGroup>
                            <h5>ชื่อลูกค้า</h5>
                            <Select
                                className='react-select'
                                classNamePrefix='select'
                                id='label'
                                value={customerName}
                                options={options}
                                theme={selectThemeColors}
                                components={{
                                    Option: OptionComponent
                                }}
                                onChange={(data) => {
                                    setCustomerName(data)
                                    setCustomer(customerList.find(item => item.name === data.value))
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <h5>รายละเอียด</h5>
                            <Input type='textarea' name='address' id='address' rows='3' placeholder='รายละอียดที่อยู่' defaultValue={customer.address} />
                            <Input type='text' name='postal' id='postal' placeholder='รหัสไปรษณีย์' defaultValue={customer.postal} />
                            <Input type='text' name='taxNo' id='taxNo' placeholder='เลขประจำตัวผู้เสียภาษี' defaultValue={customer.taxNo} />
                            <Input type='text' name='country' id='country' placeholder='สำนักงาน/สาขาเลขที่' defaultValue={customer.country} />
                        </FormGroup>
                    </Col>
                    <Col className='text-blue' style={{ padding: '8.5rem 0rem 0rem 0rem' }}>
                        <Edit className='icon-with-text' />
                        แก้ไขรายชื่อผู้ติดต่อ
                        </Col>
                    <Col className='col-5 billing-padding'>
                        <div className='d-flex justify-content-end'>
                            {ActionButtonComponent('Printer', 'พิมพ์เอกสาร')}
                            {ActionButtonComponent('Download', 'ดาวน์โหลด')}
                            {ActionButtonComponent('MoreHorizontal', 'เพิ่มเติม')}
                        </div>
                        <div className='mt-2'>
                            จำนวนเงินรวมทั้งสิ้น
                            <p className='text-blue'>0.00</p>
                        </div>
                        <Row>
                            <Col className='col-4'>วันที่:</Col>
                            <Col>
                                <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-4'>เครดิต (วัน):</Col>
                            <Col>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={[]}
                                    isClearable={false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-4'>ครบกำหนด:</Col>
                            <Col>
                                <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-4'>พนักงานขาย:</Col>
                            <Col>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={customerList.map(item => ({ value: item.name, label: item.name }))}
                                    isClearable={false}
                                />
                            </Col>
                        </Row>
                        <Row className='d-flex flex-column billing-padding'>
                            <CustomInput
                                type="checkbox"
                                id="discount"
                                label='ส่วนลดแยกรายการ'
                                onChange={() => handleCheckbox('discount')}
                                className='mb-1' />
                            <CustomInput
                                type="checkbox"
                                id="tax"
                                onChange={() => handleCheckbox('tax')}
                                label='ภาษีมูลค่าเพิ่มแยกรายการ' />
                        </Row>
                    </Col>
                </Row>
                <hr className='mr-2 ml-2 mt-4 mb-4' />
                <Row className='pl-2 pr-2'>
                    <Col className='d-flex'>
                        <span className='custom-title-label'>ชื่อโปรเจค:</span>
                        <Input
                            className='mr-2' type='text' name='projectName' style={{ width: '150rem' }} />
                        <span className='custom-title-label'>เลขที่อ้างอิง:</span>
                        <Input className='' type='text' name='projectName' />
                    </Col>
                </Row>
                {/* <Table borderLess responsive>
                    <thead>
                        <tr>
                            <th>ชื่อสินค้า/รายละเอียด</th>
                            {discount && <th>ส่วนลด</th>}
                            {tax && <th>ภาษี</th>}
                            <th>จำนวน</th>
                            <th>หน่วย</th>
                            <th>จำนวนต่อหน่วย</th>
                            <th>ราคารวม</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((item, index) => <tr key={index}>
                            <td>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={[
                                        { value: 'App Design', label: 'App Design' },
                                        { value: 'App Customization', label: 'App Customization' },
                                        { value: 'ABC Template', label: 'ABC Template' },
                                        { value: 'App Development', label: 'App Development' }
                                    ]}
                                    isClearable={false}
                                    name={`productName`}
                                    onChange={(data) => { 
                                        dataTable[index].productName = data.value
                                        setDataTable(dataTable)
                                     }}
                                />
                                <Input 
                                type='text' 
                                name={`${item}.productDetail`}
                                />
                            </td>
                            {
                                discount &&
                                <td><Input type='text' name={`${item}.discountValue`} /></td>
                            }
                            {
                                tax &&
                                <td><Input type='text' name={`${item}.taxValue`} /></td>
                            }
                            <td>
                                <Input type='text' name={`${item}.amount`} />
                            </td>
                            <td>
                                <Select
                                    name={`${item}.amountUnit`}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={[
                                        { value: 'piece', label: 'ชิ้น' },
                                        { value: 'box', label: 'กล่อง' },
                                        { value: 'pack', label: 'แพค' }
                                    ]}
                                    isClearable={false}
                                />
                            </td>
                            <td>
                                <span>0</span>
                            </td>
                            <td>
                                <span>0</span>
                            </td>
                            <td>
                                <Button
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    <X />
                                </Button>
                            </td>
                        </tr>
                        )}
                        <Button
                            onClick={() => setDataTable([...dataTable, { productName: '', id: dataTable.length ? dataTable[dataTable.length - 1].id + 1 : 1, productDetail: '', discountValue: '', taxValue: '', amount: '', amountUnit: '' }])}>
                            <Plus /> เพิ่มแถวรายการ
                        </Button>
                    </tbody>
                </Table> */}
                <CardBody className='invoice-padding invoice-product-details'>
                    <Repeater count={count}>
                        {i => {
                            const Tag = i === 0 ? 'div' : SlideDown
                            return (
                                <Tag key={i} className='repeater-wrapper'>
                                    <Row>
                                        <Col className='d-flex product-details-border position-relative pr-0' sm='12'>
                                            <Row className='w-100 pr-lg-0 pr-1 py-2'>
                                                <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='5' sm='12'>
                                                    <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                                                    <Input type='select' className='item-details'>
                                                        <option>App Design</option>
                                                        <option>App Customization</option>
                                                        <option>ABC Template</option>
                                                        <option>App Development</option>
                                                    </Input>
                                                    <Input className='mt-2' type='textarea' rows='1' defaultValue='Customization & Bug Fixes' />
                                                </Col>
                                                <Col className='my-lg-0 my-2' lg='3' sm='12'>
                                                    <CardText className='col-title mb-md-2 mb-0'>Cost</CardText>
                                                    <Input type='number' defaultValue='24' placeholder='24' />
                                                    <div className='mt-2'>
                                                        <span>Discount:</span> <span>0%</span>
                                                        <span id={`tax1-${i}`} className='ml-50'>
                                                            0%
                                                        </span>
                                                        <span id={`tax2-${i}`} className='ml-50'>
                                                            0%
                                                        </span>
                                                        {/* <UncontrolledTooltip target={`tax1-${i}`}>Tax 1</UncontrolledTooltip>
                                                        <UncontrolledTooltip target={`tax2-${i}`}>Tax 2</UncontrolledTooltip> */}
                                                    </div>
                                                </Col>
                                                <Col className='my-lg-0 my-2' lg='2' sm='12'>
                                                    <CardText className='col-title mb-md-2 mb-0'>Qty</CardText>
                                                    <Input type='number' defaultValue='1' placeholder='1' />
                                                </Col>
                                                <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                                                    <CardText className='col-title mb-md-50 mb-0'>Price</CardText>
                                                    <CardText className='mb-0'>$24.00</CardText>
                                                </Col>
                                            </Row>
                                            <div className='d-flex flex-column align-items-center justify-content-start border-left invoice-product-actions py-50 px-25'>
                                                <X size={18} className='cursor-pointer' onClick={deleteForm} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Tag>
                            )
                        }}
                    </Repeater>
                    <Row className='mt-1'>
                        <Col sm='12' className='px-0'>
                            <Button.Ripple color='primary' size='sm' className='btn-add-new' onClick={() => setCount(count + 1)}>
                                <Plus size={14} className='mr-25'></Plus>
                                <span className='align-middle'>Add Item</span>
                            </Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
                <Row className='mt-3'>
                    <Col className='ml-2 pr-2 col-7'>
                        <div className='mb-2'>
                            <CustomInput
                                type="checkbox"
                                id="electronicSign"
                                // onChange={() => handleCheckbox('tax')}
                                label='ลายเซ็นอิเล็กทรอนิกส์และตรายาง' />
                        </div>
                        <Row>
                            <Col>
                                <p>หมายเหตุ:</p>
                                <Input type='textarea' cols='2' rows='2' id='remark' />
                            </Col>
                            <Col>
                                <p>โน้ตภายในบริษัท:</p>
                                <Input type='textarea' cols='2' rows='2' id='internalNote' />
                            </Col>
                        </Row>
                    </Col>
                    <Col className='d-flex mr-2'>
                        <Col>
                            <p>รวมเป็นเงิน</p>
                            <p>ส่วนลด <Input type='text' name='totalDiscount' />%</p>
                            <p>ราคาหลังหักส่วนลด</p>
                            <p>จำนวนเงินรวมทั้งสิ้น</p>
                        </Col>
                        <Col className='d-flex flex-column align-items-end'>
                            <p>0.00</p>
                            <p>0.00</p>
                            <p>0.00</p>
                            <p>0.00</p>
                        </Col>
                    </Col>
                </Row>
            </Card>

            <Sidebar
                size='lg'
                open={addCustomerOpen}
                title='Add Customer'
                headerClassName='mb-1'
                contentClassName='p-0'
                toggleSidebar={() => setAddCustomerOpen(!addCustomerOpen)}
            >
                <Form>
                    <FormGroup>
                        <Label for='customer-name' className='form-label'>
                            Customer Name
                        </Label>
                        <Input id='customer-name' placeholder='John Doe' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='customer-email' className='form-label'>
                            Customer Email
                        </Label>
                        <Input type='email' id='customer-email' placeholder='example@domain.com' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='customer-address' className='form-label'>
                            Customer Address
                        </Label>
                        <Input type='textarea' cols='2' rows='2' id='customer-address' placeholder='1307 Lady Bug Drive New York' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='country' className='form-label'>
                            Country
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={countryOptions}
                            isClearable={false}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='customer-contact' className='form-label'>
                            Contact
                        </Label>
                        <Input type='number' id='customer-contact' placeholder='763-242-9206' />
                    </FormGroup>
                    <FormGroup className='d-flex flex-wrap mt-2'>
                        <Button className='mr-1' color='primary' onClick={() => setAddCustomerOpen(false)}>
                            Add
                        </Button>
                        <Button color='secondary' onClick={() => setAddCustomerOpen(false)} outline>
                            Cancel
                        </Button>
                    </FormGroup>
                </Form>
            </Sidebar>
        </Fragment>
    )
}


export default AddCard
