from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psutil,cpuinfo,os,glob,shutil,subprocess

app=FastAPI()

origins = [
    "http://localhost:5173/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)

class commandRequest(BaseModel):
    command:str
    
@app.get("/cpuInfo")
def get_cpu_info():
    try:
        temps=psutil.sensors_temperatures()
        if "k10temp" in temps:
            cpu_temp=temps['k10temp'][0].current
        else:
            return 0
        
        usage=psutil.cpu_percent(interval=0.5)
        model=cpuinfo.get_cpu_info()
        

        return{"cpu":{
            "temp":cpu_temp,
            "usage":usage,
            "model":model['brand_raw']
        }}
    
    except Exception as e:
        print("Error: ",e)

@app.get("/boardInfo")
def get_mb_info():
    try:
        temps=psutil.sensors_temperatures()
        if "acpitz" in temps:
            mbTemp=temps["acpitz"][0].current
        else:
            return 0
        
        mbName=open("/sys/class/dmi/id/product_name").read().strip()

        return{"board":{
            "name":mbName,
            "temp":mbTemp
        }}

    except Exception as e:
        print("Error:",e)

@app.get("/nvmeInfo")
def get_nvme_info():
    try:

        for nvme_path in glob.glob("/sys/class/nvme/nvme*"):
            name=os.path.basename(nvme_path)

            model_path=f"{nvme_path}/device/model"
            
            if os.path.exists(model_path) :
                model=open(model_path).read()
            else:
                None
        total,used,free=shutil.disk_usage("/")
        temps=psutil.sensors_temperatures()
        if "nvme" in temps:
            temp=temps['nvme'][0].current
        else:
            return 0
        
        return{
            "memory":{
                "name":name,
                "temp":temp,
                "totalGB":round(total/(1024**3),2),
                "usedGB":round(used/(1024**3),2),
                "freeGB":round(free/(1024**3),2)
            }
        }

    except Exception as e:
        print("Error:",e)

@app.get("/fanInfo")
def get_fan_info():
    try:
        fans=psutil.sensors_fans()
        if not fans:
            print("No fans were detected")
            return []
        
        fan_data=[]

        for name , entries in fans.items():
            for entry in entries:
                 
                 fanName=entry.label
                 fanSpeed=entry.current
                 
                 fan_data.append({
                     "name":fanName,
                     "speed":fanSpeed
                 })
        return fan_data
    
    except Exception as e:
        print("Error:",e)
        return[]
    
@app.post("/mode")
def switch_mode(request:commandRequest):
    
    profile_map={
        "quiet":"Quiet",
        "balanced":"Balanced",
        "performance":"Performance",
    }
    try:
        if request.command not in profile_map:
            print("Error:Invalid Command")
            return 0
        mode=profile_map[request.command]
        subprocess.run(["asusctl", "profile", "-P", mode],check=True)
        
    except Exception as e:
        print("Error:",e)
        return 0


@app.get("/sysInfo")
def all_info():
    try:
        data={}

        cpu=get_cpu_info()
        data["cpu"]=cpu if cpu else{"cpuTemp":0,"cpuUsage":0,"model":"Unknown"}

        board=get_mb_info()
        data['board']=board if board else {"boardName":"Unknown","boardTemp":0}

        nvme=get_nvme_info()
        data["nvme"]=nvme if nvme else {"nvmeName":"Unknown","nvmeTemp":0,"total":0,"used":0,"free":0}
        
        fan=get_fan_info()
        data["fan"]=fan if fan else {""}

        return data
    
    except Exception as e:
        print("Error:",e)

