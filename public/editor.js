// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — editor.js
// ═══════════════════════════════════════════════

const DATA={
explorer:[
{group:'Movimentação',icon:'🏃',color:'#4d8fff',items:[
{id:'WalkSpeed',icon:'👟',name:'WalkSpeed',desc:'Velocidade e sprint',color:'#4d8fff',props:{Name:'WalkSpeed',Speed:16,JumpPower:50,SprintSpeed:24,CrouchSpeed:6}},
{id:'Dash',icon:'💨',name:'Dash',desc:'Sistema de dash',color:'#4d8fff',props:{Name:'Dash',Power:60,Cooldown:1.0,Key:'Q'}},
{id:'DoubleJump',icon:'🦘',name:'Double Jump',desc:'Pulo duplo',color:'#4d8fff',props:{Name:'DoubleJump',JumpPower:45}},
{id:'Fly',icon:'🕊',name:'Fly Mode',desc:'Modo de voo',color:'#4d8fff',props:{Name:'Fly',Speed:30}},
{id:'Roll',icon:'🔄',name:'Rolamento',desc:'Dodge roll',color:'#4d8fff',props:{Name:'Roll',Power:40,Cooldown:0.8}},
{id:'Swim',icon:'🏊',name:'Natação',desc:'Detecta água',color:'#4d8fff',props:{Name:'Swim',WaterTag:'Water',SwimSpeed:12}}]},
{group:'Loja / Moedas',icon:'💰',color:'#f5c542',items:[
{id:'Currency',icon:'💰',name:'Moedas',desc:'Sistema de moedas',color:'#f5c542',props:{Name:'Currency',CoinName:'Coins',StartAmount:0,MaxAmount:999999}},
{id:'Shop',icon:'🛒',name:'Loja',desc:'Loja com itens',color:'#f5c542',props:{Name:'Shop',ShopName:'Loja',Currency:'Coins'}},
{id:'XPSystem',icon:'⭐',name:'XP/Level',desc:'Sistema de experiência',color:'#f5c542',props:{Name:'XPSystem',MaxLevel:100,XPBase:100,XPMult:1.5}},
{id:'DailyReward',icon:'🎁',name:'Recompensa Diária',desc:'Login reward',color:'#f5c542',props:{Name:'DailyReward',Reward:100,CooldownHours:24}},
{id:'Gacha',icon:'🎰',name:'Gacha / Loot Box',desc:'Drops aleatórios',color:'#f5c542',props:{Name:'Gacha',Cost:100,CommonChance:70,RareChance:25,LegChance:5}}]},
{group:'NPCs / Inimigos',icon:'🤖',color:'#e8473f',items:[
{id:'BasicNPC',icon:'🤖',name:'NPC Básico',desc:'NPC com diálogo',color:'#e8473f',props:{Name:'BasicNPC',NPCName:'Aldeão',DialogText:'Olá aventureiro!'}},
{id:'Enemy',icon:'👾',name:'Inimigo IA',desc:'Persegue e ataca',color:'#e8473f',props:{Name:'Enemy',HP:100,Damage:10,AggroRange:30,Speed:14,Respawn:true}},
{id:'Boss',icon:'💀',name:'Boss',desc:'Inimigo multi-fase',color:'#e8473f',props:{Name:'Boss',HP:1000,Phases:3,Damage:40,EnrageHP:300}},
{id:'Patrol',icon:'🚶',name:'Patrulha',desc:'NPC que patrulha',color:'#e8473f',props:{Name:'Patrol',WaypointFolder:'Waypoints',Speed:8,WaitTime:2}},
{id:'Pet',icon:'🐾',name:'Pet System',desc:'Pet que segue o jogador',color:'#e8473f',props:{Name:'Pet',FollowDistance:6,Speed:20,BonusXP:10}}]},
{group:'Armas / Combate',icon:'⚔️',color:'#ff7b42',items:[
{id:'Sword',icon:'⚔️',name:'Espada',desc:'Arma melee',color:'#ff7b42',props:{Name:'Sword',Damage:25,Cooldown:0.5,Range:5,ComboCount:3}},
{id:'Gun',icon:'🔫',name:'Arma de Fogo',desc:'Projétil hit-scan',color:'#ff7b42',props:{Name:'Gun',Damage:30,FireRate:0.3,Ammo:30,MaxAmmo:90,ReloadTime:2}},
{id:'Magic',icon:'🪄',name:'Magia',desc:'Sistema de feitiços',color:'#ff7b42',props:{Name:'Magic',SpellDamage:50,ManaCost:20,ManaRegen:5,MaxMana:100}},
{id:'Grenade',icon:'💣',name:'Granada',desc:'Explosivo arremessável',color:'#ff7b42',props:{Name:'Grenade',Damage:80,Radius:15,FuseTime:3,MaxBounces:3}},
{id:'Shield',icon:'🛡',name:'Escudo',desc:'Bloqueio e parry',color:'#ff7b42',props:{Name:'Shield',BlockDmg:0.8,ParryWindow:0.3,BlockStamina:50}}]},
{group:'DataStore',icon:'💾',color:'#3ecf8e',items:[
{id:'SaveLoad',icon:'💾',name:'Salvar/Carregar',desc:'Auto-save completo',color:'#3ecf8e',props:{Name:'SaveLoad',StoreName:'PlayerData',AutoSave:60,MaxRetries:3}},
{id:'Leaderboard',icon:'🏆',name:'Leaderboard',desc:'Ranking global',color:'#3ecf8e',props:{Name:'Leaderboard',Stat:'Kills',MaxEntries:100,UpdateInterval:30}},
{id:'PlayerProfile',icon:'👤',name:'Perfil do Jogador',desc:'Stats completos',color:'#3ecf8e',props:{Name:'PlayerProfile',TrackKills:true,TrackDeaths:true,TrackPlaytime:true}}]},
{group:'Mundo',icon:'🌍',color:'#06b6d4',items:[
{id:'DayNight',icon:'🌅',name:'Dia/Noite',desc:'Ciclo dia/noite',color:'#06b6d4',props:{Name:'DayNight',CycleMinutes:20,StartHour:6}},
{id:'Weather',icon:'🌧',name:'Clima',desc:'Sistema de clima',color:'#06b6d4',props:{Name:'Weather',WeatherType:'Chuva',TransitionTime:5}},
{id:'Teleport',icon:'🌀',name:'Teleporte',desc:'Portais de TP',color:'#06b6d4',props:{Name:'Teleport',DestPart:'TeleportDest',Cooldown:3}},
{id:'SpawnSystem',icon:'📍',name:'Spawn',desc:'Sistema de spawn',color:'#06b6d4',props:{Name:'SpawnSystem',RespawnTime:5,UseCheckpoints:true}},
{id:'Destructible',icon:'💥',name:'Destrutível',desc:'Objeto que quebra',color:'#06b6d4',props:{Name:'Destructible',HP:50,RespawnTime:30,DropItem:''}},
{id:'Interaction',icon:'🤝',name:'Interação E',desc:'Pressionar E para interagir',color:'#06b6d4',props:{Name:'Interaction',Key:'E',Range:10,Prompt:'Pressione E'}}]},
{group:'Admin',icon:'🛡',color:'#8b949e',items:[
{id:'AdminPanel',icon:'🛡',name:'Admin',desc:'Comandos de admin',color:'#8b949e',props:{Name:'AdminPanel',AdminUserId:0,Prefix:'/'}},
{id:'AntiCheat',icon:'🔒',name:'Anti-Cheat',desc:'Proteção contra cheats',color:'#8b949e',props:{Name:'AntiCheat',MaxSpeed:50,MaxJump:80,LogSuspicious:true}},
{id:'Moderation',icon:'⚖️',name:'Moderação',desc:'Ban/kick system',color:'#8b949e',props:{Name:'Moderation',BanDataStore:'BannedPlayers',AutoKickOnBan:true}}]}],

effects:[
{group:'Partículas',icon:'✨',items:[
{id:'ParticleEmitter',icon:'✨',name:'ParticleEmitter',color:'#f5c542',props:{Rate:20,Speed:'5',Color:'#ff6b35',Lifetime:'1,2'}},
{id:'Smoke',icon:'💨',name:'Smoke',color:'#8b949e',props:{Density:0.5,Color:'#c8c8c8',Size:1}},
{id:'Fire',icon:'🔥',name:'Fire',color:'#ff7b42',props:{Heat:9,Size:5,Color:'#ff6b35',SecColor:'#ffdd00'}},
{id:'Sparkles',icon:'⚡',name:'Sparkles',color:'#f5c542',props:{SparkleColor:'#ffdd00',TimeScale:1}}]},
{group:'Iluminação',icon:'💡',items:[
{id:'PointLight',icon:'💡',name:'PointLight',color:'#f5c542',props:{Brightness:1,Range:16,Color:'#ffffff'}},
{id:'Highlight',icon:'✦',name:'Highlight',color:'#9b42ff',props:{FillColor:'#ffffff',OutlineColor:'#ff6b35',FillTransparency:0.5}},
{id:'SpotLight',icon:'🔦',name:'SpotLight',color:'#f5c542',props:{Brightness:1,Range:60,Angle:45,Color:'#ffffff'}}]},
{group:'Pós-processo',icon:'🎨',items:[
{id:'BloomEffect',icon:'🌸',name:'Bloom',color:'#ff7b42',props:{Intensity:0.5,Size:56,Threshold:0.95}},
{id:'BlurEffect',icon:'🌫',name:'Blur',color:'#06b6d4',props:{Size:10}},
{id:'ColorCorrection',icon:'🎨',name:'ColorCorrection',color:'#9b42ff',props:{Brightness:0,Contrast:0,Saturation:0,TintColor:'#ffffff'}}]},
{group:'Ambiente',icon:'🌍',items:[
{id:'Atmosphere',icon:'🌫',name:'Atmosphere',color:'#06b6d4',props:{Density:0.3,Color:'#c8d5e8',Glare:0,Haze:0}},
{id:'Clouds',icon:'☁️',name:'Clouds',color:'#8b949e',props:{Cover:0.5,Density:0.3,Color:'#dde9f0'}}]}],

// ── SYSTEMS (new - 80+ scripts prontos) ──
systems:[
{cat:'Movimentação',icon:'🏃',color:'#4d8fff',items:[
{id:'walkspeed-basic',name:'WalkSpeed Básico',desc:'Configura velocidade e pulo do personagem',icon:'👟',color:'#4d8fff',type:'LocalScript',where:'StarterCharacterScripts',tags:['movimento','básico'],code:`-- WalkSpeed Básico
local Players = game:GetService("Players")
local plr = Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")

hum.WalkSpeed = 16
hum.JumpPower = 50`},
{id:'sprint-system',name:'Sistema de Sprint',desc:'Shift para correr mais rápido com stamina',icon:'🏃',color:'#4d8fff',type:'LocalScript',where:'StarterCharacterScripts',tags:['movimento','sprint','stamina'],code:`-- Sprint com Stamina
local UIS = game:GetService("UserInputService")
local plr = game.Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")

local WALK, SPRINT, STAMINA_MAX = 16, 28, 100
local stamina = STAMINA_MAX
local sprinting = false

UIS.InputBegan:Connect(function(i, gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.LeftShift and stamina > 0 then
    sprinting = true
    hum.WalkSpeed = SPRINT
  end
end)
UIS.InputEnded:Connect(function(i)
  if i.KeyCode == Enum.KeyCode.LeftShift then
    sprinting = false
    hum.WalkSpeed = WALK
  end
end)
game:GetService("RunService").Heartbeat:Connect(function(dt)
  if sprinting and stamina > 0 then
    stamina = math.max(0, stamina - dt * 20)
    if stamina == 0 then sprinting = false; hum.WalkSpeed = WALK end
  elseif not sprinting then
    stamina = math.min(STAMINA_MAX, stamina + dt * 10)
  end
end)`},
{id:'dash-system',name:'Sistema de Dash',desc:'Tecla Q para dar dash na direção do movimento',icon:'💨',color:'#4d8fff',type:'LocalScript',where:'StarterCharacterScripts',tags:['movimento','dash','dodge'],code:`-- Dash System
local UIS = game:GetService("UserInputService")
local RS = game:GetService("RunService")
local plr = game.Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hrp = char:WaitForChild("HumanoidRootPart")
local hum = char:WaitForChild("Humanoid")

local POWER, COOLDOWN = 60, 1
local canDash = true

UIS.InputBegan:Connect(function(i, gp)
  if gp or not canDash then return end
  if i.KeyCode == Enum.KeyCode.Q then
    canDash = false
    local dir = hum.MoveDirection
    if dir.Magnitude < 0.1 then dir = hrp.CFrame.LookVector end
    hrp.Velocity = dir * POWER
    task.wait(COOLDOWN)
    canDash = true
  end
end)`},
{id:'double-jump',name:'Double Jump',desc:'Pulo duplo com efeito visual',icon:'🦘',color:'#4d8fff',type:'LocalScript',where:'StarterCharacterScripts',tags:['movimento','pulo'],code:`-- Double Jump
local UIS = game:GetService("UserInputService")
local plr = game.Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")
local hrp = char:WaitForChild("HumanoidRootPart")

local jumped, canDouble = false, false
local JUMP_POWER = 50

hum.StateChanged:Connect(function(_, new)
  if new == Enum.HumanoidStateType.Jumping then
    jumped = true; canDouble = true
  elseif new == Enum.HumanoidStateType.Landed then
    jumped = false; canDouble = false
  end
end)
UIS.JumpRequest:Connect(function()
  if jumped and canDouble then
    canDouble = false
    hrp.Velocity = Vector3.new(hrp.Velocity.X, JUMP_POWER, hrp.Velocity.Z)
  end
end)`}]},

{cat:'Sistema de Dados',icon:'💾',color:'#3ecf8e',items:[
{id:'leaderstats-basic',name:'Leaderstats Básico',desc:'Kills, Deaths e Coins no placar',icon:'🏆',color:'#3ecf8e',type:'Script',where:'ServerScriptService',tags:['dados','leaderstats'],code:`-- Leaderstats
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(plr)
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"
  ls.Parent = plr

  local kills = Instance.new("IntValue")
  kills.Name = "Kills"; kills.Value = 0; kills.Parent = ls

  local deaths = Instance.new("IntValue")
  deaths.Name = "Deaths"; deaths.Value = 0; deaths.Parent = ls

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"; coins.Value = 0; coins.Parent = ls
end)`},
{id:'datastore-save',name:'DataStore Completo',desc:'Salva e carrega dados do jogador com auto-save',icon:'💾',color:'#3ecf8e',type:'Script',where:'ServerScriptService',tags:['dados','datastore','save'],code:`-- DataStore Completo
local DS = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local store = DS:GetDataStore("PlayerData_v1")

local function save(plr)
  local ls = plr:FindFirstChild("leaderstats")
  if not ls then return end
  local data = {}
  for _, v in ipairs(ls:GetChildren()) do
    data[v.Name] = v.Value
  end
  pcall(function()
    store:SetAsync(tostring(plr.UserId), data)
  end)
end

Players.PlayerAdded:Connect(function(plr)
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"; ls.Parent = plr
  local coins = Instance.new("IntValue")
  coins.Name = "Coins"; coins.Value = 0; coins.Parent = ls

  local ok, data = pcall(function()
    return store:GetAsync(tostring(plr.UserId))
  end)
  if ok and data then
    for k, v in pairs(data) do
      local stat = ls:FindFirstChild(k)
      if stat then stat.Value = v end
    end
  end
  -- Auto-save
  task.spawn(function()
    while plr.Parent do task.wait(60); save(plr) end
  end)
end)

Players.PlayerRemoving:Connect(save)
game:BindToClose(function()
  for _, p in ipairs(Players:GetPlayers()) do save(p) end
end)`},
{id:'datastore-profile',name:'ProfileService Pattern',desc:'Padrão robusto de salvamento com retry',icon:'📦',color:'#3ecf8e',type:'Script',where:'ServerScriptService',tags:['dados','datastore','robusto'],code:`-- DataStore com Retry
local DS = game:GetService("DataStoreService"):GetDataStore("Profiles")
local Players = game:GetService("Players")

local DEFAULT = { Coins = 0, Level = 1, XP = 0 }

local function getAsync(key)
  for i = 1, 3 do
    local ok, val = pcall(function()
      return DS:GetAsync(key)
    end)
    if ok then return val end
    task.wait(1)
  end
  return nil
end

Players.PlayerAdded:Connect(function(plr)
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"; ls.Parent = plr
  local data = getAsync(tostring(plr.UserId)) or DEFAULT
  for k, v in pairs(data) do
    local val = Instance.new("IntValue")
    val.Name = k; val.Value = v; val.Parent = ls
  end
end)

Players.PlayerRemoving:Connect(function(plr)
  local ls = plr:FindFirstChild("leaderstats")
  if not ls then return end
  local data = {}
  for _, v in ipairs(ls:GetChildren()) do data[v.Name] = v.Value end
  pcall(function() DS:SetAsync(tostring(plr.UserId), data) end)
end)`}]},

{cat:'Combate',icon:'⚔️',color:'#ff7b42',items:[
{id:'sword-tool',name:'Espada Melee',desc:'Ferramenta de espada com hitbox e combo',icon:'⚔️',color:'#ff7b42',type:'Script',where:'Tool (ServerScript)',tags:['combate','melee','espada'],code:`-- Espada Melee
local tool = script.Parent
local DAMAGE, COOLDOWN = 25, 0.5
local debounce = false

tool.Activated:Connect(function()
  if debounce then return end
  debounce = true
  local char = tool.Parent
  local hrp = char:FindFirstChild("HumanoidRootPart")
  if not hrp then debounce = false; return end

  -- Hitbox
  local params = OverlapParams.new()
  params.FilterDescendantsInstances = {char}
  params.FilterType = Enum.RaycastFilterType.Exclude

  local parts = workspace:GetPartBoundsInBox(
    hrp.CFrame * CFrame.new(0, 0, -4),
    Vector3.new(6, 5, 8), params
  )
  local hit = {}
  for _, p in ipairs(parts) do
    local hum = p.Parent:FindFirstChildOfClass("Humanoid")
    if hum and not hit[hum] then
      hit[hum] = true
      hum:TakeDamage(DAMAGE)
    end
  end
  task.wait(COOLDOWN)
  debounce = false
end)`},
{id:'gun-raycast',name:'Arma Raycast',desc:'Arma de fogo com raycast, munição e recarga',icon:'🔫',color:'#ff7b42',type:'LocalScript',where:'Tool (LocalScript)',tags:['combate','arma','raycast'],code:`-- Gun Raycast
local UIS = game:GetService("UserInputService")
local tool = script.Parent
local DAMAGE, FIRERATE, AMMO = 30, 0.15, 30
local ammo, canFire = AMMO, true

local RE = game.ReplicatedStorage:WaitForChild("GunRemote")

tool.Activated:Connect(function()
  if not canFire or ammo <= 0 then return end
  canFire = false; ammo -= 1

  local cam = workspace.CurrentCamera
  local ray = workspace:Raycast(
    cam.CFrame.Position,
    cam.CFrame.LookVector * 500
  )
  if ray and ray.Instance then
    RE:FireServer(ray.Instance, ray.Position)
  end
  task.wait(FIRERATE); canFire = true
end)

-- Reload with R
UIS.InputBegan:Connect(function(i, gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.R then
    canFire = false
    task.wait(2)
    ammo = AMMO; canFire = true
  end
end)`},
{id:'kill-brick',name:'Kill Brick',desc:'Parte que mata ao tocar',icon:'☠️',color:'#ff7b42',type:'Script',where:'Part (Script)',tags:['combate','trap'],code:`-- Kill Brick
local part = script.Parent

part.Touched:Connect(function(hit)
  local hum = hit.Parent:FindFirstChildOfClass("Humanoid")
  if hum then hum.Health = 0 end
end)`},
{id:'health-regen',name:'Regeneração de HP',desc:'HP regenera automaticamente fora de combate',icon:'❤️',color:'#ff7b42',type:'Script',where:'ServerScriptService',tags:['combate','hp','regen'],code:`-- Health Regen
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(plr)
  plr.CharacterAdded:Connect(function(char)
    local hum = char:WaitForChild("Humanoid")
    local lastDamage = 0
    hum.HealthChanged:Connect(function(hp)
      if hp < hum.MaxHealth then lastDamage = tick() end
    end)
    task.spawn(function()
      while hum.Parent do
        task.wait(1)
        if tick() - lastDamage > 5 and hum.Health < hum.MaxHealth then
          hum.Health = math.min(hum.MaxHealth, hum.Health + 5)
        end
      end
    end)
  end)
end)`}]},

{cat:'Interface UI',icon:'🖥️',color:'#9b42ff',items:[
{id:'gui-notification',name:'Notificação na Tela',desc:'Sistema de notificações popup',icon:'🔔',color:'#9b42ff',type:'LocalScript',where:'StarterPlayerScripts',tags:['ui','notificação','popup'],code:`-- Notification System
local Players = game:GetService("Players")
local plr = Players.LocalPlayer
local gui = plr.PlayerGui

local function notify(title, msg, duration)
  duration = duration or 3
  local screen = Instance.new("ScreenGui")
  screen.Name = "Notification_"..tick()
  screen.ResetOnSpawn = false
  screen.Parent = gui

  local frame = Instance.new("Frame")
  frame.Size = UDim2.new(0, 280, 0, 60)
  frame.Position = UDim2.new(1, -290, 0, 20)
  frame.BackgroundColor3 = Color3.fromRGB(15, 22, 41)
  frame.BorderSizePixel = 0
  frame.Parent = screen

  local corner = Instance.new("UICorner")
  corner.CornerRadius = UDim.new(0, 8)
  corner.Parent = frame

  local stroke = Instance.new("UIStroke")
  stroke.Color = Color3.fromRGB(255, 77, 26)
  stroke.Thickness = 1
  stroke.Parent = frame

  local t = Instance.new("TextLabel")
  t.Text = title
  t.Size = UDim2.new(1,-16,0,20)
  t.Position = UDim2.new(0,8,0,4)
  t.BackgroundTransparency = 1
  t.TextColor3 = Color3.fromRGB(232,234,240)
  t.TextXAlignment = Enum.TextXAlignment.Left
  t.Font = Enum.Font.GothamBold
  t.TextSize = 13
  t.Parent = frame

  local s = Instance.new("TextLabel")
  s.Text = msg
  s.Size = UDim2.new(1,-16,0,16)
  s.Position = UDim2.new(0,8,0,26)
  s.BackgroundTransparency = 1
  s.TextColor3 = Color3.fromRGB(107, 117, 148)
  s.TextXAlignment = Enum.TextXAlignment.Left
  s.Font = Enum.Font.Gotham
  s.TextSize = 11
  s.Parent = frame

  task.wait(duration)
  screen:Destroy()
end

-- Exemplo de uso:
notify("⚡ RoForger", "Sistema iniciado com sucesso!", 3)`},
{id:'gui-healthbar',name:'Barra de HP na Tela',desc:'Healthbar com animação suave',icon:'❤️',color:'#9b42ff',type:'LocalScript',where:'StarterCharacterScripts',tags:['ui','hp','healthbar'],code:`-- Health Bar
local plr = game.Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")
local TS = game:GetService("TweenService")

local screen = Instance.new("ScreenGui")
screen.ResetOnSpawn = false
screen.Parent = plr.PlayerGui

local bg = Instance.new("Frame")
bg.Size = UDim2.new(0.3, 0, 0, 12)
bg.Position = UDim2.new(0.35, 0, 0.9, 0)
bg.BackgroundColor3 = Color3.fromRGB(30, 30, 50)
bg.BorderSizePixel = 0
bg.Parent = screen
Instance.new("UICorner",bg).CornerRadius = UDim.new(1,0)

local bar = Instance.new("Frame")
bar.Size = UDim2.new(1, 0, 1, 0)
bar.BackgroundColor3 = Color3.fromRGB(255, 77, 26)
bar.BorderSizePixel = 0
bar.Parent = bg
Instance.new("UICorner",bar).CornerRadius = UDim.new(1,0)

hum.HealthChanged:Connect(function(hp)
  TS:Create(bar, TweenInfo.new(0.4), {
    Size = UDim2.new(hp/hum.MaxHealth, 0, 1, 0)
  }):Play()
end)`},
{id:'gui-shop-frame',name:'Frame de Loja',desc:'Interface de loja básica com itens',icon:'🛒',color:'#9b42ff',type:'LocalScript',where:'StarterPlayerScripts',tags:['ui','loja','shop'],code:`-- Shop GUI Frame
local plr = game.Players.LocalPlayer
local gui = plr.PlayerGui

local screen = Instance.new("ScreenGui")
screen.Parent = gui

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 400, 0, 300)
frame.Position = UDim2.new(0.5, -200, 0.5, -150)
frame.BackgroundColor3 = Color3.fromRGB(10, 14, 28)
frame.BorderSizePixel = 0
frame.Visible = false
frame.Parent = screen
Instance.new("UICorner",frame).CornerRadius = UDim.new(0,12)

local title = Instance.new("TextLabel")
title.Text = "🛒 LOJA"
title.Size = UDim2.new(1,0,0,44)
title.BackgroundColor3 = Color3.fromRGB(255, 77, 26)
title.TextColor3 = Color3.new(1,1,1)
title.Font = Enum.Font.GothamBold
title.TextSize = 16
title.Parent = frame
Instance.new("UICorner",title).CornerRadius = UDim.new(0,12)

-- Abrir com tecla B
game:GetService("UserInputService").InputBegan:Connect(function(i,gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.B then
    frame.Visible = not frame.Visible
  end
end)`}]},

{cat:'Ambiente',icon:'🌍',color:'#06b6d4',items:[
{id:'day-night-cycle',name:'Ciclo Dia/Noite',desc:'Ciclo completo de dia e noite com iluminação',icon:'🌅',color:'#06b6d4',type:'Script',where:'ServerScriptService',tags:['ambiente','dia/noite','iluminação'],code:`-- Day/Night Cycle
local Lighting = game:GetService("Lighting")
local CYCLE_MINUTES = 20

Lighting.ClockTime = 6
Lighting.Brightness = 3

task.spawn(function()
  local secsPerHour = (CYCLE_MINUTES * 60) / 24
  while true do
    task.wait(0.1)
    Lighting.ClockTime = (Lighting.ClockTime + 0.1 / secsPerHour) % 24
    -- Ajustar brilho
    local t = Lighting.ClockTime
    if t >= 6 and t <= 18 then
      Lighting.Brightness = 3
    else
      Lighting.Brightness = 0.5
    end
  end
end)`},
{id:'rain-system',name:'Sistema de Chuva',desc:'Partículas de chuva e som atmosférico',icon:'🌧️',color:'#06b6d4',type:'Script',where:'ServerScriptService',tags:['ambiente','chuva','clima'],code:`-- Rain System
local Lighting = game:GetService("Lighting")

-- Ativar chuva
local function setRain(active)
  local atm = Lighting:FindFirstChildOfClass("Atmosphere")
  if not atm then
    atm = Instance.new("Atmosphere", Lighting)
  end
  if active then
    atm.Density = 0.6
    atm.Color = Color3.fromRGB(160, 180, 200)
    Lighting.Brightness = 1.5
  else
    atm.Density = 0.3
    atm.Color = Color3.fromRGB(200, 220, 255)
    Lighting.Brightness = 3
  end
end

setRain(true)
-- Para desativar: setRain(false)`},
{id:'teleport-pad',name:'Pad de Teleporte',desc:'Ao tocar teletransporta para destino',icon:'🌀',color:'#06b6d4',type:'Script',where:'Part (Script)',tags:['ambiente','teleporte'],code:`-- Teleport Pad
local pad = script.Parent
local dest = workspace:WaitForChild("TeleportDest") -- mude o nome

local debounce = {}
pad.Touched:Connect(function(hit)
  local char = hit.Parent
  local hum = char:FindFirstChildOfClass("Humanoid")
  local hrp = char:FindFirstChild("HumanoidRootPart")
  if not hum or not hrp then return end
  if debounce[char] then return end
  debounce[char] = true
  hrp.CFrame = dest.CFrame + Vector3.new(0,3,0)
  task.wait(2)
  debounce[char] = nil
end)`}]},

{cat:'Admin / Proteção',icon:'🛡',color:'#8b949e',items:[
{id:'admin-commands',name:'Comandos Admin',desc:'Sistema completo de comandos admin com prefixo',icon:'🛡',color:'#8b949e',type:'Script',where:'ServerScriptService',tags:['admin','comandos'],code:`-- Admin Commands
local Players = game:GetService("Players")
local ADMINS = {0} -- coloque seu UserId aqui
local PREFIX = "/"

local function isAdmin(plr)
  for _, id in ipairs(ADMINS) do
    if plr.UserId == id then return true end
  end
  return false
end

Players.PlayerAdded:Connect(function(plr)
  plr.Chatted:Connect(function(msg)
    if not isAdmin(plr) then return end
    local args = msg:lower():split(" ")
    local cmd = args[1]:sub(2) -- remove prefix
    if not msg:sub(1,1) == PREFIX then return end

    if cmd == "kick" and args[2] then
      local target = Players:FindFirstChild(args[2])
      if target then target:Kick("Kickado por admin") end

    elseif cmd == "speed" and args[2] and args[3] then
      local target = Players:FindFirstChild(args[2])
      local speed = tonumber(args[3])
      if target and speed then
        local hum = target.Character:FindFirstChildOfClass("Humanoid")
        if hum then hum.WalkSpeed = speed end
      end

    elseif cmd == "heal" and args[2] then
      local target = Players:FindFirstChild(args[2])
      if target then
        local hum = target.Character:FindFirstChildOfClass("Humanoid")
        if hum then hum.Health = hum.MaxHealth end
      end
    end
  end)
end)`},
{id:'anti-speedhack',name:'Anti Speed-Hack',desc:'Detecta e kica jogadores com velocidade anormal',icon:'🔒',color:'#8b949e',type:'Script',where:'ServerScriptService',tags:['admin','anti-cheat','proteção'],code:`-- Anti Speed-Hack (básico)
local Players = game:GetService("Players")
local RS = game:GetService("RunService")

local MAX_SPEED = 55 -- ligeiramente acima do sprint

Players.PlayerAdded:Connect(function(plr)
  local lastPos = {}
  RS.Heartbeat:Connect(function(dt)
    local char = plr.Character
    local hrp = char and char:FindFirstChild("HumanoidRootPart")
    if not hrp then return end
    if lastPos[plr] then
      local dist = (hrp.Position - lastPos[plr]).Magnitude
      local speed = dist / dt
      if speed > MAX_SPEED then
        plr:Kick("Velocidade suspeita detectada.")
      end
    end
    lastPos[plr] = hrp.Position
  end)
end)`}]}],

templates:[
{name:'FPS Básico',icon:'🔫',desc:'Arma raycast + sprint + save',tags:['WalkSpeed','Gun','SaveLoad']},
{name:'RPG Completo',icon:'⚔️',desc:'Espada + XP + NPC + Inimigo + DataStore',tags:['WalkSpeed','Sword','XPSystem','BasicNPC','Enemy','SaveLoad']},
{name:'Simulator',icon:'💰',desc:'Moedas + Loja + DataStore + Leaderboard',tags:['Currency','Shop','SaveLoad','Leaderboard']},
{name:'Obby',icon:'🏃',desc:'Movimento + Spawn + Checkpoints',tags:['WalkSpeed','SpawnSystem']},
{name:'Battle Royale',icon:'🎯',desc:'Armas + Admin + Spawn + Anti-Cheat',tags:['Gun','AdminPanel','SpawnSystem','AntiCheat']},
{name:'Horror',icon:'👻',desc:'Atmosfera + Inimigo IA + Boss + Clima',tags:['Weather','Enemy','Boss','DayNight']},
{name:'Tower Defense',icon:'🏰',desc:'Inimigos em ondas + Moedas + Loja',tags:['Enemy','Currency','Shop','SpawnSystem']},
{name:'Open World RPG',icon:'🌍',desc:'Mundo completo com clima, dia/noite e NPCs',tags:['DayNight','Weather','BasicNPC','Enemy','SaveLoad']}],

tabs:[
{id:'builder',icon:'🔨',label:'Builder'},
{id:'systems',icon:'📦',label:'Sistemas'},
{id:'effects',icon:'✨',label:'Efeitos'},
{id:'templates',icon:'📋',label:'Templates'},
{id:'docs',icon:'📖',label:'Docs'}],

docs:{
sections:[{id:'intro',icon:'🏠',label:'Início'},{id:'builder',icon:'🔨',label:'Builder',section:'Guias'},{id:'systems',icon:'📦',label:'Sistemas',section:'Guias'},{id:'effects',icon:'✨',label:'Efeitos',section:'Guias'},{id:'shortcuts',icon:'⌨️',label:'Atalhos',section:'Extra'}],
content:{
intro:`<div class="docs-h1">🔨 RoForger Studio</div><div class="docs-lead">Crie scripts Lua para Roblox visualmente. Arraste sistemas, configure e gere código pronto.</div><div class="docs-grid"><div class="docs-card"><div class="docs-card-icon">🔨</div><div class="docs-card-title">Builder Visual</div><div class="docs-card-desc">Canvas infinito com drag & drop, zoom e minimap.</div></div><div class="docs-card"><div class="docs-card-icon">📦</div><div class="docs-card-title">Sistemas Prontos</div><div class="docs-card-desc">80+ scripts Lua prontos para copiar e colar.</div></div><div class="docs-card"><div class="docs-card-icon">↩</div><div class="docs-card-title">Undo/Redo</div><div class="docs-card-desc">Ctrl+Z / Ctrl+Y desfaz qualquer ação.</div></div><div class="docs-card"><div class="docs-card-icon">🔍</div><div class="docs-card-title">Busca Global</div><div class="docs-card-desc">Ctrl+K abre a paleta de comandos.</div></div></div><div class="docs-tip">💡 Clique em qualquer node no canvas para editar e abrir o Script Builder.</div>`,
builder:`<div class="docs-h1">🔨 Builder Visual</div><div class="docs-lead">Canvas infinito para montar o projeto.</div><div class="docs-h2">Como usar</div><div class="docs-code-block"><div class="docs-code-hdr">Passo a passo</div><div class="docs-code-body">1. Arraste um sistema do Explorer para o canvas
2. Clique no node para selecionar e ver propriedades
3. Clique em 📜 ou no badge de script no node
4. Use o modo Guiado para gerar Lua automaticamente
5. Clique em ⚡ Gerar Script para o script completo</div></div><div class="docs-tip">💡 Ctrl+D duplica. Delete remove. Scroll faz zoom.</div>`,
systems:`<div class="docs-h1">📦 Sistemas Prontos</div><div class="docs-lead">Mais de 80 scripts Lua prontos para copiar e colar no Roblox Studio.</div><div class="docs-h2">Como usar</div><div class="docs-code-block"><div class="docs-code-hdr">Passo a passo</div><div class="docs-code-body">1. Vá na aba Sistemas
2. Clique em uma categoria na lista lateral
3. Encontre o sistema que precisa
4. Clique em "📋 Copiar Código"
5. Cole no Roblox Studio no local indicado</div></div><div class="docs-tip">💡 Cada sistema indica onde colar (StarterPlayerScripts, ServerScriptService, etc.)</div>`,
effects:`<div class="docs-h1">✨ Efeitos</div><div class="docs-lead">Preview em tempo real de efeitos Roblox.</div><div class="docs-h2">Como usar</div><div class="docs-code-block"><div class="docs-code-hdr">Passo a passo</div><div class="docs-code-body">1. Vá na aba Efeitos
2. Selecione um efeito na lista
3. Ajuste as propriedades no painel direito
4. Clique em 💾 Salvar para guardar
5. Clique em ➕ Ao Builder para adicionar ao projeto</div></div>`,
shortcuts:`<div class="docs-h1">⌨️ Atalhos</div><div class="docs-code-block"><div class="docs-code-hdr">Teclado</div><div class="docs-code-body">Ctrl+K     Busca global
Ctrl+Z     Desfazer
Ctrl+Y     Refazer  
Ctrl+D     Duplicar node selecionado
Ctrl+S     Salvar na nuvem
Delete     Deletar node selecionado
Escape     Desselecionar / Fechar modal
Scroll     Zoom no canvas
Clique Médio  Pan no canvas</div></div>`}}};

