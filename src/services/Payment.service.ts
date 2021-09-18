
import { Payment } from '../@types';
import Service from '../Service';
import { generateQueryString } from '../utils';

class PaymentService extends Service {

    static getAllPayments(search: Payment.Query) {
        const queryString = generateQueryString(search);
        return this.Http.get<Payment.Paginated>('/payments'.concat(queryString)).then(this.getData);
    }

    static addPayment(payment: Payment.Input){
        return this.Http.post<Payment.Detailed>('/payments',payment).then(this.getData);
    }

    static approvePayments(payments: number[]){
        return this.Http.put<string>('/payments/bulk-approvals',payments).then(this.getData);
    }

    static addPaymentPreview(payment: Payment.PreviewInput){
        return this.Http.post<Payment.Preview>('/payments/preview',payment).then(this.getData);
    }

    static approvePayment(paymentId: number){
        return this.Http.put<string>(`/payments/${paymentId}/approval`).then(this.getData);
    }

    static getPayment(paymentId: number) {
        return this.Http.get<Payment.Detailed>(`/payments/${paymentId}`).then(this.getData);
    }

    static getPostPayment(paymentId: number) {
        return this.Http.get<Payment.PostWithEarnings>(`/payments/${paymentId}/posts`).then(this.getData);
    }

    static deletePayment(paymentId: number) {
        return this.Http.delete<string>(`/payments/${paymentId}`).then(this.getData);
    }
    
}

export default PaymentService;