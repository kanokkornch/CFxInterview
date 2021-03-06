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
    CardText,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import axios from 'axios'
import { Plus, Edit, Printer, Download, MoreHorizontal, X, ChevronDown } from 'react-feather'
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
    const [picker1, setPicker1] = useState(new Date())
    const [discount, setDiscount] = useState(false)
    const [discountUnit, setDiscountUnit] = useState('(%)')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [tax, setTax] = useState(false)
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
                            <h5 className='font-weight-600'>??????????????????????????????</h5>
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
                            <h5 className='font-weight-600'>??????????????????????????????</h5>
                            <Input type='textarea' className='mb-1' name='address' id='address' rows='3' placeholder='???????????????????????????????????????????????????' defaultValue={customer.address} />
                            <Input type='text' className='mb-1' name='postal' id='postal' placeholder='????????????????????????????????????' defaultValue={customer.postal} />
                            <Input type='text' className='mb-1' name='taxNo' id='taxNo' placeholder='??????????????????????????????????????????????????????????????????' defaultValue={customer.taxNo} />
                            <Input type='text' name='country' id='country' placeholder='????????????????????????/??????????????????????????????' defaultValue={customer.country} />
                        </FormGroup>
                    </Col>
                    <Col style={{ padding: '8.5rem 0rem 0rem 0rem' }} />
                    <Col className='col-5 billing-padding' style={{ paddingLeft: '11rem' }}>
                        {/* <div className='d-flex justify-content-end mb-5'>
                            {ActionButtonComponent('Printer', '?????????????????????????????????')}
                            {ActionButtonComponent('Download', '???????????????????????????')}
                            {ActionButtonComponent('MoreHorizontal', '???????????????????????????')}
                        </div> */}
                        <Row className='mb-1'>
                            <Col className='col-4'>??????????????????:</Col>
                            <Col>
                                <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col className='col-4'>?????????????????? (?????????):</Col>
                            <Col>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={[]}
                                    isClearable={false}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col className='col-4'>????????????????????????:</Col>
                            <Col>
                                <Flatpickr className='form-control' value={picker1} onChange={date => setPicker1(date)} id='default-picker-1' />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-4'>??????????????????????????????:</Col>
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
                                label='?????????????????????????????????????????????'
                                onChange={() => handleCheckbox('discount')}
                                className='mb-1' />
                            <CustomInput
                                type="checkbox"
                                id="tax"
                                onChange={() => handleCheckbox('tax')}
                                label='????????????????????????????????????????????????????????????????????????' />
                        </Row>
                    </Col>
                </Row>
                <hr className='mr-2 ml-2 mt-2 mb-2' />
                <Row className='pl-2 pr-2'>
                    <Col className='d-flex'>
                        <span className='custom-title-label'>??????????????????????????????:</span>
                        <Input
                            className='mr-2' type='text' name='projectName' style={{ width: '150rem' }} />
                        <span className='custom-title-label'>???????????????????????????????????????:</span>
                        <Input className='' type='text' name='projectName' />
                    </Col>
                </Row>
                <CardBody className='invoice-padding invoice-product-details bg-light mt-2 ml-2 mr-2'>
                    <Row>
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='4' sm='12'>
                            <CardText className='col-title mb-md-50 mb-0'>??????????????????????????????/??????????????????????????????</CardText>
                        </Col>
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg='2' sm='12'>
                            <CardText className='col-title mb-md-2 mb-0'>???????????????</CardText>
                        </Col>
                        {
                            discount &&
                            <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg='1' sm='12'>
                                <CardText className='col-title mb-md-50 mb-0'>??????????????????</CardText>
                                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(prevState => !prevState)} className='custom-dropdown'>
                                    <DropdownToggle caret>
                                        {discountUnit}
                                        <ChevronDown size={15} />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setDiscountUnit('(%)')}>?????????????????????????????????(%)</DropdownItem>
                                        <DropdownItem onClick={() => setDiscountUnit('(???)')}>???????????????????????????(???)</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        }
                        {
                            tax &&
                            <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg='1' sm='12'>
                                <CardText className='col-title mb-md-50 mb-0'>????????????</CardText>
                            </Col>
                        }
                        <Col
                            className='my-lg-0 my-2 pl-0'
                            lg={!discount && !tax ? '2' : discount && !tax ? '2' : !discount && tax ? '2' : '1'}
                            sm='12'>
                            <CardText className='col-title mb-md-2 mb-0'>???????????????</CardText>
                        </Col>
                        <Col
                            className='my-lg-0 mt-2 pl-0'
                            lg={!discount && !tax ? '2' : '1'}
                            sm='12'>
                            <CardText className='col-title mb-md-50 mb-0'>????????????????????????????????????</CardText>
                        </Col>
                        <Col
                            className='my-lg-0 mt-2 pl-0'
                            lg='2'
                            sm='12'>
                            <CardText className='col-title mb-md-50 mb-0'>?????????????????????</CardText>
                        </Col>
                    </Row>
                    <hr className='m-0' />
                    <Repeater count={count}>
                        {i => {
                            const Tag = i === 0 ? 'div' : SlideDown
                            return (
                                <Tag key={i} className='repeater-wrapper'>
                                    <Row>
                                        <Col className='d-flex product-details-border position-relative pr-0' sm='12'>
                                            <Row className='w-100 pr-lg-0 pr-1 py-2'>
                                                <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='4' sm='12'>
                                                    <Input type='select' className='item-details'>
                                                        <option>App Design</option>
                                                        <option>App Customization</option>
                                                        <option>ABC Template</option>
                                                        <option>App Development</option>
                                                    </Input>
                                                    <Input className='mt-2' type='textarea' rows='1' defaultValue='' />
                                                </Col>
                                                <Col className='my-lg-0 my-2 pl-0' lg='2' sm='12'>
                                                    <Input type='number' className='text-right' defaultValue='1' placeholder='' />
                                                </Col>
                                                {
                                                    discount &&
                                                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg='1' sm='12'>
                                                        <Input type='text' rows='1' className='text-right' defaultValue='1' />
                                                    </Col>
                                                }
                                                {
                                                    tax &&
                                                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 pl-0' lg='1' sm='12'>
                                                        <Input type='text' rows='1' className='text-right' defaultValue='1' />
                                                    </Col>
                                                }
                                                <Col
                                                    className='my-lg-0 my-2 pl-0'
                                                    lg={!discount && !tax ? '2' : discount && !tax ? '2' : !discount && tax ? '2' : '1'}
                                                    sm='12'>
                                                    <Input type='select' className='item-details'>
                                                        <option>????????????</option>
                                                        <option>???????????????</option>
                                                        <option>?????????</option>
                                                    </Input>
                                                </Col>
                                                <Col
                                                    className='my-lg-0 mt-2 pl-0'
                                                    lg={!discount && !tax ? '2' : '1'}
                                                    sm='12'>
                                                    <Input type='number' className='text-right' defaultValue='1' placeholder='' />
                                                </Col>
                                                <Col className='my-lg-0 mt-2 pl-0 text-right' lg='1' sm='12'>
                                                    <CardText className='mb-0'>24.00</CardText>
                                                </Col>
                                                <Col className='my-lg-0 mt-2 p-0 text-center' lg='1' sm='12'>
                                                    <X size={18} className='cursor-pointer bg-danger delete-btn' onClick={deleteForm} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tag>
                            )
                        }}
                    </Repeater>
                    <Row className='mt-1'>
                        <Col sm='12' className='px-0 ml-1'>
                            <Button.Ripple color='primary' size='sm' className='btn-add-new' onClick={() => setCount(count + 1)}>
                                <Plus size={14} className='mr-25'></Plus>
                                <span className='align-middle'>??????????????????????????????????????????</span>
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
                                label='??????????????????????????????????????????????????????????????????????????????????????????' />
                        </div>
                        <Row>
                            <Col>
                                <p>????????????????????????:</p>
                                <Input type='textarea' cols='2' rows='2' id='remark' />
                            </Col>
                            <Col>
                                <p>?????????????????????????????????????????????:</p>
                                <Input type='textarea' cols='2' rows='2' id='internalNote' />
                            </Col>
                        </Row>
                    </Col>
                    <Col className='mr-2'>
                        <div className='d-flex mb-1'>
                            <Col>?????????????????????????????????</Col>
                            <Col className='font-weight-600 text-right'>0.00</Col>
                        </div>
                        <div className='d-flex mb-1'>
                            <Col className='d-flex'>??????????????????
                                <Input
                                    type='text'
                                    name='totalDiscount'
                                    className='mr-1 ml-1 small-input text-right'
                                    defaultValue='0.00'
                                /> %</Col>
                            <Col className='font-weight-600 text-right'>0.00</Col>
                        </div>
                        <div className='d-flex mb-1'>
                            <Col>???????????????????????????????????????????????????</Col>
                            <Col className='font-weight-600 text-right'>0.00</Col>
                        </div>
                        <div className='d-flex mb-1'>
                            <Col>????????????????????????????????????????????????????????????</Col>
                            <Col className='font-weight-600 text-right'>0.00</Col>
                        </div>
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