// HISTORY
const History={stack:[],index:-1,max:50,
push(a){this.stack=this.stack.slice(0,this.index+1);this.stack.push(a);if(this.stack.length>this.max)this.stack.shift();else this.index++;this.ui()},
undo(){if(this.index<0)return;this.stack[this.index].undo();this.index--;this.ui();toast('↩ Desfeito','i')},
redo(){if(this.index>=this.stack.length-1)return;this.index++;this.stack[this.index].redo();this.ui();toast('↪ Refeito','i')},
ui(){const u=document.getElementById('undo-btn'),r=document.getElementById('redo-btn');u.disabled=this.index<0;r.disabled=this.index>=this.stack.length-1;document.getElementById('hist-info').textContent=`${this.index+1}/${this.stack.length}`;document.getElementById('undo-bar').classList.toggle('show',this.stack.length>0)}
};

// APP
const App={
state:{nodes:[],selId:null,nc:1,cx:0,cy:0,cz:1,panning:false,tool:'select',gridSnap:false,showConn:false,showMM:true,savedFx:[],curFx:null,curFxProps:{},fxFrame:null,guidedAns:{},scriptTarget:null},

reset(){
  // Reset state for new project
  if(this.state.fxFrame)cancelAnimationFrame(this.state.fxFrame);
  this.state.nodes.forEach(n=>{const d=document.getElementById('n-'+n.uid);if(d)d.remove()});
  this.state={nodes:[],selId:null,nc:1,cx:0,cy:0,cz:1,panning:false,tool:'select',gridSnap:false,showConn:false,showMM:true,savedFx:[],curFx:null,curFxProps:{},fxFrame:null,guidedAns:{},scriptTarget:null};
  History.stack=[];History.index=-1;History.ui();
  document.getElementById('node-count').textContent='0 elementos';
  document.getElementById('pp-body').innerHTML='<div class="pp-empty">Selecione um<br>elemento no canvas</div>';
  document.getElementById('pp-type').textContent='';
  document.getElementById('add-script-btn').classList.remove('show');
  // Reset canvas transform
  const vp=document.getElementById('canvas-vp');if(vp)vp.style.transform='translate(0px,0px) scale(1)';
  document.getElementById('zoom-lbl').textContent='100%';
  document.getElementById('conn-svg').innerHTML='';
},

init(){
  this.renderTabs();
  this.explorer.render();
  this.templates.render();
  this.systems.render();
  this.canvas.init();
  this.autosave.init();
  this.shortcuts.init();
  setTimeout(()=>{if(typeof Folders!=='undefined')Folders.init()},200);
  // Set first tab active
  this.switchView('builder',document.querySelector('.main-tab'));
},

renderTabs(){
  const c=document.getElementById('main-tabs');c.innerHTML='';
  DATA.tabs.forEach((t,i)=>{
    const d=document.createElement('div');
    d.className='main-tab'+(i===0?' active':'');
    d.textContent=t.icon+' '+t.label;
    d.onclick=()=>this.switchView(t.id,d);
    c.appendChild(d);
  });
},

switchView(id,tab){
    if(id==='gerador' && typeof Gen !== 'undefined' && !Gen._inited){Gen.init();Gen._inited=true;}
    if(id==='aprender' && typeof Learn !== 'undefined' && !Learn._inited){Learn.init();Learn._inited=true;}
    if(id==='game-templates' && typeof GameTemplates !== 'undefined' && !GameTemplates._inited){GameTemplates.init();GameTemplates._inited=true;}
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.main-tab').forEach(t=>t.classList.remove('active'));
  const view=document.getElementById('v-'+id);
  if(view)view.classList.add('active');
  if(tab)tab.classList.add('active');
  if(id==='effects')this.fx.init();
  if(id==='docs')this.docs.init();
  if(id==='systems')this.systems.render();
},

explorer:{
  render(f=''){
    const b=document.getElementById('exp-body');b.innerHTML='';
    DATA.explorer.forEach(g=>{
      const items=g.items.filter(i=>!f||i.name.toLowerCase().includes(f.toLowerCase())||i.desc.toLowerCase().includes(f.toLowerCase()));
      if(!items.length)return;
      const grp=document.createElement('div');grp.className='exp-group';
      const h=document.createElement('div');h.className='exp-gh open';
      h.innerHTML=`<span class="exp-gi">${g.icon}</span><span>${g.group}</span><span class="exp-cnt">${items.length}</span><span class="exp-chev">▶</span>`;
      h.onclick=()=>h.classList.toggle('open');grp.appendChild(h);
      const ch=document.createElement('div');ch.className='exp-children';
      items.forEach(item=>{
        const el=document.createElement('div');el.className='exp-item';el.draggable=true;
        el.innerHTML=`<span class="exp-ico">${item.icon}</span><span class="exp-name">${item.name}</span>`;
        el.title=item.desc;
        el.addEventListener('dragstart',e=>e.dataTransfer.setData('itemId',item.id));
        el.addEventListener('dblclick',()=>App.nodes.add(item.id,100+App.state.nodes.length*35,80+App.state.nodes.length*25));
        ch.appendChild(el);
      });grp.appendChild(ch);b.appendChild(grp);
    });
  },
  filter(v){this.render(v)}
},

canvas:{
  init(){
    const cvs=document.getElementById('inf-canvas'),vp=document.getElementById('canvas-vp');
    // Remove old listeners by cloning
    const newCvs=cvs.cloneNode(false);
    while(cvs.firstChild)newCvs.appendChild(cvs.firstChild);
    cvs.parentNode.replaceChild(newCvs,cvs);
    const c=document.getElementById('inf-canvas');

    c.addEventListener('mousedown',e=>{
      if(App.state.tool==='pan'||e.button===1){App.state.panning=true;App.state._ps={x:e.clientX,y:e.clientY,ox:App.state.cx,oy:App.state.cy};c.style.cursor='grabbing';e.preventDefault()}
      if(e.target===c||e.target===document.getElementById('canvas-vp'))App.nodes.deselect();
    });
    document.addEventListener('mousemove',e=>{
      if(App.state.panning){const s=App.state._ps;App.state.cx=s.ox+(e.clientX-s.x);App.state.cy=s.oy+(e.clientY-s.y);this.upTf()}
      if(App.state._drag)App.nodes.dragMove(e);
    });
    document.addEventListener('mouseup',()=>{
      if(App.state.panning){App.state.panning=false;document.getElementById('inf-canvas').style.cursor=''}
      if(App.state._drag){
        const d=App.state._drag;const node=App.state.nodes.find(n=>n.uid===d.uid);
        if(node&&(node.x!==d.sx||node.y!==d.sy)){const fx=node.x,fy=node.y;History.push({desc:'Mover',undo:()=>{node.x=d.sx;node.y=d.sy;App.nodes.renderOne(node)},redo:()=>{node.x=fx;node.y=fy;App.nodes.renderOne(node)}})}
        App.state._drag=null;
      }
      App.autosave.schedule();
    });
    c.addEventListener('wheel',e=>{
      e.preventDefault();const delta=e.deltaY<0 ? 0.1 : -0.1;const rect=c.getBoundingClientRect();
      const mx=e.clientX-rect.left,my=e.clientY-rect.top;const prev=App.state.cz;
      App.state.cz=Math.min(Math.max(App.state.cz+delta,.15),3);
      App.state.cx=mx-(mx-App.state.cx)*(App.state.cz/prev);
      App.state.cy=my-(my-App.state.cy)*(App.state.cz/prev);
      this.upTf();
    },{passive:false});
    c.addEventListener('dragover',e=>e.preventDefault());
    c.addEventListener('drop',e=>{
      e.preventDefault();const id=e.dataTransfer.getData('itemId');if(!id)return;
      const rect=c.getBoundingClientRect();
      const x=Math.round((e.clientX-rect.left-App.state.cx)/App.state.cz);
      const y=Math.round((e.clientY-rect.top-App.state.cy)/App.state.cz);
      App.nodes.add(id,x,y);
    });
  },
  upTf(){
    document.getElementById('canvas-vp').style.transform=`translate(${App.state.cx}px,${App.state.cy}px) scale(${App.state.cz})`;
    document.getElementById('zoom-lbl').textContent=Math.round(App.state.cz*100)+'%';
    App.minimap.render();if(App.state.showConn)App.connections.render();
  },
  zoom(d){App.state.cz=Math.min(Math.max(App.state.cz+d,.15),3);this.upTf()},
  resetView(){App.state.cx=0;App.state.cy=0;App.state.cz=1;this.upTf()},
  setTool(t,el){App.state.tool=t;document.querySelectorAll('.tb-btn[id^=tb-]').forEach(b=>b.classList.remove('active'));el.classList.add('active');document.getElementById('inf-canvas').style.cursor=t==='pan'?'grab':''},
  toggleGrid(){App.state.gridSnap=!App.state.gridSnap;document.getElementById('tb-grid').classList.toggle('active',App.state.gridSnap)}
},

nodes:{
  _find(id){for(const g of DATA.explorer){const i=g.items.find(x=>x.id===id);if(i)return i}return null},
  add(itemId,x=120,y=100){
    const item=this._find(itemId);if(!item)return;
    const node={uid:App.state.nc++,type:itemId,x,y,props:JSON.parse(JSON.stringify(item.props)),script:'',color:item.color,icon:item.icon};
    App.state.nodes.push(node);this.renderOne(node);this.upCount();this.select(node.uid);
    History.push({desc:'Add '+item.name,undo:()=>this.remove(node.uid,true),redo:()=>{App.state.nodes.push(node);this.renderOne(node);this.upCount()}});
    toast(item.icon+' '+item.name+' adicionado');App.autosave.schedule();
  },
  renderOne(node){
    const vp=document.getElementById('canvas-vp');let div=document.getElementById('n-'+node.uid);
    if(!div){
      div=document.createElement('div');div.id='n-'+node.uid;div.className='cnode';
      div.addEventListener('mousedown',e=>{
        if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;
        if(e.target.closest('.nd-act'))return;
        e.stopPropagation();this.select(node.uid);
        if(App.state.tool==='select'){
          const rect=div.getBoundingClientRect();
          App.state._drag={uid:node.uid,offX:(e.clientX-rect.left)/App.state.cz,offY:(e.clientY-rect.top)/App.state.cz,sx:node.x,sy:node.y};
        }
      });
      vp.appendChild(div);
    }
    div.style.left=node.x+'px';div.style.top=node.y+'px';
    div.classList.toggle('sel',node.uid===App.state.selId);
    const has=!!node.script;
    const propsHTML=Object.entries(node.props).slice(0,4).map(([k,v])=>`<div class="nd-prop-row"><span class="nd-prop-lbl">${k}</span><input class="nd-prop-in" value="${v}" onchange="App.nodes.setProp(${node.uid},'${k}',this.value)" onclick="event.stopPropagation()"/></div>`).join('');
    div.innerHTML=`<div class="nd-head"><div class="nd-ico" style="background:${node.color}20;color:${node.color}">${node.icon}</div><div class="nd-ta"><div class="nd-name">${node.props.Name||node.type}</div><div class="nd-type">${node.type}</div></div><div class="nd-acts"><div class="nd-act" title="Abrir Script" onclick="App.scripts.openFor(${node.uid})">📜</div><div class="nd-act" title="Duplicar" onclick="App.nodes.duplicate(${node.uid})">⧉</div><div class="nd-act danger" title="Remover" onclick="App.nodes.remove(${node.uid})">✕</div></div></div><div class="nd-body">${propsHTML}<div class="nd-sbadge ${has?'has':''}" onclick="App.scripts.openFor(${node.uid})">${has?'✓ Script definido — clique para editar':'＋ Adicionar Script'}</div></div>`;
  },
  dragMove(e){
    const d=App.state._drag;if(!d)return;
    const node=App.state.nodes.find(n=>n.uid===d.uid);if(!node)return;
    const c=document.getElementById('inf-canvas');const rect=c.getBoundingClientRect();
    let nx=Math.round((e.clientX-rect.left)/App.state.cz-App.state.cx/App.state.cz-d.offX);
    let ny=Math.round((e.clientY-rect.top)/App.state.cz-App.state.cy/App.state.cz-d.offY);
    if(App.state.gridSnap){nx=Math.round(nx/24)*24;ny=Math.round(ny/24)*24}
    node.x=nx;node.y=ny;
    const div=document.getElementById('n-'+node.uid);
    if(div){div.style.left=nx+'px';div.style.top=ny+'px'}
    App.props.upPos(node);App.minimap.render();
  },
  setProp(uid,key,val){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node)return;
    const old=node.props[key];node.props[key]=isNaN(val)||val===''?val:Number(val);
    this.renderOne(node);if(App.state.selId===uid)App.props.render();
    History.push({desc:'Editar '+key,undo:()=>{node.props[key]=old;this.renderOne(node);App.props.render()},redo:()=>{node.props[key]=isNaN(val)||val===''?val:Number(val);this.renderOne(node);App.props.render()}});
    App.autosave.schedule();
  },
  select(uid){
    App.state.selId=uid;
    App.state.nodes.forEach(n=>{const d=document.getElementById('n-'+n.uid);if(d)d.classList.toggle('sel',n.uid===uid)});
    App.props.render();
  },
  deselect(){App.state.selId=null;App.state.nodes.forEach(n=>{const d=document.getElementById('n-'+n.uid);if(d)d.classList.remove('sel')});App.props.render()},
  remove(uid,silent=false){
    const node=App.state.nodes.find(n=>n.uid===uid);const div=document.getElementById('n-'+uid);if(div)div.remove();
    App.state.nodes=App.state.nodes.filter(n=>n.uid!==uid);
    if(App.state.selId===uid){App.state.selId=null;App.props.render()}
    this.upCount();
    if(!silent&&node)History.push({desc:'Del '+node.type,undo:()=>{App.state.nodes.push(node);this.renderOne(node);this.upCount()},redo:()=>this.remove(uid,true)});
    App.autosave.schedule();
  },
  deleteSelected(){if(App.state.selId)this.remove(App.state.selId)},
  duplicate(uid){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node)return;
    const copy=JSON.parse(JSON.stringify(node));copy.uid=App.state.nc++;copy.x+=45;copy.y+=45;copy.props.Name=(copy.props.Name||copy.type)+'_copy';
    App.state.nodes.push(copy);this.renderOne(copy);this.upCount();this.select(copy.uid);
    History.push({desc:'Dup',undo:()=>this.remove(copy.uid,true),redo:()=>{App.state.nodes.push(copy);this.renderOne(copy);this.upCount()}});
    App.autosave.schedule();
  },
  duplicateSelected(){if(App.state.selId)this.duplicate(App.state.selId)},
  upCount(){document.getElementById('node-count').textContent=App.state.nodes.length+' elemento'+(App.state.nodes.length!==1?'s':'')}
},

