import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
import {trackUsage} from "../lib/analytics";
describe("consent-gated usage events",()=>{
  const send=vi.fn();
  beforeEach(()=>{
    vi.stubEnv("NEXT_PUBLIC_GA_ID","G-TEST123");
    vi.stubGlobal("window",{gtag:send,"ga-disable-G-TEST123":false,location:{origin:"https://example.invalid",pathname:"/car-loan-calculator",search:"?price=12345",hash:"#private"}});
    vi.stubGlobal("navigator",{doNotTrack:"0",globalPrivacyControl:false});
    vi.stubGlobal("localStorage",{getItem:()=>"accepted"});send.mockClear();
  });
  afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
  it("sends fixed identifiers with a query-free page location",()=>{
    expect(trackUsage({name:"calculator_completed",tool:"loan",country:"US"})).toBe(true);
    expect(send).toHaveBeenCalledWith("event","calculator_completed",{send_to:"G-TEST123",country:"US",tool_id:"loan",page_location:"https://example.invalid/car-loan-calculator",page_referrer:""});
    expect(JSON.stringify(send.mock.calls)).not.toContain("12345");
  });
  it("does nothing without a real configured property or explicit consent",()=>{
    vi.stubEnv("NEXT_PUBLIC_GA_ID","");expect(trackUsage({name:"country_selected",country:"PK"})).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_GA_ID","G-TEST123");vi.stubGlobal("localStorage",{getItem:()=>"rejected"});
    expect(trackUsage({name:"country_selected",country:"PK"})).toBe(false);expect(send).not.toHaveBeenCalled();
  });
  it.each([{doNotTrack:"1",globalPrivacyControl:false},{doNotTrack:"0",globalPrivacyControl:true}])("respects browser privacy signals",signal=>{
    vi.stubGlobal("navigator",signal);expect(trackUsage({name:"calculator_started",tool:"loan",country:"US"})).toBe(false);expect(send).not.toHaveBeenCalled();
  });
  it("records affiliate clicks without a destination URL or partner identity",()=>{
    expect(trackUsage({name:"outbound_affiliate_click",country:"PK"})).toBe(true);
    expect(send).toHaveBeenCalledWith("event","outbound_affiliate_click",{send_to:"G-TEST123",country:"PK",page_location:"https://example.invalid/car-loan-calculator",page_referrer:""});
  });
  it("blocks withdrawn consent and unavailable storage",()=>{
    (window as unknown as Record<string,unknown>)["ga-disable-G-TEST123"]=true;
    expect(trackUsage({name:"country_selected",country:"PK"})).toBe(false);
    vi.stubGlobal("localStorage",{getItem:()=>{throw new Error("blocked");}});
    expect(trackUsage({name:"country_selected",country:"PK"})).toBe(false);expect(send).not.toHaveBeenCalled();
  });
});
