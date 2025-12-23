import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  image: string;
}

interface GameCase {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  items: CaseItem[];
}

interface Player {
  id: number;
  name: string;
  balance: number;
  totalWon: number;
  casesOpened: number;
  avatar: string;
}

const mockCases: GameCase[] = [
  {
    id: 1,
    name: 'CYBER НАЧАЛЬНЫЙ',
    price: 50,
    category: 'starter',
    image: '🎁',
    items: [
      { id: 1, name: 'Базовый скин', rarity: 'common', value: 30, image: '🔵' },
      { id: 2, name: 'Обычный приз', rarity: 'common', value: 40, image: '🟢' },
      { id: 3, name: 'Редкий приз', rarity: 'rare', value: 100, image: '🟣' },
      { id: 4, name: 'Эпик приз', rarity: 'epic', value: 250, image: '🟡' },
    ],
  },
  {
    id: 2,
    name: 'NEON CLASSIC',
    price: 150,
    category: 'classic',
    image: '💎',
    items: [
      { id: 5, name: 'Классик скин', rarity: 'rare', value: 120, image: '🟣' },
      { id: 6, name: 'Редкий дроп', rarity: 'rare', value: 180, image: '🔷' },
      { id: 7, name: 'Эпик награда', rarity: 'epic', value: 400, image: '🟡' },
      { id: 8, name: 'Легендарка', rarity: 'legendary', value: 1000, image: '🔥' },
    ],
  },
  {
    id: 3,
    name: 'ELITE PREMIUM',
    price: 500,
    category: 'premium',
    image: '👑',
    items: [
      { id: 9, name: 'Премиум скин', rarity: 'epic', value: 450, image: '🟡' },
      { id: 10, name: 'Элитный приз', rarity: 'epic', value: 600, image: '⭐' },
      { id: 11, name: 'Легенда', rarity: 'legendary', value: 1500, image: '🔥' },
      { id: 12, name: 'Мифик', rarity: 'legendary', value: 3000, image: '💫' },
    ],
  },
  {
    id: 4,
    name: 'TURBO SPEED',
    price: 100,
    category: 'classic',
    image: '⚡',
    items: [
      { id: 13, name: 'Быстрый приз', rarity: 'common', value: 70, image: '🟢' },
      { id: 14, name: 'Скорость', rarity: 'rare', value: 150, image: '🔷' },
      { id: 15, name: 'Турбо', rarity: 'epic', value: 300, image: '⭐' },
    ],
  },
  {
    id: 5,
    name: 'COSMIC RARE',
    price: 250,
    category: 'classic',
    image: '🌟',
    items: [
      { id: 16, name: 'Космос', rarity: 'rare', value: 200, image: '🌠' },
      { id: 17, name: 'Звездный', rarity: 'epic', value: 500, image: '⭐' },
      { id: 18, name: 'Галактика', rarity: 'legendary', value: 1200, image: '🌌' },
    ],
  },
  {
    id: 6,
    name: 'FIRE LEGEND',
    price: 750,
    category: 'premium',
    image: '🔥',
    items: [
      { id: 19, name: 'Огненный', rarity: 'epic', value: 700, image: '🔥' },
      { id: 20, name: 'Пламя', rarity: 'legendary', value: 2000, image: '🌋' },
      { id: 21, name: 'Инферно', rarity: 'legendary', value: 4000, image: '💥' },
    ],
  },
  {
    id: 7,
    name: 'ICE WARRIOR',
    price: 200,
    category: 'classic',
    image: '❄️',
    items: [
      { id: 22, name: 'Ледяной', rarity: 'rare', value: 180, image: '🧊' },
      { id: 23, name: 'Мороз', rarity: 'epic', value: 450, image: '❄️' },
      { id: 24, name: 'Арктика', rarity: 'legendary', value: 1100, image: '🌨️' },
    ],
  },
  {
    id: 8,
    name: 'DRAGON MYTH',
    price: 600,
    category: 'premium',
    image: '🐉',
    items: [
      { id: 25, name: 'Драконий', rarity: 'epic', value: 550, image: '🐲' },
      { id: 26, name: 'Древний', rarity: 'legendary', value: 1800, image: '🐉' },
      { id: 27, name: 'Мифический', rarity: 'legendary', value: 3500, image: '🔱' },
    ],
  },
  {
    id: 9,
    name: 'GOLD RUSH',
    price: 300,
    category: 'classic',
    image: '💰',
    items: [
      { id: 28, name: 'Золотой', rarity: 'rare', value: 250, image: '🪙' },
      { id: 29, name: 'Богатство', rarity: 'epic', value: 550, image: '💰' },
      { id: 30, name: 'Джекпот', rarity: 'legendary', value: 1400, image: '💎' },
    ],
  },
  {
    id: 10,
    name: 'STARTER BOX',
    price: 25,
    category: 'starter',
    image: '📦',
    items: [
      { id: 31, name: 'Начальный', rarity: 'common', value: 15, image: '🎯' },
      { id: 32, name: 'Простой', rarity: 'common', value: 25, image: '🎲' },
      { id: 33, name: 'Неплохой', rarity: 'rare', value: 75, image: '🎪' },
    ],
  },
];

