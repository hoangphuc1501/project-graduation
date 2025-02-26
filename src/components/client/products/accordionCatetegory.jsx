import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { categoryList } from '../../../services/client/productApiService';

const AccordionProduct = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryList()
            setCategories(response.categories);
        };

        fetchCategories();
    }, []);

    return (
        <div className='w-full'>
            <h2 className='text-[20px] font-[500] text-[#333333] pb-[12px] uppercase text-center border py-[10px] rounded-t-[4px]'>Danh mục sản phẩm</h2>
            <Accordion defaultActiveKey="0">
            {categories.map((category) => (
                <Accordion.Item eventKey={category.id} key={category.id}>
                    <Accordion.Header>{category.name}</Accordion.Header>
                    {category.subCategories?.map((subCategory) => (
                    <Accordion.Body >
                        {subCategory.name}
                    </Accordion.Body>
                    ))}
                </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}
export default AccordionProduct;