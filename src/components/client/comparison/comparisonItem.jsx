import ComparisonProduct from "./comparisonProduct"

const ComparisonItem = () => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><ComparisonProduct/></th>
                        <th>box 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span>Khả dụng</span></td>
                        <td><span>còn hàng</span></td>
                        <td><span>còn hàng</span></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export {ComparisonItem}