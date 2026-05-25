/**
 * 全文搜索
 *
 * 在所有已加载的剧本内容中搜索关键词，返回匹配结果。
 */

(function(global) {
  'use strict';

  /**
   * 搜索结果结构：
   * { charId, chapterId, sectionId, text, matchPos, context }
   */

  const Search = {
    /**
     * 在剧本数据中搜索
     * @param {string} query - 搜索关键词
     * @param {object} scriptData - 剧本数据（SCRIPT_DATA）
     * @param {object} opts - { maxResults, charFilter, chapterFilter }
     */
    execute(query, scriptData, opts = {}) {
      if (!query || !scriptData) return [];

      const q = String(query).toLowerCase();
      const max = opts.maxResults || AppConfig.searchMaxResults;
      const results = [];
      const chars = opts.charFilter
        ? [opts.charFilter].flat().filter(c => scriptData[c])
        : Object.keys(scriptData);

      for (const charId of chars) {
        if (results.length >= max) break;
        const charData = scriptData[charId];
        if (!charData) continue;

        const chapters = opts.chapterFilter
          ? [opts.chapterFilter].flat().filter(ch => charData[ch])
          : Object.keys(charData);

        for (const chapterId of chapters) {
          if (results.length >= max) break;
          const chapter = charData[chapterId];
          if (!chapter || !chapter.sections) continue;

          for (const section of chapter.sections) {
            if (results.length >= max) break;
            const text = section.content || '';
            const lower = text.toLowerCase();
            let pos = 0;

            while ((pos = lower.indexOf(q, pos)) >= 0 && results.length < max) {
              const start = Math.max(0, pos - 20);
              const end = Math.min(text.length, pos + q.length + 30);
              // 计算搜索词落在哪个段落 (按换行分割)
              // 注意：这里要跳过空段落，与 renderChapter 的行为保持一致
              const rawParagraphs = text.split('\n');
              let paraIdx = 0;
              let charCount = 0;
              for (let pi = 0; pi < rawParagraphs.length; pi++) {
                const trimmed = rawParagraphs[pi].trim();
                // 跳过空段落（与 renderChapter 一致）
                if (!trimmed) {
                  charCount += rawParagraphs[pi].length + 1;
                  continue;
                }
                const len = rawParagraphs[pi].length + 1;
                if (pos < charCount + len) {
                  // 存储完整的 sectionId（与收藏功能一致），包含段落索引
                  results.push({
                    charId,
                    chapterId,
                    chapterTitle: chapter.title || '',
                    sectionId: section.id + '_' + paraIdx,
                    speaker: section.speaker || '',
                    type: section.type,
                    matchPos: pos,
                    context: (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : ''),
                    highlightStart: pos - start + (start > 0 ? 3 : 0)
                  });
                  break;
                }
                charCount += len;
                paraIdx++;
              }
              pos++;
            }
          }
        }
      }

      Debug.info('Search executed', { query, results: results.length });
      return results;
    },

    /**
     * 在收藏夹中搜索
     */
    searchFavorites(query) {
      return Favorites.search(query);
    }
  };

  global.Search = Search;
  Debug.info('Search module initialized');
})(window);