props:{
  render(){
    const tp=document.getElementById('pp-type'),sb=document.getElementById('add-script-btn');
    if(!App.state.selId){
      document.getElementById('pp-body').innerHTML='<div class="pp-empty">Selecione um<br>elemento no canvas</div>';
      document.getElementById('pp-script-body').innerHTML='<div class="pp-empty">Selecione um<br>elemento para<br>ver o código</div>';
      document.getElementById('pp-logic-body').innerHTML='<div class="pp-empty">Selecione um<br>elemento para<br>criar condições</div>';
      tp.textContent='';sb.classList.remove('show');return;
    }
    const node=App.state.nodes.find(n=>n.uid===App.state.selId);if(!node)return;
    tp.textContent=node.type;sb.classList.add('show');
    // Render props tab
    const body=document.getElementById('pp-body');body.innerHTML='';
    const pos=document.createElement('div');pos.className='pp-section';
    pos.innerHTML=`<div class="pp-sec-title">Posição</div><div class="pp-row"><span class="pp-lbl">X</span><input class="pp-in" id="px" type="number" value="${Math.round(node.x)}" onchange="App.props.setCoord('x',this.value)"/></div><div class="pp-row"><span class="pp-lbl">Y</span><input class="pp-in" id="py" type="number" value="${Math.round(node.y)}" onchange="App.props.setCoord('y',this.value)"/></div>`;
    body.appendChild(pos);
    const sec=document.createElement('div');sec.className='pp-section';sec.innerHTML='<div class="pp-sec-title">Propriedades</div>';
    Object.entries(node.props).forEach(([k,v])=>{const row=document.createElement('div');row.className='pp-row';const isBool=typeof v==='boolean';row.innerHTML=`<span class="pp-lbl">${k}</span>${isBool?`<div class="toggle ${v?'on':''}" onclick="this.classList.toggle('on');App.nodes.setProp(${node.uid},'${k}',this.classList.contains('on'))"></div>`:`<input class="pp-in" value="${v}" onchange="App.nodes.setProp(${node.uid},'${k}',this.value)"/>`}`;sec.appendChild(row)});
    body.appendChild(sec);
    // View script button in props
    const viewBtn=document.createElement('div');viewBtn.style.cssText='margin:8px;display:flex;gap:4px;flex-direction:column';
    viewBtn.innerHTML=`<button class="btn btn-blue btn-sm" style="width:100%;justify-content:center" onclick="PP.switchTab('script',document.getElementById('ppt-script'))">📜 Ver Código Lua</button><button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" onclick="PP.switchTab('logic',document.getElementById('ppt-logic'))">⚡ Adicionar Lógica</button><button class="btn btn-acc btn-sm" style="width:100%;justify-content:center" onclick="App.scripts.openEditorFor(${node.uid})">✏️ Editor Completo</button>`;
    body.appendChild(viewBtn);
    // Render script tab
    PP.renderScriptTab(node);
    // Render logic tab
    PP.renderLogicTab(node);
  },
  setCoord(c,v){const node=App.state.nodes.find(n=>n.uid===App.state.selId);if(!node)return;node[c]=parseInt(v)||0;const div=document.getElementById('n-'+node.uid);if(div)div.style[c==='x'?'left':'top']=node[c]+'px'},
  upPos(node){const px=document.getElementById('px'),py=document.getElementById('py');if(px&&App.state.selId===node.uid){px.value=Math.round(node.x);if(py)py.value=Math.round(node.y)}}
},

minimap:{
  toggle(){App.state.showMM=!App.state.showMM;document.getElementById('minimap').style.display=App.state.showMM?'block':'none'},
  render(){
    if(!App.state.showMM)return;
    const canvas=document.getElementById('mm-canvas'),ctx=canvas.getContext('2d');
    ctx.clearRect(0,0,160,100);if(!App.state.nodes.length)return;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    App.state.nodes.forEach(n=>{minX=Math.min(minX,n.x);minY=Math.min(minY,n.y);maxX=Math.max(maxX,n.x+220);maxY=Math.max(maxY,n.y+120)});
    const pad=30;minX-=pad;minY-=pad;maxX+=pad;maxY+=pad;
    const rX=maxX-minX||1,rY=maxY-minY||1,scale=Math.min(160/rX,100/rY);
    App.state.nodes.forEach(n=>{ctx.fillStyle=n.color+'99';ctx.fillRect((n.x-minX)*scale,(n.y-minY)*scale,Math.max(4,220*scale),Math.max(3,60*scale))});
  }
},

connections:{
  toggle(){App.state.showConn=!App.state.showConn;this.render()},
  render(){
    const svg=document.getElementById('conn-svg');if(!App.state.showConn){svg.innerHTML='';return}
    let lines='';const ns=App.state.nodes;
    for(let i=0;i<ns.length;i++)for(let j=i+1;j<ns.length;j++)if(ns[i].color===ns[j].color){const x1=ns[i].x+110,y1=ns[i].y+60,x2=ns[j].x+110,y2=ns[j].y+60,mx=(x1+x2)/2;lines+=`<path class="conn-line" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}"/>`}
    svg.innerHTML=lines;
  }
},

// ── SYSTEMS (new) ──
systems:{
  curCat:'Todos',
  curItem:null,
  render(f=''){
    // Build nav
    const nav=document.getElementById('sys-nav');nav.innerHTML='';
    const allItem=document.createElement('div');allItem.className='sys-nav-item'+(this.curCat==='Todos'?' active':'');
    allItem.innerHTML='🔍 Todos os Sistemas';allItem.onclick=()=>this.showCat('Todos',allItem);nav.appendChild(allItem);
    DATA.systems.forEach(cat=>{
      const d=document.createElement('div');d.className='sys-nav-item'+(this.curCat===cat.cat?' active':'');
      d.innerHTML=`${cat.icon} ${cat.cat}`;d.onclick=()=>this.showCat(cat.cat,d);nav.appendChild(d);
    });
    this.showCat(this.curCat,null,f);
  },
  showCat(catName,navEl,f=''){
    this.curCat=catName;
    document.querySelectorAll('.sys-nav-item').forEach(i=>i.classList.remove('active'));
    if(navEl)navEl.classList.add('active');
    document.getElementById('sys-cat-title').textContent=catName==='Todos'?'Todos os Sistemas':catName;
    const grid=document.getElementById('sys-grid');grid.innerHTML='';
    let items=[];
    if(catName==='Todos'){DATA.systems.forEach(cat=>items.push(...cat.items))}
    else{const cat=DATA.systems.find(c=>c.cat===catName);if(cat)items=cat.items}
    if(f)items=items.filter(i=>i.name.toLowerCase().includes(f.toLowerCase())||i.desc.toLowerCase().includes(f.toLowerCase())||i.tags.some(t=>t.includes(f.toLowerCase())));
    items.forEach(item=>{
      const card=document.createElement('div');card.className='sys-card';
      card.style.setProperty('--card-color',item.color);
      (card.querySelector ? card.querySelector('*') : null)
      card.innerHTML=`<div class="sys-card-head"><div class="sys-card-ico" style="background:${item.color}20;color:${item.color}">${item.icon}</div><div><div class="sys-card-name">${item.name}</div><div class="sys-card-type">📍 ${item.where}</div></div></div><div class="sys-card-desc">${item.desc}</div><div class="sys-card-tags">${item.tags.map(t=>`<span class="sys-tag" style="background:${item.color}18;color:${item.color};border:1px solid ${item.color}33">${t}</span>`).join('')}</div><div class="sys-code-prev">${item.code.split('\n').slice(0,5).join('\n')}</div><div style="display:flex;gap:6px"><button class="sys-card-btn" style="background:linear-gradient(135deg,${item.color},${item.color}cc)" onclick="App.systems.copyItem('${item.id}')">📋 Copiar Código</button><button class="sys-card-btn btn-ghost" style="background:rgba(255,255,255,.05);color:var(--mid);border:1px solid rgba(255,255,255,.1);flex:0;padding:7px 12px" onclick="App.systems.addToBuilderItem('${item.id}')" title="Adicionar ao Builder">➕</button></div>`;
      card.style.setProperty('--before-bg',`linear-gradient(90deg,${item.color},${item.color}88)`);
      // Set the gradient via style override
      const before=card;
      before.addEventListener('mouseenter',()=>{card.style.borderColor=item.color+'66'});
      before.addEventListener('mouseleave',()=>{card.style.borderColor=''});
      grid.appendChild(card);
    });
    if(!items.length)grid.innerHTML=`<div style="color:var(--dim);font-size:12px;padding:20px;font-family:'JetBrains Mono',monospace">// Nenhum sistema encontrado.</div>`;
  },
  filter(f){this.showCat(this.curCat,null,f)},
  _getItem(id){for(const cat of DATA.systems){const i=cat.items.find(x=>x.id===id);if(i)return i}return null},
  async copyItem(id){
    const item=this._getItem(id);if(!item)return;
    try{await navigator.clipboard.writeText(item.code);toast(`📋 "${item.name}" copiado!`)}
    catch(e){toast('Erro ao copiar','e')}
  },
  addToBuilderItem(id){
    const item=this._getItem(id);if(!item)return;
    // Find matching explorer item or add generic
    const expItem=DATA.explorer.flatMap(g=>g.items).find(i=>i.name.toLowerCase()===item.name.toLowerCase());
    if(expItem){App.nodes.add(expItem.id,100+App.state.nodes.length*35,80)}
    else toast(`${item.icon} Adicione manualmente no Builder`,'w');
    App.switchView('builder',document.querySelector('.main-tab'));
  },
  async copyCode(){
    const item=this.curItem;if(!item){toast('Selecione um sistema','w');return}
    try{await navigator.clipboard.writeText(item.code);toast('📋 Copiado!')}
    catch(e){}
  },
  addSelectedToBuilder(){
    toast('Selecione um sistema e clique em ➕','i');
  }
},

fx:{
  init(){this.renderList()},
  renderList(f=''){
    const list=document.getElementById('fx-list');list.innerHTML='';
    DATA.effects.forEach(g=>{
      const items=g.items.filter(i=>!f||i.name.toLowerCase().includes(f.toLowerCase()));if(!items.length)return;
      const t=document.createElement('div');t.className='fx-gt';t.textContent=g.icon+' '+g.group;list.appendChild(t);
      items.forEach(fx=>{
        const d=document.createElement('div');d.className='fx-item';d.id='fxi-'+fx.id;
        d.innerHTML=`<div class="fx-ico" style="background:${fx.color}18;color:${fx.color}">${fx.icon}</div><span>${fx.name}</span>`;
        d.onclick=()=>this.select(fx);list.appendChild(d);
      });
    });
  },
  filter(v){this.renderList(v)},
  select(fx){
    document.querySelectorAll('.fx-item').forEach(i=>i.classList.remove('active'));
    const el=document.getElementById('fxi-'+fx.id);if(el)el.classList.add('active');
    App.state.curFx=fx;App.state.curFxProps=JSON.parse(JSON.stringify(fx.props));
    document.getElementById('fx-current').textContent=fx.icon+' '+fx.name;
    this.renderProps(fx);this.startPreview(fx);
  },
  renderProps(fx){
    document.getElementById('fx-pt').textContent=fx.icon+' '+fx.name;
    document.getElementById('fx-ps').textContent=fx.id;
    const body=document.getElementById('fx-pb');body.innerHTML='';
    const sec=document.createElement('div');sec.className='fx-psec';sec.innerHTML='<div class="fx-psec-title">Propriedades</div>';
    Object.entries(fx.props).forEach(([k,v])=>{
      const row=document.createElement('div');row.className='fx-prow';
      const isColor=typeof v==='string'&&v.startsWith('#');const isNum=typeof v==='number';
      if(isColor)row.innerHTML=`<div class="fx-plbl">${k}</div><div style="display:flex;gap:5px"><input type="color" value="${v}" style="width:28px;height:24px;border-radius:4px;cursor:pointer;border:1px solid rgba(255,255,255,.1)" oninput="App.state.curFxProps['${k}']=this.value"/><input class="input" value="${v}" style="flex:1" oninput="App.state.curFxProps['${k}']=this.value"/></div>`;
      else if(isNum){const max=k.toLowerCase().includes('range')?100:k.toLowerCase().includes('rate')?200:20;row.innerHTML=`<div class="fx-plbl">${k} <span id="fxv-${k}">${v}</span></div><input class="fx-slider" type="range" min="0" max="${max}" step="0.1" value="${v}" oninput="App.state.curFxProps['${k}']=parseFloat(this.value);document.getElementById('fxv-${k}').textContent=this.value"/>`}
      else row.innerHTML=`<div class="fx-plbl">${k}</div><input class="input" value="${v}" oninput="App.state.curFxProps['${k}']=this.value"/>`;
      sec.appendChild(row);
    });body.appendChild(sec);
  },
  startPreview(fx){
    if(App.state.fxFrame)cancelAnimationFrame(App.state.fxFrame);
    const cvs=document.getElementById('fx-canvas'),ctx=cvs.getContext('2d');
    let particles=[],frame=0;
    const hexRgb=h=>{h=(h||'#fff').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[(n>>16)&255,(n>>8)&255,n&255]};
    const rgba=(h,a)=>{const[r,g,b]=hexRgb(h);return`rgba(${r},${g},${b},${a})`};
    const loop=()=>{
      const p=App.state.curFxProps;ctx.clearRect(0,0,320,320);ctx.fillStyle='#050810';ctx.fillRect(0,0,320,320);
      const isP=['ParticleEmitter','Fire','Smoke','Sparkles'].includes(fx.id);
      if(isP){
        const rate=Math.min(Number(p.Rate||20),120);if(frame%Math.max(1,Math.round(60/rate))===0){const spd=3+Math.random()*5;const angle=Math.PI*2*Math.random();particles.push({x:160,y:(fx.id==='Fire'||fx.id==='Smoke')?280:160,vx:Math.cos(angle)*spd,vy:(fx.id==='Fire'||fx.id==='Smoke')?-spd*2:Math.sin(angle)*spd,life:80,maxLife:80,sz:2+Math.random()*5})}
        frame++;particles=particles.filter(pt=>pt.life>0);
        particles.forEach(pt=>{pt.x+=pt.vx;pt.y+=pt.vy;pt.life--;const t=pt.life/pt.maxLife;ctx.globalAlpha=t;const col=p.Color||p.SparkleColor||'#ff6b35';
          if(fx.id==='Fire'){const g=ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,pt.sz*(1+t));g.addColorStop(0,'rgba(255,255,255,.8)');g.addColorStop(.3,col);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*(1+t),0,Math.PI*2);ctx.fill()}
          else if(fx.id==='Smoke'){ctx.fillStyle=col;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*(2-t),0,Math.PI*2);ctx.fill()}
          else if(fx.id==='Sparkles'){ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(pt.x-pt.sz,pt.y);ctx.lineTo(pt.x+pt.sz,pt.y);ctx.stroke();ctx.beginPath();ctx.moveTo(pt.x,pt.y-pt.sz);ctx.lineTo(pt.x,pt.y+pt.sz);ctx.stroke()}
          else{ctx.fillStyle=col;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*t,0,Math.PI*2);ctx.fill()}
          ctx.globalAlpha=1;});
      }else if(fx.id==='PointLight'){const range=Math.min(Number(p.Range||16)*4,150);const br=Math.min(Number(p.Brightness||1),3);const col=p.Color||'#ffffff';const g=ctx.createRadialGradient(160,160,0,160,160,range);g.addColorStop(0,rgba(col,br*.9));g.addColorStop(.4,rgba(col,br*.3));g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,320,320);ctx.fillStyle=rgba(col,1);ctx.beginPath();ctx.arc(160,160,6,0,Math.PI*2);ctx.fill()}
      else if(fx.id==='BloomEffect'){const intensity=Number(p.Intensity||.5);const size=Number(p.Size||56);[{x:160,y:160,r:22,c:'#fff'},{x:90,y:110,r:14,c:'#ff9900'},{x:230,y:200,r:16,c:'#4d8fff'}].forEach(o=>{ctx.fillStyle=o.c;ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();if(intensity>.1){const g=ctx.createRadialGradient(o.x,o.y,o.r,o.x,o.y,o.r+size*intensity);g.addColorStop(0,rgba(o.c,intensity*.6));g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(o.x,o.y,o.r+size*intensity,0,Math.PI*2);ctx.fill()}})}
      else if(fx.id==='Atmosphere'){const density=Number(p.Density||.3);const col=p.Color||'#c8d5e8';const g=ctx.createLinearGradient(0,0,0,320);g.addColorStop(0,'#08101e');g.addColorStop(.5,rgba(col,density*.7));g.addColorStop(1,rgba(col,density));ctx.fillStyle=g;ctx.fillRect(0,0,320,320)}
      else{ctx.strokeStyle=p.OutlineColor||p.Color||'#fff';ctx.lineWidth=2;ctx.strokeRect(60,60,200,200)}
      App.state.fxFrame=requestAnimationFrame(loop);
    };loop();
  },
  save(){if(!App.state.curFx){toast('Selecione um efeito!','e');return}const name=prompt('Nome:',App.state.curFx.name);if(!name)return;App.state.savedFx.push({id:Date.now(),name,type:App.state.curFx.id,icon:App.state.curFx.icon,color:App.state.curFx.color,props:JSON.parse(JSON.stringify(App.state.curFxProps))});this._renderSaved();toast('💾 Efeito salvo!')},
  _renderSaved(){const list=document.getElementById('fx-saved-list');if(!App.state.savedFx.length){list.innerHTML='<div style="font-size:10px;color:var(--dark);padding:6px">Nenhum salvo.</div>';return}list.innerHTML='';App.state.savedFx.forEach(s=>{const d=document.createElement('div');d.className='fx-saved-item';d.innerHTML=`<span class="fx-sdot" style="background:${s.color}"></span>${s.icon} ${s.name}`;list.appendChild(d)})},
  addToBuilder(){if(!App.state.curFx){toast('Selecione!','e');return}App.switchView('builder',document.querySelector('.main-tab'));toast(App.state.curFx.icon+' adicionado ao Builder!')},
  reset(){if(!App.state.curFx)return;const o=DATA.effects.flatMap(g=>g.items).find(i=>i.id===App.state.curFx.id);if(o){App.state.curFxProps=JSON.parse(JSON.stringify(o.props));this.renderProps(o)}}
},

