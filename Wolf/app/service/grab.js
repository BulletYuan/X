'use strict';

const Service = require('egg').Service;

class GrabService extends Service {

    async statis(result) {
        const end = {
            successed: 0,
            failed: 0,
        };
        result.forEach(rs => {
            const sus = rs.successed || 0;
            const fal = rs.failed || 0;
            end.successed += sus;
            end.failed += fal;
        });
        return end;
    }
    async datasInsert(datas) {
        return await ctx.helper.queue(datas, async (data) => {
            return await ctx.service.dbUrlPool.insert(data)
        });
    }

    async Urls() {
        const { ctx } = this;
        const {
            city,
        } = await ctx.service.ip.ip(); // done
        const result = [];
        const bendibao = await ctx.service.bendibao.news(city); // done

        const news163Ranks = await ctx.service.news163.ranks(); // done
        const ifentRanks = await ctx.service.ifeng.ranks(); // done

        const cctvNews = await ctx.service.cctv.newest(); // done
        const news163News = await ctx.service.news163.newest(); // done
        const haiwainetNews = await ctx.service.haiwainet.newest(); // done
        const chinanewsNews = await ctx.service.chinanews.newest(); // todo pagination
        const huanqiuNews = await ctx.service.huanqiu.newest(); // done

        const news163World = await ctx.service.news163.world(); // done
        const news163Domestic = await ctx.service.news163.domestic(); // done
        const cctvWorld = await ctx.service.cctv.world(); // done
        const cctvDomestic = await ctx.service.cctv.domestic(); // done
        const chinanewsWorld = await ctx.service.chinanews.world(); // done
        const chinanewsDomestic = await ctx.service.chinanews.domestic(); // done


        result.push(this.datasInsert(bendibao));
        result.push(this.datasInsert(news163Ranks));
        result.push(this.datasInsert(ifentRanks));
        result.push(this.datasInsert(cctvNews));
        result.push(this.datasInsert(news163News));
        result.push(this.datasInsert(haiwainetNews));
        result.push(this.datasInsert(chinanewsNews));
        result.push(this.datasInsert(huanqiuNews));
        result.push(this.datasInsert(news163World));
        result.push(this.datasInsert(news163Domestic));
        result.push(this.datasInsert(cctvWorld));
        result.push(this.datasInsert(cctvDomestic));
        result.push(this.datasInsert(chinanewsWorld));
        result.push(this.datasInsert(chinanewsDomestic));

        return this.statis(result);
    }
}
module.exports = GrabService;
