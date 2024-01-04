'use client'

import React, { useState } from 'react';
import { PricingTab } from '../pricingTab/pricingTab';

export function PricingTable(): React.ReactElement {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  return (
    <div>
      {/* Pricing toggle */}
      <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
        <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
          <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
            <span className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${isAnnual ? 'translate-x-0' : 'translate-x-full'}`}></span>
          </span>
          <button className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} onClick={() => setIsAnnual(true)} aria-pressed={isAnnual}>Yearly <span className={`${isAnnual ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}`}>-20%</span></button>
          <button className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-slate-500 dark:text-slate-400' : 'text-white'}`} onClick={() => setIsAnnual(false)} aria-pressed={isAnnual}>Monthly</button>
        </div>
      </div>

      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-2 items-center lg:max-w-4xl">

        {/* Pricing tab 1 */}
        <PricingTab
          yearly={isAnnual}
          planName="Basic"
          price={{ yearly: 0, monthly: 0 }}
          planDescription="Free Plan."
          features={[
            'Hire Services',
            'Navigation with Ads',
            'Create Max 3 Services After Approval',
          ]} />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={isAnnual}
          planName="Pro"
          price={{ yearly: 8, monthly: 10 }}
          planDescription="Become Premium"
          features={[
            'Navigation without Ads',
            'Create to 10 Services After Approval',
            'Don\'t Need Approval to Create Services',
          ]}
          link="#0" />
      </div>

    </div>
  )
}