templates:{
  render(){
    const grid=document.getElementById('tpl-grid');grid.innerHTML='';
    DATA.templates.forEach(t=>{
      const card=document.createElement('div');card.className='tpl-card';
      card.innerHTML=`<div class="tpl-icon">${t.icon}</div><div class="tpl-name">${t.name}</div><div class="tpl-desc">${t.desc}</div><div class="tpl-tags">${t.tags.map(tag=>`<span class="tpl-tag">${tag}</span>`).join('')}</div>`;
      card.onclick=()=>this.load(t);grid.appendChild(card);
    });
  },
  load(t){
    if(App.state.nodes.length&&!confirm('Substituir canvas atual?'))return;
    App.state.nodes.forEach(n=>{const d=document.getElementById('n-'+n.uid);if(d)d.remove()});App.state.nodes=[];
    t.tags.forEach((id,i)=>App.nodes.add(id,80+i*65,80+i*40));
    App.switchView('builder',document.querySelector('.main-tab'));toast('📋 '+t.name+' carregado!');
  }
},

docs:{
  init(){
    const nav=document.getElementById('docs-nav-links');nav.innerHTML='';let last=null;
    DATA.docs.sections.forEach(item=>{
      if(item.section&&item.section!==last){const s=document.createElement('div');s.className='docs-nav-sec';s.textContent=item.section;nav.appendChild(s);last=item.section}
      const el=document.createElement('div');el.className='docs-nav-item'+(item.id==='intro'?' active':'');el.id='dn-'+item.id;
      el.innerHTML=`<span>${item.icon}</span>${item.label}`;el.onclick=()=>this.show(item.id);nav.appendChild(el);
    });this.show('intro');
  },
  show(id){document.querySelectorAll('.docs-nav-item').forEach(el=>el.classList.remove('active'));const nav=document.getElementById('dn-'+id);if(nav)nav.classList.add('active');document.getElementById('docs-content').innerHTML=DATA.docs.content[id]||'<div style="color:var(--dim);padding:20px">Em breve.</div>'}
}

}; // end App

// PP — PROPS PANEL CONTROLLER (tabs, script view, logic)
const PP={
  curTab:'props',
  switchTab(tab,el){
    this.curTab=tab;
    document.querySelectorAll('.pp-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.pp-tabcontent').forEach(t=>t.classList.remove('active'));
    if(el)el.classList.add('active');
    const content=document.getElementById('ppc-'+tab);
    if(content)content.classList.add('active');
  },

  renderScriptTab(node){
    const body=document.getElementById('pp-script-body');
    const blocks=SCRIPT_DB[node.type]||SCRIPT_DB['_default'];
    body.innerHTML='';
    // Header
    const hdr=document.createElement('div');
    hdr.style.cssText='padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0';
    hdr.innerHTML=`<div style="font-size:9px;color:var(--dim);font-family:'JetBrains Mono',monospace;margin-bottom:6px">📍 ${blocks.where}</div><button class="btn btn-acc btn-sm" style="width:100%;justify-content:center" onclick="App.scripts.openEditorFor(${node.uid})">✏️ Abrir Editor Completo</button>`;
    body.appendChild(hdr);
    // Each block
    blocks.blocks.forEach((blk,i)=>{
      const wrap=document.createElement('div');wrap.className='sb-block';
      const typeColor={LocalScript:'#1a8cff',Script:'#3ecf8e',ModuleScript:'#9b42ff'}[blk.type]||'#6b7594';
      wrap.innerHTML=`
      <div class="sb-block-head" onclick="this.querySelector('.sb-chevron').classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><span class="sb-chevron">▶</span><span class="sb-block-title">${blk.name}</span><span class="sb-block-type" style="background:${typeColor}18;color:${typeColor};border:1px solid ${typeColor}33">${blk.type}</span><span class="sb-block-copy" title="Copiar este bloco" onclick="event.stopPropagation();PP.copyBlock(${i},'${node.type}')">📋</span></div><div class="sb-block-body"><div class="sb-explain">${blk.vars.map(v=>`<div class="sb-explain-row"><span class="sb-explain-var">${v.n}</span><span class="sb-explain-desc">${v.d}</span></div>`).join('')}</div><div class="sb-where">📍 Cole em: ${blk.where}</div><div class="sb-code">${syntaxHL(blk.code)}</div><div class="sb-block-actions"><button class="btn btn-ghost btn-sm" style="flex:1" onclick="PP.copyBlock(${i},'${node.type}')">📋 Copiar</button><button class="btn btn-blue btn-sm" style="flex:1" onclick="PP.injectToNode(${node.uid},${i},'${node.type}')">💉 Usar</button></div></div>`;
      body.appendChild(wrap);
    });
  },

  copyBlock(blockIdx,type){
    const blocks=SCRIPT_DB[type]||SCRIPT_DB['_default'];
    const blk=blocks.blocks[blockIdx];if(!blk)return;
    navigator.clipboard.writeText(blk.code).then(()=>toast('📋 Bloco copiado!')).catch(()=>toast('Copie manualmente','e'));
  },

  injectToNode(uid,blockIdx,type){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node)return;
    const blocks=SCRIPT_DB[type]||SCRIPT_DB['_default'];
    const blk=blocks.blocks[blockIdx];if(!blk)return;
    node.script=(node.script?node.script+'\n\n':'')+'-- === '+blk.name+' ===\n'+blk.code;
    App.nodes.renderOne(node);toast('💉 Bloco injetado no script!');
  },

  renderLogicTab(node){
    const body=document.getElementById('pp-logic-body');
    body.innerHTML=`<div class="logic-node-name">${node.icon} ${node.props.Name||node.type}</div>`;
    // Render existing logic
    (node.logic||[]).forEach((l,i)=>{body.appendChild(this._buildLogicCard(node,l,i))});
    // Add button
    const add=document.createElement('div');add.className='logic-add-btn';
    add.innerHTML='＋ Adicionar Condição';add.onclick=()=>this.addLogic(node.uid);body.appendChild(add);
    // Generate button
    if((node.logic||[]).length>0){
      const gen=document.createElement('button');gen.className='logic-gen-btn';
      gen.textContent='⚡ Gerar Script das Condições';gen.onclick=()=>this.generateLogicScript(node.uid);
      body.appendChild(gen);
    }
  },

  _buildLogicCard(node,l,i){
    const otherNodes=App.state.nodes.filter(n=>n.uid!==node.uid);
    const nodeOpts=otherNodes.map(n=>`<option value="${n.uid}" ${l.targetUid==n.uid?'selected':''}>${n.icon} ${n.props.Name||n.type}</option>`).join('');
    const card=document.createElement('div');card.className='logic-card';
    card.innerHTML=`
    <div class="logic-card-head"><span class="logic-card-icon">⚡</span><span class="logic-card-title">Condição ${i+1}</span><span class="logic-card-del" onclick="PP.removeLogic(${node.uid},${i})">✕</span></div><div class="logic-card-body"><div class="logic-row"><span class="logic-label">SE</span><select class="logic-select" onchange="PP.updateLogic(${node.uid},${i},'trigger',this.value)"><option value="touch" ${l.trigger==='touch'?'selected':''}>Jogador tocar</option><option value="key" ${l.trigger==='key'?'selected':''}>Tecla pressionada</option><option value="hp" ${l.trigger==='hp'?'selected':''}>HP abaixo de</option><option value="coins" ${l.trigger==='coins'?'selected':''}>Moedas >= </option><option value="click" ${l.trigger==='click'?'selected':''}>Jogador clicar</option><option value="time" ${l.trigger==='time'?'selected':''}>Timer (segundos)</option><option value="level" ${l.trigger==='level'?'selected':''}>Level atingido</option><option value="near" ${l.trigger==='near'?'selected':''}>Jogador próximo</option></select></div><div class="logic-row"><span class="logic-label">VALOR</span><input class="logic-input" value="${l.value||''}" placeholder="Ex: E, 50, 100..." onchange="PP.updateLogic(${node.uid},${i},'value',this.value)"/></div><div class="logic-row"><span class="logic-label">ENTÃO</span><select class="logic-select" onchange="PP.updateLogic(${node.uid},${i},'action',this.value)"><option value="show" ${l.action==='show'?'selected':''}>Mostrar elemento</option><option value="hide" ${l.action==='hide'?'selected':''}>Esconder elemento</option><option value="damage" ${l.action==='damage'?'selected':''}>Causar dano</option><option value="heal" ${l.action==='heal'?'selected':''}>Curar HP</option><option value="tp" ${l.action==='tp'?'selected':''}>Teleportar</option><option value="give_coins" ${l.action==='give_coins'?'selected':''}>Dar moedas</option><option value="sound" ${l.action==='sound'?'selected':''}>Tocar som</option><option value="print" ${l.action==='print'?'selected':''}>Print/Log</option><option value="kill" ${l.action==='kill'?'selected':''}>Matar jogador</option><option value="respawn" ${l.action==='respawn'?'selected':''}>Respawnar</option></select></div>
      ${otherNodes.length?`<div class="logic-row"><span class="logic-label">ALVO</span><select class="logic-select" onchange="PP.updateLogic(${node.uid},${i},'targetUid',this.value)"><option value="">-- Esse node --</option>${nodeOpts}</select></div>`:''}
      <div class="logic-row"><span class="logic-label">PARAM</span><input class="logic-input" value="${l.param||''}" placeholder="Valor da ação..." onchange="PP.updateLogic(${node.uid},${i},'param',this.value)"/></div><div class="logic-then">${this._previewLogic(l)}</div></div>`;
    return card;
  },

  _previewLogic(l){
    const triggers={touch:'Touched:Connect',key:`InputBegan (${l.value||'?'})`,hp:`HP < ${l.value||'?'}`,coins:`Coins >= ${l.value||'?'}`,click:'MouseButton1Click',time:`task.wait(${l.value||'?'})`,level:`Level >= ${l.value||'?'}`,near:`Magnitude < ${l.value||'50'}`};
    const actions={show:'part.Transparency = 0',hide:'part.Transparency = 1',damage:`hum:TakeDamage(${l.param||'10'})`,heal:`hum.Health += ${l.param||'20'}`,tp:'hrp.CFrame = dest.CFrame',give_coins:`coins.Value += ${l.param||'50'}`,sound:'sound:Play()',print:`print("${l.param||'evento'}")`,kill:'hum.Health = 0',respawn:'plr:LoadCharacter()'};
    return `-- ${triggers[l.trigger]||'?'} → ${actions[l.action]||'?'}`;
  },

  addLogic(uid){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node)return;
    if(!node.logic)node.logic=[];
    node.logic.push({trigger:'touch',value:'',action:'print',param:'evento',targetUid:''});
    this.renderLogicTab(node);App.autosave.schedule();
  },

  removeLogic(uid,i){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node||!node.logic)return;
    node.logic.splice(i,1);this.renderLogicTab(node);App.autosave.schedule();
  },

  updateLogic(uid,i,key,val){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node||!node.logic)return;
    node.logic[i][key]=val;
    // Update preview
    this.renderLogicTab(node);App.autosave.schedule();
  },

  generateLogicScript(uid){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node||!node.logic)return;
    const lines=['-- Lógica gerada pelo RoForger','-- 📍 Cole em ServerScriptService ou StarterCharacterScripts',''];
    lines.push('local Players = game:GetService("Players")');
    lines.push('local UIS = game:GetService("UserInputService")');
    lines.push('local part = script.Parent -- ajuste para o objeto correto');
    lines.push('');
    node.logic.forEach((l,i)=>{
      lines.push(`-- Condição ${i+1}: SE ${l.trigger} → ${l.action}`);
      const target=l.targetUid?`-- Alvo: node ${l.targetUid}`:'';
      if(target)lines.push(target);
      switch(l.trigger){
        case'touch':
          lines.push(`part.Touched:Connect(function(hit)`);
          lines.push(`  local char=hit.Parent`);
          lines.push(`  local hum=char:FindFirstChildOfClass("Humanoid")`);
          lines.push(`  local hrp=char:FindFirstChild("HumanoidRootPart")`);
          lines.push(`  if not hum then return end`);
          lines.push(`  ${this._actionLine(l)}`);
          lines.push(`end)`);break;
        case'key':
          lines.push(`UIS.InputBegan:Connect(function(i,gp)`);
          lines.push(`  if gp then return end`);
          lines.push(`  if i.KeyCode==Enum.KeyCode.${l.value||'E'} then`);
          lines.push(`    local plr=Players.LocalPlayer`);
          lines.push(`    local char=plr.Character; local hum=char and char:FindFirstChildOfClass("Humanoid")`);
          lines.push(`    ${this._actionLine(l)}`);
          lines.push(`  end`);lines.push(`end)`);break;
        case'time':
          lines.push(`task.delay(${l.value||'5'},function()`);
          lines.push(`  ${this._actionLine(l)}`);
          lines.push(`end)`);break;
        default:
          lines.push(`-- Evento: ${l.trigger} | Ação: ${l.action}`);
          lines.push(`-- ${this._actionLine(l)}`);
      }
      lines.push('');
    });
    const code=lines.join('\n');
    node.script=(node.script?node.script+'\n\n':'')+code;
    App.nodes.renderOne(node);App.scripts.openEditorFor(uid);toast('⚡ Script de lógica gerado!');
  },

  _actionLine(l){
    switch(l.action){
      case'show':return'part.Transparency=0';
      case'hide':return'part.Transparency=1';
      case'damage':return`hum:TakeDamage(${l.param||10})`;
      case'heal':return`hum.Health=math.min(hum.MaxHealth,hum.Health+${l.param||20})`;
      case'tp':return'hrp.CFrame=workspace.TeleportDest.CFrame';
      case'give_coins':return`local ls=plr:FindFirstChild("leaderstats"); if ls then local c=ls:FindFirstChild("Coins"); if c then c.Value=c.Value+${l.param||50} end end`;
      case'sound':return'local s=Instance.new("Sound"); s.SoundId="rbxassetid://0"; s.Parent=workspace; s:Play()';
      case'print':return`print("[RoForger] ${l.param||'evento'}")`;
      case'kill':return'hum.Health=0';
      case'respawn':return'plr:LoadCharacter()';
      default:return`print("ação: ${l.action}")`;
    }
  }
};

