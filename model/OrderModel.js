export class OrderModel {
    constructor(order_id, customer_name, customer_id, date, payment, total, save) {
        this.order_id = order_id;
        this.customer_name = customer_name;
        this.customer_id = customer_id;
        this.date = date;
        this.payment = payment;
        this.total = total;
        this.save = save;
    }
}