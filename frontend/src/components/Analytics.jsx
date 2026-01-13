import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Tableau de Bord Analytics
        </h1>
        <p className="text-gray-600">
          Business Intelligence - E-Commerce UK 2010-2011
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenu Total</p>
              <p className="text-2xl font-bold text-green-600">£8.2M</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="text-2xl font-bold text-blue-600">4,372</p>
            </div>
            <Users className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-purple-600">397K</p>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Marge Profit</p>
              <p className="text-2xl font-bold text-orange-600">30%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Power BI Dashboard */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Interactif Power BI
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            🔄 Actualiser
          </button>
        </div>

        {/* Power BI Iframe - REMPLACEZ L'URL ICI */}
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: '700px' }}>
          <iframe
            title="Power BI Dashboard"
            width="100%"
            height="100%"
                      src="https://app.powerbi.com/view?r=eyJrIjoiYWZhNjgwOTktOTk2ZS00ZWJjLWJhOTQtMTZjNzEyZTQ1NmY5IiwidCI6ImI3YmQ0NzE1LTQyMTctNDhjNy05MTllLTJlYTk3ZjU5MmZhNyJ9"
            frameBorder="0"
            allowFullScreen={true}
          />
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Pour activer le dashboard:</strong> Remplacez "VOTRE_URL_POWERBI_ICI" 
            par votre URL d'intégration Power BI dans le fichier Analytics.jsx
          </p>
        </div>
      </div>
    </div>
  );
}