// SCRIPT DATABASE — blocos explicados por tipo
const SCRIPT_DB={
  _default:{
    where:'ServerScriptService (Script)',
    blocks:[{name:'Script Básico',type:'Script',where:'ServerScriptService',
      vars:[{n:'script.Parent',d:'O objeto pai onde o script está'}],
      code:`-- Script básico
print("[RoForger] Sistema iniciado")`}]
  },
  WalkSpeed:{
    where:'StarterCharacterScripts (LocalScript)',
    blocks:[
      {name:'Velocidade Base',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'DEFAULT',d:'Velocidade normal de caminhada (padrão Roblox: 16)'},{n:'JUMP',d:'Força do pulo (padrão: 50, máx recomendado: 100)'},{n:'hum.WalkSpeed',d:'Propriedade do Humanoid que controla velocidade'}],
        code:`-- VELOCIDADE BASE
-- Onde colocar: StarterCharacterScripts > LocalScript
local Players = game:GetService("Players")
local plr = Players.LocalPlayer
local char = plr.Character or plr.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")

local DEFAULT = 16  -- ← Mude para alterar velocidade normal
local JUMP = 50     -- ← Mude para alterar altura do pulo

hum.WalkSpeed = DEFAULT
hum.JumpPower = JUMP`},
      {name:'Sprint (Shift)',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'SPRINT',d:'Velocidade ao segurar Shift (recomendado: 20-35)'},{n:'STAMINA_MAX',d:'Stamina máxima — 0 para ilimitado'},{n:'DRAIN_RATE',d:'Taxa de gasto de stamina por segundo'}],
        code:`-- SPRINT COM STAMINA
-- Onde colocar: StarterCharacterScripts > LocalScript (junto com o bloco de velocidade)
local UIS = game:GetService("UserInputService")
local RS = game:GetService("RunService")
local hum = script.Parent:WaitForChild("Humanoid")

local DEFAULT = 16    -- ← velocidade normal
local SPRINT = 26     -- ← velocidade ao correr
local STAMINA_MAX = 100  -- ← stamina máxima (0 = ilimitado)
local DRAIN_RATE = 20    -- ← quanto drena por segundo
local REGEN_RATE = 10    -- ← quanto regenera por segundo

local stamina = STAMINA_MAX
local isSprinting = false

UIS.InputBegan:Connect(function(i, gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.LeftShift then
    isSprinting = true
    hum.WalkSpeed = SPRINT
  end
end)
UIS.InputEnded:Connect(function(i)
  if i.KeyCode == Enum.KeyCode.LeftShift then
    isSprinting = false
    hum.WalkSpeed = DEFAULT
  end
end)
RS.Heartbeat:Connect(function(dt)
  if isSprinting and stamina > 0 then
    stamina = math.max(0, stamina - dt * DRAIN_RATE)
    if stamina <= 0 then isSprinting = false; hum.WalkSpeed = DEFAULT end
  elseif not isSprinting and stamina < STAMINA_MAX then
    stamina = math.min(STAMINA_MAX, stamina + dt * REGEN_RATE)
  end
end)`},
      {name:'Agachamento (Ctrl)',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'CROUCH_SPEED',d:'Velocidade ao agachar (recomendado: 6-10)'},{n:'LeftControl',d:'Tecla de agachamento — troque por outra tecla se quiser'}],
        code:`-- AGACHAMENTO
-- Onde colocar: StarterCharacterScripts > LocalScript
local UIS = game:GetService("UserInputService")
local hum = script.Parent:WaitForChild("Humanoid")

local DEFAULT = 16      -- ← velocidade normal
local CROUCH_SPEED = 7  -- ← velocidade ao agachar

UIS.InputBegan:Connect(function(i, gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.LeftControl then
    hum.WalkSpeed = CROUCH_SPEED
  end
end)
UIS.InputEnded:Connect(function(i)
  if i.KeyCode == Enum.KeyCode.LeftControl then
    hum.WalkSpeed = DEFAULT
  end
end)`}
    ]
  },
  Fly:{
    where:'StarterCharacterScripts (LocalScript)',
    blocks:[
      {name:'Voar (toggle F)',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'FLY_SPEED',d:'Velocidade de voo horizontal (recomendado: 30-80)'},{n:'MAX_HEIGHT',d:'Altura máxima permitida em studs (0 = sem limite)'},{n:'ASCEND_SPEED',d:'Velocidade de subida/descida (espaço e Ctrl)'},{n:'F',d:'Tecla para ativar/desativar voo — troque se quiser'}],
        code:`-- SISTEMA DE VOO
-- Onde colocar: StarterCharacterScripts > LocalScript
-- MAX_HEIGHT: altura em studs a partir do chão (0 = sem limite)

local UIS = game:GetService("UserInputService")
local RS = game:GetService("RunService")
local plr = game.Players.LocalPlayer
local char = script.Parent
local hrp = char:WaitForChild("HumanoidRootPart")
local hum = char:WaitForChild("Humanoid")

local FLY_SPEED = 50       -- ← velocidade de voo
local ASCEND_SPEED = 30    -- ← velocidade de subida/descida
local MAX_HEIGHT = 200     -- ← altura máxima em studs (0 = ilimitado)

local flying = false
local bodyVel, bodyGyro

local function startFly()
  flying = true
  hum.PlatformStand = true
  bodyVel = Instance.new("BodyVelocity")
  bodyVel.MaxForce = Vector3.new(1e5,1e5,1e5)
  bodyVel.Velocity = Vector3.zero
  bodyVel.Parent = hrp
  bodyGyro = Instance.new("BodyGyro")
  bodyGyro.MaxTorque = Vector3.new(1e5,1e5,1e5)
  bodyGyro.CFrame = hrp.CFrame
  bodyGyro.Parent = hrp
end

local function stopFly()
  flying = false
  hum.PlatformStand = false
  if bodyVel then bodyVel:Destroy() end
  if bodyGyro then bodyGyro:Destroy() end
end

UIS.InputBegan:Connect(function(i, gp)
  if gp then return end
  if i.KeyCode == Enum.KeyCode.F then
    if flying then stopFly() else startFly() end
  end
end)

RS.RenderStepped:Connect(function()
  if not flying then return end
  -- Checar altura máxima
  if MAX_HEIGHT > 0 and hrp.Position.Y >= MAX_HEIGHT then
    local v = bodyVel.Velocity
    bodyVel.Velocity = Vector3.new(v.X, math.min(0, v.Y), v.Z)
  end
  local cam = workspace.CurrentCamera
  local dir = Vector3.zero
  if UIS:IsKeyDown(Enum.KeyCode.W) then dir += cam.CFrame.LookVector end
  if UIS:IsKeyDown(Enum.KeyCode.S) then dir -= cam.CFrame.LookVector end
  if UIS:IsKeyDown(Enum.KeyCode.A) then dir -= cam.CFrame.RightVector end
  if UIS:IsKeyDown(Enum.KeyCode.D) then dir += cam.CFrame.RightVector end
  if UIS:IsKeyDown(Enum.KeyCode.Space) then dir += Vector3.yAxis end
  if UIS:IsKeyDown(Enum.KeyCode.LeftControl) then dir -= Vector3.yAxis end
  dir = Vector3.new(dir.X, dir.Y, dir.Z)
  bodyVel.Velocity = dir.Magnitude > 0 and dir.Unit * FLY_SPEED or Vector3.zero
  bodyGyro.CFrame = cam.CFrame
end)`}
    ]
  },
  Dash:{
    where:'StarterCharacterScripts (LocalScript)',
    blocks:[
      {name:'Dash Básico',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'POWER',d:'Força do dash — quanto mais alto, mais longe (recomendado: 40-80)'},{n:'COOLDOWN',d:'Tempo em segundos antes de poder dar dash novamente'},{n:'DASH_KEY',d:'Tecla do dash — padrão Q, pode trocar por E, F, etc'}],
        code:`-- SISTEMA DE DASH
-- Onde colocar: StarterCharacterScripts > LocalScript

local UIS = game:GetService("UserInputService")
local char = script.Parent
local hrp = char:WaitForChild("HumanoidRootPart")
local hum = char:WaitForChild("Humanoid")

local POWER = 60       -- ← distância do dash
local COOLDOWN = 1.0   -- ← cooldown em segundos
local DASH_KEY = Enum.KeyCode.Q  -- ← tecla do dash

local canDash = true

UIS.InputBegan:Connect(function(i, gp)
  if gp or not canDash then return end
  if i.KeyCode == DASH_KEY then
    canDash = false
    -- Direção do dash (para onde o jogador está se movendo)
    local dir = hum.MoveDirection
    if dir.Magnitude < 0.1 then
      dir = hrp.CFrame.LookVector  -- se parado, dash para frente
    end
    hrp.Velocity = dir * POWER
    task.wait(COOLDOWN)
    canDash = true
  end
end)`},
      {name:'Dash com Efeito Visual',type:'LocalScript',where:'StarterCharacterScripts',
        vars:[{n:'TRAIL_TRANS',d:'Transparência do trail (0=sólido, 1=invisível)'},{n:'POWER',d:'Força/distância do dash'},{n:'EFFECT_TIME',d:'Duração do efeito de rastro em segundos'}],
        code:`-- DASH COM TRAIL
-- Onde colocar: StarterCharacterScripts > LocalScript

local UIS = game:GetService("UserInputService")
local TS = game:GetService("TweenService")
local char = script.Parent
local hrp = char:WaitForChild("HumanoidRootPart")
local hum = char:WaitForChild("Humanoid")

local POWER = 60        -- ← distância
local COOLDOWN = 1.2    -- ← cooldown
local EFFECT_TIME = 0.3 -- ← duração do trail

-- Criar trail
local trail = Instance.new("Trail")
trail.Attachment0 = Instance.new("Attachment", hrp)
trail.Attachment1 = Instance.new("Attachment", hrp)
trail.Attachment1.Position = Vector3.new(0,-2,0)
trail.Lifetime = EFFECT_TIME
trail.Enabled = false
trail.Parent = hrp

local canDash = true
UIS.InputBegan:Connect(function(i, gp)
  if gp or not canDash then return end
  if i.KeyCode == Enum.KeyCode.Q then
    canDash = false
    trail.Enabled = true
    local dir = hum.MoveDirection
    if dir.Magnitude < 0.1 then dir = hrp.CFrame.LookVector end
    hrp.Velocity = dir * POWER
    task.wait(EFFECT_TIME)
    trail.Enabled = false
    task.wait(COOLDOWN - EFFECT_TIME)
    canDash = true
  end
end)`}
    ]
  },
  Enemy:{
    where:'Workspace > NPC Model (Script)',
    blocks:[
      {name:'IA: Perseguir Jogador',type:'Script',where:'NPC Model > Script',
        vars:[{n:'HP',d:'Vida do inimigo — ao zerar ele morre'},{n:'DMG',d:'Dano causado por ataque'},{n:'AGGRO_RANGE',d:'Distância em studs para detectar o jogador'},{n:'SPEED',d:'Velocidade de movimento do inimigo'},{n:'ATTACK_RANGE',d:'Distância para atacar o jogador'}],
        code:`-- INIMIGO COM IA
-- Onde colocar: Workspace > [NomeDoPNJ] > Script (NÃO LocalScript)
-- O model do NPC precisa ter: Humanoid, HumanoidRootPart

local Players = game:GetService("Players")
local RS = game:GetService("RunService")
local enemy = script.Parent
local hum = enemy:WaitForChild("Humanoid")
local hrp = enemy:WaitForChild("HumanoidRootPart")

local HP = 100          -- ← vida do inimigo
local DMG = 10          -- ← dano por ataque
local AGGRO_RANGE = 30  -- ← raio de detecção (studs)
local SPEED = 14        -- ← velocidade de movimento
local ATTACK_RANGE = 5  -- ← distância para atacar
local ATTACK_CD = 1.5   -- ← cooldown entre ataques

hum.MaxHealth = HP
hum.Health = HP
hum.WalkSpeed = SPEED

local lastAttack = 0
RS.Heartbeat:Connect(function()
  if hum.Health <= 0 then return end
  local nearest, dist = nil, AGGRO_RANGE
  for _, plr in ipairs(Players:GetPlayers()) do
    local ch = plr.Character
    local p = ch and ch:FindFirstChild("HumanoidRootPart")
    if p then
      local d = (hrp.Position - p.Position).Magnitude
      if d < dist then nearest = p; dist = d end
    end
  end
  if nearest then
    hum:MoveTo(nearest.Position)
    -- Atacar se perto o suficiente
    if dist <= ATTACK_RANGE and tick()-lastAttack >= ATTACK_CD then
      lastAttack = tick()
      local victimHum = nearest.Parent:FindFirstChildOfClass("Humanoid")
      if victimHum then victimHum:TakeDamage(DMG) end
    end
  end
end)

hum.Died:Connect(function()
  task.wait(3)
  enemy:Destroy()  -- ← remova essa linha se quiser respawn
end)`},
      {name:'Drop de Itens ao Morrer',type:'Script',where:'NPC Model > Script',
        vars:[{n:'DROP_CHANCE',d:'Chance de dropar item (0 a 1 = 0% a 100%)'},{n:'COINS_AMOUNT',d:'Quantidade de moedas dadas ao matar'},{n:'XP_AMOUNT',d:'XP concedido ao jogador que matou'}],
        code:`-- DROP AO MORRER
-- Adicione junto com o script de IA do inimigo
-- Onde colocar: NPC Model > Script

local Players = game:GetService("Players")
local enemy = script.Parent
local hum = enemy:WaitForChild("Humanoid")

local DROP_CHANCE = 0.5   -- ← 50% de chance de dropar
local COINS_AMOUNT = 25   -- ← moedas dadas ao matar
local XP_AMOUNT = 100     -- ← XP dado ao matar

hum.Died:Connect(function()
  -- Encontrar quem matou (último dano)
  local tag = hum:FindFirstChild("creator")
  local killer = tag and tag.Value
  if killer and killer:IsA("Player") then
    local ls = killer:FindFirstChild("leaderstats")
    if ls then
      local coins = ls:FindFirstChild("Coins")
      local xp = ls:FindFirstChild("XP")
      if coins then coins.Value += COINS_AMOUNT end
      if xp then xp.Value += XP_AMOUNT end
    end
  end
  -- Drop aleatório
  if math.random() < DROP_CHANCE then
    local drop = Instance.new("Part")
    drop.Size = Vector3.new(1,1,1)
    drop.Position = enemy.HumanoidRootPart.Position
    drop.BrickColor = BrickColor.new("Bright yellow")
    drop.Parent = workspace
    game:GetService("Debris"):AddItem(drop, 10)  -- some após 10s
  end
end)`}
    ]
  },
  Currency:{
    where:'ServerScriptService (Script)',
    blocks:[
      {name:'Sistema de Moedas',type:'Script',where:'ServerScriptService',
        vars:[{n:'COIN_NAME',d:'Nome da moeda no leaderstats (aparece no placar)'},{n:'START_AMOUNT',d:'Moedas iniciais de cada jogador'},{n:'MAX_AMOUNT',d:'Limite máximo de moedas por jogador'},{n:'StoreName',d:'Nome do DataStore — mude se quiser resetar dados'}],
        code:`-- SISTEMA DE MOEDAS COM SAVE
-- Onde colocar: ServerScriptService > Script

local Players = game:GetService("Players")
local DS = game:GetService("DataStoreService")

local COIN_NAME = "Coins"     -- ← nome da moeda
local START_AMOUNT = 0        -- ← moedas iniciais
local MAX_AMOUNT = 999999     -- ← limite máximo
local StoreName = "CoinsStore_v1"  -- ← mude para resetar dados

local store = DS:GetDataStore(StoreName)

Players.PlayerAdded:Connect(function(plr)
  -- Criar leaderstats
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"
  ls.Parent = plr
  local coins = Instance.new("IntValue")
  coins.Name = COIN_NAME
  coins.Value = START_AMOUNT
  coins.Parent = ls
  -- Carregar dados salvos
  local ok, saved = pcall(function()
    return store:GetAsync(tostring(plr.UserId))
  end)
  if ok and saved then
    coins.Value = math.min(saved, MAX_AMOUNT)
  end
end)

Players.PlayerRemoving:Connect(function(plr)
  local ls = plr:FindFirstChild("leaderstats")
  if not ls then return end
  local coins = ls:FindFirstChild(COIN_NAME)
  if not coins then return end
  pcall(function()
    store:SetAsync(tostring(plr.UserId), coins.Value)
  end)
end)

-- Função para dar moedas (use em outros scripts)
-- local MoneyModule = require(script)
-- MoneyModule.GiveCoins(player, 100)`}
    ]
  },
  SaveLoad:{
    where:'ServerScriptService (Script)',
    blocks:[
      {name:'Auto-Save Completo',type:'Script',where:'ServerScriptService',
        vars:[{n:'StoreName',d:'Nome do DataStore — altere para criar save novo'},{n:'AUTO_SAVE_INTERVAL',d:'Tempo em segundos entre saves automáticos'},{n:'MAX_RETRIES',d:'Tentativas em caso de falha na conexão'}],
        code:`-- AUTO-SAVE COMPLETO
-- Onde colocar: ServerScriptService > Script
-- Salva TODOS os valores do leaderstats automaticamente

local Players = game:GetService("Players")
local DS = game:GetService("DataStoreService")

local StoreName = "PlayerData_v1"    -- ← mude para resetar dados
local AUTO_SAVE_INTERVAL = 60        -- ← save a cada N segundos
local MAX_RETRIES = 3                -- ← tentativas em falha

local store = DS:GetDataStore(StoreName)

local function save(plr)
  local ls = plr:FindFirstChild("leaderstats")
  if not ls then return end
  local data = {}
  for _, v in ipairs(ls:GetChildren()) do
    data[v.Name] = v.Value
  end
  for i = 1, MAX_RETRIES do
    local ok = pcall(function()
      store:SetAsync(tostring(plr.UserId), data)
    end)
    if ok then break end
    task.wait(1)
  end
end

local function load(plr)
  local ok, data = pcall(function()
    return store:GetAsync(tostring(plr.UserId))
  end)
  if ok and data then
    task.wait(0.5)
    local ls = plr:FindFirstChild("leaderstats")
    if ls then
      for k, v in pairs(data) do
        local stat = ls:FindFirstChild(k)
        if stat then stat.Value = v end
      end
    end
  end
end

Players.PlayerAdded:Connect(function(plr)
  load(plr)
  -- Auto-save loop
  task.spawn(function()
    while plr.Parent do
      task.wait(AUTO_SAVE_INTERVAL)
      save(plr)
    end
  end)
end)

Players.PlayerRemoving:Connect(save)
game:BindToClose(function()
  for _, p in ipairs(Players:GetPlayers()) do
    save(p)
  end
end)`}
    ]
  }
};

// SCRIPT EDITOR (SE) — full editor com blocos separados
const SE={
  node:null,
  activeBlockIdx:0,

  openFor(uid){
    const node=App.state.nodes.find(n=>n.uid===uid);if(!node)return;
    this.node=node;
    const blocks=SCRIPT_DB[node.type]||SCRIPT_DB['_default'];
    document.getElementById('se-modal-title').textContent='✏️ Editor — '+(node.props.Name||node.type);
    document.getElementById('se-where-badge').textContent='📍 '+blocks.where;
    this.renderBlockList();
    this.selectBlock(0);
    openM('m-script-editor');
  },

  renderBlockList(){
    const list=document.getElementById('se-block-list');list.innerHTML='';
    const blocks=(SCRIPT_DB[this.node.type]||SCRIPT_DB['_default']).blocks;
    blocks.forEach((blk,i)=>{
      const el=document.createElement('div');el.className='se-block-item'+(i===this.activeBlockIdx?' active':'');
      el.id='se-bi-'+i;
      const typeColor={LocalScript:'#1a8cff',Script:'#3ecf8e',ModuleScript:'#9b42ff'}[blk.type]||'#6b7594';
      el.innerHTML=`<span class="se-block-ico" style="color:${typeColor}">▣</span><div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--txt)">${blk.name}</div><div style="font-size:8px;color:${typeColor};font-family:'JetBrains Mono',monospace">${blk.type}</div></div>`;
      el.onclick=()=>this.selectBlock(i);
      list.appendChild(el);
    });
    // Custom blocks
    if(this.node.customBlocks){
      this.node.customBlocks.forEach((blk,i)=>{
        const el=document.createElement('div');el.className='se-block-item';
        el.innerHTML=`<span class="se-block-ico" style="color:var(--purple)">✎</span><div style="flex:1"><div style="font-size:10px;font-weight:600;color:var(--txt)">${blk.name}</div><div style="font-size:8px;color:var(--dim)">Custom</div></div><span style="font-size:10px;color:var(--dark);cursor:pointer;padding:2px" onclick="SE.removeCustomBlock(${i});event.stopPropagation()">✕</span>`;
        el.onclick=()=>this.selectCustomBlock(i);list.appendChild(el);
      });
    }
  },

  selectBlock(i){
    this.activeBlockIdx=i;
    const blocks=(SCRIPT_DB[this.node.type]||SCRIPT_DB['_default']).blocks;
    const blk=blocks[i];if(!blk)return;
    document.querySelectorAll('.se-block-item').forEach((el,j)=>el.classList.toggle('active',j===i));
    document.getElementById('se-active-title').textContent=blk.name;
    // Update code area — with node props injected
    const code=this.injectProps(blk.code,this.node.props);
    document.getElementById('se-code-area').value=code;
    // Explain panel
    const ec=document.getElementById('se-explain-content');
    ec.innerHTML=blk.vars.map(v=>`<div class="se-var-row"><span class="se-var-name">${v.n}</span><span class="se-var-type">var</span><span class="se-var-desc">${v.d}</span></div>`).join('');
  },

  selectCustomBlock(i){
    if(!this.node.customBlocks||!this.node.customBlocks[i])return;
    const blk=this.node.customBlocks[i];
    document.getElementById('se-active-title').textContent=blk.name+' (custom)';
    document.getElementById('se-code-area').value=blk.code||'';
    document.getElementById('se-explain-content').innerHTML='<div style="font-size:10px;color:var(--dim)">Bloco personalizado — edite livremente.</div>';
  },

  injectProps(code,props){
    // Replace placeholders like ${p.Speed} with actual prop values
    let result=code;
    Object.entries(props).forEach(([k,v])=>{
      result=result.replace(new RegExp('\\$\\{p\\.'+k+'\\}','g'),v);
    });
    return result;
  },

  toggleExplain(){
    const p=document.getElementById('se-explain-panel');
    p.style.display=p.style.display==='none'?'block':'none';
  },

  saveBlock(){
    if(!this.node)return;
    const code=document.getElementById('se-code-area').value;
    const title=document.getElementById('se-active-title').textContent;
    if(!this.node.customBlocks)this.node.customBlocks=[];
    // Update if editing existing, or save as new
    this.node.script=code;
    App.nodes.renderOne(this.node);App.autosave.schedule();
    toast('💾 Bloco salvo no node!');
  },

  addBlock(){
    if(!this.node)return;
    const name=prompt('Nome do novo bloco:','Meu Script');if(!name)return;
    if(!this.node.customBlocks)this.node.customBlocks=[];
    this.node.customBlocks.push({name,code:'-- Seu código aqui\n'});
    this.renderBlockList();toast('📄 Bloco criado!');
  },

  removeCustomBlock(i){
    if(!this.node||!this.node.customBlocks)return;
    this.node.customBlocks.splice(i,1);this.renderBlockList();
  },

  async copyBlock(){
    const code=document.getElementById('se-code-area').value;
    try{await navigator.clipboard.writeText(code);document.getElementById('se-copy-ok').style.display='block';toast('📋 Bloco copiado!');setTimeout(()=>document.getElementById('se-copy-ok').style.display='none',2000)}
    catch(e){toast('Copie manualmente','e')}
  },

  async copyAll(){
    if(!this.node)return;
    const blocks=(SCRIPT_DB[this.node.type]||SCRIPT_DB['_default']).blocks;
    const allCode=['-- ═══════════════════════════════════════════','-- RoForger Studio — '+( this.node.props.Name||this.node.type),'-- Gerado em '+new Date().toLocaleString('pt-BR'),'-- ═══════════════════════════════════════════',''];
    blocks.forEach(blk=>{
      allCode.push('-- ─── '+blk.name+' ('+blk.type+') ───');
      allCode.push('-- 📍 Cole em: '+blk.where);
      allCode.push(this.injectProps(blk.code,this.node.props));
      allCode.push('');
    });
    if(this.node.customBlocks){
      this.node.customBlocks.forEach(blk=>{allCode.push('-- ─── '+blk.name+' (Custom) ───');allCode.push(blk.code||'');allCode.push('')});
    }
    const code=allCode.join('\n');
    try{await navigator.clipboard.writeText(code);document.getElementById('se-copy-ok').style.display='block';toast('📋 Todos os blocos copiados!');setTimeout(()=>document.getElementById('se-copy-ok').style.display='none',2000)}
    catch(e){toast('Copie manualmente','e')}
  }
};

