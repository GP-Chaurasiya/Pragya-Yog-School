import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { CreditCard, CheckCircle2, XCircle } from 'lucide-react';
import { Payment, addPayment } from '../utils/mockData';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  itemType: 'session' | 'meeting' | 'class';
  itemId: string;
  itemName: string;
  userId: string;
  userName: string;
  userEmail: string;
  onPaymentSuccess: (paymentId: string) => void;
}

export function PaymentDialog({
  open,
  onOpenChange,
  amount,
  itemType,
  itemId,
  itemName,
  userId,
  userName,
  userEmail,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'alipay' | 'wechat'>('card');
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentStatus('processing');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create payment record
    const payment: Payment = {
      id: `payment-${Date.now()}`,
      userId,
      userName,
      userEmail,
      amount,
      currency: 'HKD',
      type: itemType,
      itemId,
      itemName,
      method: paymentMethod,
      status: 'completed',
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    addPayment(payment);
    setPaymentStatus('success');
    setProcessing(false);

    // Call success callback after a short delay
    setTimeout(() => {
      onPaymentSuccess(payment.id);
      onOpenChange(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setPaymentStatus('idle');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardholderName('');
    setPaymentMethod('card');
  };

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onOpenChange(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.payment}</DialogTitle>
          <DialogDescription>
            {t.paymentMethod}
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === 'idle' && (
          <div className="space-y-6 py-4">
            {/* Amount Display */}
            <div className="bg-[#e8f5e9] rounded-lg p-4 text-center">
              <div className="text-sm text-[#6c7a89] mb-1">{t.total}</div>
              <div className="text-3xl font-semibold text-[#2d3436]">
                HKD ${amount}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label>{t.paymentMethod}</Label>
              <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {t.cardPayment}
                    </div>
                  </SelectItem>
                  <SelectItem value="paypal">
                    <div className="flex items-center gap-2">
                      💳 {t.paypal}
                    </div>
                  </SelectItem>
                  <SelectItem value="alipay">
                    <div className="flex items-center gap-2">
                      🅰️ {t.alipay}
                    </div>
                  </SelectItem>
                  <SelectItem value="wechat">
                    <div className="flex items-center gap-2">
                      💬 {t.wechat}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">{t.cardNumber}</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">{t.cvv}</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">{t.cardholderName}</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Other Payment Methods Info */}
            {paymentMethod !== 'card' && (
              <div className="bg-[#f4f1ea] rounded-lg p-4 text-center text-sm text-[#6c7a89]">
                You will be redirected to {paymentMethod} to complete the payment
              </div>
            )}

            {/* Pay Button */}
            <Button
              onClick={handlePayment}
              className="w-full"
              size="lg"
              disabled={processing || (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardholderName))}
            >
              {t.payNow} - HKD ${amount}
            </Button>
          </div>
        )}

        {paymentStatus === 'processing' && (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4a7c59] border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg text-[#6c7a89]">{t.processingPayment}...</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="py-12 text-center">
            <div className="rounded-full bg-[#c8e6c9] w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-[#2e7d32]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.paymentSuccess}</h3>
            <p className="text-[#6c7a89]">Your booking has been confirmed</p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="py-12 text-center">
            <div className="rounded-full bg-[#ffcdd2] w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-10 w-10 text-[#c62828]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.paymentFailed}</h3>
            <p className="text-[#6c7a89] mb-4">Please try again</p>
            <Button onClick={() => setPaymentStatus('idle')} variant="outline">
              {t.back}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
