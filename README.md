import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Bell, DollarSign, Droplets, Flame, Lightbulb, PieChart, Save } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts'

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  DollarSign,
  Droplets,
  Flame,
  Lightbulb,
  Wifi,
  TrendingUp,
  AlertTriangle,
  PieChart,
  Calendar,
  Activity,
  Save,
  BarChart3,
  ShieldAlert,
  Wallet,
  Clock3,
  Cpu,
  Leaf
} from 'lucide-react'

import {
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  Legend
} from 'recharts'

export default function SistemaConsumoHogar() {
  const [factura, setFactura] = useState({
    tipo: '',
    valor: '',
    consumo: '',
    fecha: ''
  })

  const [darkMode, setDarkMode] = useState(false)

  const [gastos, setGastos] = useState([
    { tipo: 'Electricidad', valor: 180000, consumo: 320, fecha: '2026-05-01' },
    { tipo: 'Agua', valor: 95000, consumo: 22, fecha: '2026-05-02' },
    { tipo: 'Gas', valor: 68000, consumo: 14, fecha: '2026-05-03' },
    { tipo: 'Internet', valor: 90000, consumo: 1, fecha: '2026-05-04' }
  ])

  const agregarFactura = () => {
    if (!factura.tipo || !factura.valor) return

    setGastos([
      ...gastos,
      {
        ...factura,
        valor: Number(factura.valor),
        consumo: Number(factura.consumo)
      }
    ])

    setFactura({
      tipo: '',
      valor: '',
      consumo: '',
      fecha: ''
    })
  }

  const totalGastos = useMemo(() => {
    return gastos.reduce((acc, item) => acc + item.valor, 0)
  }, [gastos])

  const recomendaciones = useMemo(() => {
    const mensajes = []

    gastos.forEach((item) => {
      if (item.tipo === 'Electricidad' && item.valor > 150000) {
        mensajes.push('Reduce el uso de electrodomésticos de alto consumo durante horas pico.')
      }

      if (item.tipo === 'Agua' && item.consumo > 20) {
        mensajes.push('Revisa fugas de agua y optimiza el tiempo de uso en duchas y lavado.')
      }

      if (item.tipo === 'Gas' && item.valor > 60000) {
        mensajes.push('Realiza mantenimiento a estufas y calentadores para optimizar el consumo de gas.')
      }
    })

    if (mensajes.length === 0) {
      mensajes.push('Tus consumos están dentro del rango recomendado.')
    }

    return mensajes
  }, [gastos])

  const chartData = gastos.map((item) => ({
    name: item.tipo,
    valor: item.valor
  }))

  const pieData = gastos.map((item) => ({
    name: item.tipo,
    value: item.valor
  }))

  const colors = ['#16a34a', '#2563eb', '#f97316', '#9333ea']

  const gastoPromedio = Math.round(totalGastos / gastos.length)

  const tendencia = totalGastos > 350000 ? 'Alta' : 'Normal'

  const alertasCriticas = recomendaciones.filter((r) => r.includes('Reduce') || r.includes('Revisa'))

  const historialMensual = [
    { mes: 'Ene', gasto: 320000 },
    { mes: 'Feb', gasto: 290000 },
    { mes: 'Mar', gasto: 350000 },
    { mes: 'Abr', gasto: 400000 },
    { mes: 'May', gasto: totalGastos }
  ]

  const ahorroEstimado = Math.round(totalGastos * 0.18)

  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-950' : 'bg-gray-100'
  }, [darkMode])

  return (
    <div className={`${darkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen transition-all duration-300`}>
      {/* NAVBAR */}
      <nav className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'} border-b sticky top-0 z-50 backdrop-blur`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-green-600">
              SmartHome Analytics
            </h1>
            <p className="text-sm opacity-70">
              Sistema Inteligente de Consumo y Gastos
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-2xl"
            >
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Button>

            <Button className="rounded-2xl bg-green-600 hover:bg-green-700">
              Dashboard Premium
            </Button>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Sistema Inteligente de Consumo y Gastos del Hogar
          </h1>

          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Plataforma diseñada para registrar, analizar y optimizar el consumo doméstico de energía, agua, gas e internet mediante estadísticas inteligentes, alertas automáticas y recomendaciones de ahorro.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button className="rounded-2xl px-8 py-6 text-lg bg-white text-green-700 hover:bg-gray-100">
              Iniciar Monitoreo
            </Button>

            <Button variant="outline" className="rounded-2xl px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-green-700">
              Ver Reportes
            </Button>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        {/* RESUMEN GENERAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
          <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-green-600 to-green-500 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Wallet size={34} />
                <Badge className="bg-white text-green-700">+12%</Badge>
              </div>
              <p className="opacity-80">Gasto Total</p>
              <h2 className="text-4xl font-black mt-2">${totalGastos.toLocaleString()}</h2>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <TrendingUp className="text-blue-500" size={32} />
                <Badge>{tendencia}</Badge>
              </div>
              <p className="opacity-70">Promedio Mensual</p>
              <h2 className="text-3xl font-bold">${gastoPromedio.toLocaleString()}</h2>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Leaf className="text-green-500" size={32} />
                <Badge variant="secondary">Ahorro</Badge>
              </div>
              <p className="opacity-70">Ahorro Estimado</p>
              <h2 className="text-3xl font-bold">${ahorroEstimado.toLocaleString()}</h2>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <ShieldAlert className="text-red-500" size={32} />
                <Badge variant="destructive">{alertasCriticas.length}</Badge>
              </div>
              <p className="opacity-70">Alertas Críticas</p>
              <h2 className="text-3xl font-bold">{alertasCriticas.length}</h2>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Clock3 className="text-purple-500" size={32} />
                <Badge>Tiempo Real</Badge>
              </div>
              <p className="opacity-70">Monitoreo</p>
              <h2 className="text-2xl font-bold">Activo</h2>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-4 rounded-2xl">
                <Lightbulb className="text-yellow-500" size={32} />
              </div>
              <div>
                <p className="text-gray-500">Electricidad</p>
                <h3 className="text-2xl font-bold">320 kWh</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-2xl">
                <Droplets className="text-blue-500" size={32} />
              </div>
              <div>
                <p className="text-gray-500">Agua</p>
                <h3 className="text-2xl font-bold">22 m³</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-2xl">
                <Flame className="text-orange-500" size={32} />
              </div>
              <div>
                <p className="text-gray-500">Gas</p>
                <h3 className="text-2xl font-bold">14 m³</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-2xl">
                <DollarSign className="text-green-600" size={32} />
              </div>
              <div>
                <p className="text-gray-500">Total Gastos</p>
                <h3 className="text-2xl font-bold">${totalGastos.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FORMULARIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-green-700">
                Registro de Facturas
              </h2>

              <div className="space-y-4">
                <Input
                  placeholder="Tipo de servicio"
                  value={factura.tipo}
                  onChange={(e) => setFactura({ ...factura, tipo: e.target.value })}
                />

                <Input
                  type="number"
                  placeholder="Valor de la factura"
                  value={factura.valor}
                  onChange={(e) => setFactura({ ...factura, valor: e.target.value })}
                />

                <Input
                  type="number"
                  placeholder="Consumo"
                  value={factura.consumo}
                  onChange={(e) => setFactura({ ...factura, consumo: e.target.value })}
                />

                <Input
                  type="date"
                  value={factura.fecha}
                  onChange={(e) => setFactura({ ...factura, fecha: e.target.value })}
                />

                <Button
                  onClick={agregarFactura}
                  className="w-full rounded-2xl py-6 text-lg"
                >
                  <Save className="mr-2" size={18} />
                  Guardar Registro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ALERTAS */}
          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-red-500" size={30} />
                <h2 className="text-3xl font-bold text-red-500">
                  Alertas Inteligentes
                </h2>
              </div>

              <div className="space-y-4">
                {recomendaciones.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-red-50 border border-red-200 rounded-2xl p-4"
                  >
                    ⚠️ {msg}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GRAFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">
                  Estadísticas de Gastos
                </h2>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#16a34a" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                Distribución del Consumo
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* TABLA */}
        <Card className="rounded-3xl shadow-xl mb-12">
          <CardContent className="p-8 overflow-auto">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Historial de Gastos
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="p-4 text-left">Servicio</th>
                  <th className="p-4 text-left">Valor</th>
                  <th className="p-4 text-left">Consumo</th>
                  <th className="p-4 text-left">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {gastos.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-4">{item.tipo}</td>
                    <td className="p-4">${item.valor.toLocaleString()}</td>
                    <td className="p-4">{item.consumo}</td>
                    <td className="p-4">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* RECOMENDACIONES */}
        <Card className="rounded-3xl shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Recomendaciones Inteligentes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-xl mb-3">Ahorro de Energía</h3>
                <p>
                  Apaga dispositivos que no estén en uso y utiliza bombillas LED para reducir el consumo eléctrico.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-xl mb-3">Optimización de Agua</h3>
                <p>
                  Reduce el tiempo de ducha y revisa fugas para disminuir el desperdicio de agua.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h3 className="font-bold text-xl mb-3">Uso Eficiente del Gas</h3>
                <p>
                  Realiza mantenimiento periódico a calentadores y estufas para evitar pérdidas.
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="font-bold text-xl mb-3">Control Financiero</h3>
                <p>
                  Revisa tus reportes mensuales para identificar gastos innecesarios y mejorar la administración del hogar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Sistema Inteligente del Hogar
            </h3>
            <p>
              Plataforma orientada al ahorro, análisis y optimización de recursos domésticos.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            © 2026 - Proyecto de Gestión Inteligente de Consumo y Gastos.
          </div>
        </div>
      </footer>

      {/* PANEL IA */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full h-16 w-16 shadow-2xl bg-green-600 hover:bg-green-700">
          <Cpu size={28} />
        </Button>
      </div>
    </div>
  )
}