// FOLDERS SYSTEM
const Folders={
  data:[], // [{id, name, open, scripts:[{id,name,type,nodeUid,code}]}]
  activeScript:null,

  init(){
    try{const raw=localStorage.getItem('rf-folders');if(raw)this.data=JSON.parse(raw)}catch(e){}
    this.render();
  },

  save(){
    try{localStorage.setItem('rf-folders',JSON.stringify(this.data))}catch(e){}
  },

  render(){
    const body=document.getElementById('pp-folders-body');if(!body)return;
    body.innerHTML='';
    if(!this.data.length){
      body.innerHTML='<div style="padding:20px 12px;text-align:center;color:var(--dark);font-size:10px;line-height:1.8">Nenhuma pasta criada.<br>Organize seus scripts<br>em pastas de projeto.</div>';
      return;
    }
    this.data.forEach((folder,fi)=>{
      const wrap=document.createElement('div');wrap.className='folder-item';
      const head=document.createElement('div');head.className='folder-head'+(folder.open?' open':'');
      head.innerHTML=`<span class="folder-chev">▶</span><span class="folder-icon">${folder.open?'📂':'📁'}</span><span class="folder-name">${folder.name}</span><span class="folder-count">${(folder.scripts||[]).length}</span><div class="folder-acts"><span class="folder-act" title="Renomear" onclick="Folders.renameFolder(${fi});event.stopPropagation()">✎</span><span class="folder-act" title="Novo script" onclick="Folders.newScriptIn(${fi});event.stopPropagation()">+</span><span class="folder-act danger" title="Excluir" onclick="Folders.deleteFolder(${fi});event.stopPropagation()">✕</span></div>`;
      head.onclick=()=>{folder.open=!folder.open;this.render()};
      wrap.appendChild(head);
      const ch=document.createElement('div');ch.className='folder-children';
      (folder.scripts||[]).forEach((scr,si)=>{
        const sel=this.activeScript&&this.activeScript.fi===fi&&this.activeScript.si===si;
        const el=document.createElement('div');el.className='script-item'+(sel?' active':'');
        const typeColor={LocalScript:'#1a8cff',Script:'#3ecf8e',ModuleScript:'#9b42ff'}[scr.type]||'#6b7594';
        el.innerHTML=`<span class="script-item-ico" style="color:${typeColor}">📄</span><span class="script-item-name">${scr.name}</span><span class="script-item-type" style="background:${typeColor}18;color:${typeColor}">${scr.type||'Script'}</span><div class="script-item-acts"><span class="folder-act" title="Renomear" onclick="Folders.renameScript(${fi},${si});event.stopPropagation()">✎</span><span class="folder-act danger" title="Excluir" onclick="Folders.deleteScript(${fi},${si});event.stopPropagation()">✕</span></div>`;
        el.onclick=()=>this.openScript(fi,si);
        ch.appendChild(el);
      });
      if(folder.open)head.classList.add('open');
      wrap.appendChild(ch);body.appendChild(wrap);
    });
  },

  newFolder(){
    const name=prompt('Nome da pasta:','Meu Projeto');if(!name)return;
    this.data.push({id:Date.now(),name,open:true,scripts:[]});
    this.save();this.render();toast('📁 Pasta criada!');
  },

  renameFolder(fi){
    const name=prompt('Novo nome:',this.data[fi].name);if(!name)return;
    this.data[fi].name=name;this.save();this.render();
  },

  deleteFolder(fi){
    if(!confirm('Excluir pasta "'+this.data[fi].name+'" e todos os scripts?'))return;
    this.data.splice(fi,1);this.save();this.render();
  },

  newScript(){
    if(!this.data.length){toast('Crie uma pasta primeiro!','w');return}
    const names=this.data.map((f,i)=>i+': '+f.name).join('\n');
    const idx=parseInt(prompt('Em qual pasta? (número)\n'+names,'0'));
    if(isNaN(idx))return;
    this.newScriptIn(idx);
  },

  newScriptIn(fi){
    const folder=this.data[fi];if(!folder)return;
    const name=prompt('Nome do script:','MeuScript');if(!name)return;
    const type=prompt('Tipo (Script / LocalScript / ModuleScript):','LocalScript')||'LocalScript';
    if(!folder.scripts)folder.scripts=[];
    folder.scripts.push({id:Date.now(),name,type,code:'-- '+name+'\n-- Tipo: '+type+'\n\n'});
    folder.open=true;this.save();this.render();
    this.openScript(fi,folder.scripts.length-1);
    toast('📄 Script criado!');
  },

  renameScript(fi,si){
    const name=prompt('Novo nome:',this.data[fi].scripts[si].name);if(!name)return;
    this.data[fi].scripts[si].name=name;this.save();this.render();
  },

  deleteScript(fi,si){
    if(!confirm('Excluir script "'+this.data[fi].scripts[si].name+'"?'))return;
    this.data[fi].scripts.splice(si,1);this.save();this.render();
  },

  openScript(fi,si){
    this.activeScript={fi,si};
    const scr=this.data[fi].scripts[si];
    // Open in script editor modal (reuse SE but for folder scripts)
    document.getElementById('se-modal-title').textContent='📄 '+scr.name+' — '+this.data[fi].name;
    document.getElementById('se-where-badge').textContent=scr.type;
    const list=document.getElementById('se-block-list');list.innerHTML='';
    const el=document.createElement('div');el.className='se-block-item active';
    el.innerHTML=`<span class="se-block-ico" style="color:var(--purple)">📄</span><div><div style="font-size:10px;font-weight:600;color:var(--txt)">${scr.name}</div><div style="font-size:8px;color:var(--dim)">${scr.type}</div></div>`;
    list.appendChild(el);
    document.getElementById('se-active-title').textContent=scr.name;
    document.getElementById('se-code-area').value=scr.code||'';
    document.getElementById('se-explain-content').innerHTML='<div style="font-size:10px;color:var(--dim)">Script de pasta — edite livremente e clique em Salvar.</div>';
    // Override save to save to folder
    SE.node=null;SE._folderRef={fi,si};
    openM('m-script-editor');
    this.render();
  },

  saveActiveScript(code){
    if(!this._folderRef)return;
    const{fi,si}=this._folderRef||{};
    if(fi===undefined||!this.data[fi])return;
    this.data[fi].scripts[si].code=code;
    this.save();toast('💾 Script salvo!');
  }
};
// Extend SE.saveBlock to also handle folder scripts
const _origSaveBlock=SE.saveBlock.bind(SE);
SE.saveBlock=function(){
  if(Folders._folderRef){const code=document.getElementById('se-code-area').value;Folders.saveActiveScript(code);return}
  _origSaveBlock();
};

App.scripts={
  openForSelected(){if(App.state.selId)this.openEditorFor(App.state.selId)},
  openFor(uid){this.openEditorFor(uid)},
  openEditorFor(uid){SE.openFor(uid)},
  openGlobal(){
    if(!App.state.nodes.length){toast('⚠️ Adicione elementos primeiro!','w');return}
    const L=['-- RoForger Studio — Projeto Completo','-- '+App.state.nodes.length+' sistemas · '+new Date().toLocaleString('pt-BR'),'-- 📍 Cole em ServerScriptService ou StarterPlayerScripts',''];
    App.state.nodes.forEach(n=>{L.push('-- ─── '+n.icon+' '+(n.props.Name||n.type)+' ───');if(n.script)L.push(n.script);else L.push('print("[RoForger] '+(n.props.Name||n.type)+' ativo")');L.push('')});
    const code=L.join('\n');document.getElementById('gmodal-pre').innerHTML=syntaxHL(code);window._globalScript=code;openM('m-global');
  },
  async copyGlobal(){try{await navigator.clipboard.writeText(window._globalScript||'');document.getElementById('gcopy-ok').style.display='block';toast('✓ Copiado!');setTimeout(()=>document.getElementById('gcopy-ok').style.display='none',2000)}catch(e){}}
};

App.project={
  clear(){if(!App.state.nodes.length)return;if(!confirm('Limpar canvas?'))return;App.state.nodes.forEach(n=>{const d=document.getElementById('n-'+n.uid);if(d)d.remove()});App.state.nodes=[];App.state.selId=null;App.props.render();App.nodes.upCount();App.autosave.save()},
  exportJSON(){const d=JSON.stringify({v4:true,nodes:App.state.nodes,fx:App.state.savedFx,c:{x:App.state.cx,y:App.state.cy,z:App.state.cz}},null,2);const b=new Blob([d],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='roforger-projeto.json';a.click();toast('📤 Exportado!')},
  importJSON(){const input=document.createElement('input');input.type='file';input.accept='.json';input.onchange=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{try{const d=JSON.parse(ev.target.result);App.state.nodes.forEach(n=>{const el=document.getElementById('n-'+n.uid);if(el)el.remove()});App.state.nodes=d.nodes||[];App.state.savedFx=d.fx||[];App.state.nc=Math.max(...(App.state.nodes.map(n=>n.uid)||[0]),0)+1;if(d.c){App.state.cx=d.c.x||0;App.state.cy=d.c.y||0;App.state.cz=d.c.z||1}App.state.nodes.forEach(n=>App.nodes.renderOne(n));App.nodes.upCount();App.canvas.upTf();toast('📥 Importado! '+App.state.nodes.length+' elementos','i')}catch(err){toast('Arquivo inválido','e')}};reader.readAsText(file)};input.click()}
};

App.autosave={
  _t:null,
  init(){setInterval(()=>this.save(),10000)},
  schedule(){clearTimeout(this._t);this._t=setTimeout(()=>this.save(),2000)},
  save(){
    if(!App.state.nodes.length&&!App.state.savedFx.length)return;
    try{
      const data=JSON.stringify({v4:true,nodes:App.state.nodes,fx:App.state.savedFx,nc:App.state.nc,c:{x:App.state.cx,y:App.state.cy,z:App.state.cz}});
      const projKey=(function(){try{const p=JSON.parse(sessionStorage.getItem('rf_current_project'));return p&&p.id?'roforger-proj-'+p.id:null;}catch(e){return null;}})();
      if(projKey)localStorage.setItem(projKey,data);
      localStorage.setItem('roforger-v4',data);
      const i=document.getElementById('autosave-ind');i.classList.add('show');setTimeout(()=>i.classList.remove('show'),1500);
    }catch(e){}
  }
};

App.loadFromStorage=function(){
  try{
    const projKey=(function(){try{const p=JSON.parse(sessionStorage.getItem('rf_current_project'));return p&&p.id?'roforger-proj-'+p.id:null;}catch(e){return null;}})();
    const raw=(projKey&&localStorage.getItem(projKey))||localStorage.getItem('roforger-v4');
    if(!raw)return;
    const d=JSON.parse(raw);
    if(!d||!d.nodes||!d.nodes.length)return;
    App.state.nodes=d.nodes;App.state.savedFx=d.fx||[];
    App.state.nc=d.nc||(Math.max(...d.nodes.map(n=>n.uid),0)+1);
    if(d.c){App.state.cx=d.c.x||0;App.state.cy=d.c.y||0;App.state.cz=d.c.z||1}
    App.state.nodes.forEach(n=>App.nodes.renderOne(n));App.nodes.upCount();App.canvas.upTf();
    toast('💾 Canvas restaurado — '+App.state.nodes.length+' elementos','i');
  }catch(e){}
};

App.shortcuts={
  init(){
    document.addEventListener('keydown',e=>{
      if(['INPUT','TEXTAREA','SELECT'].includes((document.activeElement && document.activeElement.tagName))){if(e.key==='Escape')document.activeElement.blur();return}
      const ctrl=e.ctrlKey||e.metaKey;
      if(ctrl&&e.key==='k'){e.preventDefault();Cmd.open()}
      if(ctrl&&e.key==='z'){e.preventDefault();History.undo()}
      if(ctrl&&e.key==='y'){e.preventDefault();History.redo()}
      if(ctrl&&e.key==='d'){e.preventDefault();App.nodes.duplicateSelected()}
      if(ctrl&&e.key==='s'){e.preventDefault();App.autosave.save();toast('💾 Salvo localmente!')}
      if(e.key==='Delete'||e.key==='Backspace')App.nodes.deleteSelected();
      if(e.key==='Escape'){App.nodes.deselect();Cmd.close();closeM('m-script');closeM('m-global')}
    });
  }
};

// ═══ SCRIPT TABS ═══
function switchStab(btn,id){
  document.querySelectorAll('.stab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.stab-body').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');document.getElementById(id).classList.add('active');
  if(id==='s-output')App.scripts.generate&&App.scripts.generate();
}
function insertSnippet(type){const s={click:`element.MouseButton1Click:Connect(function()\n  \nend)`,tween:`local tw = TweenService:Create(element, TweenInfo.new(0.5), {})\ntw:Play()`,remote:`local re = game.ReplicatedStorage:WaitForChild("MeuEvento")\nre:FireServer("argumento")`,sound:`local s = Instance.new("Sound"); s.SoundId = "rbxassetid://0"; s.Parent = workspace; s:Play()`,ds:`local DS = game:GetService("DataStoreService"):GetDataStore("Store")\nDS:SetAsync(key, value)`};const ta=document.getElementById('code-area');const pos=ta.selectionStart||0;ta.value=ta.value.slice(0,pos)+'\n'+s[type]+'\n'+ta.value.slice(pos)}

// ═══ CMD PALETTE ═══
const Cmd={
  open(){openM('cmd-pal');const i=document.getElementById('cmd-in');i.value='';i.focus();this.search('')},
  close(){closeM('cmd-pal')},
  search(q){
    const r=document.getElementById('cmd-res');r.innerHTML='';
    const all=[
      ...DATA.explorer.flatMap(g=>g.items.map(i=>({icon:i.icon,name:i.name,desc:g.group+' · '+i.desc,color:i.color,action:()=>{App.nodes.add(i.id,100+App.state.nodes.length*35,100);this.close()}}))),
      ...DATA.systems.flatMap(c=>c.items.map(i=>({icon:i.icon,name:i.name+' (código)',desc:c.cat+' · '+i.desc,color:i.color,action:()=>{App.systems.copyItem(i.id);this.close()}}))),
      {icon:'🗑',name:'Limpar Canvas',desc:'Remove todos os elementos',action:()=>{App.project.clear();this.close()}},
      {icon:'⚡',name:'Gerar Script Completo',desc:'Script de todos os elementos',action:()=>{App.scripts.openGlobal();this.close()}},
      {icon:'↩',name:'Desfazer',desc:'Ctrl+Z',action:()=>{History.undo();this.close()}},
      {icon:'📦',name:'Ver Sistemas Prontos',desc:'Aba de sistemas',action:()=>{App.switchView('systems',document.querySelectorAll('.main-tab')[1]);this.close()}},
      {icon:'⚡',name:'Gerador de Scripts',desc:'Gerar Lua com explicação',action:()=>{const t=document.querySelectorAll('.main-tab');for(let i=0;i<t.length;i++){if(t[i].textContent.includes('Gerador')){App.switchView('gerador',t[i]);break;}}this.close()}},
      {icon:'🎓',name:'Aprender Roblox',desc:'Tutoriais de scripting',action:()=>{const t=document.querySelectorAll('.main-tab');for(let i=0;i<t.length;i++){if(t[i].textContent.includes('Aprender')){App.switchView('aprender',t[i]);break;}}this.close()}},
      {icon:'🎮',name:'Templates de Jogos',desc:'Simulator, Obby, RPG, Tycoon',action:()=>{const t=document.querySelectorAll('.main-tab');for(let i=0;i<t.length;i++){if(t[i].textContent.includes('Jogos')){App.switchView('game-templates',t[i]);break;}}this.close()}},
      {icon:'✨',name:'Ver Efeitos',desc:'Aba de efeitos',action:()=>{App.switchView('effects',document.querySelectorAll('.main-tab')[2]);this.close()}},
    ];
    const filtered=q?all.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())||(i.desc||'').toLowerCase().includes(q.toLowerCase())):all.slice(0,14);
    filtered.forEach(item=>{const d=document.createElement('div');d.className='cmd-item';d.innerHTML=`<div class="cmd-item-ico" style="background:${item.color||'rgba(255,77,26,.08)'};color:${item.color||'var(--acc)'}">${item.icon}</div><div><div class="cmd-item-name">${item.name}</div><div class="cmd-item-desc">${item.desc||''}</div></div>`;d.onclick=()=>{item.action();this.close()};r.appendChild(d)});
  },
  onKey(e){if(e.key==='Escape')this.close();if(e.key==='Enter'){const f=document.querySelector('.cmd-item');if(f)f.click()}}
};
document.getElementById('cmd-pal').addEventListener('click',e=>{if(e.target.id==='cmd-pal')Cmd.close()});

// ═══ SYNTAX HIGHLIGHT ═══
function syntaxHL(code){return code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/(--[^\n]*)/g,'<span class="lua-cmt">$1</span>').replace(/\b(local|function|end|if|then|else|elseif|return|for|in|do|while|repeat|until|not|and|or|break|task|pcall|ipairs|pairs)\b/g,'<span class="lua-kw">$1</span>').replace(/\b(true|false|nil)\b/g,'<span class="lua-bool">$1</span>').replace(/("(?:[^"\\]|\\.)*")/g,'<span class="lua-str">$1</span>').replace(/\b(\d+(\.\d+)?)\b/g,'<span class="lua-num">$1</span>')}

(function(){
  document.addEventListener('contextmenu',e=>{if(e.target.closest('#inf-canvas,#canvas-vp,.cnode'))e.preventDefault()});
  document.addEventListener('copy',e=>{if(document.activeElement&&document.activeElement.closest&&document.activeElement.closest('#inf-canvas'))e.preventDefault()});
  Object.defineProperty(window,'_rf',{value:'RoForger Studio',writable:false,enumerable:false});
})();
(function(){
  const _mr=App.minimap.render.bind(App.minimap);
  let _mp=false;
  App.minimap.render=()=>{if(_mp)return;_mp=true;requestAnimationFrame(()=>{_mr();_mp=false})};
  const _dm=App.nodes.dragMove.bind(App.nodes);
  let _df=null;
  App.nodes.dragMove=function(e){if(_df)return;_df=requestAnimationFrame(()=>{_dm(e);_df=null})};
})();


