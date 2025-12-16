import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';
import { ProjectCatalog } from './components/ProjectCatalog';
import { ProjectDetail } from './components/ProjectDetail';
import { SellCredits } from './components/SellCredits';
import { Marketplace } from './components/Marketplace';
import { Checkout } from './components/Checkout';
import { Portfolio } from './components/Portfolio';
import { AccountPage } from './components/AccountPage';
import { SuccessPage } from './components/SuccessPage';
import { Navigation } from './components/Navigation';
import * as api from './utils/api';

export type UserType = 'individual' | 'organization';
export type Page = 'home' | 'projects' | 'project-detail' | 'sell' | 'marketplace' | 'checkout' | 'portfolio' | 'account' | 'success';

export interface User {
  name: string;
  email: string;
  userType: UserType;
}

export interface Project {
  id: string;
  name: string;
  country: string;
  region: string;
  type: 'Reforestation' | 'Renewable Energy' | 'Energy Efficiency' | 'Ocean Conservation';
  description: string;
  longDescription: string;
  pricePerTon: number;
  availableCredits: number;
  verified: boolean;
  impactPerYear: number;
  image: string;
  certification?: string; // Add certification field
  certificationBody?: string; // Add certification body
}

export interface SellOrder {
  id: string;
  sellerId: string;
  sellerName: string;
  projectId: string;
  projectName: string;
  projectType: string;
  tons: number;
  pricePerTon: number;
  visibility: 'public' | 'private';
  status: 'open' | 'filled' | 'cancelled';
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  projectId: string;
  projectName: string;
  projectType: string;
  tons: number;
  pricePerTon: number;
  status: 'owned' | 'retired' | 'listed';
  date: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'retire';
  projectName: string;
  tons: number;
  pricePerTon: number;
  totalValue: number;
  date: string;
  counterparty?: string;
}

