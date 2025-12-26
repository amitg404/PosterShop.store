"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, Package, Sparkles, PartyPopper, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const clearCart = useCartStore((state) => state.clearCart);
    const [mounted, setMounted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const orderId = searchParams.get('orderId');

    useEffect(() => {
        const t = setTimeout(() => {
            setMounted(true);
            setShowConfetti(true);
        }, 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (mounted) {
            clearCart();
        }
    }, [mounted, clearCart]);

    // Hide confetti after animation
    useEffect(() => {
        if (showConfetti) {
            const t = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(t);
        }
    }, [showConfetti]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Confetti Effect */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                y: -20, 
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500),
                                rotate: 0,
                                opacity: 1
                            }}
                            animate={{ 
                                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                                opacity: 0
                            }}
                            transition={{ 
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut"
                            }}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{
                                backgroundColor: ['#22c55e', '#10b981', '#34d399', '#fbbf24', '#f97316', '#ef4444'][Math.floor(Math.random() * 6)]
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="max-w-md w-full bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800/50 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden z-10"
            >
                {/* Top Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-500/20 blur-[80px] rounded-full pointer-events-none" />

                {/* Success Icon with Ripple */}
                <div className="flex justify-center relative">
                    {/* Ripple rings */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute w-20 h-20 bg-green-500/20 rounded-full"
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.3 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        className="absolute w-20 h-20 bg-green-500/10 rounded-full"
                    />
                    
                    {/* Main icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                        className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.5)] relative z-10"
                    >
                        <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </motion.div>
                </div>

                {/* Celebration Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-2"
                >
                    <PartyPopper className="w-5 h-5 text-yellow-400" />
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <PartyPopper className="w-5 h-5 text-yellow-400 scale-x-[-1]" />
                </motion.div>

                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3 relative z-10"
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-white">
                        Order Confirmed!
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Thank you for your purchase 🎉
                    </p>
                </motion.div>

                {/* Order ID Card */}
                {orderId && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-neutral-800/80 to-neutral-800/40 rounded-2xl p-5 border border-white/5 space-y-2 backdrop-blur-sm"
                    >
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Order ID</p>
                        <p className="font-mono text-xl text-green-400 font-semibold">{orderId}</p>
                    </motion.div>
                )}

                {/* Info Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-left"
                >
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-green-300 font-medium">Your order is being prepared!</p>
                        <p className="text-xs text-neutral-500">We&apos;ll deliver it to your drop zone soon.</p>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 gap-3 pt-2"
                >
                    <button 
                        onClick={() => router.push('/orders')}
                        className="w-full h-14 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Package className="w-5 h-5" />
                        View Orders
                    </button>
                    <button 
                        onClick={() => router.push('/catalog')}
                        className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Shop More
                    </button>
                </motion.div>

                {/* Footer */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs text-neutral-600 pt-2"
                >
                    Questions? Contact us at postershop.store@gmail.com
                </motion.p>
            </motion.div>
        </div>
    );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="animate-spin text-green-500 w-8 h-8" />
        </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