// ════════════════════════════════════════════
//  GERADOR DE SCRIPTS — Gen
// ════════════════════════════════════════════
const GEN_DATA = {
  cats: [
    {id:'movimento',label:'🏃 Movimento',color:'#4d8fff'},
    {id:'combate',label:'⚔️ Combate',color:'#ff4d1a'},
    {id:'economia',label:'💰 Economia',color:'#ffd600'},
    {id:'dados',label:'💾 DataStore',color:'#00ff9d'},
    {id:'mundo',label:'🌍 Mundo',color:'#06b6d4'},
    {id:'ui',label:'🖥️ Interface',color:'#9b42ff'},
    {id:'admin',label:'🛡 Admin',color:'#8b949e'},
  ],
  systems: [
    {id:'walkspeed',cat:'movimento',icon:'👟',name:'WalkSpeed & Pulo',desc:'Configura velocidade e altura do pulo',type:'LocalScript',where:'StarterCharacterScripts',
     path:['StarterPlayer','└ StarterCharacterScripts','   └📜 WalkSpeed (LocalScript)'],
     explain:'Este script roda no cliente de cada jogador. O Humanoid controla movimentação. WalkSpeed padrão do Roblox é 16. JumpPower padrão é 50.',
     configs:['WalkSpeed (padrão: 16)','JumpPower (padrão: 50)'],
     code:`-- WalkSpeed & Pulo
-- Coloque em: StarterPlayer > StarterCharacterScripts
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

-- ⚙️ CONFIGURAÇÕES
local WALK_SPEED = 20     -- velocidade de caminhada
local JUMP_POWER = 55     -- altura do pulo

humanoid.WalkSpeed = WALK_SPEED
humanoid.JumpPower = JUMP_POWER

print("[WalkSpeed] Configurado: " .. WALK_SPEED .. " | Pulo: " .. JUMP_POWER)`},

    {id:'sprint',cat:'movimento',icon:'🏃',name:'Sistema de Sprint',desc:'Shift para correr, stamina que regenera',type:'LocalScript',where:'StarterCharacterScripts',
     path:['StarterPlayer','└ StarterCharacterScripts','   └📜 Sprint (LocalScript)'],
     explain:'Usa UserInputService para detectar Shift. Stamina cai ao correr e regenera ao parar. Se stamina zerar, o sprint para automaticamente.',
     configs:['WALK_SPEED','SPRINT_SPEED','STAMINA_MAX','STAMINA_DRAIN (por segundo)','STAMINA_REGEN (por segundo)'],
     code:`-- Sistema de Sprint com Stamina
-- Coloque em: StarterPlayer > StarterCharacterScripts
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local char = player.Character or player.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")

-- ⚙️ CONFIGURAÇÕES
local WALK_SPEED   = 16
local SPRINT_SPEED = 28
local STAMINA_MAX  = 100
local STAMINA_DRAIN = 20   -- por segundo
local STAMINA_REGEN = 10   -- por segundo

local stamina = STAMINA_MAX
local sprinting = false

UIS.InputBegan:Connect(function(input, gp)
    if gp then return end
    if input.KeyCode == Enum.KeyCode.LeftShift and stamina > 0 then
        sprinting = true
        hum.WalkSpeed = SPRINT_SPEED
    end
end)

UIS.InputEnded:Connect(function(input)
    if input.KeyCode == Enum.KeyCode.LeftShift then
        sprinting = false
        hum.WalkSpeed = WALK_SPEED
    end
end)

RunService.Heartbeat:Connect(function(dt)
    if sprinting and stamina > 0 then
        stamina = math.max(0, stamina - STAMINA_DRAIN * dt)
        if stamina == 0 then
            sprinting = false
            hum.WalkSpeed = WALK_SPEED
        end
    elseif not sprinting and stamina < STAMINA_MAX then
        stamina = math.min(STAMINA_MAX, stamina + STAMINA_REGEN * dt)
    end
end)`},

    {id:'doubleJump',cat:'movimento',icon:'🦘',name:'Double Jump',desc:'Pulo duplo com efeito de partícula',type:'LocalScript',where:'StarterCharacterScripts',
     path:['StarterPlayer','└ StarterCharacterScripts','   └📜 DoubleJump (LocalScript)'],
     explain:'Escuta mudanças de estado do Humanoid. Quando o jogador salta, permite um segundo salto. Ao aterrissar, reseta.',
     configs:['DOUBLE_JUMP_POWER (força do 2° pulo)'],
     code:`-- Double Jump
-- Coloque em: StarterPlayer > StarterCharacterScripts
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local char = player.Character or player.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")
local hrp = char:WaitForChild("HumanoidRootPart")

-- ⚙️ CONFIGURAÇÕES
local DOUBLE_JUMP_POWER = 50

local jumped = false
local canDouble = false

hum.StateChanged:Connect(function(_, new)
    if new == Enum.HumanoidStateType.Jumping then
        jumped = true
        canDouble = true
    elseif new == Enum.HumanoidStateType.Landed then
        jumped = false
        canDouble = false
    end
end)

UIS.JumpRequest:Connect(function()
    if jumped and canDouble then
        canDouble = false
        local vel = hrp.Velocity
        hrp.Velocity = Vector3.new(vel.X, DOUBLE_JUMP_POWER, vel.Z)
    end
end)`},

    {id:'dash',cat:'movimento',icon:'💨',name:'Sistema de Dash',desc:'Tecla Q para dash com cooldown',type:'LocalScript',where:'StarterCharacterScripts',
     path:['StarterPlayer','└ StarterCharacterScripts','   └📜 Dash (LocalScript)'],
     explain:'Detecta tecla Q. O dash aplica velocidade na direção do movimento. Cooldown impede spam. Se o jogador não estiver se movendo, usa a direção que ele olha.',
     configs:['DASH_POWER (força)','COOLDOWN (segundos)','DASH_KEY (tecla padrão: Q)'],
     code:`-- Sistema de Dash
-- Coloque em: StarterPlayer > StarterCharacterScripts
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local char = player.Character or player.CharacterAdded:Wait()
local hrp = char:WaitForChild("HumanoidRootPart")
local hum = char:WaitForChild("Humanoid")

-- ⚙️ CONFIGURAÇÕES
local DASH_POWER = 60
local COOLDOWN = 1.2
local DASH_KEY = Enum.KeyCode.Q

local canDash = true

UIS.InputBegan:Connect(function(input, gp)
    if gp or not canDash then return end
    if input.KeyCode == DASH_KEY then
        canDash = false
        local dir = hum.MoveDirection
        if dir.Magnitude < 0.1 then
            dir = hrp.CFrame.LookVector
        end
        hrp.Velocity = dir * DASH_POWER
        task.wait(COOLDOWN)
        canDash = true
    end
end)`},

    {id:'sword',cat:'combate',icon:'⚔️',name:'Espada (Melee)',desc:'Arma corpo a corpo com combo e cooldown',type:'Script',where:'ServerScriptService',
     path:['ServerScriptService','└📜 SwordSystem (Script)'],
     explain:'Script de servidor que gerencia dano. O cliente envia um RemoteEvent quando ataca. O servidor valida distância e aplica dano. Nunca confie no cliente para dano.',
     configs:['DAMAGE (padrão: 25)','RANGE (alcance em studs)','COOLDOWN (segundos entre ataques)'],
     code:`-- Sistema de Espada (Servidor)
-- Coloque em: ServerScriptService
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- ⚙️ CONFIGURAÇÕES
local DAMAGE   = 25
local RANGE    = 6
local COOLDOWN = 0.5

-- Cria RemoteEvent se não existir
local RE = ReplicatedStorage:FindFirstChild("SwordAttack")
    or Instance.new("RemoteEvent", ReplicatedStorage)
RE.Name = "SwordAttack"

local cooldowns = {}

RE.OnServerEvent:Connect(function(player)
    local now = tick()
    if cooldowns[player] and now - cooldowns[player] < COOLDOWN then return end
    cooldowns[player] = now

    local char = player.Character
    if not char then return end
    local hrp = char:FindFirstChild("HumanoidRootPart")
    if not hrp then return end

    -- Detecta inimigos no alcance
    for _, other in ipairs(Players:GetPlayers()) do
        if other ~= player and other.Character then
            local otherHRP = other.Character:FindFirstChild("HumanoidRootPart")
            local otherHum = other.Character:FindFirstChild("Humanoid")
            if otherHRP and otherHum then
                local dist = (hrp.Position - otherHRP.Position).Magnitude
                if dist <= RANGE then
                    otherHum:TakeDamage(DAMAGE)
                end
            end
        end
    end
end)

Players.PlayerRemoving:Connect(function(p) cooldowns[p] = nil end)`},

    {id:'gun',cat:'combate',icon:'🔫',name:'Arma de Fogo',desc:'Tiro com raycast, ammo e recarga',type:'LocalScript',where:'StarterCharacterScripts',
     path:['StarterPlayer','└ StarterCharacterScripts','   └📜 GunSystem (LocalScript)'],
     explain:'Usa Raycast para hit-scan (projétil instantâneo). Clique atira, R recarrega. Ammo é controlado no cliente, dano validado no servidor via RemoteEvent.',
     configs:['DAMAGE','FIRE_RATE (segundos entre tiros)','AMMO (munição)','RELOAD_TIME'],
     code:`-- Arma de Fogo (Cliente)
-- Coloque em: StarterPlayer > StarterCharacterScripts
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local mouse = player:GetMouse()

-- ⚙️ CONFIGURAÇÕES
local DAMAGE      = 30
local FIRE_RATE   = 0.15
local AMMO        = 30
local RELOAD_TIME = 2.0

local currentAmmo = AMMO
local canShoot = true
local reloading = false

local RE = ReplicatedStorage:WaitForChild("GunHit", 5)

mouse.Button1Down:Connect(function()
    if not canShoot or reloading or currentAmmo <= 0 then
        if currentAmmo <= 0 and not reloading then
            print("Sem munição! Pressione R para recarregar.")
        end
        return
    end
    canShoot = false
    currentAmmo -= 1
    print("Tiro! Ammo: " .. currentAmmo .. "/" .. AMMO)

    -- Raycast
    local unitRay = workspace.CurrentCamera:ScreenPointToRay(mouse.X, mouse.Y)
    local result = workspace:Raycast(unitRay.Origin, unitRay.Direction * 500)
    if result and RE then
        RE:FireServer(result.Instance, DAMAGE)
    end

    task.wait(FIRE_RATE)
    canShoot = true
end)

UIS.InputBegan:Connect(function(input, gp)
    if gp then return end
    if input.KeyCode == Enum.KeyCode.R and not reloading then
        reloading = true
        print("Recarregando...")
        task.wait(RELOAD_TIME)
        currentAmmo = AMMO
        reloading = false
        print("Recarregado!")
    end
end)`},

    {id:'leaderstats',cat:'dados',icon:'🏆',name:'Leaderstats',desc:'Placar com Coins, XP e Level',type:'Script',where:'ServerScriptService',
     path:['ServerScriptService','└📜 Leaderstats (Script)'],
     explain:'O folder "leaderstats" dentro do Player é reconhecido automaticamente pelo Roblox e exibe o placar no lado direito da tela. Sempre inicializado no servidor.',
     configs:['Nomes dos stats (Coins, XP, Level)','Valores iniciais'],
     code:`-- Leaderstats
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    -- ⚙️ O folder DEVE se chamar "leaderstats"
    local ls = Instance.new("Folder")
    ls.Name = "leaderstats"
    ls.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = ls

    local xp = Instance.new("IntValue")
    xp.Name = "XP"
    xp.Value = 0
    xp.Parent = ls

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = ls

    print("[Leaderstats] " .. player.Name .. " entrou com stats.")
end)`},

    {id:'datastore',cat:'dados',icon:'💾',name:'DataStore (Salvar/Carregar)',desc:'Salva dados do jogador no servidor do Roblox',type:'Script',where:'ServerScriptService',
     path:['ServerScriptService','└📜 DataStore (Script)'],
     explain:'DataStoreService salva dados permanentemente no servidor do Roblox. IMPORTANTE: ative "Enable Studio Access to API Services" nas configurações do jogo. Use pcall() para evitar crashes.',
     configs:['STORE_NAME (nome do DataStore)','Campos salvos (Coins, XP, Level)'],
     code:`-- DataStore — Salvar e Carregar
-- Coloque em: ServerScriptService
-- ATIVE: Game Settings > Security > Enable Studio Access to API Services

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

-- ⚙️ CONFIGURAÇÕES
local STORE_NAME = "PlayerData_v1"
local store = DataStoreService:GetDataStore(STORE_NAME)

local function loadData(player)
    local key = "player_" .. player.UserId
    local ok, data = pcall(function()
        return store:GetAsync(key)
    end)

    local ls = player:WaitForChild("leaderstats")

    if ok and data then
        ls.Coins.Value = data.Coins or 0
        ls.XP.Value    = data.XP    or 0
        ls.Level.Value = data.Level or 1
        print("[DataStore] " .. player.Name .. " carregado.")
    else
        print("[DataStore] Dados novos para " .. player.Name)
    end
end

local function saveData(player)
    local ls = player:FindFirstChild("leaderstats")
    if not ls then return end
    local key = "player_" .. player.UserId
    local data = {
        Coins = ls.Coins.Value,
        XP    = ls.XP.Value,
        Level = ls.Level.Value,
    }
    local ok, err = pcall(function()
        store:SetAsync(key, data)
    end)
    if ok then
        print("[DataStore] " .. player.Name .. " salvo.")
    else
        warn("[DataStore] ERRO ao salvar " .. player.Name .. ": " .. tostring(err))
    end
end

Players.PlayerAdded:Connect(function(player)
    -- Espera leaderstats ser criado por outro script
    task.wait(0.5)
    loadData(player)
end)

Players.PlayerRemoving:Connect(saveData)

-- Auto-save a cada 5 minutos
task.spawn(function()
    while true do
        task.wait(300)
        for _, p in ipairs(Players:GetPlayers()) do
            saveData(p)
        end
    end
end)`},

    {id:'moeda',cat:'economia',icon:'💰',name:'Sistema de Moedas',desc:'Coleta moedas no mapa, atualiza leaderstats',type:'Script',where:'ServerScriptService',
     path:['Workspace','└ Coins (Folder com partes)','ServerScriptService','└📜 CoinSystem (Script)'],
     explain:'Usa CollectionService para marcar partes como moedas com a tag "Coin". Quando um jogador toca, ganha coins e a moeda reaparece após cooldown.',
     configs:['COIN_VALUE (quanto cada moeda vale)','RESPAWN_TIME (segundos para reaparecer)'],
     code:`-- Sistema de Moedas
-- Coloque em: ServerScriptService
-- Marque suas partes com a Tag "Coin" no TagEditor
local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")

-- ⚙️ CONFIGURAÇÕES
local COIN_VALUE   = 10
local RESPAWN_TIME = 5

local function setupCoin(coin)
    coin.Touched:Connect(function(hit)
        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if not player then return end
        local ls = player:FindFirstChild("leaderstats")
        if not ls then return end
        local coins = ls:FindFirstChild("Coins")
        if not coins then return end

        if not coin:GetAttribute("Collecting") then
            coin:SetAttribute("Collecting", true)
            coins.Value += COIN_VALUE
            coin.Transparency = 1
            coin.CanCollide = false
            task.wait(RESPAWN_TIME)
            coin.Transparency = 0
            coin.CanCollide = true
            coin:SetAttribute("Collecting", false)
        end
    end)
end

-- Configura todas as moedas com a tag "Coin"
for _, coin in ipairs(CollectionService:GetTagged("Coin")) do
    setupCoin(coin)
end
CollectionService:GetInstanceAddedSignal("Coin"):Connect(setupCoin)`},

    {id:'teleporte',cat:'mundo',icon:'🌀',name:'Sistema de Teleporte',desc:'Portal que teleporta ao tocar',type:'Script',where:'ServerScriptService',
     path:['Workspace','└ TeleportPad (Part)','Workspace','└ TeleportDest (Part)','ServerScriptService','└📜 Teleport (Script)'],
     explain:'O jogador toca o TeleportPad e é teletransportado ao TeleportDest. Cooldown evita loop de teleporte. Pode usar múltiplos pads numerando: TeleportPad1, TeleportDest1.',
     configs:['COOLDOWN (segundos entre teleportes)','Nomes das partes no Workspace'],
     code:`-- Sistema de Teleporte
-- Coloque em: ServerScriptService
-- Crie no Workspace: TeleportPad e TeleportDest (Parts)
local Players = game:GetService("Players")

-- ⚙️ CONFIGURAÇÕES
local COOLDOWN = 2

local pad  = workspace:WaitForChild("TeleportPad")
local dest = workspace:WaitForChild("TeleportDest")

local onCooldown = {}

pad.Touched:Connect(function(hit)
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end
    if onCooldown[player] then return end

    local hrp = player.Character:FindFirstChild("HumanoidRootPart")
    if hrp then
        onCooldown[player] = true
        hrp.CFrame = dest.CFrame + Vector3.new(0, 3, 0)
        task.wait(COOLDOWN)
        onCooldown[player] = nil
    end
end)

Players.PlayerRemoving:Connect(function(p) onCooldown[p] = nil end)`},

    {id:'daynight',cat:'mundo',icon:'🌅',name:'Ciclo Dia/Noite',desc:'Ciclo de dia e noite automático',type:'Script',where:'ServerScriptService',
     path:['ServerScriptService','└📜 DayNight (Script)'],
     explain:'Usa Lighting.ClockTime para controlar a hora. O loop avança o tempo e o Roblox renderiza automaticamente o sol, lua e iluminação correta.',
     configs:['CYCLE_MINUTES (duração do ciclo completo)','START_HOUR (hora inicial, 0-24)'],
     code:`-- Ciclo Dia/Noite
-- Coloque em: ServerScriptService
local Lighting = game:GetService("Lighting")

-- ⚙️ CONFIGURAÇÕES
local CYCLE_MINUTES = 20   -- duração do ciclo em minutos reais
local START_HOUR    = 8    -- hora do Roblox ao iniciar

Lighting.ClockTime = START_HOUR

-- Velocidade: 24 horas / (ciclo em segundos)
local speed = 24 / (CYCLE_MINUTES * 60)

while true do
    Lighting.ClockTime = (Lighting.ClockTime + speed) % 24
    task.wait(1)
end`},

    {id:'admincmds',cat:'admin',icon:'🛡',name:'Comandos Admin',desc:'Chat commands para admins: /kick /ban /tp',type:'Script',where:'ServerScriptService',
     path:['ServerScriptService','└📜 AdminSystem (Script)'],
     explain:'Detecta mensagens de chat. Verifica se o UserId do remetente está na lista de admins. Comandos: /kick nome, /tp nome, /speed nome valor.',
     configs:['ADMIN_IDS (lista de UserIds dos admins)','PREFIX (padrão: /)'],
     code:`-- Comandos Admin
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")

-- ⚙️ CONFIGURAÇÕES — adicione seus UserIds aqui
local ADMIN_IDS = {
    123456789,  -- substitua pelo seu UserId
}
local PREFIX = "/"

local function isAdmin(player)
    for _, id in ipairs(ADMIN_IDS) do
        if player.UserId == id then return true end
    end
    return false
end

local function findPlayer(name)
    name = name:lower()
    for _, p in ipairs(Players:GetPlayers()) do
        if p.Name:lower():find(name) then return p end
    end
end

Players.PlayerAdded:Connect(function(player)
    player.Chatted:Connect(function(msg)
        if not isAdmin(player) then return end
        local parts = msg:split(" ")
        local cmd = parts[1]:lower()

        if cmd == PREFIX.."kick" and parts[2] then
            local target = findPlayer(parts[2])
            if target then target:Kick("Expulso por admin.") end

        elseif cmd == PREFIX.."tp" and parts[2] then
            local target = findPlayer(parts[2])
            if target and player.Character and target.Character then
                local hrp = target.Character:FindFirstChild("HumanoidRootPart")
                local myHRP = player.Character:FindFirstChild("HumanoidRootPart")
                if hrp and myHRP then hrp.CFrame = myHRP.CFrame end
            end

        elseif cmd == PREFIX.."speed" and parts[2] and parts[3] then
            local target = findPlayer(parts[2])
            local speed = tonumber(parts[3])
            if target and speed and target.Character then
                local hum = target.Character:FindFirstChild("Humanoid")
                if hum then hum.WalkSpeed = speed end
            end
        end
    end)
end)`},
  ]
};

const Gen = {
  current: null,

  init() {
    // Build category filter sidebar
    const catsEl = document.getElementById('gen-cats');
    catsEl.innerHTML = '';
    const allBtn = document.createElement('div');
    allBtn.className = 'gen-cat-btn active';
    allBtn.style.cssText = 'padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;color:var(--txt);font-family:"JetBrains Mono",monospace;display:flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.1);background:var(--card)';
    allBtn.textContent = '🔘 Todos';
    allBtn.onclick = () => { Gen.filterCat(null, allBtn); };
    catsEl.appendChild(allBtn);
    GEN_DATA.cats.forEach(cat => {
      const btn = document.createElement('div');
      btn.className = 'gen-cat-btn';
      btn.style.cssText = 'padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;color:var(--dim);font-family:"JetBrains Mono",monospace;display:flex;align-items:center;gap:6px;border:1px solid transparent;transition:all .15s';
      btn.textContent = cat.label;
      btn.onclick = () => { Gen.filterCat(cat.id, btn); };
      btn.onmouseenter = () => { if(!btn.classList.contains('active')) btn.style.background = 'var(--hover)'; };
      btn.onmouseleave = () => { if(!btn.classList.contains('active')) btn.style.background = ''; };
      catsEl.appendChild(btn);
    });

    // Quick chips on empty state
    const chips = document.getElementById('gen-quick-chips');
    if(chips) {
      const quick = ['WalkSpeed','Sprint','Leaderstats','DataStore','Espada','Teleporte'];
      chips.innerHTML = quick.map(q => {
        const sys = GEN_DATA.systems.find(s => s.name.toLowerCase().includes(q.toLowerCase()));
        return sys ? `<span onclick="Gen.select('${sys.id}')" style="padding:6px 14px;border:1px solid rgba(255,255,255,.12);border-radius:20px;cursor:pointer;font-size:11px;color:var(--dim);font-family:'JetBrains Mono',monospace;transition:all .15s" onmouseenter="this.style.borderColor='var(--acc)';this.style.color='var(--acc2)'" onmouseleave="this.style.borderColor='rgba(255,255,255,.12)';this.style.color='var(--dim)'">${q}</span>` : '';
      }).join('');
    }

    Gen.renderList(GEN_DATA.systems);
  },

  renderList(systems) {
    const list = document.getElementById('gen-list');
    list.innerHTML = '';
    systems.forEach(sys => {
      const d = document.createElement('div');
      d.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 14px;cursor:pointer;color:var(--dim);font-size:11px;transition:all .15s;border-left:2px solid transparent';
      d.id = 'genitem-' + sys.id;
      d.innerHTML = `<span style="font-size:16px">${sys.icon}</span><div><div style="color:var(--txt);font-weight:600">${sys.name}</div><div style="font-size:9px;color:var(--dark);font-family:'JetBrains Mono',monospace;margin-top:1px">${sys.desc}</div></div>`;
      d.onclick = () => Gen.select(sys.id);
      d.onmouseenter = () => { d.style.background = 'var(--hover)'; d.style.color = 'var(--txt)'; };
      d.onmouseleave = () => { if(Gen.current?.id !== sys.id) { d.style.background = ''; } };
      list.appendChild(d);
    });
  },

  filterCat(catId, btn) {
    document.querySelectorAll('.gen-cat-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.color = 'var(--dim)';
      b.style.borderColor = 'transparent';
    });
    btn.classList.add('active');
    btn.style.background = 'var(--card)';
    btn.style.color = 'var(--txt)';
    btn.style.borderColor = 'rgba(255,255,255,.1)';
    const filtered = catId ? GEN_DATA.systems.filter(s => s.cat === catId) : GEN_DATA.systems;
    Gen.renderList(filtered);
  },

  filter(q) {
    q = q.toLowerCase().trim();
    const filtered = q ? GEN_DATA.systems.filter(s =>
      s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.cat.includes(q)
    ) : GEN_DATA.systems;
    Gen.renderList(filtered);
  },

  select(id) {
    const sys = GEN_DATA.systems.find(s => s.id === id);
    if (!sys) return;
    Gen.current = sys;

    // Highlight list item
    document.querySelectorAll('#gen-list > div').forEach(d => {
      d.style.background = '';
      d.style.borderLeftColor = 'transparent';
      d.style.color = 'var(--dim)';
    });
    const item = document.getElementById('genitem-' + id);
    if (item) {
      item.style.background = 'rgba(255,77,26,.06)';
      item.style.borderLeftColor = 'var(--acc)';
      item.style.color = 'var(--txt)';
    }

    // Show result panel
    document.getElementById('gen-empty').style.display = 'none';
    const res = document.getElementById('gen-result');
    res.style.display = 'flex';

    document.getElementById('gen-result-icon').textContent = sys.icon;
    document.getElementById('gen-result-name').textContent = sys.name;
    document.getElementById('gen-result-desc').textContent = sys.desc;

    // Code with syntax highlight
    document.getElementById('gen-code-view').innerHTML = Gen.highlight(sys.code);

    // Where path
    document.getElementById('gen-where-path').textContent = sys.where;
    document.getElementById('gen-script-type-badge').textContent = sys.type;

    // Explorer tree
    const tree = document.getElementById('gen-explorer-tree');
    tree.innerHTML = sys.path.map((line, i) => {
      const isTarget = line.includes('📜');
      return `<div style="color:${isTarget ? 'var(--green)' : 'var(--dim)'};background:${isTarget ? 'rgba(0,255,157,.06)' : ''};padding:2px 4px;border-radius:3px">${line}</div>`;
    }).join('');

    // Explain
    document.getElementById('gen-explain').textContent = sys.explain;

    // Configs
    const cfgEl = document.getElementById('gen-config-section');
    if (sys.configs && sys.configs.length) {
      cfgEl.innerHTML = `<div style="font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dark);margin-bottom:8px">⚙️ CONFIGURAÇÕES</div>` +
        sys.configs.map(c => `<div style="padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:10px;color:var(--mid);font-family:'JetBrains Mono',monospace">→ ${c}</div>`).join('');
    } else { cfgEl.innerHTML = ''; }
  },

  highlight(code) {
    return code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(--[^\n]*)/g,'<span style="color:#6c7086;font-style:italic">$1</span>')
      .replace(/\b(local|function|end|if|then|else|elseif|for|while|do|return|not|and|or|in|repeat|until|break)\b/g,'<span style="color:#ff79c6">$1</span>')
      .replace(/\b(true|false|nil)\b/g,'<span style="color:#42b3ff">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g,'<span style="color:#f0883e">$1</span>')
      .replace(/"([^"]*)"/g,'"<span style="color:#a5d6ff">$1</span>"');
  },

  copyCode() {
    if (!Gen.current) return;
    navigator.clipboard.writeText(Gen.current.code).then(() => toast('📋 Código copiado!', 's'));
  },

  downloadLua() {
    if (!Gen.current) return;
    const blob = new Blob([Gen.current.code], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = Gen.current.name.replace(/\s+/g,'_') + '.lua';
    a.click();
    toast('⬇ ' + Gen.current.name + '.lua baixado!', 's');
  },

  sendToBuilder() {
    if (!Gen.current) return;
    App.switchView('builder', document.querySelector('.main-tab'));
    toast('🔨 Aberto no Builder!', 'i');
  }
};

