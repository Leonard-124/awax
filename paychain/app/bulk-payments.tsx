import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ArrowLeft, User, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import PayeeCard from '@/components/PayeeCard';
import BatchCard from '@/components/BatchCard';
import VerificationModal from '@/components/VerificationModal';
import { payeesData, batchesData } from '@/constants/data';


export  default function BulkPaymentsScreen() {

    const [activeTab, setActiveTab] = useState<'payees' | 'batches'>('payees');
    const [selectedPayees, setSelectedPayees] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false)

    const togglePayee = (id: number) => {
        setSelectedPayees(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    };

    const totalAmount = payeesData
    .filter(p => selectedPayees.includes(p.id))
    .reduce((sum, p) => sum + p.amount, 0)

    return (
        <ScrollView className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content"/>
            <View className='px-6 pt-12 pb-32'>
                <View className='flex-row items-center justify-between mb-6'>
                    <View className='flex-row items-center'>
                        <TouchableOpacity onPress={() => router.back()} className='mr-3'>
                            <ArrowLeft  size={24} color="#111827" />
                        </TouchableOpacity>
                        <Text className='text-gray-900 font-bold text-xl'>Bulk Payments</Text>
                    </View>
                    <User size={24} color="#374151" />
                </View>
                <View className='flex-row mb-6 bg-gray-100 rounded-xl p-1'>
                    <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${activeTab === 'payees' ? 'bg-white' : ''}`}
                    onPress={() => setActiveTab('payees')}
                    >
                        <Text className={`text-center font-bold ${activeTab === 'payees' ? 'text-gray-900' : 'text-gray-500'}`}>
                            Payees
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${activeTab === 'batches' ? 'bg-white' : ''}`}
                    onPress={() => setActiveTab('batches')}
                    >
                        <Text className={`text-center font-bold ${activeTab === 'batches' ? 'text-gray-900' : 'text-gray-500'}`}> 
                            Batches
                        </Text>
                    </TouchableOpacity>
                </View>
                {activeTab === 'payees' ? (
                    <>
                    <View className='flex-row items-center justify-between mb-6'>
                        <View>
                            <Text className="text-gray-500 text-xs mb-1">OPERATIONS</Text>
                            <Text className="text-gray-900 font-bold text-2xl italic">Manage Payees</Text>
                        </View>
                        <TouchableOpacity className='bg-emerald-700 px-6 py-3 rounded-xl'>
                            <Text className='text-white font-bold'>+ Add Payee</Text>
                        </TouchableOpacity>
                    </View>

                    {payeesData.flatMap(payee  => (
                        <PayeeCard
                        key={payee.id}
                        payee={payee}
                        onPress={() => togglePayee(payee.id)}
                        isSelected={selectedPayees.includes(payee.id)}
                        />
                    ))}

                    {selectedPayees.length > 0 && (
                        <View className='bg-emerald-700 rounded-2xl p-5 flex-row items-center justify-between mt-4'>
                            <View>
                                <Text className='text-emerald-200 text-xs mb-1'>{selectedPayees.length} PAYEES SELECTED</Text>
                                <Text className='text-white font-bold text-xl'>KES {totalAmount.toLocaleString()}</Text>
                            </View>
                            <TouchableOpacity
                            className='bg-white px-6 py-3 rounded-xl flex-row items-center'
                            onPress={() => setShowModal(true)}
                            >
                            <Text className='text-emerald-700 font-bold mr-2'>Pay Now</Text>
                            <ArrowRight size={20} color="#047857"/>
                            </TouchableOpacity>
                        </View>
                    )}
                    </>
                ) : (
                    <>
                    {batchesData.map(batch => (
                        <BatchCard key={batch.id} batch={batch} onPress={() => {}} />
                    ))}
                    </>
                )}
            </View>

            <VerificationModal
            visible={showModal}
            onClose={() => {
                setShowModal(false);
                setSelectedPayees([])
            }}
            amount={totalAmount}
             />
        </ScrollView>
    );
}