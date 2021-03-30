import { Fragment } from 'react'
import { Col, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FileText } from 'react-feather'
const AddActions = () => {
    return (
        <Fragment>
            <div className='d-flex flex-row mb-1'>
                <Col>
                    <div className='d-flex flex-column '>
                        <p className='mb-0'>
                            <FileText className='icon-with-text text-blue' />
                            แก้ไขใบวางบิล
                        </p>
                        <div className='d-flex'>
                            <h3 className='mr-75 text-blue'>BL2021030001</h3>
                            <Button
                                color='secondary'
                                outline size='sm'
                                className='h-fit-content '>
                                รอวางบิล
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='d-flex justify-content-end'>
                        <Button className='mr-75 mb-0' color='secondary' outline>ปิดหน้าต่าง</Button>
                        {/* <Button color='success'>บันทึกเอกสาร</Button> */}
                        <UncontrolledButtonDropdown>
                            <Button color='success'>บันทึกเอกสาร</Button>
                            <DropdownToggle className='dropdown-toggle-split' color='success' caret></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' tag='a'>Option 1</DropdownItem>
                                <DropdownItem href='/' tag='a'>Option 2</DropdownItem>
                                <DropdownItem href='/' tag='a'>Option 3</DropdownItem>
                                <DropdownItem divider></DropdownItem>
                                <DropdownItem href='/' tag='a'>Separated Link</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </Col>
            </div>
        </Fragment>
    )
}

export default AddActions