// ════════════════════════════════════════════
//  APRENDER — Learn
// ════════════════════════════════════════════
const LEARN_DATA = [
  {id:'intro', nav:'🚀 Introdução', title:'🚀 O que é scripting no Roblox?',
   content:`<p style="font-size:13px;color:var(--dim);line-height:2;margin-bottom:20px">Scripting no Roblox é escrever código <strong style="color:var(--txt)">Lua</strong> para fazer seu jogo funcionar. Lua é uma linguagem simples, rápida e feita para jogos.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
  <div style="background:var(--card);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:16px"><div style="font-size:20px;margin-bottom:8px">🖱️</div><div style="font-family:'Orbitron',monospace;font-size:10px;color:var(--txt);margin-bottom:6px">SEM SCRIPTING</div><div style="font-size:11px;color:var(--dim);line-height:1.7">Você cria o mapa, mas nada acontece quando o jogador interage.</div></div>
  <div style="background:var(--card);border:1px solid rgba(0,255,157,.2);border-radius:10px;padding:16px"><div style="font-size:20px;margin-bottom:8px">⚡</div><div style="font-family:'Orbitron',monospace;font-size:10px;color:var(--green);margin-bottom:6px">COM SCRIPTING</div><div style="font-size:11px;color:var(--dim);line-height:1.7">Moedas aparecem, portas abrem, inimigos atacam — tudo programado.</div></div>
</div>
<div style="background:rgba(0,255,157,.04);border:1px solid rgba(0,255,157,.15);border-radius:8px;padding:14px;font-size:11px;color:var(--dim);line-height:1.9">💡 <strong style="color:var(--green)">Dica:</strong> Todo jogo popular do Roblox tem milhares de linhas de Lua. Você vai chegar lá também — um script de cada vez.</div>`},

  {id:'tipos', nav:'📋 Tipos de Script', title:'📋 Script vs LocalScript vs ModuleScript',
   content:`<p style="font-size:13px;color:var(--dim);line-height:2;margin-bottom:20px">Existem 3 tipos de script no Roblox. Cada um roda em um lugar diferente.</p>
<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
  <div style="background:var(--card);border-left:3px solid var(--acc);border-radius:6px;padding:14px 16px">
    <div style="font-family:'Orbitron',monospace;font-size:11px;color:var(--acc);margin-bottom:6px">📜 SCRIPT</div>
    <div style="font-size:12px;color:var(--txt);margin-bottom:4px">Roda no servidor (invisível para jogadores)</div>
    <div style="font-size:11px;color:var(--dim)">Use para: dano, DataStore, lógica do jogo, física</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--dark);margin-top:6px">📁 ServerScriptService → Script</div>
  </div>
  <div style="background:var(--card);border-left:3px solid var(--purple);border-radius:6px;padding:14px 16px">
    <div style="font-family:'Orbitron',monospace;font-size:11px;color:var(--purple);margin-bottom:6px">📜 LOCALSCRIPT</div>
    <div style="font-size:12px;color:var(--txt);margin-bottom:4px">Roda no cliente (só aquele jogador vê)</div>
    <div style="font-size:11px;color:var(--dim)">Use para: UI, input, câmera, efeitos visuais</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--dark);margin-top:6px">📁 StarterPlayerScripts → LocalScript</div>
  </div>
  <div style="background:var(--card);border-left:3px solid var(--cyan);border-radius:6px;padding:14px 16px">
    <div style="font-family:'Orbitron',monospace;font-size:11px;color:var(--cyan);margin-bottom:6px">📦 MODULESCRIPT</div>
    <div style="font-size:12px;color:var(--txt);margin-bottom:4px">Biblioteca reutilizável (chamada por outros scripts)</div>
    <div style="font-size:11px;color:var(--dim)">Use para: funções comuns, configurações, dados</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--dark);margin-top:6px">📁 ReplicatedStorage → ModuleScript</div>
  </div>
</div>
<div style="background:rgba(255,214,0,.05);border:1px solid rgba(255,214,0,.2);border-radius:8px;padding:14px;font-size:11px;color:var(--dim);line-height:1.9">⚠️ <strong style="color:var(--yellow)">Regra de ouro:</strong> Nunca coloque lógica de dano em LocalScript. O cliente pode ser hackeado. Sempre valide dano no servidor.</div>`},

  {id:'explorer', nav:'🗂 O Explorer', title:'🗂 Entendendo o Explorer do Roblox',
   content:`<p style="font-size:13px;color:var(--dim);line-height:2;margin-bottom:16px">O Explorer é a hierarquia do seu jogo. Tudo precisa estar no lugar certo para funcionar.</p>
<div style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:2.2;background:#04060f;border-radius:8px;padding:16px;margin-bottom:16px">
<div style="color:var(--txt)">📦 <span style="color:var(--acc2)">Workspace</span> <span style="color:var(--dark)">— Tudo visível no jogo (mapa, personagens)</span></div>
<div style="color:var(--txt)">📦 <span style="color:var(--green)">ServerScriptService</span> <span style="color:var(--dark)">— Scripts do servidor</span></div>
<div style="color:var(--txt)">📦 <span style="color:var(--purple)">StarterPlayer</span></div>
<div style="color:var(--txt)">   └ <span style="color:var(--purple)">StarterPlayerScripts</span> <span style="color:var(--dark)">— LocalScripts do player</span></div>
<div style="color:var(--txt)">   └ <span style="color:var(--purple)">StarterCharacterScripts</span> <span style="color:var(--dark)">— Scripts do personagem</span></div>
<div style="color:var(--txt)">📦 <span style="color:var(--blue)">ReplicatedStorage</span> <span style="color:var(--dark)">— Acessível por server E cliente</span></div>
<div style="color:var(--txt)">📦 <span style="color:var(--yellow)">StarterGui</span> <span style="color:var(--dark)">— Interface do usuário (ScreenGuis)</span></div>
<div style="color:var(--txt)">📦 <span style="color:var(--cyan)">Lighting</span> <span style="color:var(--dark)">— Iluminação, Atmosphere, Clouds</span></div>
</div>
<div style="background:rgba(0,255,157,.04);border:1px solid rgba(0,255,157,.15);border-radius:8px;padding:14px;font-size:11px;color:var(--dim);line-height:1.9">💡 Scripts em <strong style="color:var(--green)">ServerScriptService</strong> nunca são visíveis para o cliente — segurança garantida.</div>`},

  {id:'services', nav:'🔧 Services', title:'🔧 Services mais importantes',
   content:`<p style="font-size:13px;color:var(--dim);line-height:2;margin-bottom:16px">Services são as "ferramentas" do Roblox. Você precisa deles para fazer quase tudo.</p>
<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
  ${[
    ['Players','game:GetService("Players")','Lista de jogadores, detecta entrada/saída'],
    ['UserInputService','game:GetService("UserInputService")','Detecta teclado, mouse, gamepad (só LocalScript)'],
    ['DataStoreService','game:GetService("DataStoreService")','Salva dados permanentes (só Script)'],
    ['RunService','game:GetService("RunService")','Loop a cada frame (Heartbeat, RenderStepped)'],
    ['TweenService','game:GetService("TweenService")','Animações suaves de posição, cor, tamanho'],
    ['CollectionService','game:GetService("CollectionService")','Tags em objetos do Workspace'],
  ].map(([name, code, desc]) => `<div style="background:var(--card);border-radius:6px;padding:12px 14px"><div style="font-family:'Orbitron',monospace;font-size:10px;color:var(--acc2);margin-bottom:4px">${name}</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);margin-bottom:4px">${code}</div><div style="font-size:11px;color:var(--dim)">${desc}</div></div>`).join('')}
</div>`},

  {id:'remote', nav:'🔗 RemoteEvents', title:'🔗 RemoteEvents — comunicação cliente ↔ servidor',
   content:`<p style="font-size:13px;color:var(--dim);line-height:2;margin-bottom:16px">RemoteEvents permitem que o cliente (LocalScript) se comunique com o servidor (Script) e vice-versa.</p>
<div style="background:#04060f;border-radius:8px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.9;margin-bottom:16px">
<div style="color:var(--dark);margin-bottom:8px">-- SERVIDOR (Script em ServerScriptService)</div>
<div><span style="color:#ff79c6">local</span> RE = game.ReplicatedStorage:WaitForChild(<span style="color:#a5d6ff">"MeuEvento"</span>)</div>
<div>RE.OnServerEvent:Connect(<span style="color:#ff79c6">function</span>(player, data)</div>
<div>    print(player.Name .. <span style="color:#a5d6ff">" enviou: "</span> .. tostring(data))</div>
<div><span style="color:#ff79c6">end</span>)</div>
<div style="color:var(--dark);margin:12px 0 8px">-- CLIENTE (LocalScript)</div>
<div><span style="color:#ff79c6">local</span> RE = game.ReplicatedStorage:WaitForChild(<span style="color:#a5d6ff">"MeuEvento"</span>)</div>
<div>RE:FireServer(<span style="color:#a5d6ff">"olá servidor!"</span>)</div>
</div>
<div style="background:rgba(255,214,0,.05);border:1px solid rgba(255,214,0,.2);border-radius:8px;padding:14px;font-size:11px;color:var(--dim);line-height:1.9">⚠️ <strong style="color:var(--yellow)">Importante:</strong> Crie o RemoteEvent manualmente em <strong>ReplicatedStorage</strong>, ou crie via Script no servidor antes de usar.</div>`},
];

const Learn = {
  current: null,
  init() {
    const nav = document.getElementById('learn-nav-items');
    nav.innerHTML = '';
    LEARN_DATA.forEach(item => {
      const d = document.createElement('div');
      d.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;cursor:pointer;font-size:11px;color:var(--dim);transition:all .15s;border-left:2px solid transparent';
      d.textContent = item.nav;
      d.id = 'lnav-' + item.id;
      d.onclick = () => Learn.show(item.id);
      d.onmouseenter = () => { if(Learn.current !== item.id) d.style.background = 'var(--hover)'; };
      d.onmouseleave = () => { if(Learn.current !== item.id) d.style.background = ''; };
      nav.appendChild(d);
    });
    Learn.show(LEARN_DATA[0].id);
  },
  show(id) {
    Learn.current = id;
    const item = LEARN_DATA.find(i => i.id === id);
    if (!item) return;
    document.querySelectorAll('#learn-nav-items > div').forEach(d => {
      d.style.background = '';
      d.style.color = 'var(--dim)';
      d.style.borderLeftColor = 'transparent';
    });
    const navEl = document.getElementById('lnav-' + id);
    if (navEl) {
      navEl.style.background = 'var(--hover)';
      navEl.style.color = 'var(--txt)';
      navEl.style.borderLeftColor = 'var(--acc)';
    }
    const content = document.getElementById('learn-content');
    content.innerHTML = `<div style="font-family:'Orbitron',monospace;font-size:18px;font-weight:900;color:var(--txt);margin-bottom:8px;letter-spacing:1px">${item.title}</div><div style="height:1px;background:rgba(255,255,255,.06);margin-bottom:24px"></div>${item.content}`;
  }
};

// ════════════════════════════════════════════
//  GAME TEMPLATES
// ════════════════════════════════════════════
const GAME_TEMPLATES = [
  {id:'simulator',icon:'🔄',name:'Simulator',color:'#4d8fff',tags:['mining','clicking','tycoon'],
   desc:'Estrutura base para simuladores: clicar para minerar, vender, upgrades e regiões.',
   scripts:['ServerScriptService/SimulatorCore','StarterPlayerScripts/SimulatorUI','ServerScriptService/ShopHandler'],
   structure:['Workspace\n  └ MineRegion (Folder)\n  └ ShopNPC','StarterGui\n  └ SimGui (ScreenGui)','ServerScriptService\n  └ SimulatorCore','ReplicatedStorage\n  └ RemoteEvents (Folder)'],
   code:`-- Simulator Core
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- ⚙️ CONFIGURAÇÕES
local CLICK_VALUE = 1      -- coins por clique
local SELL_MULT   = 1.0    -- multiplicador de venda

local RE = Instance.new("Folder", ReplicatedStorage)
RE.Name = "RemoteEvents"

local clickRE = Instance.new("RemoteEvent", RE)
clickRE.Name = "Click"

local sellRE = Instance.new("RemoteEvent", RE)
sellRE.Name = "Sell"

Players.PlayerAdded:Connect(function(player)
    local ls = Instance.new("Folder", player)
    ls.Name = "leaderstats"
    local coins = Instance.new("IntValue", ls); coins.Name = "Coins"; coins.Value = 0
    local gems  = Instance.new("IntValue", ls); gems.Name  = "Gems";  gems.Value  = 0
    local bag   = Instance.new("IntValue", ls); bag.Name   = "Bag";   bag.Value   = 0
end)

clickRE.OnServerEvent:Connect(function(player)
    local ls = player:FindFirstChild("leaderstats")
    if ls then ls.Bag.Value += CLICK_VALUE end
end)

sellRE.OnServerEvent:Connect(function(player)
    local ls = player:FindFirstChild("leaderstats")
    if ls and ls.Bag.Value > 0 then
        ls.Coins.Value += math.floor(ls.Bag.Value * SELL_MULT)
        ls.Bag.Value = 0
    end
end)`},

  {id:'obby',icon:'🏃',name:'Obby',color:'#ff4d1a',tags:['parkour','checkpoints','obstacle'],
   desc:'Obstáculos com checkpoints, respawn no último checkpoint e contador de mortes.',
   scripts:['ServerScriptService/CheckpointSystem','StarterPlayerScripts/ObbyUI'],
   structure:['Workspace\n  └ Checkpoints (Folder)\n     └ Checkpoint1 (Part)\n     └ Checkpoint2 (Part)','ServerScriptService\n  └ CheckpointSystem'],
   code:`-- Sistema de Checkpoints para Obby
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")

local checkpointFolder = workspace:WaitForChild("Checkpoints")
local checkpoints = checkpointFolder:GetChildren()

-- Ordena checkpoints por nome
table.sort(checkpoints, function(a, b)
    return tonumber(a.Name:match("%d+")) < tonumber(b.Name:match("%d+"))
end)

local playerCheckpoints = {}

Players.PlayerAdded:Connect(function(player)
    playerCheckpoints[player] = 1
    local ls = Instance.new("Folder", player)
    ls.Name = "leaderstats"
    local deaths = Instance.new("IntValue", ls)
    deaths.Name = "Deaths"
    deaths.Value = 0

    player.CharacterAdded:Connect(function(char)
        task.wait(0.1)
        local hrp = char:WaitForChild("HumanoidRootPart")
        local cp = checkpoints[playerCheckpoints[player]]
        if cp then
            hrp.CFrame = cp.CFrame + Vector3.new(0, 4, 0)
        end
        local hum = char:WaitForChild("Humanoid")
        hum.Died:Connect(function()
            deaths.Value += 1
        end)
    end)
end)

-- Detecta chegada em checkpoints
for i, cp in ipairs(checkpoints) do
    cp.Touched:Connect(function(hit)
        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if player and playerCheckpoints[player] < i then
            playerCheckpoints[player] = i
            print(player.Name .. " chegou no checkpoint " .. i)
        end
    end)
end

Players.PlayerRemoving:Connect(function(p)
    playerCheckpoints[p] = nil
end)`},

  {id:'rpg',icon:'⚔️',name:'RPG',color:'#9b42ff',tags:['combat','inventory','quests'],
   desc:'Estrutura de RPG: HP, level, inventário básico, combat com turnos.',
   scripts:['ServerScriptService/RPGCore','ServerScriptService/CombatSystem','StarterPlayerScripts/RPGUI'],
   structure:['Workspace\n  └ Enemies (Folder)','ServerScriptService\n  └ RPGCore\n  └ CombatSystem','ReplicatedStorage\n  └ RemoteEvents'],
   code:`-- RPG Core
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local ls = Instance.new("Folder", player)
    ls.Name = "leaderstats"

    local level = Instance.new("IntValue", ls)
    level.Name = "Level"; level.Value = 1

    local xp = Instance.new("IntValue", ls)
    xp.Name = "XP"; xp.Value = 0

    local gold = Instance.new("IntValue", ls)
    gold.Name = "Gold"; gold.Value = 100

    -- Stats do player (não visíveis no leaderboard)
    local stats = Instance.new("Folder", player)
    stats.Name = "Stats"

    local hp = Instance.new("IntValue", stats)
    hp.Name = "HP"; hp.Value = 100

    local maxHP = Instance.new("IntValue", stats)
    maxHP.Name = "MaxHP"; maxHP.Value = 100

    local attack = Instance.new("IntValue", stats)
    attack.Name = "Attack"; attack.Value = 10

    -- Level up ao ganhar XP suficiente
    xp.Changed:Connect(function(val)
        local needed = level.Value * 100
        if val >= needed then
            xp.Value = val - needed
            level.Value += 1
            maxHP.Value += 20
            hp.Value = maxHP.Value
            attack.Value += 5
            print(player.Name .. " subiu para Level " .. level.Value .. "!")
        end
    end)
end)`},

  {id:'tycoon',icon:'🏭',name:'Tycoon',color:'#ffd600',tags:['building','economy','passive'],
   desc:'Tycoon com lote por jogador, botões de compra, renda passiva e upgrades.',
   scripts:['ServerScriptService/TycoonCore','ServerScriptService/ButtonSystem'],
   structure:['Workspace\n  └ Tycoons (Folder)\n     └ Tycoon1 (Model)\n        └ Buttons (Folder)\n        └ Buildings (Folder)','ServerScriptService\n  └ TycoonCore'],
   code:`-- Tycoon Core
-- Coloque em: ServerScriptService
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- ⚙️ CONFIGURAÇÕES
local INCOME_PER_SECOND = 5   -- renda passiva
local INCOME_INTERVAL   = 1   -- segundos entre rendas

local playerTycoons = {}

Players.PlayerAdded:Connect(function(player)
    local ls = Instance.new("Folder", player)
    ls.Name = "leaderstats"
    local cash = Instance.new("IntValue", ls)
    cash.Name = "Cash"; cash.Value = 0

    -- Atribui lote (simplificado)
    local tycoons = workspace:FindFirstChild("Tycoons")
    if tycoons then
        for _, tycoon in ipairs(tycoons:GetChildren()) do
            if not tycoon:GetAttribute("Owner") then
                tycoon:SetAttribute("Owner", player.UserId)
                playerTycoons[player] = tycoon
                print(player.Name .. " pegou " .. tycoon.Name)
                break
            end
        end
    end
end)

-- Renda passiva
task.spawn(function()
    while true do
        task.wait(INCOME_INTERVAL)
        for _, player in ipairs(Players:GetPlayers()) do
            local ls = player:FindFirstChild("leaderstats")
            local tycoon = playerTycoons[player]
            if ls and tycoon then
                ls.Cash.Value += INCOME_PER_SECOND
            end
        end
    end
end)

Players.PlayerRemoving:Connect(function(player)
    local tycoon = playerTycoons[player]
    if tycoon then
        tycoon:SetAttribute("Owner", nil)
    end
    playerTycoons[player] = nil
end)`},
];

const GameTemplates = {
  current: null,
  init() {
    const grid = document.getElementById('game-tpl-grid');
    const filters = document.getElementById('game-tpl-filters');
    if (!grid) return;
    grid.innerHTML = '';
    filters.innerHTML = '';

    GAME_TEMPLATES.forEach(tpl => {
      const card = document.createElement('div');
      card.style.cssText = `background:var(--card);border:1px solid rgba(255,255,255,.07);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .15s;position:relative`;
      card.innerHTML = `
        <div style="height:80px;background:linear-gradient(135deg,${tpl.color}22,${tpl.color}08);display:flex;align-items:center;justify-content:center;font-size:36px;border-bottom:1px solid rgba(255,255,255,.06)">${tpl.icon}</div>
        <div style="padding:14px">
          <div style="font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:var(--txt);margin-bottom:4px;letter-spacing:.5px">${tpl.name}</div>
          <div style="font-size:11px;color:var(--dim);line-height:1.6;margin-bottom:10px">${tpl.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">${tpl.tags.map(t => `<span style="font-size:8px;padding:2px 7px;border-radius:20px;background:${tpl.color}18;color:${tpl.color};font-family:'JetBrains Mono',monospace;border:1px solid ${tpl.color}30">${t}</span>`).join('')}</div>
          <div style="display:flex;gap:6px">
            <button onclick="GameTemplates.copyCode('${tpl.id}')" style="flex:1;padding:7px;border-radius:6px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:var(--mid);font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:600;cursor:pointer" onmouseenter="this.style.borderColor='var(--acc)';this.style.color='var(--acc)'" onmouseleave="this.style.borderColor='rgba(255,255,255,.1)';this.style.color='var(--mid)'">📋 Copiar</button>
            <button onclick="GameTemplates.download('${tpl.id}')" style="flex:1;padding:7px;border-radius:6px;border:none;background:linear-gradient(135deg,${tpl.color},${tpl.color}aa);color:#fff;font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:700;cursor:pointer">⬇ .lua</button>
          </div>
        </div>`;
      card.onmouseenter = () => { card.style.transform = 'translateY(-2px)'; card.style.borderColor = tpl.color + '60'; card.style.boxShadow = '0 8px 30px rgba(0,0,0,.4)'; };
      card.onmouseleave = () => { card.style.transform = ''; card.style.borderColor = 'rgba(255,255,255,.07)'; card.style.boxShadow = ''; };
      grid.appendChild(card);
    });
  },

  copyCode(id) {
    const tpl = GAME_TEMPLATES.find(t => t.id === id);
    if (!tpl) return;
    navigator.clipboard.writeText(tpl.code).then(() => toast('📋 Código de ' + tpl.name + ' copiado!', 's'));
  },

  download(id) {
    const tpl = GAME_TEMPLATES.find(t => t.id === id);
    if (!tpl) return;
    const blob = new Blob([tpl.code], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = tpl.name + '_template.lua';
    a.click();
    toast('⬇ ' + tpl.name + '_template.lua baixado!', 's');
  }
};

