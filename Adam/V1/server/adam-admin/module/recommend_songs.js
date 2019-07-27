// 每日推荐歌曲

module.exports = (query, request) => {
    const data = {
        limit: 20,
        offset: 0,
        total: true
    }
    return request(
        'POST', `http://music.163.com/weapi/v1/discovery/recommend/songs`, data,
        {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
    )
}