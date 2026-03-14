// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — modules/gen.js
//  Script Generator: browse, preview, download
// ═══════════════════════════════════════════════

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