const mockTopPlayers: Player[] = [
  { id: 1, name: 'CyberKing', balance: 15420, totalWon: 45230, casesOpened: 156, avatar: '👑' },
  { id: 2, name: 'NeonMaster', balance: 12150, totalWon: 38900, casesOpened: 134, avatar: '💎' },
  { id: 3, name: 'EliteGamer', balance: 9870, totalWon: 32100, casesOpened: 119, avatar: '⚡' },
  { id: 4, name: 'ProWinner', balance: 8340, totalWon: 28450, casesOpened: 98, avatar: '🎯' },
  { id: 5, name: 'LuckyShot', balance: 7250, totalWon: 24780, casesOpened: 87, avatar: '🍀' },
  { id: 6, name: 'DarkPhoenix', balance: 6890, totalWon: 21340, casesOpened: 76, avatar: '🔥' },
  { id: 7, name: 'IceQueen', balance: 6120, totalWon: 19870, casesOpened: 68, avatar: '❄️' },
  { id: 8, name: 'ThunderBolt', balance: 5540, totalWon: 17230, casesOpened: 61, avatar: '⚡' },
  { id: 9, name: 'GoldenEagle', balance: 4980, totalWon: 15670, casesOpened: 54, avatar: '🦅' },
  { id: 10, name: 'ShadowNinja', balance: 4320, totalWon: 13450, casesOpened: 47, avatar: '🥷' },
];

const rarityColors = {
  common: 'from-gray-500 to-gray-700',
  rare: 'from-blue-500 to-purple-500',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-500 to-red-500',
};