export interface TradeData {
  type: 'buy' | 'sell';
  project?: Project;
  sellOrder?: SellOrder;
  tons: number;
  pricePerTon: number;
  totalCost: number;
  retire?: boolean;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSellOrder, setSelectedSellOrder] = useState<SellOrder | null>(null);
  const [tradeData, setTradeData] = useState<TradeData | null>(null);
  
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);

  const handleLogin = async (userData: User) => {
    setUser(userData);
    setCurrentPage('home');
    
    // Load user data from database
    try {
      const data = await api.getUserData(userData.email);
      setPortfolio(data.portfolio);
      setTransactions(data.transactions);
      setSellOrders(data.sellOrders);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setPortfolio([]);
    setTransactions([]);
    setSellOrders([]);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
  };

  const handleBuyFromProject = (project: Project, tons: number, pricePerTon: number, retire: boolean) => {
    setTradeData({
      type: 'buy',
      project,
      tons,
      pricePerTon,
      totalCost: tons * pricePerTon,
      retire
    });
    setCurrentPage('checkout');
  };

  const handleBuyFromMarketplace = (sellOrder: SellOrder, tons: number) => {
    setSelectedSellOrder(sellOrder);
    setTradeData({
      type: 'buy',
      sellOrder,
      tons,
      pricePerTon: sellOrder.pricePerTon,
      totalCost: tons * sellOrder.pricePerTon
    });
    setCurrentPage('checkout');
  };

  const handleCreateSellOrder = async (order: Omit<SellOrder, 'id' | 'sellerId' | 'sellerName' | 'status' | 'createdAt'>) => {
    if (!user) return;
    
    const newOrder: SellOrder = {
      ...order,
      id: Date.now().toString(),
      sellerId: user.email,
      sellerName: user.name,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    
    const updatedSellOrders = [newOrder, ...sellOrders];
    setSellOrders(updatedSellOrders);
    
    // Update portfolio item status to 'listed'
    const updatedPortfolio = portfolio.map(item => 
      item.projectId === order.projectId && item.status === 'owned'
        ? { ...item, status: 'listed' as const, tons: item.tons - order.tons }
        : item
    );
    setPortfolio(updatedPortfolio);
    
    // Persist to database
    try {
      await api.createSellOrder(newOrder);
      await api.updatePortfolio(user.email, updatedPortfolio);
    } catch (error) {
      console.error('Error saving sell order:', error);
    }
    
    setCurrentPage('marketplace');
  };

  const handleConfirmTrade = async () => {
    if (!tradeData || !user) return;

    if (tradeData.type === 'buy') {
      // Add to portfolio
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        projectId: tradeData.project?.id || tradeData.sellOrder?.projectId || '',
        projectName: tradeData.project?.name || tradeData.sellOrder?.projectName || '',
        projectType: tradeData.project?.type || tradeData.sellOrder?.projectType || '',
        tons: tradeData.tons,
        pricePerTon: tradeData.pricePerTon,
        status: tradeData.retire ? 'retired' : 'owned',
        date: new Date().toISOString()
      };
      
      const existingItem = portfolio.find(
        item => item.projectId === newItem.projectId && item.status === newItem.status
      );
      
      let updatedPortfolio;
      if (existingItem) {
        updatedPortfolio = portfolio.map(item =>
          item.id === existingItem.id
            ? { ...item, tons: item.tons + newItem.tons }
            : item
        );
      } else {
        updatedPortfolio = [newItem, ...portfolio];
      }
      setPortfolio(updatedPortfolio);

      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'buy',
        projectName: newItem.projectName,
        tons: tradeData.tons,
        pricePerTon: tradeData.pricePerTon,
        totalValue: tradeData.totalCost,
        date: new Date().toISOString(),
        counterparty: tradeData.sellOrder?.sellerName
      };
      setTransactions([newTransaction, ...transactions]);

      // Update sell order if buying from marketplace
      let updatedSellOrders = sellOrders;
      if (tradeData.sellOrder) {
        updatedSellOrders = sellOrders.map(order =>
          order.id === tradeData.sellOrder!.id
            ? {
                ...order,
                tons: order.tons - tradeData.tons,
                status: order.tons - tradeData.tons === 0 ? 'filled' as const : order.status
              }
            : order
        );
        setSellOrders(updatedSellOrders);
      }

      // Persist to database
      try {
        await api.updatePortfolio(user.email, updatedPortfolio);
        await api.addTransaction(user.email, newTransaction);
        if (tradeData.sellOrder) {
          await api.updateSellOrders(updatedSellOrders);
        }
      } catch (error) {
        console.error('Error persisting trade:', error);
      }
    }

    setCurrentPage('success');
  };

  // If not logged in, show auth page
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      <main>
        {currentPage === 'home' && (
          <HomePage
            user={user}
            portfolio={portfolio}
            transactions={transactions}
            sellOrders={sellOrders}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectCatalog onProjectSelect={handleProjectSelect} />
        )}
        {currentPage === 'project-detail' && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBuyCredits={handleBuyFromProject}
            onBack={() => setCurrentPage('projects')}
          />
        )}
        {currentPage === 'sell' && user.userType === 'organization' && (
          <SellCredits
            portfolio={portfolio}
            onCreateSellOrder={handleCreateSellOrder}
          />
        )}
        {currentPage === 'marketplace' && (
          <Marketplace
            user={user}
            sellOrders={sellOrders}
            onBuyFromListing={handleBuyFromMarketplace}
            onCancelOrder={async (orderId) => {
              const updatedOrders = sellOrders.map(order =>
                order.id === orderId ? { ...order, status: 'cancelled' as const } : order
              );
              setSellOrders(updatedOrders);
              
              // Persist to database
              try {
                await api.updateSellOrders(updatedOrders);
              } catch (error) {
                console.error('Error cancelling order:', error);
              }
            }}
          />
        )}
        {currentPage === 'checkout' && tradeData && (
          <Checkout
            tradeData={tradeData}
            onConfirm={handleConfirmTrade}
            onBack={() => setCurrentPage(tradeData.sellOrder ? 'marketplace' : 'project-detail')}
          />
        )}
        {currentPage === 'portfolio' && (
          <Portfolio
            user={user}
            portfolio={portfolio}
            transactions={transactions}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'account' && (
          <AccountPage user={user} onLogout={handleLogout} />
        )}
        {currentPage === 'success' && tradeData && (
          <SuccessPage
            tradeData={tradeData}
            onGoToPortfolio={() => setCurrentPage('portfolio')}
            onGoToMarketplace={() => setCurrentPage('marketplace')}
          />
        )}
      </main>
    </div>
  );
}