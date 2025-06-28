import "./WidgetLg.css";
import { transactions } from "./../../datas";

export default function WidgetLg() {
    const Button = ({ type }) => {
        return <button className={"WidgetLgButton " + type}>{type}</button>;
    };

    return (
        <div className="WidgetLg">
            <h3 className="WidgetLgTitle">Latest Transactions</h3>
            <table className="WidgetLgTable">
                <thead>
                    <tr className="WidgetLgTr">
                        <th className="WidgetLgTh">Customer</th>
                        <th className="WidgetLgTh">Date</th>
                        <th className="WidgetLgTh">Amount</th>
                        <th className="WidgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="WidgetLgTr">
                            <td className="WidgetLgUser">
                                <img
                                    src={transaction.img}
                                    className="WidgetLgImg"
                                    alt="user"
                                />
                                <span className="WidgetLgName">{transaction.customer}</span>
                            </td>
                            <td className="WidgetLgDate">{transaction.date}</td>
                            <td className="WidgetLgAmount">${transaction.amount}</td>
                            <td className="WidgetLgStatus">
                                <Button type={transaction.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