function Index() {
  const [activeTab, setActiveTab] = useState('cases');
  const [userBalance, setUserBalance] = useState(5000);
  const [selectedCase, setSelectedCase] = useState<GameCase | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);
  const [openHistory, setOpenHistory] = useState<CaseItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const openCase = (gameCase: GameCase) => {
    if (userBalance < gameCase.price) {
      alert('Недостаточно средств!');
      return;
    }

    setSelectedCase(gameCase);
    setIsOpening(true);
    setUserBalance(userBalance - gameCase.price);

    setTimeout(() => {
      const randomItem = gameCase.items[Math.floor(Math.random() * gameCase.items.length)];
      setWonItem(randomItem);
      setUserBalance((prev) => prev + randomItem.value);
      setOpenHistory([randomItem, ...openHistory].slice(0, 20));
      setIsOpening(false);
    }, 3000);
  };

  const filteredCases = categoryFilter === 'all' 
    ? mockCases 
    : mockCases.filter(c => c.category === categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a]">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse-glow z-50"></div>
      
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎮</div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  CYBER CASES
                </h1>
                <p className="text-xs text-muted-foreground">ОТКРОЙ УДАЧУ</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Card className="px-6 py-3 bg-gradient-to-r from-card to-muted border-primary/30 glow-cyan clip-corner">
                <div className="flex items-center gap-3">
                  <Icon name="Wallet" className="text-primary" size={24} />
                  <div>
                    <p className="text-xs text-muted-foreground">Баланс</p>
                    <p className="text-xl font-bold text-primary">{userBalance} ₽</p>
                  </div>
                </div>
              </Card>
              <Button className="clip-corner glow-cyan bg-primary hover:bg-primary/80 text-primary-foreground font-bold">
                <Icon name="Plus" size={20} />
                ПОПОЛНИТЬ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm p-1 clip-corner">
            <TabsTrigger value="cases" className="clip-corner data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
              <Icon name="Box" className="mr-2" size={18} />
              КЕЙСЫ
            </TabsTrigger>
            <TabsTrigger value="top" className="clip-corner data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
              <Icon name="Trophy" className="mr-2" size={18} />
              ТОП
            </TabsTrigger>
            <TabsTrigger value="profile" className="clip-corner data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
              <Icon name="User" className="mr-2" size={18} />
              ПРОФИЛЬ
            </TabsTrigger>
            <TabsTrigger value="support" className="clip-corner data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
              <Icon name="MessageCircle" className="mr-2" size={18} />
              ПОМОЩЬ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <div className="mb-6 flex gap-3 flex-wrap">
              <Button 
                variant={categoryFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setCategoryFilter('all')}
                className="clip-corner font-bold"
              >
                ВСЕ
              </Button>
              <Button 
                variant={categoryFilter === 'starter' ? 'default' : 'outline'}
                onClick={() => setCategoryFilter('starter')}
                className="clip-corner font-bold"
              >
                НАЧАЛЬНЫЕ
              </Button>
              <Button 
                variant={categoryFilter === 'classic' ? 'default' : 'outline'}
                onClick={() => setCategoryFilter('classic')}
                className="clip-corner font-bold"
              >
                КЛАССИКА
              </Button>
              <Button 
                variant={categoryFilter === 'premium' ? 'default' : 'outline'}
                onClick={() => setCategoryFilter('premium')}
                className="clip-corner font-bold"
              >
                ПРЕМИУМ
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((gameCase) => (
                <Card
                  key={gameCase.id}
                  className="overflow-hidden border-2 border-primary/20 hover:border-primary/60 transition-all cursor-pointer group bg-gradient-to-br from-card to-muted clip-corner hover:glow-cyan hover:scale-105"
                  onClick={() => openCase(gameCase)}
                >
                  <div className="p-6">
                    <div className="text-6xl mb-4 text-center group-hover:animate-case-shake">
                      {gameCase.image}
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2 text-glow">
                      {gameCase.name}
                    </h3>
                    <div className="flex justify-center mb-4">
                      <Badge className="clip-corner bg-primary text-primary-foreground font-bold text-lg px-4 py-1">
                        {gameCase.price} ₽
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {gameCase.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-2 rounded bg-gradient-to-r ${rarityColors[item.rarity]} bg-opacity-20`}
                        >
                          <span className="text-xs flex items-center gap-2">
                            <span>{item.image}</span>
                            {item.name}
                          </span>
                          <span className="text-xs font-bold">{item.value} ₽</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top">
            <Card className="p-6 bg-card/80 backdrop-blur-sm clip-corner border-primary/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon name="Trophy" className="text-primary" size={32} />
                ТОП ИГРОКОВ
              </h2>
              <div className="space-y-4">
                {mockTopPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-4 rounded-lg clip-corner ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 glow-cyan'
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-400/30'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-700/20 to-orange-800/20 border border-orange-700/30'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-primary w-8">#{index + 1}</div>
                      <div className="text-4xl">{player.avatar}</div>
                      <div>
                        <p className="font-bold text-lg">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Открыто кейсов: {player.casesOpened}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{player.totalWon.toLocaleString()} ₽</p>
                      <p className="text-sm text-muted-foreground">выиграно</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm clip-corner border-primary/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="User" className="text-primary" size={32} />
                  МОЙ ПРОФИЛЬ
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Баланс</span>
                    <span className="text-2xl font-bold text-primary">{userBalance} ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Открыто кейсов</span>
                    <span className="text-2xl font-bold">{openHistory.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Всего выиграно</span>
                    <span className="text-2xl font-bold text-green-500">
                      {openHistory.reduce((sum, item) => sum + item.value, 0)} ₽
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button className="w-full clip-corner glow-cyan font-bold" size="lg">
                    <Icon name="Plus" className="mr-2" size={20} />
                    ПОПОЛНИТЬ БАЛАНС
                  </Button>
                  <Button variant="outline" className="w-full clip-corner font-bold" size="lg">
                    <Icon name="ArrowDownToLine" className="mr-2" size={20} />
                    ВЫВЕСТИ СРЕДСТВА
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm clip-corner border-primary/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="History" className="text-primary" size={32} />
                  ИСТОРИЯ ОТКРЫТИЙ
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {openHistory.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Вы еще не открывали кейсы
                    </p>
                  ) : (
                    openHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r ${rarityColors[item.rarity]} bg-opacity-20 animate-slide-up`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.image}</span>
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <Badge className="text-xs mt-1">{item.rarity}</Badge>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-primary">+{item.value} ₽</span>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <Card className="p-6 bg-card/80 backdrop-blur-sm clip-corner border-primary/30 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon name="MessageCircle" className="text-primary" size={32} />
                СЛУЖБА ПОДДЕРЖКИ
              </h2>
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg clip-corner">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span>📧</span> Email
                  </h3>
                  <p className="text-muted-foreground">support@cybercases.com</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg clip-corner">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span>💬</span> Telegram
                  </h3>
                  <p className="text-muted-foreground">@cybercases_support</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg clip-corner">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span>🕐</span> Режим работы
                  </h3>
                  <p className="text-muted-foreground">24/7 онлайн поддержка</p>
                </div>
                <Button className="w-full clip-corner glow-cyan font-bold" size="lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  НАПИСАТЬ В ПОДДЕРЖКУ
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {isOpening && selectedCase && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-center animate-slide-up">
            <div className="text-9xl mb-8 animate-spin-slow">{selectedCase.image}</div>
            <h2 className="text-4xl font-bold mb-4 text-glow">ОТКРЫВАЕМ КЕЙС...</h2>
            <Progress value={66} className="w-64 mx-auto h-3 glow-cyan" />
          </div>
        </div>
      )}

      {wonItem && !isOpening && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <Card className="p-8 max-w-md w-full clip-corner border-4 border-primary glow-cyan animate-slide-up">
            <div className="text-center">
              <div className={`text-8xl mb-6 animate-pulse-glow`}>{wonItem.image}</div>
              <h2 className="text-3xl font-bold mb-4 text-glow">ПОЗДРАВЛЯЕМ!</h2>
              <p className="text-xl mb-2">{wonItem.name}</p>
              <Badge className={`text-lg px-4 py-2 mb-4 bg-gradient-to-r ${rarityColors[wonItem.rarity]}`}>
                {wonItem.rarity}
              </Badge>
              <p className="text-4xl font-bold text-primary mb-6">+{wonItem.value} ₽</p>
              <Button
                onClick={() => {
                  setWonItem(null);
                  setSelectedCase(null);
                }}
                className="w-full clip-corner glow-cyan font-bold"
                size="lg"
              >
                ОТЛИЧНО!
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Index;
