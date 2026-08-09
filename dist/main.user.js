// ==UserScript==
// @name         网页文本提取工具
// @name:en-US   Web Text Extraction Tool
// @namespace    https://github.com/Qing90bing/Qing_PageScanner
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  像扫描仪一样快速“扫描”整个网页，智能识别并捕获所有需要翻译的文本片段，提高你的翻译效率。
// @description:en-US  Scan the entire web page like a scanner, intelligently identify and capture all text fragments that need translation.
// @license      MIT
// @copyright    2025, Qing90bing
// @author       Qing90bing
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iNjYxcHQiIGhlaWdodD0iNjYxcHQiIHZpZXdCb3g9IjAgMCA2NjEgNjYxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8ZyBpZD0iIzAwNzBjMGZmIj4NCjxwYXRoIGZpbGw9IiMwMDcwYzAiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDE2MC43MiAwLjAwIEwgNTAwLjI3IDAuMDAgQyA1MjAuMTYgMS41NiA1MzkuOTYgNS42NiA1NTguMjkgMTMuNjkgQyA2MDEuNTAgMzIuMDIgNjM2LjIxIDY5LjE2IDY1MS41MiAxMTMuNTQgQyA2NTYuOTcgMTI4LjcxIDY1OS42NCAxNDQuNzEgNjYxLjAwIDE2MC43MiBMIDY2MS4wMCA1MDAuMjcgQyA2NTkuNTEgNTE4LjYyIDY1Ni4wMiA1MzYuOTIgNjQ5LjA2IDU1NC4wMyBDIDYzMi4yMiA1OTYuOTcgNTk2Ljk3IDYzMi4yMiA1NTQuMDMgNjQ5LjA2IEMgNTM2LjkzIDY1Ni4wMiA1MTguNjMgNjU5LjUxIDUwMC4yOCA2NjEuMDAgTCAxNjAuNzMgNjYxLjAwIEMgMTQyLjM4IDY1OS41MSAxMjQuMDggNjU2LjAyIDEwNi45NyA2NDkuMDYgQyA2NC4wMyA2MzIuMjIgMjguNzggNTk2Ljk3IDExLjk0IDU1NC4wMyBDIDQuOTggNTM2LjkzIDEuNDkgNTE4LjYzIDAuMDAgNTAwLjI4IEwgMC4wMCAxNjAuNzMgQyAxLjc1IDEzNi44MiA3LjY3IDExMy4xMSAxOC44MyA5MS44MSBDIDM0LjgzIDYwLjcxIDYwLjcxIDM0LjgzIDkxLjgxIDE4LjgzIEMgMTEzLjEwIDcuNjcgMTM2LjgyIDEuNzUgMTYwLjcyIDAuMDAgTSAxNTIuNDAgMTIuNDMgQyAxMTEuNzIgMTYuNjYgNzMuMDcgMzcuNTQgNDcuMzIgNjkuMzMgQyAyNy44NyA5Mi44MCAxNS42NyAxMjIuMTEgMTIuNDMgMTUyLjQwIEMgMTEuNDYgMTYyLjIzIDExLjY4IDE3Mi4xMyAxMS42NSAxODIuMDAgQyAxMS42NiAyNzYuMDAgMTEuNjUgMzcwLjAwIDExLjY1IDQ2NC4wMCBDIDExLjk2IDQ4My4yMCAxMC40NCA1MDIuNjUgMTQuMzggNTIxLjYwIEMgMjEuMjcgNTU3LjY3IDQxLjI2IDU5MS4xMCA2OS44OSA2MTQuMTMgQyA5My43MiA2MzMuNjUgMTIzLjQ0IDY0NS44MyAxNTQuMTAgNjQ4LjczIEMgMTY2LjA0IDY0OS42NyAxNzguMDMgNjQ5LjI2IDE5MC4wMCA2NDkuMzUgQyAyOTEuMzIgNjQ5LjMyIDM5Mi42NCA2NDkuNDAgNDkzLjk3IDY0OS4zMSBDIDUzOS44MSA2NDkuMjMgNTg0Ljg2IDYyNy4yMiA2MTMuNjggNTkxLjY3IEMgNjM2LjE2IDU2NC40MiA2NDkuMjAgNTI5LjM1IDY0OS4zMCA0OTMuOTcgQyA2NDkuNDEgMzg5LjMxIDY0OS4zMSAyODQuNjYgNjQ5LjM1IDE4MC4wMCBDIDY0OS4zNCAxNzEuMDggNjQ5LjQ2IDE2Mi4xNCA2NDguNjUgMTUzLjI0IEMgNjQ1LjUxIDEyMS45MyA2MzIuNjkgOTEuNjcgNjEyLjMxIDY3LjY4IEMgNTg4LjQ3IDM5LjEzIDU1NC4xNCAxOS42MiA1MTcuNDQgMTMuNjMgQyA1MDQuNDMgMTEuMjkgNDkxLjE2IDExLjY4IDQ3OC4wMCAxMS42NSBDIDM3OS42NyAxMS42NSAyODEuMzQgMTEuNjUgMTgzLjAwIDExLjY1IEMgMTcyLjgwIDExLjY4IDE2Mi41NyAxMS40NCAxNTIuNDAgMTIuNDMgWiIgLz4NCjwvZz4NCjxnIGlkPSIjMDVhNmYwZmYiPg0KPHBhdGggZmlsbD0iIzA1YTZmMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTUyLjQwIDEyLjQzIEMgMTYyLjU3IDExLjQ0IDE3Mi44MCAxMS42OCAxODMuMDAgMTEuNjUgQyAyODEuMzQgMTEuNjUgMzc5LjY3IDExLjY1IDQ3OC4wMCAxMS42NSBDIDQ5MS4xNiAxMS42OCA1MDQuNDMgMTEuMjkgNTE3LjQ0IDEzLjYzIEMgNTU0LjE0IDE5LjYyIDU4OC40NyAzOS4xMyA2MTIuMzEgNjcuNjggQyA2MzIuNjkgOTEuNjcgNjQ1LjUxIDEyMS45MyA2NDguNjUgMTUzLjI0IEMgNjQ5LjQ2IDE2Mi4xNCA2NDkuMzQgMTcxLjA4IDY0OS4zNSAxODAuMDAgQyA2NDkuMzEgMjg0LjY2IDY0OS40MSAzODkuMzEgNjQ5LjMwIDQ5My45NyBDIDY0OS4yMCA1MjkuMzUgNjM2LjE2IDU2NC40MiA2MTMuNjggNTkxLjY3IEMgNTg0Ljg2IDYyNy4yMiA1MzkuODEgNjQ5LjIzIDQ5My45NyA2NDkuMzEgQyAzOTIuNjQgNjQ5LjQwIDI5MS4zMiA2NDkuMzIgMTkwLjAwIDY0OS4zNSBDIDE3OC4wMyA2NDkuMjYgMTY2LjA0IDY0OS42NyAxNTQuMTAgNjQ4LjczIEMgMTIzLjQ0IDY0NS44MyA5My43MiA2MzMuNjUgNjkuODkgNjE0LjEzIEMgNDEuMjYgNTkxLjEwIDIxLjI3IDU1Ny42NyAxNC4zOCA1MjEuNjAgQyAxMC40NCA1MDIuNjUgMTEuOTYgNDgzLjIwIDExLjY1IDQ2NC4wMCBDIDExLjY1IDM3MC4wMCAxMS42NiAyNzYuMDAgMTEuNjUgMTgyLjAwIEMgMTEuNjggMTcyLjEzIDExLjQ2IDE2Mi4yMyAxMi40MyAxNTIuNDAgQyAxNS42NyAxMjIuMTEgMjcuODcgOTIuODAgNDcuMzIgNjkuMzMgQyA3My4wNyAzNy41NCAxMTEuNzIgMTYuNjYgMTUyLjQwIDEyLjQzIE0gMzg2Ljk5IDEyNC45OCBDIDM3My42NSAxMzguMDAgMzYwLjg1IDE1MS41OCAzNDcuMjYgMTY0LjM0IEMgMzM4Ljc5IDE1Ni4yNyAzMzAuNTkgMTQ3LjkzIDMyMi4xMCAxMzkuODggQyAzMTYuMDAgMTQ1LjkzIDMwOS44NyAxNTEuOTYgMzAzLjc4IDE1OC4wMyBDIDMwOS43MSAxNjQuNDcgMzE2LjI2IDE3MC4zMCAzMjIuMTIgMTc2Ljc5IEMgMjg0LjA5IDIxNC44NiAyNDYuMDUgMjUyLjkyIDIwNy45NyAyOTAuOTMgQyAyMDUuMDkgMjkzLjQ4IDIwNS42MyAyOTcuNTYgMjA1LjU2IDMwMS4wMCBDIDIwNS44MCAzMTkuMDYgMjA1LjQ1IDMzNy4xMiAyMDUuNzQgMzU1LjE4IEMgMjIzLjg5IDM1NS4zMSAyNDIuMDQgMzU1LjQwIDI2MC4xOCAzNTUuMTMgQyAyNTQuODEgMzQ2LjgxIDI0OS41NyAzMzguMzggMjQ1LjY0IDMyOS4yNyBDIDI0MS4wMyAzMjkuMTEgMjM2LjQyIDMyOS4xNSAyMzEuODEgMzI5LjA1IEMgMjMxLjc3IDMyMi4wMSAyMzEuNTcgMzE0Ljk2IDIzMS43MSAzMDcuOTIgQyAyMzEuMzIgMzAyLjQxIDIzNi43MyAyOTkuNDggMjM5Ljk5IDI5NS45NSBDIDI3My43NiAyNjIuNjAgMzA2Ljk5IDIyOC42OSAzNDAuODkgMTk1LjQ1IEMgMzU5LjUxIDIxMy43NSAzNzcuODQgMjMyLjM0IDM5Ni4zMyAyNTAuNzcgQyA0MDIuMTYgMjQ0LjczIDQwOC41NyAyMzkuMjEgNDEzLjk4IDIzMi44MCBDIDQxMi41OSAyMjkuNzggNDEwLjAyIDIyNy41OCA0MDcuNzIgMjI1LjI3IEMgNDAzLjg5IDIyMS41NyA0MDAuMjUgMjE3LjY3IDM5Ni42NSAyMTMuNzQgQyA0MDYuNjEgMjAzLjAyIDQxNy4yOCAxOTIuOTggNDI3LjUzIDE4Mi41MyBDIDQzMS40MCAxNzguNDIgNDM2LjA0IDE3NC45MCA0MzguOTYgMTcwLjAwIEMgNDQxLjkwIDE2NC43NiA0NDAuMjEgMTU4LjAzIDQzNi4wMSAxNTMuOTkgQyA0MjcuNDQgMTQ1LjIzIDQxOC42MiAxMzYuNzEgNDEwLjA2IDEyNy45NCBDIDQwNi43NSAxMjQuNTkgNDAzLjAwIDEyMC45MCAzOTguMDEgMTIwLjYxIEMgMzkzLjg2IDEyMC4xOCAzODkuODkgMTIyLjEzIDM4Ni45OSAxMjQuOTggTSAzNDkuNDMgMjY0LjY3IEMgMzE2LjYxIDI2OC42MSAyODUuMzYgMjg5LjM5IDI3Mi4xNiAzMjAuMTcgQyAyNzAuMzYgMzIzLjczIDI3My4xOCAzMjcuMjMgMjc0LjYxIDMzMC4zNyBDIDI5MC45OCAzNjIuMTUgMzI2LjY4IDM4MS41NiAzNjIuMDAgMzgxLjM5IEMgMzk3LjM4IDM4MS45MCA0MzMuMzIgMzYyLjcxIDQ0OS45MCAzMzAuOTggQyA0NTEuMzYgMzI3LjYzIDQ1NC41OSAzMjQuMDAgNDUyLjc4IDMyMC4xOSBDIDQ0NC44OCAzMDIuMTcgNDMwLjgyIDI4Ny4wMCA0MTMuNjYgMjc3LjQzIEMgMzk0LjQyIDI2Ni4yMiAzNzEuNDcgMjYxLjk5IDM0OS40MyAyNjQuNjcgTSAxNjQuMDEgNDI1LjAzIEMgMTY0LjAwIDQ1NC43NyAxNjMuOTcgNDg0LjUxIDE2NC4wMyA1MTQuMjUgQyAxNzEuMjQgNTE0LjQ1IDE3OC40NyA1MTQuNDkgMTg1LjY4IDUxNC4xNSBDIDE4NS42OCA1MDEuODUgMTg1LjQ1IDQ4OS41NSAxODUuODAgNDc3LjI1IEMgMTk1LjI3IDQ3Ny4yNyAyMDQuNzQgNDc3LjI5IDIxNC4yMiA0NzcuMjQgQyAyMTQuNTMgNDg5LjU0IDIxNC4zMyA1MDEuODUgMjE0LjMxIDUxNC4xNSBDIDIyMS41MyA1MTQuNDkgMjI4Ljc2IDUxNC40NSAyMzUuOTcgNTE0LjI1IEMgMjM2LjAzIDQ4NC41MSAyMzYuMDEgNDU0Ljc3IDIzNS45OCA0MjUuMDMgQyAyMjguNzYgNDI0Ljk2IDIyMS41MyA0MjQuOTMgMjE0LjMwIDQyNS4xMSBDIDIxNC4zNSA0MzUuMDMgMjE0LjQ5IDQ0NC45NSAyMTQuMjQgNDU0Ljg2IEMgMjA0Ljc1IDQ1NC44NyAxOTUuMjUgNDU0Ljg3IDE4NS43NiA0NTQuODYgQyAxODUuNTEgNDQ0Ljk0IDE4NS42NSA0MzUuMDMgMTg1LjY5IDQyNS4xMSBDIDE3OC40NyA0MjQuOTMgMTcxLjI0IDQyNC45NiAxNjQuMDEgNDI1LjAzIE0gMjUwLjMxIDQyNS4xMCBDIDI1MC4zOCA0MzIuNDYgMjUwLjM3IDQzOS44MSAyNTAuMzIgNDQ3LjE2IEMgMjU4Ljc2IDQ0Ny41NCAyNjcuMjIgNDQ3LjMyIDI3NS42NyA0NDcuMzQgQyAyNzUuNjggNDY5LjY0IDI3NS41MCA0OTEuOTQgMjc1Ljc1IDUxNC4yNCBDIDI4Mi44NCA1MTQuNDUgMjg5Ljk0IDUxNC40NCAyOTcuMDQgNTE0LjI1IEMgMjk3LjMxIDQ5MS45NCAyOTcuMDAgNDY5LjYyIDI5Ny4xOSA0NDcuMzAgQyAzMDUuNTQgNDQ3LjM4IDMxMy44OSA0NDcuNDUgMzIyLjI0IDQ0Ny4yNiBDIDMyMi40NSA0MzkuODUgMzIyLjQ0IDQzMi40MyAzMjIuMjYgNDI1LjAzIEMgMjk4LjI4IDQyNS4wMyAyNzQuMjkgNDI0Ljg4IDI1MC4zMSA0MjUuMTAgTSAzNDAuNjYgNDI5LjY3IEMgMzM2Ljg5IDQzMy40MSAzMzYuNjQgNDM5LjAyIDMzNi42NyA0NDQuMDEgQyAzMzYuODUgNDY3LjQyIDMzNi41NyA0OTAuODMgMzM2LjgyIDUxNC4yNCBDIDM0My45NiA1MTQuNDQgMzUxLjExIDUxNC40NSAzNTguMjUgNTE0LjI0IEMgMzU4LjUwIDQ5MS45NCAzNTguMzIgNDY5LjY0IDM1OC4zNCA0NDcuMzQgQyAzNjMuMTMgNDQ3LjM2IDM2Ny45MiA0NDcuMzYgMzcyLjcyIDQ0Ny4zMyBDIDM3Mi44MSA0NjQuNjYgMzcyLjU5IDQ4MS45OSAzNzIuODIgNDk5LjMyIEMgMzc5Ljk3IDQ5OS41NSAzODcuMTIgNDk5LjU0IDM5NC4yNyA0OTkuMzMgQyAzOTQuNDggNDgyLjAwIDM5NC4zMyA0NjQuNjcgMzk0LjM0IDQ0Ny4zNCBDIDM5OS4xMyA0NDcuMzYgNDAzLjkyIDQ0Ny4zNiA0MDguNzIgNDQ3LjMzIEMgNDA4LjgwIDQ2OS42MyA0MDguNTkgNDkxLjk0IDQwOC44MiA1MTQuMjUgQyA0MTUuOTYgNTE0LjQ0IDQyMy4xMSA1MTQuNDUgNDMwLjI2IDUxNC4yNCBDIDQzMC41NCA0OTAuODMgNDMwLjIzIDQ2Ny40MiA0MzAuNDIgNDQ0LjAxIEMgNDMwLjQ0IDQzOS4wMCA0MzAuMTggNDMzLjM3IDQyNi4zOSA0MjkuNjIgQyA0MjMuMzYgNDI2LjA3IDQxOC41NSA0MjQuOTcgNDE0LjA3IDQyNS4wMCBDIDM5NC4wMyA0MjQuOTcgMzczLjk5IDQyNS4wMyAzNTMuOTUgNDI0Ljk3IEMgMzQ5LjE2IDQyNC44OCAzNDMuOTIgNDI1Ljg1IDM0MC42NiA0MjkuNjcgTSA0NTEuOTEgNDI1LjA0IEMgNDUxLjg2IDQ1NC43OCA0NTEuNzUgNDg0LjUyIDQ1MS45NyA1MTQuMjYgQyA0NzEuMDggNTE0LjQzIDQ5MC4yMSA1MTQuNDMgNTA5LjMzIDUxNC4yNyBDIDUwOS41NCA1MDYuODkgNTA5LjU1IDQ5OS41MSA1MDkuMzAgNDkyLjEzIEMgNDk3LjQyIDQ5Mi4wOCA0ODUuNTQgNDkyLjI1IDQ3My42NiA0OTIuMDUgQyA0NzMuNDQgNDY5Ljc0IDQ3My41MSA0NDcuNDQgNDczLjY0IDQyNS4xMyBDIDQ2Ni40MCA0MjQuOTIgNDU5LjE1IDQyNC45NiA0NTEuOTEgNDI1LjA0IFoiIC8+DQo8cGF0aCBmaWxsPSIjMDVhNmYwIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAzODEuOTggMTY2Ljk4IEMgMzg3LjE1IDE2MS44NyAzOTIuMDkgMTU2LjUyIDM5Ny41NyAxNTEuNzMgQyA0MDEuNDggMTU1LjU5IDQwNS4zNyAxNTkuNDggNDA5LjI1IDE2My4zOSBDIDQwNC4wNCAxNjkuMTQgMzk4LjEzIDE3NC4xOSAzOTIuNTMgMTc5LjU0IEMgMzg3LjIyIDE4NC40NSAzODIuMjEgMTg5LjY5IDM3Ni41MyAxOTQuMTkgQyAzNzMuMTAgMTkwLjQ2IDM2OS42NSAxODYuNzUgMzY2LjI3IDE4Mi45NyBDIDM3MS4yOSAxNzcuNDMgMzc2LjcwIDE3Mi4yNyAzODEuOTggMTY2Ljk4IFoiIC8+DQo8cGF0aCBmaWxsPSIjMDVhNmYwIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAzMDYuNjAgMzE0LjU2IEMgMzIwLjIwIDI5OS4yMyAzNDAuNTQgMjkwLjMxIDM2MC45NyAyOTAuMDIgQyAzODUuODAgMjg5LjQwIDQxMS4wNiAzMDEuNjMgNDI0LjQ4IDMyMi44MSBDIDQxNi4zOSAzMzQuNjUgNDA0Ljk0IDM0NC4yMSAzOTEuNTggMzQ5LjU1IEMgMzcwLjE5IDM1OC40OSAzNDQuNzUgMzU2Ljg4IDMyNC42NCAzNDUuMzggQyAzMTUuMTcgMzM5Ljg0IDMwNi41MSAzMzIuMzIgMzAwLjgwIDMyMi44OCBDIDMwMS45NCAzMTkuNjQgMzA0LjM4IDMxNy4xMCAzMDYuNjAgMzE0LjU2IE0gMzU4LjM5IDMwMy41MSBDIDM0OS4wOCAzMDUuMjMgMzQyLjA0IDMxNC41OSAzNDIuOTcgMzI0LjAyIEMgMzQzLjI1IDMzNC4xOSAzNTIuODggMzQyLjgzIDM2My4wMSAzNDIuMTYgQyAzNzQuMjQgMzQyLjM1IDM4My42MSAzMzEuMDkgMzgxLjg0IDMyMC4wOSBDIDM4MC43NyAzMDkuMTIgMzY5LjA5IDMwMC45MyAzNTguMzkgMzAzLjUxIFoiIC8+DQo8L2c+DQo8ZyBpZD0iI2ZmZmZmZmZmIj4NCjxwYXRoIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDM4Ni45OSAxMjQuOTggQyAzODkuODkgMTIyLjEzIDM5My44NiAxMjAuMTggMzk4LjAxIDEyMC42MSBDIDQwMy4wMCAxMjAuOTAgNDA2Ljc1IDEyNC41OSA0MTAuMDYgMTI3Ljk0IEMgNDE4LjYyIDEzNi43MSA0MjcuNDQgMTQ1LjIzIDQzNi4wMSAxNTMuOTkgQyA0NDAuMjEgMTU4LjAzIDQ0MS45MCAxNjQuNzYgNDM4Ljk2IDE3MC4wMCBDIDQzNi4wNCAxNzQuOTAgNDMxLjQwIDE3OC40MiA0MjcuNTMgMTgyLjUzIEMgNDE3LjI4IDE5Mi45OCA0MDYuNjEgMjAzLjAyIDM5Ni42NSAyMTMuNzQgQyA0MDAuMjUgMjE3LjY3IDQwMy44OSAyMjEuNTcgNDA3LjcyIDIyNS4yNyBDIDQxMC4wMiAyMjcuNTggNDEyLjU5IDIyOS43OCA0MTMuOTggMjMyLjgwIEMgNDA4LjU3IDIzOS4yMSA0MDIuMTYgMjQ0LjczIDM5Ni4zMyAyNTAuNzcgQyAzNzcuODQgMjMyLjM0IDM1OS41MSAyMTMuNzUgMzQwLjg5IDE5NS40NSBDIDMwNi45OSAyMjguNjkgMjczLjc2IDI2Mi42MCAyMzkuOTkgMjk1Ljk1IEMgMjM2LjczIDI5OS40OCAyMzEuMzIgMzAyLjQxIDIzMS43MSAzMDcuOTIgQyAyMzEuNTcgMzE0Ljk2IDIzMS43NyAzMjIuMDEgMjMxLjgxIDMyOS4wNSBDIDIzNi40MiAzMjkuMTUgMjQxLjAzIDMyOS4xMSAyNDUuNjQgMzI5LjI3IEMgMjQ5LjU3IDMzOC4zOCAyNTQuODEgMzQ2LjgxIDI2MC4xOCAzNTUuMTMgQyAyNDIuMDQgMzU1LjQwIDIyMy44OSAzNTUuMzEgMjA1Ljc0IDM1NS4xOCBDIDIwNS40NSAzMzcuMTIgMjA1LjgwIDMxOS4wNiAyMDUuNTYgMzAxLjAwIEMgMjA1LjYzIDI5Ny41NiAyMDUuMDkgMjkzLjQ4IDIwNy45NyAyOTAuOTMgQyAyNDYuMDUgMjUyLjkyIDI4NC4wOSAyMTQuODYgMzIyLjEyIDE3Ni43OSBDIDMxNi4yNiAxNzAuMzAgMzA5LjcxIDE2NC40NyAzMDMuNzggMTU4LjAzIEMgMzA5Ljg3IDE1MS45NiAzMTYuMDAgMTQ1LjkzIDMyMi4xMCAxMzkuODggQyAzMzAuNTkgMTQ3LjkzIDMzOC43OSAxNTYuMjcgMzQ3LjI2IDE2NC4zNCBDIDM2MC44NSAxNTEuNTggMzczLjY1IDEzOC4wMCAzODYuOTkgMTI0Ljk4IE0gMzgxLjk4IDE2Ni45OCBDIDM3Ni43MCAxNzIuMjcgMzcxLjI5IDE3Ny40MyAzNjYuMjcgMTgyLjk3IEMgMzY5LjY1IDE4Ni43NSAzNzMuMTAgMTkwLjQ2IDM3Ni41MyAxOTQuMTkgQyAzODIuMjEgMTg5LjY5IDM4Ny4yMiAxODQuNDUgMzkyLjUzIDE3OS41NCBDIDM5OC4xMyAxNzQuMTkgNDA0LjA0IDE2OS4xNCA0MDkuMjUgMTYzLjM5IEMgNDA1LjM3IDE1OS40OCA0MDEuNDggMTU1LjU5IDM5Ny41NyAxNTEuNzMgQyAzOTIuMDkgMTU2LjUyIDM4Ny4xNSAxNjEuODcgMzgxLjk4IDE2Ni45OCBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzQ5LjQzIDI2NC42NyBDIDM3MS40NyAyNjEuOTkgMzk0LjQyIDI2Ni4yMiA0MTMuNjYgMjc3LjQzIEMgNDMwLjgyIDI4Ny4wMCA0NDQuODggMzAyLjE3IDQ1Mi43OCAzMjAuMTkgQyA0NTQuNTkgMzI0LjAwIDQ1MS4zNiAzMjcuNjMgNDQ5LjkwIDMzMC45OCBDIDQzMy4zMiAzNjIuNzEgMzk3LjM4IDM4MS45MCAzNjIuMDAgMzgxLjM5IEMgMzI2LjY4IDM4MS41NiAyOTAuOTggMzYyLjE1IDI3NC42MSAzMzAuMzcgQyAyNzMuMTggMzI3LjIzIDI3MC4zNiAzMjMuNzMgMjcyLjE2IDMyMC4xNyBDIDI4NS4zNiAyODkuMzkgMzE2LjYxIDI2OC42MSAzNDkuNDMgMjY0LjY3IE0gMzA2LjYwIDMxNC41NiBDIDMwNC4zOCAzMTcuMTAgMzAxLjk0IDMxOS42NCAzMDAuODAgMzIyLjg4IEMgMzA2LjUxIDMzMi4zMiAzMTUuMTcgMzM5Ljg0IDMyNC42NCAzNDUuMzggQyAzNDQuNzUgMzU2Ljg4IDM3MC4xOSAzNTguNDkgMzkxLjU4IDM0OS41NSBDIDQwNC45NCAzNDQuMjEgNDE2LjM5IDMzNC42NSA0MjQuNDggMzIyLjgxIEMgNDExLjA2IDMwMS42MyAzODUuODAgMjg5LjQwIDM2MC45NyAyOTAuMDIgQyAzNDAuNTQgMjkwLjMxIDMyMC4yMCAyOTkuMjMgMzA2LjYwIDMxNC41NiBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzU4LjM5IDMwMy41MSBDIDM2OS4wOSAzMDAuOTMgMzgwLjc3IDMwOS4xMiAzODEuODQgMzIwLjA5IEMgMzgzLjYxIDMzMS4wOSAzNzQuMjQgMzQyLjM1IDM2My4wMSAzNDIuMTYgQyAzNTIuODggMzQyLjgzIDM0My4yNSAzMzQuMTkgMzQyLjk3IDMyNC4wMiBDIDM0Mi4wNCAzMTQuNTkgMzQ5LjA4IDMwNS4yMyAzNTguMzkgMzAzLjUxIFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAxNjQuMDEgNDI1LjAzIEMgMTcxLjI0IDQyNC45NiAxNzguNDcgNDI0LjkzIDE4NS42OSA0MjUuMTEgQyAxODUuNjUgNDM1LjAzIDE4NS41MSA0NDQuOTQgMTg1Ljc2IDQ1NC44NiBDIDE5NS4yNSA0NTQuODcgMjA0Ljc1IDQ1NC44NyAyMTQuMjQgNDU0Ljg2IEMgMjE0LjQ5IDQ0NC45NSAyMTQuMzUgNDM1LjAzIDIxNC4zMCA0MjUuMTEgQyAyMjEuNTMgNDI0LjkzIDIyOC43NiA0MjQuOTYgMjM1Ljk4IDQyNS4wMyBDIDIzNi4wMSA0NTQuNzcgMjM2LjAzIDQ4NC41MSAyMzUuOTcgNTE0LjI1IEMgMjI4Ljc2IDUxNC40NSAyMjEuNTMgNTE0LjQ5IDIxNC4zMSA1MTQuMTUgQyAyMTQuMzMgNTAxLjg1IDIxNC41MyA0ODkuNTQgMjE0LjIyIDQ3Ny4yNCBDIDIwNC43NCA0NzcuMjkgMTk1LjI3IDQ3Ny4yNyAxODUuODAgNDc3LjI1IEMgMTg1LjQ1IDQ4OS41NSAxODUuNjggNTAxLjg1IDE4NS42OCA1MTQuMTUgQyAxNzguNDcgNTE0LjQ5IDE3MS4yNCA1MTQuNDUgMTY0LjAzIDUxNC4yNSBDIDE2My45NyA0ODQuNTEgMTY0LjAwIDQ1NC43NyAxNjQuMDEgNDI1LjAzIFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAyNTAuMzEgNDI1LjEwIEMgMjc0LjI5IDQyNC44OCAyOTguMjggNDI1LjAzIDMyMi4yNiA0MjUuMDMgQyAzMjIuNDQgNDMyLjQzIDMyMi40NSA0MzkuODUgMzIyLjI0IDQ0Ny4yNiBDIDMxMy44OSA0NDcuNDUgMzA1LjU0IDQ0Ny4zOCAyOTcuMTkgNDQ3LjMwIEMgMjk3LjAwIDQ2OS42MiAyOTcuMzEgNDkxLjk0IDI5Ny4wNCA1MTQuMjUgQyAyODkuOTQgNTE0LjQ0IDI4Mi44NCA1MTQuNDUgMjc1Ljc1IDUxNC4yNCBDIDI3NS41MCA0OTEuOTQgMjc1LjY4IDQ2OS42NCAyNzUuNjcgNDQ3LjM0IEMgMjY3LjIyIDQ0Ny4zMiAyNTguNzYgNDQ3LjU0IDI1MC4zMiA0NDcuMTYgQyAyNTAuMzcgNDM5LjgxIDI1MC4zOCA0MzIuNDYgMjUwLjMxIDQyNS4xMCBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzQwLjY2IDQyOS42NyBDIDM0My45MiA0MjUuODUgMzQ5LjE2IDQyNC44OCAzNTMuOTUgNDI0Ljk3IEMgMzczLjk5IDQyNS4wMyAzOTQuMDMgNDI0Ljk3IDQxNC4wNyA0MjUuMDAgQyA0MTguNTUgNDI0Ljk3IDQyMy4zNiA0MjYuMDcgNDI2LjM5IDQyOS42MiBDIDQzMC4xOCA0MzMuMzcgNDMwLjQ0IDQzOS4wMCA0MzAuNDIgNDQ0LjAxIEMgNDMwLjIzIDQ2Ny40MiA0MzAuNTQgNDkwLjgzIDQzMC4yNiA1MTQuMjQgQyA0MjMuMTEgNTE0LjQ1IDQxNS45NiA1MTQuNDQgNDA4LjgyIDUxNC4yNSBDIDQwOC41OSA0OTEuOTQgNDA4LjgwIDQ2OS42MyA0MDguNzIgNDQ3LjMzIEMgNDAzLjkyIDQ0Ny4zNiAzOTkuMTMgNDQ3LjM2IDM5NC4zNCA0NDcuMzQgQyAzOTQuMzMgNDY0LjY3IDM5NC40OCA0ODIuMDAgMzk0LjI3IDQ5OS4zMyBDIDM4Ny4xMiA0OTkuNTQgMzc5Ljk3IDQ5OS41NSAzNzIuODIgNDk5LjMyIEMgMzcyLjU5IDQ4MS45OSAzNzIuODEgNDY0LjY2IDM3Mi43MiA0NDcuMzMgQyAzNjcuOTIgNDQ3LjM2IDM2My4xMyA0NDcuMzYgMzU4LjM0IDQ0Ny4zNCBDIDM1OC4zMiA0NjkuNjQgMzU4LjUwIDQ5MS45NCAzNTguMjUgNTE0LjI0IEMgMzUxLjExIDUxNC40NSAzNDMuOTYgNTE0LjQ0IDMzNi44MiA1MTQuMjQgQyAzMzYuNTcgNDkwLjgzIDMzNi44NSA0NjcuNDIgMzM2LjY3IDQ0NC4wMSBDIDMzNi42NCA0MzkuMDIgMzM2Ljg5IDQzMy40MSAzNDAuNjYgNDI5LjY3IFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSA0NTEuOTEgNDI1LjA0IEMgNDU5LjE1IDQyNC45NiA0NjYuNDAgNDI0LjkyIDQ3My42NCA0MjUuMTMgQyA0NzMuNTEgNDQ3LjQ0IDQ3My40NCA0NjkuNzQgNDczLjY2IDQ5Mi4wNSBDIDQ4NS41NCA0OTIuMjUgNDk3LjQyIDQ5Mi4wOCA1MDkuMzAgNDkyLjEzIEMgNTA5LjU1IDQ5OS41MSA1MDkuNTQgNTA2Ljg5IDUwOS4zMyA1MTQuMjcgQyA0OTAuMjEgNTE0LjQzIDQ3MS4wOCA1MTQuNDMgNDUxLjk3IDUxNC4yNiBDIDQ1MS43NSA0ODQuNTIgNDUxLjg2IDQ1NC43OCA0NTEuOTEgNDI1LjA0IFoiIC8+DQo8L2c+DQo8L3N2Zz4NCg==
// @supportURL   https://github.com/Qing90bing/Qing_PageScanner/issues
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-start
// ==/UserScript==


var TextExtractor = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  // src/main.js
  var main_exports = {};
  __export(main_exports, {
    initUI: () => initUI,
    initialize: () => initialize2
  });
  // src/assets/icons/icon.js
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;
  // src/assets/icons/dynamicIcon.js
  var dynamicIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-766v572q-17-17-32-36t-28-39v-422q13-20 28-39t32-36Zm160-96v764q-21-7-41-15.5T280-133v-694q19-11 39-19.5t41-15.5Zm280 749v-734q106 47 173 145t67 222q0 124-67 222T640-113ZM480-80q-10 0-20-.5T440-82v-796q10-1 20-1.5t20-.5q20 0 40 2t40 6v784q-20 4-40 6t-40 2Z"/></svg>`;
  // src/assets/icons/summaryIcon.js
  var summaryIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
  // src/assets/icons/elementScanIcon.js
  var elementScanIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-480v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-640v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-800v-80h80v80H40Zm160 320v-80h80v80h-80Zm480 0v-80h80v80h-80Zm160-320v-80h80v80h-80Zm-640 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM473-40q-24 0-46-9t-39-26L184-280l33-34q14-14 34-19t40 0l69 20v-327q0-17 11.5-28.5T400-680q17 0 28.5 11.5T440-640v433l-98-28 103 103q6 6 13 9t15 3h167q33 0 56.5-23.5T720-200v-160q0-17 11.5-28.5T760-400q17 0 28.5 11.5T800-360v160q0 66-47 113T640-40H473Zm7-280v-160q0-17 11.5-28.5T520-520q17 0 28.5 11.5T560-480v160h-80Zm120 0v-120q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440v120h-80Zm40 200H445h195Z"/></svg>`;
  // src/assets/icons/aiIcon.js
  var aiIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M19 9 20.25 6.25 23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9Zm0 14 1.25-2.75L23 19l-2.75-1.25L19 15l-1.25 2.75L15 19l2.75 1.25L19 23ZM11.5 21 14 15.5l5.5-2.5-5.5-2.5L11.5 5 9 10.5 3.5 13 9 15.5 11.5 21Z"/>
</svg>`;
  // src/shared/ui/core/hostElement.js
  function updateScrollbarWidth(container) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    container.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  }
  function createHostElement() {
    const container = document.createElement("div");
    container.id = "text-extractor-container";
    const supportsPopover = HTMLElement.prototype.hasOwnProperty("popover");
    if (supportsPopover) {
      container.popover = "manual";
    }
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "0";
    container.style.zIndex = "2147483647";
    container.style.pointerEvents = "none";
    container.style.backgroundColor = "transparent";
    container.style.border = "none";
    container.style.margin = "0";
    container.style.padding = "0";
    container.style.overflow = "visible";
    return container;
  }
  function attachToBody(container) {
    if (document.body && !container.isConnected) {
      document.body.appendChild(container);
      if (container.popover === "manual") {
        try {
          container.showPopover();
        } catch (e) {
        }
      }
    }
  }
  var TopLayerManager = class {
    constructor(container) {
      this.container = container;
      this.supportsPopover = container.popover === "manual";
      this.promoteTimeout = null;
    }
    /**
     * @description 当检测到冲突时，重新提升容器层级。
     */
    rePromote() {
      if (!this.supportsPopover) return;
      if (this.promoteTimeout) clearTimeout(this.promoteTimeout);
      this.promoteTimeout = setTimeout(() => {
        this.promoteTimeout = null;
        if (!this.container.isConnected) return;
        try {
          this.container.hidePopover();
        } catch (e) {
        }
        void this.container.offsetHeight;
        requestAnimationFrame(() => {
          if (!this.container.isConnected) return;
          try {
            this.container.showPopover();
          } catch (e) {
          }
        });
      }, 100);
    }
  };
  // src/shared/ui/core/eventIsolator.js
  var EventIsolator = class {
    constructor(container) {
      this.container = container;
      this.shadowRoot = container.attachShadow({ mode: "closed" });
      this.handleGlobalCapture = this.handleGlobalCapture.bind(this);
    }
    /**
     * @returns {ShadowRoot}
     */
    getShadowRoot() {
      return this.shadowRoot;
    }
    /**
     * @description 模拟 F12：焦点锁定与事件隐形。
     */
    handleGlobalCapture(e) {
      let shouldBlock = false;
      if (e.target === this.container || e.target instanceof Node && this.container.contains(e.target)) {
        if (["pointerdown", "pointerup", "touchstart", "touchend", "focusin", "focusout"].includes(e.type)) {
          shouldBlock = true;
        }
      }
      if (e.relatedTarget && (e.relatedTarget === this.container || e.relatedTarget instanceof Node && this.container.contains(e.relatedTarget))) {
        shouldBlock = true;
      }
      if (shouldBlock) {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }
    }
    /**
     * @description 焦点恢复机制
     */
    restoreFocus(originalElement) {
      setTimeout(() => {
        const current = document.activeElement;
        if ((current === document.body || current === this.container) && originalElement && originalElement.isConnected) {
          try {
            originalElement.focus();
          } catch (err) {
          }
        }
      }, 0);
    }
    /**
     * @description 设置内部 Shadow DOM 的事件拦截
     */
    setupInternalIsolation() {
      const handleInternalBubble = (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.type === "mousedown") {
          const target = e.target;
          const tagName = target.tagName;
          const isInput = tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target.isContentEditable;
          const isLabel = tagName === "LABEL";
          if (!isInput && !isLabel) {
            const originalFocus = document.activeElement;
            e.preventDefault();
            this.restoreFocus(originalFocus);
          }
        }
      };
      const bubbleEvents = [
        "click",
        "dblclick",
        "contextmenu",
        "mouseup",
        "mousedown",
        "keydown",
        "keyup",
        "keypress",
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
        "focusin",
        "focusout"
      ];
      bubbleEvents.forEach((evt) => {
        this.shadowRoot.addEventListener(evt, handleInternalBubble, { capture: false });
      });
    }
    /**
     * @description 挂载全局捕获监听器
     */
    attachGlobalListeners() {
      const captureEvents = [
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
        "focusin",
        "focusout",
        "mouseout",
        "mouseleave",
        "pointerout",
        "pointerleave",
        "blur"
      ];
      captureEvents.forEach((evt) => window.addEventListener(evt, this.handleGlobalCapture, { capture: true }));
    }
    /**
     * @description 移除全局捕获监听器
     */
    detachGlobalListeners() {
      const captureEvents = [
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
        "focusin",
        "focusout",
        "mouseout",
        "mouseleave",
        "pointerout",
        "pointerleave",
        "blur"
      ];
      captureEvents.forEach((evt) => window.removeEventListener(evt, this.handleGlobalCapture, { capture: true }));
    }
  };
  // src/shared/ui/core/lifecycleManager.js
  var LifecycleManager = class {
    /**
     * @param {Object} options
     * @param {Function} options.onConnect - 当引用计数从 0 变为 1 时调用。
     * @param {Function} options.onDisconnect - 当引用计数从 1 变为 0 时调用。
     */
    constructor({ onConnect, onDisconnect }) {
      this.onConnect = onConnect;
      this.onDisconnect = onDisconnect;
      this.activeRefs = 0;
    }
    acquire() {
      if (this.activeRefs === 0) {
        this.onConnect();
      }
      this.activeRefs++;
    }
    release() {
      this.activeRefs--;
      if (this.activeRefs <= 0) {
        this.activeRefs = 0;
        this.onDisconnect();
      } else {
      }
    }
    get refCount() {
      return this.activeRefs;
    }
  };
  // src/shared/ui/uiContainer.js
  function createUIContainer() {
    const container = createHostElement();
    const topLayerMgr = new TopLayerManager(container);
    const isolator = new EventIsolator(container);
    isolator.setupInternalIsolation();
    const resizeHandler = () => updateScrollbarWidth(container);
    const observerCallback = (mutations) => {
      let needsReattach = false;
      let potentialOcclusion = false;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.removedNodes) {
            if (node === container) {
              needsReattach = true;
            }
          }
          if (!needsReattach) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1 && node !== container) {
                if (node.tagName === "DIALOG" || node.hasAttribute("popover")) {
                  potentialOcclusion = true;
                }
              }
            }
          }
        }
        if (mutation.type === "attributes" && mutation.target !== container) {
          if (mutation.target.tagName === "DIALOG" && mutation.attributeName === "open" && mutation.target.hasAttribute("open")) {
            potentialOcclusion = true;
          }
        }
      }
      if (needsReattach) {
        attachToBody(container);
      } else if (potentialOcclusion) {
        topLayerMgr.rePromote();
      }
    };
    const observer3 = new MutationObserver(observerCallback);
    const onConnect = () => {
      attachToBody(container);
      const startObserver = () => {
        if (document.body) {
          observer3.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["open", "popover"]
          });
        }
      };
      if (document.body) {
        startObserver();
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          attachToBody(container);
          startObserver();
        });
      }
      isolator.attachGlobalListeners();
      updateScrollbarWidth(container);
      window.addEventListener("resize", resizeHandler);
    };
    const onDisconnect = () => {
      observer3.disconnect();
      isolator.detachGlobalListeners();
      window.removeEventListener("resize", resizeHandler);
    };
    const lifecycle = new LifecycleManager({ onConnect, onDisconnect });
    lifecycle.acquire();
    const shadowRoot = isolator.getShadowRoot();
    shadowRoot.lifecycle = lifecycle;
    return shadowRoot;
  }
  var uiContainer = createUIContainer();
  var uiLifecycle = uiContainer.lifecycle;
  // src/shared/ui/components/tooltip.js
  var tooltipElement = null;
  var hideTimeout = null;
  var MARGIN = 12;
  function checkCollision(rect, obstacles) {
    for (const obstacle of obstacles) {
      if (rect.left < obstacle.right && rect.left + rect.width > obstacle.left && rect.top < obstacle.bottom && rect.top + rect.height > obstacle.top) {
        return true;
      }
    }
    return false;
  }
  function calculateOptimalPosition(targetRect, tooltipRect, obstacles) {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const { width: ttWidth, height: ttHeight } = tooltipRect;
    const positions = [
      // 1. 下方 (Bottom) - 优先
      {
        name: "bottom",
        top: targetRect.bottom + MARGIN,
        left: targetRect.left + targetRect.width / 2 - ttWidth / 2
      },
      // 2. 右侧 (Right)
      {
        name: "right",
        top: targetRect.top + targetRect.height / 2 - ttHeight / 2,
        left: targetRect.right + MARGIN
      },
      // 3. 左侧 (Left)
      {
        name: "left",
        top: targetRect.top + targetRect.height / 2 - ttHeight / 2,
        left: targetRect.left - ttWidth - MARGIN
      },
      // 4. 上方 (Top)
      {
        name: "top",
        top: targetRect.top - ttHeight - MARGIN,
        left: targetRect.left + targetRect.width / 2 - ttWidth / 2
      }
    ];
    for (const pos of positions) {
      const proposedRect = { top: pos.top, left: pos.left, width: ttWidth, height: ttHeight };
      const isInViewport = proposedRect.top >= 0 && proposedRect.left >= 0 && proposedRect.top + ttHeight <= viewportHeight && proposedRect.left + ttWidth <= viewportWidth;
      if (isInViewport) {
        if (!checkCollision(proposedRect, obstacles)) {
          return { top: pos.top, left: pos.left };
        }
      }
    }
    return { top: positions[0].top, left: positions[0].left };
  }
  function showTooltip(targetElement, text) {
    clearTimeout(hideTimeout);
    if (!tooltipElement) {
      tooltipElement = document.createElement("div");
      tooltipElement.className = "text-extractor-tooltip";
      uiContainer.appendChild(tooltipElement);
    }
    tooltipElement.textContent = text;
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const obstacles = Array.from(uiContainer.querySelectorAll(".text-extractor-fab")).filter((el) => el !== targetElement).map((el) => el.getBoundingClientRect());
    const { top, left } = calculateOptimalPosition(targetRect, tooltipRect, obstacles);
    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.left = `${left}px`;
    requestAnimationFrame(() => {
      tooltipElement.classList.add("is-visible");
    });
  }
  function hideTooltip() {
    if (!tooltipElement) return;
    tooltipElement.classList.remove("is-visible");
  }
  // src/assets/icons/themeIcon.js
  var themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
  // src/assets/icons/languageIcon.js
  var languageIcon_default = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>`;
  // src/assets/icons/infoIcon.js
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  // src/assets/icons/lightThemeIcon.js
  var lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
  // src/assets/icons/darkThemeIcon.js
  var darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
  // src/assets/icons/systemThemeIcon.js
  var systemThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
  // src/assets/icons/formatIcon.js
  var formatIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M600-160v-80h120v-480H600v-80h200v640H600Zm-440 0v-640h200v80H240v480h120v80H160Z"/></svg>`;
  // src/shared/i18n/en.json
  var en_default = {
    _meta: {
      name: "English"
    },
    script: {
      name: "Web Text Extraction Tool"
    },
    common: {
      scan: "Scan",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      reset: "Reset",
      delete: "Delete",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage",
      processingElement: "Processing Element"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      format: "Output Format",
      formats: {
        array: "Nested Array",
        object: "Key-Value Object",
        csv: "CSV String"
      },
      output: {
        include_brackets: "Include Wrapper Symbols"
      },
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      dynamicScanRefreshNotice: "When using Dynamic Scan, refresh the webpage after saving for the new filtering rules to take effect.",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "\u2198 Bottom Right",
          top_right: "\u2197 Top Right",
          bottom_left: "\u2199 Bottom Left",
          top_left: "\u2196 Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      contextual: {
        elementScanTitle: "Element Scan Settings",
        sessionScanTitle: "Dynamic Scan Settings",
        persistData: "Persist data across pages"
      },
      languages: {
        auto: "Auto",
        en: "English (United States)",
        "zh-CN": "Chinese (Simplified)",
        "zh-TW": "Chinese (Traditional)"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      ai: {
        title: "AI Translate",
        enabled: "Enable AI Features",
        enabledDescription: "Turning this off stops AI translation and hides the AI floating button. Normal scans are unaffected.",
        betaBadge: "Beta",
        betaNotice: "This feature is currently unstable and has known issues. It is for testing only.",
        general: "Scan and Translation",
        processingMode: "Processing Mode",
        manual: "Manual Submit",
        automatic: "Automatic",
        targetLanguage: "Target Language",
        simplifiedChinese: "Simplified Chinese",
        traditionalChinese: "Traditional Chinese",
        confidenceThreshold: "Confidence Threshold",
        regexRuleComments: "Include Regex Rule ID Comments",
        regexRuleCommentsDescription: "Adds // qps-rule:<id> comments to regex output for stable rule identification. Disabled by default for cleaner code.",
        provider: "Provider Configuration",
        currentProvider: "Current Provider",
        providerName: "Name",
        apiUrl: "Full API URL (chat/completions)",
        model: "Model",
        responseMode: "Response Mode",
        jsonMode: "JSON Mode",
        promptJson: "Prompt JSON",
        apiKey: "API Key (stored separately)",
        addProvider: "Add Provider",
        newProvider: "New Provider",
        saveProvider: "Save Provider Configuration",
        testConnection: "Test Processing & Latency",
        testDescription: "Sends one fixed synthetic phrase and verifies a parseable classification and translation JSON response. No webpage content is sent. A tiny charge may apply.",
        testing: "Testing classification, translation, and JSON output; a tiny charge may apply\u2026",
        processingOk: "Processing successful",
        connectionOk: "Processing successful",
        connectionFailed: "Processing test failed",
        costControl: "Cost Controls",
        maxBatchItems: "Max Items per Batch",
        maxBatchCharacters: "Max Characters per Batch",
        maxOutputTokens: "Max Estimated Output Tokens per Batch",
        maxRequests: "Max Requests per Page",
        maxPageCharacters: "Max Characters per Page",
        dailyTokens: "Daily Estimated Token Limit",
        timeout: "Request Timeout (seconds)",
        resetDailyUsage: "Reset Today's Usage",
        restoreDefaults: "Restore Defaults",
        siteStyles: "Site Translation Preferences (Optional)",
        siteStylesDescription: "This is optional. Save directly to use natural Chinese defaults for the current site; fill in more only for fixed terminology or special wording.",
        styleLibrary: "Saved Preferences",
        styleEditor: "Current Site Preferences",
        searchStyles: "Search Site Preferences",
        sortStyles: "Sort",
        sortRecent: "Recently Updated",
        sortOrigin: "By Site",
        styleOrigin: "Site Origin",
        stylePath: "Optional Path Prefix",
        styleTone: "Tone",
        styleGlossary: "Glossary and Proper Nouns",
        stylePunctuation: "Punctuation Style",
        styleInstructions: "Custom Translation Instructions",
        advancedStyleSettings: "Advanced Matching Settings",
        defaultStyleTone: "Natural, clear wording suitable for a Chinese website",
        defaultStylePunctuation: "Use standard Chinese punctuation for the target language",
        useCurrentSite: "Use Current Site",
        noStyles: "No matching site preferences",
        saveStyle: "Save Current Site Preferences",
        clearStyles: "Clear All Preferences"
      },
      about: "About",
      aboutPanel: {
        title: "About",
        version: "Version",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Dynamic Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    slider: {
      adjustFrameSize: "Move slider to adjust frame size",
      minLabel: "Min",
      maxLabel: "Max"
    },
    results: {
      title: "Extracted Text",
      aiTitle: "AI Translation Results",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      scanCountAi: "AI collected {{count}} items",
      aiRunning: "Working",
      aiPaused: "Paused",
      aiStopped: "Stopped",
      aiProcessing: "Processing\u2026",
      aiBudgetBlocked: "Sending paused due to budget limit",
      aiRequestError: "Request failed",
      aiReviewItems: "Items to Review",
      aiReviewRequired: "Review required",
      aiReviewReturnToEditor: "Return to editor",
      aiReviewRemove: "Remove",
      aiRegexEditError: "Regex rule needs review",
      aiOutput: {
        text: "Pure text",
        regex: "Regex rules"
      },
      aiCounts: {
        pending: "Pending",
        translated: "Translated",
        textRules: "Text rules",
        regexRules: "Regex rules",
        removed: "Removed",
        review: "Review",
        failed: "Failed"
      },
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      elementScanPaused: "Element scan paused.",
      elementScanResumed: "Element scan session resumed from previous page.",
      elementScanContinued: "Element scan continued.",
      sessionScanStarted: "Session scan started.",
      sessionScanPaused: "Dynamic scan paused.",
      sessionScanResumed: "Dynamic scan session resumed from previous page.",
      sessionScanContinued: "Dynamic scan continued.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions.",
      scanModeConflict: "Stop the active scan mode before starting another one.",
      aiScanStarted: "AI translation started.",
      aiScanPaused: "AI translation paused.",
      aiScanContinued: "AI translation resumed.",
      aiScanStopped: "AI translation stopped.",
      aiScanStartFailed: "AI translation failed to start.",
      aiDisabled: "AI features are disabled. Enable them in Settings first.",
      aiBatchCompleted: "AI batch completed.",
      aiNothingPending: "There are no pending items to send.",
      aiRequestFailed: "The AI request failed; affected items require review.",
      aiBudgetBlocked: "A cost limit was reached; local collection will continue.",
      aiProviderRequired: "At least one provider is required.",
      aiProviderSaved: "Provider configuration saved.",
      aiDailyUsageReset: "Today's estimated usage was reset.",
      aiDefaultsRestored: "Cost controls restored to defaults.",
      aiStyleOriginRequired: "Site origin is required.",
      aiStyleSaved: "Site translation preferences saved."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone.",
      deleteProvider: "Delete the current provider configuration?",
      deleteStyle: "Delete the current site translation preferences?",
      clearStyles: "Clear all site translation preferences?"
    },
    ai: {
      actions: {
        submitPending: "Submit Pending",
        retryReview: "Process Again"
      }
    },
    tooltip: {
      summary: "View Summary",
      ai_scan: "AI Translate (Beta)",
      ai_scan_stop: "Stop AI Translate",
      ai_disabled: "AI features are disabled",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      pauseElementScan: "Pause Element Scan",
      resumeElementScan: "Resume Element Scan",
      pauseSessionScan: "Pause Dynamic Scan",
      resumeSessionScan: "Resume Dynamic Scan",
      pauseAiScan: "Pause AI Translation",
      resumeAiScan: "Resume AI Translation",
      tooltipHelp: "Help",
      persistData: {
        title: "Data Persistence Explanation",
        text: {
          sessionScan: "When enabled, automatically resumes and continues accumulating results from the previous page when you navigate to a new one. If disabled, only the scan mode is restored, and a new scan session begins.",
          elementScan: "When enabled, automatically restores all currently staged text when you navigate to a new page. If disabled, only the scan mode is restored, and the staged area will be empty."
        }
      },
      disabled: {
        scan_in_progress: "Another scan is in progress",
        ai_scan_active: "Regular scans are disabled while AI is working"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \u20AC, \xA3, \xA5).<br><br><strong>More Examples:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (will be filtered)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (will not be filtered)',
        contains_chinese: `This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\u2022 "\u4F60\u597D World" (will be filtered)<br>\u2022 "Chapter 1" (will be filtered, as '\u7B2C 1 \u7AE0' contains '\u7B2C' and '\u7AE0')`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\u2022 "A" (will be filtered)<br>\u2022 "b" (will be filtered)<br>\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4-digit)<br>\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      },
      output: {
        include_brackets: "Controls whether the output text includes the format's wrapper symbols (e.g., <code>[</code> and <code>]</code> for array format, or <code>{</code> and <code>}</code> for object format).<br><br><strong>Enabled:</strong> Includes the complete format structure.<br><strong>Disabled:</strong> Outputs only the content lines, without wrapper symbols."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}",
          cspBlocked: "[Quick Scan] CSP check failed. Worker creation is not allowed."
        }
      },
      sessionScan: {
        switchToFallback: "[Dynamic Scan] Switching to main thread fallback.",
        resuming: "Resuming session-scan from previous page...",
        domObserver: {
          stopped: "[Dynamic Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Dynamic Scan - Fallback] Initialized.",
          cleared: "[Dynamic Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Dynamic Scan Worker]",
          starting: "Dynamic Scan: Attempting to start Web Worker...",
          initFailed: "[Dynamic Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Dynamic Scan] Original error: {{error}}",
          initialized: "[Dynamic Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Dynamic Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Dynamic Scan] Clear command sent to worker.",
          cspBlocked: "[Dynamic Scan] CSP check failed. Worker creation is not allowed."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked.",
          clearingContent: "Clearing content for mode: {{mode}}",
          footerCleanedUp: "Modal footer cleaned up.",
          destroyed: "Main modal destroyed."
        },
        helpIcon: {
          clicked: "Help icon clicked, displaying content for key: {{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}",
        uiCleanedUp: "Export UI cleaned up.",
        exportingUserContent: "Exporting user-edited content from UI.",
        exportingRawData: "Exporting original raw data (UI content invalid or truncated)."
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:",
        resumeFailed: "Failed to resume session"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      persistence: {
        saveBlocked: "Save blocked because persistence is disabled.",
        staleSession: "Stale session found, ignoring.",
        parseError: "Failed to parse saved session, clearing."
      },
      worker: {
        sessionStarted: "Session started with {{count}} initial items.",
        sessionCleared: "Session cleared."
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        resuming: "Resuming element-scan from previous page...",
        restored: "Restored {{count}} staged items.",
        skipRestore: "Skipping data restoration based on settings.",
        startingNewSession: "Starting new element scan session.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        escapeIgnoredForSettings: "Escape key pressed, but ignored because a settings panel is open.",
        escapeIgnoredForModal: "Escape key pressed, but ignored because a modal or tooltip is open.",
        escapePressedInAdjust: "Escape key pressed in adjustment mode, returning to reselection.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}",
          cspBlocked: "Element Scan CSP check failed. Worker creation is not allowed.",
          attemping: "Attempting to use Web Worker for filtering...",
          fallback: "Switched to main thread for filtering.",
          cspHint: "This may be due to the site's Content Security Policy (CSP)."
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}",
        stagingStarted: "Staging started for element: <{{tagName}}>",
        stagedNothingNew: "No new unique text was staged from this element.",
        stagingFinished: "Staging finished.",
        confirmStarted: "Confirmation process started...",
        confirmFinished: "Confirmation process finished successfully.",
        confirmFailed: "Confirmation process failed. Error: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Tutorial",
      elementScan: '<p><strong>What it does:</strong></p><p>Element Scan allows you to precisely select one or more areas on a webpage (e.g., a paragraph, a list, a sidebar) and extract text only from those areas.</p><p><strong>How to use:</strong></p><ol><li><strong>Start:</strong> Click the "Element Scan" icon <span class="help-icon-placeholder element-scan-icon"></span> in the floating button to enter scan mode.</li><li><strong>Select:</strong> Move your mouse over the page. The area you want to scan will be highlighted. Click to select it.</li><li><strong>Adjust:</strong> A toolbar will appear after selection. You can use the <strong>slider</strong> to expand or shrink the selection area.</li><li><strong>Stage:</strong> If you want to select multiple unrelated areas, click the <span class="action-key">Stage</span> button to save the current selection and continue selecting other areas.</li><li><strong>Confirm:</strong> Once you have finished all selections, click the <span class="action-key">Confirm</span> button to start extracting text from all your chosen areas.</li></ol><p><strong>How to exit:</strong></p><ul><li>While the highlight box is visible, <strong>right-click</strong> anywhere on the page.</li><li>Press the <kbd>ESC</kbd> key at any time.</li><li>Click the "Element Scan" icon again at any time.</li></ul>',
      sessionScanTitle: "Dynamic Scan Tutorial",
      sessionScan: '<p><strong>What it does:</strong></p><p>Dynamic Scan continuously monitors and automatically records all text that dynamically loads or changes on a webpage. It is especially useful for capturing live chats, infinite scrolling content, or notifications.</p><p><strong>How to use:</strong></p><ul><li><strong>Start Scan:</strong> Click the "Dynamic Scan" icon <span class="help-icon-placeholder dynamic-scan-icon"></span> in the floating button to start scanning immediately.</li><li><strong>Stop Scan:</strong> Click the icon again <span class="help-icon-placeholder stop-icon"></span> to stop.</li><li><strong>View Results:</strong> After stopping, click the main floating button <span class="help-icon-placeholder summary-icon"></span> to open the results window.</li></ul><p><strong>How to exit:</strong></p><ul><li>Click the "Dynamic Scan" icon again during the scan.</li><li>Press the <kbd>ESC</kbd> key at any time to quickly stop the scan.</li></ul>',
      aiScanTitle: "AI Translation Guide",
      aiScan: "<p><strong>What it does:</strong></p><p>AI translation continuously collects candidate webpage text and either processes it automatically or waits for manual submission. The top counter shows how many candidates have been collected.</p><p><strong>How to use:</strong></p><ul><li>Click the AI floating button again to stop translation.</li><li>Open View Summary to submit pending items, review results, and copy or export translations.</li><li>Repeated or previously processed text is not submitted again.</li></ul>"
    }
  };
  // src/shared/i18n/zh-CN.json
  var zh_CN_default = {
    _meta: {
      name: "\u7B80\u4F53\u4E2D\u6587"
    },
    script: {
      name: "\u7F51\u9875\u6587\u672C\u63D0\u53D6\u5DE5\u5177"
    },
    common: {
      scan: "\u626B\u63CF",
      stop: "\u505C\u6B62",
      pause: "\u6682\u505C",
      resume: "\u6062\u590D",
      clear: "\u6E05\u7A7A",
      copy: "\u590D\u5236",
      save: "\u4FDD\u5B58",
      reset: "\u91CD\u7F6E",
      delete: "\u5220\u9664",
      discovered: "\u5DF2\u53D1\u73B0:",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      export: "\u5BFC\u51FA",
      reselect: "\u91CD\u65B0\u9009\u62E9",
      stage: "\u6682\u5B58",
      processingElement: "\u5904\u7406\u5143\u7D20"
    },
    export: {
      exportAsTxt: "\u5BFC\u51FA\u4E3A TXT",
      exportAsJson: "\u5BFC\u51FA\u4E3A JSON",
      exportAsCsv: "\u5BFC\u51FA\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\u539F\u6587",
        translation: "\u8BD1\u6587"
      }
    },
    settings: {
      title: "\u8BBE\u7F6E",
      theme: "\u4E3B\u9898",
      language: "\u8BED\u8A00",
      format: "\u8F93\u51FA\u683C\u5F0F",
      formats: {
        array: "\u5D4C\u5957\u6570\u7EC4",
        object: "\u952E\u503C\u5BF9\u5BF9\u8C61",
        csv: "CSV \u5B57\u7B26\u4E32"
      },
      output: {
        include_brackets: "\u5305\u542B\u9996\u5C3E\u7B26\u53F7"
      },
      relatedSettings: "\u76F8\u5173\u8BBE\u7F6E",
      filterRules: "\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219",
      dynamicScanRefreshNotice: "\u4F7F\u7528\u52A8\u6001\u626B\u63CF\u6A21\u5F0F\u65F6\uFF0C\u4FDD\u5B58\u8FC7\u6EE4\u89C4\u5219\u540E\u9700\u8981\u5237\u65B0\u7F51\u9875\u624D\u80FD\u751F\u6548\u3002",
      filters: {
        numbers: "\u8FC7\u6EE4\u6570\u5B57/\u8D27\u5E01",
        chinese: "\u8FC7\u6EE4\u7EAF\u4E2D\u6587\u6587\u672C",
        contains_chinese: "\u8FC7\u6EE4\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7\u6587\u672C",
        symbols: "\u8FC7\u6EE4\u7EAF\u7B26\u53F7\u6587\u672C",
        term: "\u8FC7\u6EE4\u7279\u5B9A\u672F\u8BED",
        single_letter: "\u8FC7\u6EE4\u5355\u4E2A\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u8FC7\u6EE4\u91CD\u590D\u5B57\u7B26",
        file_paths: "\u8FC7\u6EE4\u6587\u4EF6\u8DEF\u5F84",
        hex_color_codes: "\u8FC7\u6EE4\u5341\u516D\u8FDB\u5236\u989C\u8272\u4EE3\u7801",
        email_addresses: "\u8FC7\u6EE4\u7535\u5B50\u90AE\u4EF6\u5730\u5740",
        uuids: "\u8FC7\u6EE4 UUID",
        git_commit_hashes: "\u8FC7\u6EE4 Git \u63D0\u4EA4\u54C8\u5E0C\u503C",
        website_urls: "\u8FC7\u6EE4\u7F51\u7AD9\u94FE\u63A5",
        website_urls_title: "\u8FC7\u6EE4\u7F51\u7AD9\u94FE\u63A5",
        shorthand_numbers: "\u8FC7\u6EE4\u901F\u8BB0\u6570\u5B57",
        shorthand_numbers_title: "\u8FC7\u6EE4\u901F\u8BB0\u6570\u5B57"
      },
      display: {
        show_fab: "\u663E\u793A\u60AC\u6D6E\u6309\u94AE",
        fab_position: "\u60AC\u6D6E\u6309\u94AE\u4F4D\u7F6E",
        fab_positions: {
          bottom_right: "\u2198 \u53F3\u4E0B\u89D2",
          top_right: "\u2197 \u53F3\u4E0A\u89D2",
          bottom_left: "\u2199 \u5DE6\u4E0B\u89D2",
          top_left: "\u2196 \u5DE6\u4E0A\u89D2"
        },
        show_line_numbers: "\u663E\u793A\u884C\u53F7",
        show_statistics: "\u663E\u793A\u7EDF\u8BA1\u4FE1\u606F",
        enable_word_wrap: "\u542F\u7528\u81EA\u52A8\u6362\u884C",
        text_truncation_limit: "\u542F\u7528\u6587\u672C\u622A\u65AD\u9650\u5236",
        character_limit: "\u5B57\u7B26\u9650\u5236",
        show_scan_count: "\u5728\u6807\u9898\u4E2D\u542F\u7528\u626B\u63CF\u8BA1\u6570"
      },
      advanced: {
        enable_debug_logging: "\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7\u8BB0\u5F55",
        init_i18n: "\u521D\u59CB\u5316\u56FD\u9645\u5316\uFF08i18n\uFF09",
        init_logger: "\u6839\u636E\u8BBE\u7F6E\u521D\u59CB\u5316\u65E5\u5FD7\u8BB0\u5F55\u5668"
      },
      panel: {
        title: "\u8BBE\u7F6E\u9762\u677F"
      },
      contextual: {
        elementScanTitle: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u8BBE\u7F6E",
        sessionScanTitle: "\u52A8\u6001\u626B\u63CF\u8BBE\u7F6E",
        persistData: "\u8DE8\u9875\u9762\u65F6\u4FDD\u7559\u626B\u63CF\u6570\u636E"
      },
      languages: {
        auto: "\u81EA\u52A8\u68C0\u6D4B",
        en: "\u82F1\u6587 (\u7F8E\u56FD)",
        "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
        "zh-TW": "\u7E41\u4F53\u4E2D\u6587"
      },
      themes: {
        light: "\u6D45\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u968F\u7CFB\u7EDF"
      },
      ai: {
        title: "AI \u7FFB\u8BD1",
        enabled: "\u542F\u7528 AI \u529F\u80FD",
        enabledDescription: "\u5173\u95ED\u540E\u4F1A\u505C\u6B62 AI \u7FFB\u8BD1\u5E76\u9690\u85CF AI \u60AC\u6D6E\u6309\u94AE\uFF1B\u666E\u901A\u626B\u63CF\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002",
        betaBadge: "Beta",
        betaNotice: "\u76EE\u524D\u8BE5\u529F\u80FD\u4E0D\u7A33\u5B9A\uFF0C\u95EE\u9898\u8F83\u591A\uFF0C\u4EC5\u505A\u6D4B\u8BD5\u3002",
        general: "\u626B\u63CF\u4E0E\u7FFB\u8BD1",
        processingMode: "\u5904\u7406\u6A21\u5F0F",
        manual: "\u624B\u52A8\u63D0\u4EA4",
        automatic: "\u81EA\u52A8\u5904\u7406",
        targetLanguage: "\u76EE\u6807\u8BED\u8A00",
        simplifiedChinese: "\u4E2D\u6587\u7B80\u4F53",
        traditionalChinese: "\u4E2D\u6587\u7E41\u4F53",
        confidenceThreshold: "\u7F6E\u4FE1\u5EA6\u9608\u503C",
        regexRuleComments: "\u5305\u542B\u6B63\u5219\u89C4\u5219 ID \u6CE8\u91CA",
        regexRuleCommentsDescription: "\u5728\u6B63\u5219\u8F93\u51FA\u4E2D\u6DFB\u52A0 // qps-rule:<id> \u6CE8\u91CA\uFF0C\u4FBF\u4E8E\u7A33\u5B9A\u8BC6\u522B\u89C4\u5219\u3002\u9ED8\u8BA4\u5173\u95ED\u4EE5\u4FDD\u6301\u4EE3\u7801\u7B80\u6D01\u3002",
        provider: "\u4F9B\u5E94\u5546\u914D\u7F6E",
        currentProvider: "\u5F53\u524D\u4F9B\u5E94\u5546",
        providerName: "\u4F9B\u5E94\u5546\u540D\u79F0",
        apiUrl: "\u5B8C\u6574 API \u5730\u5740\uFF08chat/completions\uFF09",
        model: "\u6A21\u578B",
        responseMode: "\u54CD\u5E94\u6A21\u5F0F",
        jsonMode: "JSON \u6A21\u5F0F",
        promptJson: "Prompt JSON",
        apiKey: "API Key\uFF08\u72EC\u7ACB\u4FDD\u5B58\uFF09",
        addProvider: "\u65B0\u589E\u4F9B\u5E94\u5546",
        newProvider: "\u65B0\u4F9B\u5E94\u5546",
        saveProvider: "\u4FDD\u5B58\u4F9B\u5E94\u5546\u914D\u7F6E",
        testConnection: "\u6D4B\u8BD5\u5904\u7406\u4E0E\u5EF6\u8FDF",
        testDescription: "\u53D1\u9001\u4E00\u6761\u56FA\u5B9A\u7684\u5408\u6210\u77ED\u6587\u672C\uFF0C\u9A8C\u8BC1\u4F9B\u5E94\u5546\u80FD\u8FD4\u56DE\u53EF\u89E3\u6790\u7684\u5206\u7C7B\u4E0E\u7FFB\u8BD1 JSON\uFF1B\u4E0D\u4F1A\u53D1\u9001\u7F51\u9875\u5185\u5BB9\u3002\u6D4B\u8BD5\u53EF\u80FD\u4EA7\u751F\u6781\u5C0F\u8D39\u7528\u3002",
        testing: "\u6B63\u5728\u6D4B\u8BD5\u5206\u7C7B\u3001\u7FFB\u8BD1\u548C JSON \u7ED3\u679C\uFF0C\u53EF\u80FD\u4EA7\u751F\u6781\u5C0F\u8D39\u7528\u2026",
        processingOk: "\u5904\u7406\u6B63\u5E38",
        connectionOk: "\u5904\u7406\u6B63\u5E38",
        connectionFailed: "\u5904\u7406\u6D4B\u8BD5\u5931\u8D25",
        costControl: "\u6210\u672C\u63A7\u5236",
        maxBatchItems: "\u5355\u6279\u6700\u591A\u6761\u76EE",
        maxBatchCharacters: "\u5355\u6279\u6700\u591A\u5B57\u7B26",
        maxOutputTokens: "\u5355\u6279\u9884\u4F30\u8F93\u51FA Token \u4E0A\u9650",
        maxRequests: "\u5355\u9875\u9762\u6700\u591A\u8BF7\u6C42",
        maxPageCharacters: "\u5355\u9875\u9762\u6700\u591A\u5B57\u7B26",
        dailyTokens: "\u6BCF\u65E5\u4F30\u7B97 Token \u4E0A\u9650",
        timeout: "\u8BF7\u6C42\u8D85\u65F6\uFF08\u79D2\uFF09",
        resetDailyUsage: "\u6E05\u9664\u4ECA\u65E5\u7528\u91CF",
        restoreDefaults: "\u6062\u590D\u9ED8\u8BA4",
        siteStyles: "\u7AD9\u70B9\u7FFB\u8BD1\u504F\u597D\uFF08\u53EF\u9009\uFF09",
        siteStylesDescription: "\u8FD9\u662F\u53EF\u9009\u9879\u3002\u76F4\u63A5\u4FDD\u5B58\u5373\u53EF\u4E3A\u5F53\u524D\u7F51\u7AD9\u4F7F\u7528\u9ED8\u8BA4\u4E2D\u6587\u8868\u8FBE\uFF1B\u53EA\u6709\u9700\u8981\u56FA\u5B9A\u672F\u8BED\u6216\u7279\u6B8A\u8868\u8FBE\u65F6\u624D\u586B\u5199\u66F4\u591A\u5185\u5BB9\u3002",
        styleLibrary: "\u5DF2\u4FDD\u5B58\u504F\u597D",
        styleEditor: "\u5F53\u524D\u7F51\u7AD9\u504F\u597D",
        searchStyles: "\u641C\u7D22\u7AD9\u70B9\u504F\u597D",
        sortStyles: "\u6392\u5E8F",
        sortRecent: "\u6700\u8FD1\u66F4\u65B0",
        sortOrigin: "\u6309\u7AD9\u70B9",
        styleOrigin: "\u7AD9\u70B9 Origin",
        stylePath: "\u53EF\u9009\u8DEF\u5F84\u524D\u7F00",
        styleTone: "\u8BED\u6C14",
        styleGlossary: "\u672F\u8BED\u8868\u4E0E\u4E13\u6709\u540D\u8BCD",
        stylePunctuation: "\u6807\u70B9\u4E60\u60EF",
        styleInstructions: "\u81EA\u5B9A\u4E49\u7FFB\u8BD1\u8981\u6C42",
        advancedStyleSettings: "\u9AD8\u7EA7\u5339\u914D\u8BBE\u7F6E",
        defaultStyleTone: "\u81EA\u7136\u3001\u6E05\u6670\uFF0C\u7B26\u5408\u4E2D\u6587\u7F51\u9875\u8868\u8FBE",
        defaultStylePunctuation: "\u4F7F\u7528\u76EE\u6807\u8BED\u8A00\u7684\u6807\u51C6\u4E2D\u6587\u6807\u70B9",
        useCurrentSite: "\u4F7F\u7528\u5F53\u524D\u7F51\u7AD9",
        noStyles: "\u6CA1\u6709\u5339\u914D\u7684\u7AD9\u70B9\u504F\u597D",
        saveStyle: "\u4FDD\u5B58\u5F53\u524D\u7F51\u7AD9\u504F\u597D",
        clearStyles: "\u6E05\u7A7A\u5168\u90E8\u504F\u597D"
      },
      about: "\u5173\u4E8E",
      aboutPanel: {
        title: "\u5173\u4E8E",
        version: "\u7248\u672C",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u626B\u63CF",
      session: "\u52A8\u6001\u626B\u63CF",
      stagedCount: "\u5DF2\u6682\u5B58:",
      elementFinished: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      startSession: "\u5F00\u59CB\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      stopSession: "\u505C\u6B62\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      finished: "\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      quickFinished: "\u5FEB\u901F\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      sessionStarted: "\u52A8\u6001\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
      sessionInProgress: "\u626B\u63CF\u8FDB\u884C\u4E2D...",
      truncationWarning: "\u4E3A\u4FDD\u6301\u754C\u9762\u6D41\u7545\uFF0C\u6B64\u5904\u4EC5\u663E\u793A\u90E8\u5206\u6587\u672C\u3002\u5BFC\u51FA\u540E\u5C06\u5305\u542B\u5B8C\u6574\u5185\u5BB9\u3002"
    },
    slider: {
      adjustFrameSize: "\u79FB\u52A8\u6ED1\u5757\u4EE5\u8C03\u6574\u6846\u67B6\u5927\u5C0F",
      minLabel: "\u6700\u5C0F",
      maxLabel: "\u6700\u5927"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      aiTitle: "AI \u7FFB\u8BD1\u7ED3\u679C",
      scanCountSession: "\u5DF2\u626B\u63CF {{count}} \u4E2A\u9879\u76EE",
      scanCountStatic: "\u5171\u626B\u63CF {{count}} \u4E2A\u9879\u76EE",
      scanCountAi: "AI \u5DF2\u6536\u96C6 {{count}} \u4E2A\u9879\u76EE",
      aiRunning: "\u5DE5\u4F5C\u4E2D",
      aiPaused: "\u5DF2\u6682\u505C",
      aiStopped: "\u5DF2\u505C\u6B62",
      aiProcessing: "\u5904\u7406\u4E2D\u2026",
      aiBudgetBlocked: "\u53D1\u9001\u5DF2\u6682\u505C\uFF0C\u8FBE\u5230\u9884\u7B97\u9650\u5236",
      aiRequestError: "\u8BF7\u6C42\u5931\u8D25",
      aiReviewItems: "\u5F85\u590D\u6838\u5185\u5BB9",
      aiReviewRequired: "\u9700\u4EBA\u5DE5\u590D\u6838",
      aiReviewReturnToEditor: "\u8FD4\u56DE\u7F16\u8F91\u6846",
      aiReviewRemove: "\u79FB\u9664",
      aiRegexEditError: "\u6B63\u5219\u89C4\u5219\u9700\u590D\u6838",
      aiOutput: {
        text: "\u7EAF\u6587\u672C",
        regex: "\u6B63\u5219\u7FFB\u8BD1"
      },
      aiCounts: {
        pending: "\u5F85\u5904\u7406",
        translated: "\u5DF2\u7FFB\u8BD1",
        textRules: "\u7EAF\u6587\u672C\u89C4\u5219",
        regexRules: "\u6B63\u5219\u89C4\u5219",
        removed: "\u79FB\u9664",
        review: "\u5F85\u590D\u6838",
        failed: "\u5931\u8D25"
      },
      totalCharacters: "\u603B\u5B57\u7B26\u6570",
      totalLines: "\u603B\u884C\u6570",
      noSummary: "\u65E0\u53EF\u7528\u6458\u8981",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF01",
      settingsSaved: "\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01",
      modalInitError: "\u6A21\u6001\u6846\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6CA1\u6709\u53EF\u590D\u5236\u7684\u5185\u5BB9\u3002",
      contentCleared: "\u5185\u5BB9\u5DF2\u6E05\u9664\u3002",
      noTextSelected: "\u672A\u9009\u62E9\u4EFB\u4F55\u6587\u672C\u3002",
      scanFailed: "\u626B\u63CF\u5931\u8D25\u3002",
      elementScanStarted: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
      elementScanPaused: "\u5143\u7D20\u626B\u63CF\u5DF2\u6682\u505C\u3002",
      elementScanResumed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u4F1A\u8BDD\u5DF2\u4ECE\u4E0A\u4E00\u9875\u6062\u590D\u3002",
      elementScanContinued: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u7EE7\u7EED\u3002",
      sessionScanStarted: "\u52A8\u6001\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
      sessionScanPaused: "\u52A8\u6001\u626B\u63CF\u5DF2\u6682\u505C\u3002",
      sessionScanResumed: "\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD\u5DF2\u4ECE\u4E0A\u4E00\u9875\u6062\u590D\u3002",
      sessionScanContinued: "\u52A8\u6001\u626B\u63CF\u5DF2\u7EE7\u7EED\u3002",
      cspWorkerWarning: "\u56E0\u7F51\u7AD9\u5B89\u5168\u9650\u5236\uFF0C\u5DF2\u5207\u6362\u81F3\u517C\u5BB9\u626B\u63CF\u6A21\u5F0F\u3002",
      scanModeConflict: "\u8BF7\u5148\u505C\u6B62\u5F53\u524D\u626B\u63CF\u6A21\u5F0F\uFF0C\u518D\u542F\u52A8\u53E6\u4E00\u79CD\u626B\u63CF\u3002",
      aiScanStarted: "AI \u7FFB\u8BD1\u5DF2\u5F00\u59CB\u3002",
      aiScanPaused: "AI \u7FFB\u8BD1\u5DF2\u6682\u505C\u3002",
      aiScanContinued: "AI \u7FFB\u8BD1\u5DF2\u6062\u590D\u3002",
      aiScanStopped: "AI \u7FFB\u8BD1\u5DF2\u505C\u6B62\u3002",
      aiScanStartFailed: "AI \u7FFB\u8BD1\u542F\u52A8\u5931\u8D25\u3002",
      aiDisabled: "AI \u529F\u80FD\u5DF2\u5173\u95ED\uFF0C\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002",
      aiBatchCompleted: "AI \u6279\u6B21\u5904\u7406\u5B8C\u6210\u3002",
      aiNothingPending: "\u5F53\u524D\u6CA1\u6709\u5F85\u53D1\u9001\u5185\u5BB9\u3002",
      aiRequestFailed: "AI \u8BF7\u6C42\u5931\u8D25\uFF0C\u6761\u76EE\u5DF2\u8FDB\u5165\u5F85\u590D\u6838\u3002",
      aiBudgetBlocked: "\u5DF2\u8FBE\u5230\u6210\u672C\u9650\u5236\uFF1B\u4ECD\u4F1A\u7EE7\u7EED\u5728\u672C\u5730\u6536\u96C6\u3002",
      aiProviderRequired: "\u81F3\u5C11\u9700\u8981\u4FDD\u7559\u4E00\u4E2A\u4F9B\u5E94\u5546\u3002",
      aiProviderSaved: "\u4F9B\u5E94\u5546\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002",
      aiDailyUsageReset: "\u4ECA\u65E5\u4F30\u7B97\u7528\u91CF\u5DF2\u6E05\u9664\u3002",
      aiDefaultsRestored: "\u6210\u672C\u63A7\u5236\u5DF2\u6062\u590D\u9ED8\u8BA4\u503C\u3002",
      aiStyleOriginRequired: "\u7AD9\u70B9 Origin \u4E0D\u80FD\u4E3A\u7A7A\u3002",
      aiStyleSaved: "\u7AD9\u70B9\u7FFB\u8BD1\u504F\u597D\u5DF2\u4FDD\u5B58\u3002"
    },
    placeholders: {
      click: "\u70B9\u51FB ",
      dynamicScan: "[\u52A8\u6001\u626B\u63CF]",
      startNewScanSession: " \u5F00\u59CB\u65B0\u7684\u626B\u63CF\u4F1A\u8BDD",
      staticScan: "[\u9759\u6001\u626B\u63CF]",
      performOneTimeScan: " \u6267\u884C\u4E00\u6B21\u6027\u5FEB\u901F\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u60A8\u786E\u5B9A\u8981\u6E05\u9664\u5185\u5BB9\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",
      deleteProvider: "\u786E\u5B9A\u5220\u9664\u5F53\u524D\u4F9B\u5E94\u5546\u914D\u7F6E\u5417\uFF1F",
      deleteStyle: "\u786E\u5B9A\u5220\u9664\u5F53\u524D\u7AD9\u70B9\u7FFB\u8BD1\u504F\u597D\u5417\uFF1F",
      clearStyles: "\u786E\u5B9A\u6E05\u7A7A\u5168\u90E8\u7AD9\u70B9\u7FFB\u8BD1\u504F\u597D\u5417\uFF1F"
    },
    ai: {
      actions: {
        submitPending: "\u63D0\u4EA4\u5F85\u5904\u7406",
        retryReview: "\u91CD\u65B0\u5904\u7406"
      }
    },
    tooltip: {
      summary: "\u67E5\u770B\u6458\u8981",
      ai_scan: "AI \u7FFB\u8BD1\uFF08Beta\uFF09",
      ai_scan_stop: "\u505C\u6B62 AI \u7FFB\u8BD1",
      ai_disabled: "AI \u529F\u80FD\u5DF2\u5173\u95ED",
      dynamic_scan: "\u52A8\u6001\u626B\u63CF",
      static_scan: "\u9759\u6001\u626B\u63CF",
      element_scan: "\u9009\u53D6\u5143\u7D20\u626B\u63CF",
      pauseElementScan: "\u6682\u505C\u5143\u7D20\u626B\u63CF",
      resumeElementScan: "\u6062\u590D\u5143\u7D20\u626B\u63CF",
      pauseSessionScan: "\u6682\u505C\u52A8\u6001\u626B\u63CF",
      resumeSessionScan: "\u6062\u590D\u52A8\u6001\u626B\u63CF",
      pauseAiScan: "\u6682\u505C AI \u7FFB\u8BD1",
      resumeAiScan: "\u6062\u590D AI \u7FFB\u8BD1",
      tooltipHelp: "\u5E2E\u52A9",
      persistData: {
        title: "\u6570\u636E\u6301\u4E45\u5316\u8BF4\u660E",
        text: {
          sessionScan: "\u5F00\u542F\u540E\uFF0C\u5F53\u70B9\u51FB\u94FE\u63A5\u8DF3\u8F6C\u5230\u65B0\u9875\u9762\u65F6\uFF0C\u4F1A\u81EA\u52A8\u6062\u590D\u5E76\u7EE7\u7EED\u7D2F\u52A0\u4E0A\u4E00\u9875\u7684\u626B\u63CF\u7ED3\u679C\u3002\u5173\u95ED\u6B64\u9009\u9879\uFF0C\u5219\u53EA\u6062\u590D\u626B\u63CF\u6A21\u5F0F\uFF0C\u4F46\u4F1A\u5F00\u59CB\u4E00\u6B21\u5168\u65B0\u7684\u626B\u63CF\u3002",
          elementScan: "\u5F00\u542F\u540E\uFF0C\u5F53\u70B9\u51FB\u94FE\u63A5\u8DF3\u8F6C\u5230\u65B0\u9875\u9762\u65F6\uFF0C\u4F1A\u81EA\u52A8\u6062\u590D\u5F53\u524D\u5DF2\u6682\u5B58\u7684\u6240\u6709\u6587\u672C\u3002\u5173\u95ED\u6B64\u9009\u9879\uFF0C\u5219\u53EA\u6062\u590D\u626B\u63CF\u6A21\u5F0F\uFF0C\u4F46\u6682\u5B58\u533A\u4F1A\u662F\u7A7A\u7684\u3002"
        }
      },
      disabled: {
        scan_in_progress: "\u53E6\u4E00\u9879\u626B\u63CF\u6B63\u5728\u8FDB\u884C\u4E2D",
        ai_scan_active: "AI \u5DE5\u4F5C\u4E2D\uFF0C\u666E\u901A\u626B\u63CF\u5DF2\u7981\u7528"
      },
      filters: {
        title: "\u5185\u5BB9\u8FC7\u6EE4\u5668\u8BF4\u660E",
        numbers: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u6570\u5B57\u3001\u7A7A\u683C\u3001\u5343\u4F4D\u5206\u9694\u7B26(,)\u3001\u5C0F\u6570\u70B9(.)\u4EE5\u53CA\u90E8\u5206\u8D27\u5E01\u7B26\u53F7($, \u20AC, \xA3, \xA5)\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u6C49\u5B57\u548C\u7A7A\u683C\u7EC4\u6210\uFF0C\u4E14\u4E0D\u542B\u4EFB\u4F55\u6807\u70B9\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (\u4E0D\u4F1A\u88AB\u8FC7\u6EE4)',
        contains_chinese: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u4EFB\u4F55\u542B\u6709\u81F3\u5C11\u4E00\u4E2A\u6C49\u5B57\u7684\u6587\u672C\uFF0C\u65E0\u8BBA\u5176\u4ED6\u5B57\u7B26\u662F\u4EC0\u4E48\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u4F60\u597D World" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "\u7B2C\u4E00\u7AE0" (\u5C06\u88AB\u8FC7\u6EE4)',
        emoji_only: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u4E00\u4E2A\u6216\u591A\u4E2A\u8868\u60C5\u7B26\u53F7\u53CA\u7A7A\u683C\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u5404\u79CD\u6807\u70B9\u548C\u7B26\u53F7\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u901A\u5E38\u4E0D\u9700\u8981\u7FFB\u8BD1\u7684\u5E38\u89C1UI\u672F\u8BED\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7531<strong>\u5355\u4E2A</strong>\u82F1\u6587\u5B57\u6BCD\u7EC4\u6210\u7684\u6587\u672C\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "A" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "b" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "AB" (\u4E0D\u4F1A\u88AB\u8FC7\u6EE4)',
        repeating_chars: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7531<strong>\u540C\u4E00\u4E2A\u5B57\u7B26</strong>\u8FDE\u7EED\u91CD\u590D2\u6B21\u6216\u4EE5\u4E0A\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: '\u6B64\u89C4\u5219\u5C1D\u8BD5\u8BC6\u522B\u5E76\u8FC7\u6EE4\u6389\u7C7B\u4F3C\u64CD\u4F5C\u7CFB\u7EDF\u6587\u4EF6\u8DEF\u5F84\u4E14<strong>\u5305\u542B\u6587\u4EF6\u6269\u5C55\u540D</strong>\u7684\u6587\u672C\u3002\u5B83\u4E0D\u5339\u914D\u7F51\u5740\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u6807\u51C6\u7684CSS\u5341\u516D\u8FDB\u5236\u989C\u8272\u4EE3\u7801\uFF083\u30014\u30016\u62168\u4F4D\uFF0C\u540E\u8005\u5305\u542B\u900F\u660E\u5EA6\u901A\u9053\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4\u4F4D)<br>\u2022 "#ff000080" (8\u4F4D)',
        email_addresses: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7B26\u5408\u6807\u51C6\u7535\u5B50\u90AE\u4EF6\u5730\u5740\u683C\u5F0F\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u901A\u7528\u552F\u4E00\u6807\u8BC6\u7B26 (UUID)\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u6807\u51C6\u7684Git\u63D0\u4EA4\u54C8\u5E0C\u503C\uFF08\u957F\u6216\u77ED\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u72EC\u7ACB\u7684\u7F51\u5740</strong>\u3002\u5B83\u8BBE\u8BA1\u5F97\u6BD4\u8F83\u4E25\u683C\uFF0C\u4EE5\u907F\u514D\u610F\u5916\u79FB\u9664\u4E0D\u662F\u94FE\u63A5\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u4F7F\u7528<strong>\u5E38\u89C1\u901F\u8BB0\u540E\u7F00</strong>\u8868\u793A\u5343(k)\u3001\u767E\u4E07(m)\u6216\u5341\u4EBF(b)\u7684\u6570\u5B57\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "\u663E\u793A\u8BBE\u7F6E\u8BF4\u660E",
        show_fab: "\u63A7\u5236\u662F\u5426\u5728\u7F51\u9875\u53F3\u4E0B\u89D2\u663E\u793A<strong>\u60AC\u6D6E\u64CD\u4F5C\u6309\u94AE(FAB)</strong>\u3002\u8FD9\u662F\u8FDB\u884C\u9759\u6001\u548C\u52A8\u6001\u6587\u672C\u63D0\u53D6\u7684\u4E3B\u8981\u5165\u53E3\u3002<br><br>\u5982\u679C\u60A8\u7981\u7528\u4E86\u6B64\u6309\u94AE\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6CB9\u7334\u6269\u5C55\u83DC\u5355\u4E2D\u7684\u8BBE\u7F6E\u9762\u677F\u91CD\u65B0\u542F\u7528\u5B83\u3002",
        show_scan_count: "\u542F\u7528\u540E\uFF0C\u7ED3\u679C\u7A97\u53E3\u7684\u6807\u9898\u680F\u5C06<strong>\u5B9E\u65F6\u663E\u793A</strong>\u5F53\u524D\u626B\u63CF\u4E2D\u627E\u5230\u7684\u603B\u6587\u672C\u9879\u76EE\u6570\u3002\u8FD9\u5BF9\u4E8E\u76D1\u63A7\u957F\u65F6\u95F4\u8FD0\u884C\u7684<strong>\u52A8\u6001\u626B\u63CF</strong>\u7684\u8FDB\u5EA6\u7279\u522B\u6709\u7528\u3002",
        show_line_numbers: "\u5728\u7ED3\u679C\u7A97\u53E3\u7684\u6587\u672C\u533A\u57DF\u5DE6\u4FA7\u663E\u793A\u884C\u53F7\u3002\u5F53\u60A8\u9700\u8981\u8BA8\u8BBA\u6216\u8BB0\u5F55\u7279\u5B9A\u6587\u672C\u884C\u65F6\uFF0C\u8FD9\u63D0\u4F9B\u4E86\u4E00\u4E2A<strong>\u7CBE\u786E\u7684\u53C2\u8003\u70B9</strong>\u3002",
        show_statistics: "\u5728\u7ED3\u679C\u7A97\u53E3\u5E95\u90E8\u7684\u72B6\u6001\u680F\u4E2D\u663E\u793A\u6709\u5173\u63D0\u53D6\u5185\u5BB9\u7684<strong>\u5B9E\u65F6\u7EDF\u8BA1\u6570\u636E</strong>\uFF0C\u5305\u62EC<strong>\u603B\u884C\u6570</strong>\u548C<strong>\u603B\u5B57\u7B26\u6570</strong>\u3002\u8FD9\u6709\u52A9\u4E8E\u60A8\u5FEB\u901F\u8BC4\u4F30\u5185\u5BB9\u7684\u4F53\u91CF\u3002",
        enable_word_wrap: "\u63A7\u5236\u7ED3\u679C\u7A97\u53E3\u4E2D\u957F\u6587\u672C\u884C\u7684\u663E\u793A\u65B9\u5F0F\u3002<br><br>\u2022 <strong>\u542F\u7528:</strong> \u957F\u884C\u5C06\u81EA\u52A8\u6362\u884C\u4EE5\u9002\u5E94\u7A97\u53E3\u5BBD\u5EA6\u3002<br>\u2022 <strong>\u7981\u7528:</strong> \u957F\u884C\u5C06\u4FDD\u6301\u5728\u5355\u884C\uFF0C\u5E76\u51FA\u73B0\u6C34\u5E73\u6EDA\u52A8\u6761\u3002",
        text_truncation_limit: "\u8FD9\u662F\u4E00\u4E2A<strong>\u6027\u80FD\u4F18\u5316</strong>\u529F\u80FD\u3002\u5982\u679C\u811A\u672C\u63D0\u53D6\u5230<strong>\u6781\u957F\u7684\u5355\u884C\u6587\u672C</strong>\uFF08\u4F8B\u5982\uFF0Cbase64\u7F16\u7801\u7684\u56FE\u7247\uFF09\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6D4F\u89C8\u5668<strong>\u5361\u987F\u6216\u65E0\u54CD\u5E94</strong>\u3002<br><br>\u6B64\u8BBE\u7F6E\u4F1A\u622A\u65AD\u4EFB\u4F55\u8D85\u8FC7\u6307\u5B9A\u957F\u5EA6\u7684\u5355\u884C\u6587\u672C\uFF0C\u4EE5\u786E\u4FDDUI\u4FDD\u6301\u6D41\u7545\u3002<strong>\u6CE8\u610F\uFF1A\u8FD9\u4EC5\u5F71\u54CD\u663E\u793A\uFF1B\u5BFC\u51FA\u7684\u6587\u4EF6\u4ECD\u5C06\u5305\u542B\u5B8C\u6574\u7684\u3001\u672A\u622A\u65AD\u7684\u5185\u5BB9\u3002</strong>"
      },
      advanced: {
        title: "\u9AD8\u7EA7\u8BBE\u7F6E\u8BF4\u660E",
        enable_debug_logging: "\u542F\u7528\u540E\uFF0C\u811A\u672C\u4F1A\u5C06\u8BE6\u7EC6\u7684\u5185\u90E8\u72B6\u6001\u3001\u6267\u884C\u6B65\u9AA4\u548C\u9519\u8BEF\u4FE1\u606F\u8F93\u51FA\u5230\u6D4F\u89C8\u5668\u7684<strong>\u5F00\u53D1\u8005\u5DE5\u5177\u63A7\u5236\u53F0</strong>\uFF08\u901A\u5E38\u7528F12\u6253\u5F00\uFF09\u3002\u8FD9\u4E3B\u8981\u4F9B\u5F00\u53D1\u8005\u6216\u9700\u8981\u63D0\u4EA4\u8BE6\u7EC6\u9519\u8BEF\u62A5\u544A\u7684\u7528\u6237\u4F7F\u7528\u3002"
      },
      output: {
        include_brackets: "\u63A7\u5236\u8F93\u51FA\u6587\u672C\u662F\u5426\u5305\u542B\u683C\u5F0F\u7684\u9996\u5C3E\u7B26\u53F7\uFF08\u5982\u6570\u7EC4\u683C\u5F0F\u7684 <code>[</code> \u548C <code>]</code>\uFF0C\u6216\u5BF9\u8C61\u683C\u5F0F\u7684 <code>{</code> \u548C <code>}</code>\uFF09\u3002<br><br><strong>\u5F00\u542F\u65F6:</strong> \u5305\u542B\u5B8C\u6574\u7684\u683C\u5F0F\u7ED3\u6784\u3002<br><strong>\u5173\u95ED\u65F6:</strong> \u4EC5\u8F93\u51FA\u5185\u5BB9\u884C\uFF0C\u4E0D\u542B\u9996\u5C3E\u7B26\u53F7\u3002"
      }
    },
    log: {
      prefix: "[\u6587\u672C\u63D0\u53D6\u811A\u672C-\u8C03\u8BD5]",
      language: {
        switched: "\u8BED\u8A00\u5DF2\u5207\u6362\u81F3\uFF1A{{lang}}",
        notFound: "\u672A\u627E\u5230\u8BED\u8A00 '{{lang}}'\uFF0C\u5DF2\u56DE\u9000\u81F3 'en'\u3002"
      },
      settings: {
        changed: "\u8BBE\u7F6E '{{key}}' \u5DF2\u4ECE '{{oldValue}}' \u66F4\u6539\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\u8FC7\u6EE4\u89C4\u5219 '{{key}}' \u5DF2\u542F\u7528",
          disabled: "\u8FC7\u6EE4\u89C4\u5219 '{{key}}' \u5DF2\u7981\u7528"
        },
        panel: {
          opening: "\u6B63\u5728\u6253\u5F00\u8BBE\u7F6E\u9762\u677F...",
          closing: "\u6B63\u5728\u5173\u95ED\u8BBE\u7F6E\u9762\u677F...",
          saving: "\u6B63\u5728\u4FDD\u5B58\u8BBE\u7F6E..."
        },
        parseError: "\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519\uFF1A",
        invalidObject: "\u8BD5\u56FE\u4E3A\u8BBE\u7F6E\u4FDD\u5B58\u4E00\u4E2A\u65E0\u6548\u5BF9\u8C61\uFF1A"
      },
      textProcessor: {
        filtered: '\u6587\u672C\u5DF2\u8FC7\u6EE4: "{{text}}" (\u539F\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\u5FEB\u901F\u626B\u63CF] \u6B63\u5728\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        fallbackFailed: "[\u5FEB\u901F\u626B\u63CF] \u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u6267\u884C\u5931\u8D25: {{error}}",
        fallback: {
          starting: "[\u5FEB\u901F\u626B\u63CF - \u5907\u9009] \u6B63\u5728\u4E3B\u7EBF\u7A0B\u4E2D\u5F00\u59CB\u5904\u7406...",
          completed: "[\u5FEB\u901F\u626B\u63CF - \u5907\u9009] \u5904\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002"
        },
        worker: {
          logPrefix: "[\u5FEB\u901F\u626B\u63CF Worker]",
          starting: "[\u5FEB\u901F\u626B\u63CF] \u5F00\u59CB\u6267\u884C\uFF0C\u5C1D\u8BD5\u4F7F\u7528 Web Worker...",
          completed: "[\u5FEB\u901F\u626B\u63CF] Worker \u5904\u7406\u6210\u529F\uFF0C\u6536\u5230 {{count}} \u6761\u6587\u672C\u3002",
          scanComplete: "[\u5FEB\u901F\u626B\u63CF Worker] \u5904\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002\u6B63\u5728\u53D1\u56DE\u4E3B\u7EBF\u7A0B...",
          initFailed: "[\u5FEB\u901F\u626B\u63CF] Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u8FD9\u5F88\u53EF\u80FD\u662F\u7531\u4E8E\u7F51\u7AD9\u7684\u5185\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5BFC\u81F4\u7684\u3002",
          originalError: "[\u5FEB\u901F\u626B\u63CF] \u539F\u59CB\u9519\u8BEF: {{error}}",
          sendingData: "[\u5FEB\u901F\u626B\u63CF] Web Worker \u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u53D1\u9001 {{count}} \u6761\u6587\u672C\u8FDB\u884C\u5904\u7406...",
          initSyncError: "[\u5FEB\u901F\u626B\u63CF] Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}",
          cspBlocked: "[\u5FEB\u901F\u626B\u63CF] CSP\u68C0\u67E5\u5931\u8D25\uFF0C\u4E0D\u5141\u8BB8\u521B\u5EFAWorker\u3002"
        }
      },
      sessionScan: {
        switchToFallback: "[\u52A8\u6001\u626B\u63CF] \u6B63\u5728\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        resuming: "\u6B63\u5728\u4ECE\u4E0A\u4E00\u9875\u6062\u590D\u52A8\u6001\u626B\u63CF...",
        domObserver: {
          stopped: "[\u52A8\u6001\u626B\u63CF] \u5DF2\u505C\u6B62\u76D1\u542C DOM \u53D8\u5316\u3002"
        },
        fallback: {
          initialized: "[\u52A8\u6001\u626B\u63CF - \u5907\u9009] \u5DF2\u521D\u59CB\u5316\u3002",
          cleared: "[\u52A8\u6001\u626B\u63CF - \u5907\u9009] \u6570\u636E\u5DF2\u6E05\u9664\u3002"
        },
        worker: {
          logPrefix: "[\u52A8\u6001\u626B\u63CF Worker]",
          starting: "\u52A8\u6001\u626B\u63CF\uFF1A\u6B63\u5728\u5C1D\u8BD5\u542F\u52A8 Web Worker...",
          initFailed: "[\u52A8\u6001\u626B\u63CF] Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u8FD9\u5F88\u53EF\u80FD\u662F\u7531\u4E8E\u7F51\u7AD9\u7684\u5185\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5BFC\u81F4\u7684\u3002",
          originalError: "[\u52A8\u6001\u626B\u63CF] \u539F\u59CB\u9519\u8BEF: {{error}}",
          initialized: "[\u52A8\u6001\u626B\u63CF] Worker \u521D\u59CB\u5316\u6210\u529F\uFF0C\u5DF2\u53D1\u9001 {{count}} \u6761\u521D\u59CB\u6587\u672C\u4EE5\u5F00\u59CB\u4F1A\u8BDD\u3002",
          initSyncError: "[\u52A8\u6001\u626B\u63CF] Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}",
          clearCommandSent: "[\u52A8\u6001\u626B\u63CF] \u6E05\u9664\u547D\u4EE4\u5DF2\u53D1\u9001\u81F3 worker\u3002",
          cspBlocked: "[\u52A8\u6001\u626B\u63CF] CSP\u68C0\u67E5\u5931\u8D25\uFF0C\u4E0D\u5141\u8BB8\u521B\u5EFAWorker\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\u590D\u5236\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u590D\u5236\u4E86 {{count}} \u4E2A\u5B57\u7B26\u3002",
          nothingToCopy: "\u590D\u5236\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u4F46\u6CA1\u6709\u5185\u5BB9\u53EF\u590D\u5236\u6216\u6309\u94AE\u88AB\u7981\u7528\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\u7528\u6237\u5DF2\u786E\u8BA4\u6E05\u9664\u52A8\u6001\u626B\u63CF\u6587\u672C\uFF0C\u6B63\u5728\u8C03\u7528\u56DE\u8C03..."
          },
          quickScan: {
            confirmed: "\u7528\u6237\u5DF2\u786E\u8BA4\u6E05\u9664\u5FEB\u901F\u626B\u63CF\u6587\u672C\u3002"
          },
          cancelled: "\u7528\u6237\u5DF2\u53D6\u6D88\u6E05\u9664\u64CD\u4F5C\u3002"
        },
        modal: {
          opening: "\u6B63\u5728\u6253\u5F00\u4E3B\u6A21\u6001\u6846...",
          closing: "\u6B63\u5728\u5173\u95ED\u4E3B\u6A21\u6001\u6846...",
          scanFailed: "\u9759\u6001\u626B\u63CF\u5931\u8D25: {{error}}",
          clearContent: "\u6E05\u7A7A\u5185\u5BB9\u6309\u94AE\u5DF2\u70B9\u51FB\u3002",
          clearingContent: "\u6B63\u5728\u6E05\u9664\u6A21\u5F0F\u7684\u5185\u5BB9: {{mode}}",
          footerCleanedUp: "\u6A21\u6001\u6846\u9875\u811A\u5DF2\u6E05\u7406\u3002",
          destroyed: "\u4E3B\u6A21\u6001\u6846\u5DF2\u9500\u6BC1\u3002"
        },
        helpIcon: {
          clicked: "\u70B9\u51FB\u4E86\u5E2E\u52A9\u56FE\u6807\uFF0C\u663E\u793A\u5185\u5BB9\u952E\uFF1A{{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "\u5BFC\u51FA\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u683C\u5F0F: {{format}}\u3002",
        csvError: "\u89E3\u6790\u6587\u672C\u5E76\u751F\u6210CSV\u65F6\u51FA\u9519: {{error}}",
        fileExported: "\u6587\u4EF6\u5DF2\u5BFC\u51FA: {{filename}}",
        noContent: "\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA\u3002",
        unknownFormat: "\u672A\u77E5\u7684\u5BFC\u51FA\u683C\u5F0F: {{format}}",
        uiCleanedUp: "\u5BFC\u51FAUI\u5DF2\u6E05\u7406\u3002",
        exportingUserContent: "\u6B63\u5728\u5BFC\u51FAUI\u4E2D\u7528\u6237\u7F16\u8F91\u7684\u5185\u5BB9\u3002",
        exportingRawData: "\u6B63\u5728\u5BFC\u51FA\u539F\u59CB\u6570\u636E\uFF08UI\u5185\u5BB9\u65E0\u6548\u6216\u88AB\u622A\u65AD\uFF09\u3002"
      },
      main: {
        requestingSessionScanData: "\u6B63\u5728\u8BF7\u6C42\u52A8\u6001\u626B\u63CF\u6A21\u5F0F\u7684\u5B8C\u6574\u6570\u636E...",
        exportingQuickScanData: "\u6B63\u5728\u5BFC\u51FA\u5FEB\u901F\u626B\u63CF\u6A21\u5F0F\u5185\u5B58\u4E2D\u7684\u5B8C\u6574\u6570\u636E...",
        inIframe: "\u811A\u672C\u5728 iframe \u4E2D\uFF0C\u5DF2\u8DF3\u8FC7\u521D\u59CB\u5316\u3002",
        initializing: "\u811A\u672C\u521D\u59CB\u5316\u5F00\u59CB...",
        initialSettingsLoaded: "\u521D\u59CB\u8BBE\u7F6E\u5DF2\u52A0\u8F7D:",
        resumeFailed: "\u6062\u590D\u4F1A\u8BDD\u5931\u8D25"
      },
      dom: {
        ttpCreationError: "\u521B\u5EFA Trusted Type \u7B56\u7565\u5931\u8D25:",
        svgParseError: "SVG \u5B57\u7B26\u4E32\u65E0\u6548\u6216\u89E3\u6790\u5931\u8D25:"
      },
      persistence: {
        saveBlocked: "\u4FDD\u5B58\u88AB\u963B\u6B62\uFF0C\u56E0\u4E3A\u6301\u6709\u5316\u5DF2\u88AB\u7981\u7528\u3002",
        staleSession: "\u53D1\u73B0\u8FC7\u671F\u7684\u4F1A\u8BDD\uFF0C\u5DF2\u5FFD\u7565\u3002",
        parseError: "\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u4F1A\u8BDD\u5931\u8D25\uFF0C\u6B63\u5728\u6E05\u9664\u3002"
      },
      worker: {
        sessionStarted: "\u4F1A\u8BDD\u5DF2\u5F00\u59CB\uFF0C\u521D\u59CB\u5305\u542B {{count}} \u4E2A\u9879\u76EE\u3002",
        sessionCleared: "\u4F1A\u8BDD\u5DF2\u6E05\u9664\u3002"
      },
      elementScan: {
        starting: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
        stopping: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u505C\u6B62\u3002",
        listenersAdded: "\u5DF2\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u6DFB\u52A0\u5168\u5C40\u4E8B\u4EF6\u76D1\u542C\u5668\u3002",
        listenersRemoved: "\u5DF2\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u79FB\u9664\u5168\u5C40\u4E8B\u4EF6\u76D1\u542C\u5668\u3002",
        stateReset: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u72B6\u6001\u5DF2\u91CD\u7F6E\u3002",
        resuming: "\u6B63\u5728\u4ECE\u4E0A\u4E00\u9875\u6062\u590D\u5143\u7D20\u626B\u63CF...",
        restored: "\u5DF2\u6062\u590D {{count}} \u4E2A\u6682\u5B58\u9879\u76EE\u3002",
        skipRestore: "\u6839\u636E\u8BBE\u7F6E\u8DF3\u8FC7\u6570\u636E\u6062\u590D\u3002",
        startingNewSession: "\u5F00\u59CB\u65B0\u7684\u5143\u7D20\u626B\u63CF\u4F1A\u8BDD\u3002",
        reselecting: "\u6B63\u5728\u8FD4\u56DE\u5143\u7D20\u91CD\u65B0\u9009\u62E9\u6A21\u5F0F\u3002",
        hovering: "\u6B63\u5728\u60AC\u505C\u4E8E <{{tagName}}>\u3002",
        escapePressed: "\u6309\u4E0B Escape \u952E\uFF0C\u6B63\u5728\u505C\u6B62\u9009\u53D6\u5143\u7D20\u626B\u63CF\u3002",
        escapeIgnoredForSettings: "\u6309\u4E0B\u4E86Escape\u952E\uFF0C\u4F46\u56E0\u8BBE\u7F6E\u9762\u677F\u6253\u5F00\u800C\u88AB\u5FFD\u7565\u3002",
        escapeIgnoredForModal: "\u6309\u4E0B\u4E86Escape\u952E\uFF0C\u4F46\u56E0\u6A21\u6001\u6846\u6216\u63D0\u793A\u7A97\u53E3\u6253\u5F00\u800C\u88AB\u5FFD\u7565\u3002",
        escapePressedInAdjust: "\u5728\u8C03\u6574\u6A21\u5F0F\u4E0B\u6309\u4E0B\u4E86Escape\u952E\uFF0C\u8FD4\u56DE\u91CD\u65B0\u9009\u62E9\u6A21\u5F0F\u3002",
        clickedEnteringAdjust: "\u5143\u7D20 <{{tagName}}> \u5DF2\u88AB\u70B9\u51FB\uFF0C\u6B63\u5728\u8FDB\u5165\u8C03\u6574\u6A21\u5F0F\u3002",
        pathBuilt: "\u5143\u7D20\u5C42\u7EA7\u8DEF\u5F84\u5DF2\u6784\u5EFA\uFF0C\u6DF1\u5EA6\u4E3A\uFF1A{{depth}}\u3002",
        adjustingLevel: "\u6B63\u5728\u8C03\u6574\u9009\u62E9\u5C42\u7EA7\u81F3 {{level}} ({{tagName}})\u3002",
        confirmExtracting: "\u9009\u62E9\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u4ECE <{{tagName}}> \u63D0\u53D6\u6587\u672C\u3002",
        staged: "\u5143\u7D20\u5DF2\u6682\u5B58\u3002\u603B\u6570\uFF1A{{count}}\u3002",
        confirmingStaged: "\u786E\u8BA4\u9009\u62E9\u3002\u6B63\u5728\u5904\u7406 {{count}} \u4E2A\u5DF2\u6682\u5B58\u7684\u5143\u7D20\u3002",
        extractedCount: "\u5DF2\u4ECE\u5143\u7D20\u4E2D\u63D0\u53D6 {{count}} \u6761\u539F\u59CB\u6587\u672C\u3002",
        confirmFailedNoTarget: "\u786E\u8BA4\u5931\u8D25\uFF1A\u672A\u9009\u62E9\u4EFB\u4F55\u76EE\u6807\u5143\u7D20\u3002",
        rightClickExit: "\u68C0\u6D4B\u5230\u53F3\u952E\u70B9\u51FB\uFF0C\u6B63\u5728\u505C\u6B62\u9009\u53D6\u5143\u7D20\u626B\u63CF\u3002",
        processingError: "\u6587\u672C\u5904\u7406\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF: {{error}}",
        scrollListenersAdded: "\u5DF2\u4E3A {{count}} \u4E2A\u7236\u5143\u7D20\u6DFB\u52A0\u6EDA\u52A8\u76D1\u542C\u5668\u3002",
        scrollListenersRemoved: "\u5DF2\u79FB\u9664\u6240\u6709\u6EDA\u52A8\u76D1\u542C\u5668\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u6B63\u5728\u542F\u52A8...",
          sendingData: "\u6B63\u5728\u5411\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u53D1\u9001 {{count}} \u6761\u6587\u672C\u7247\u6BB5\u3002",
          completed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u5DF2\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002",
          initFailed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u6D4F\u89C8\u5668\u7684CSP\u53EF\u80FD\u963B\u6B62\u4E86 data: URL\u3002",
          initSyncError: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}",
          originalError: "\u539F\u59CB Worker \u9519\u8BEF: {{error}}",
          cspBlocked: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u7684CSP\u68C0\u67E5\u5931\u8D25\uFF0C\u4E0D\u5141\u8BB8\u521B\u5EFAWorker\u3002",
          attemping: "\u6B63\u5728\u5C1D\u8BD5\u4F7F\u7528 Web Worker \u8FDB\u884C\u8FC7\u6EE4...",
          fallback: "\u5DF2\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u8FDB\u884C\u8FC7\u6EE4\u3002",
          cspHint: "\u8FD9\u53EF\u80FD\u662F\u7531\u4E8E\u7F51\u7AD9\u7684\u5185\u5BB9\u5B89\u5168\u7B56\u7565\uFF08CSP\uFF09\u5BFC\u81F4\u7684\u3002"
        },
        switchToFallback: "\u6B63\u5728\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        fallbackFailed: "\u201C\u9009\u53D6\u5143\u7D20\u626B\u63CF\u201D\u540E\u5907\u6A21\u5F0F\u5931\u8D25\uFF1A{{error}}",
        stagingStarted: "\u5F00\u59CB\u6682\u5B58\u5143\u7D20\uFF1A<{{tagName}}>",
        stagedNothingNew: "\u672A\u80FD\u4ECE\u6B64\u5143\u7D20\u4E2D\u6682\u5B58\u4EFB\u4F55\u65B0\u7684\u552F\u4E00\u6587\u672C\u3002",
        stagingFinished: "\u6682\u5B58\u64CD\u4F5C\u5DF2\u5B8C\u6210\u3002",
        confirmStarted: "\u786E\u8BA4\u6D41\u7A0B\u5DF2\u5F00\u59CB...",
        confirmFinished: "\u786E\u8BA4\u6D41\u7A0B\u5DF2\u6210\u529F\u5B8C\u6210\u3002",
        confirmFailed: "\u786E\u8BA4\u6D41\u7A0B\u5931\u8D25\u3002\u9519\u8BEF\uFF1A{{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u9996\u6B21\u521B\u5EFA\u9AD8\u4EAE\u5143\u7D20\u3002",
        updatingHighlight: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u4E3A <{{tagName}}> \u66F4\u65B0\u9AD8\u4EAE\u3002",
        creatingToolbar: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u521B\u5EFA\u8C03\u6574\u5DE5\u5177\u680F\u3002",
        toolbarPositioned: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u5DE5\u5177\u680F\u5DF2\u5B9A\u4F4D\u3002",
        sliderChanged: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6ED1\u5757\u5C42\u7EA7\u53D8\u4E3A {{level}}",
        reselectClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u91CD\u65B0\u9009\u62E9\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        stageClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u6682\u5B58\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        cancelClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u53D6\u6D88\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        confirmClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u786E\u8BA4\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        dragStarted: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u62D6\u52A8\u5F00\u59CB\u3002",
        dragEnded: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u62D6\u52A8\u7ED3\u675F\u3002",
        cleaningHighlights: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u9AD8\u4EAE\u5143\u7D20\u3002",
        cleaningToolbar: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u5DE5\u5177\u680F\u3002"
      },
      eventBus: {
        callbackError: "\u4E8B\u4EF6 '{{eventName}}' \u7684\u56DE\u8C03\u51FD\u6570\u51FA\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\u521B\u5EFA Trusted Types worker \u7B56\u7565\u5931\u8D25:",
        htmlPolicyError: "\u521B\u5EFA Trusted Types HTML \u7B56\u7565\u5931\u8D25:",
        defaultWorkerPolicyWarning: "\u7528\u4E8E worker URL \u7684 Trusted Types \u9ED8\u8BA4\u7B56\u7565\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u539F\u59CB URL\u3002",
        defaultHtmlPolicyWarning: "\u7528\u4E8E HTML \u7684 Trusted Types \u9ED8\u8BA4\u7B56\u7565\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u539F\u59CB\u5B57\u7B26\u4E32\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u6559\u7A0B",
      elementScan: '<p><strong>\u529F\u80FD\u4ECB\u7ECD:</strong></p><p>\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5141\u8BB8\u60A8\u7CBE\u786E\u5730\u9009\u62E9\u7F51\u9875\u4E0A\u7684\u4E00\u4E2A\u6216\u591A\u4E2A\u533A\u57DF\uFF08\u4F8B\u5982\u4E00\u4E2A\u6BB5\u843D\u3001\u4E00\u4E2A\u5217\u8868\u3001\u4E00\u4E2A\u4FA7\u8FB9\u680F\uFF09\uFF0C\u5E76\u4EC5\u4ECE\u8FD9\u4E9B\u533A\u57DF\u4E2D\u63D0\u53D6\u6587\u672C\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ol><li><strong>\u542F\u52A8:</strong> \u70B9\u51FB\u60AC\u6D6E\u6309\u94AE\u4E2D\u7684\u201C\u9009\u53D6\u5143\u7D20\u201D\u56FE\u6807 <span class="help-icon-placeholder element-scan-icon"></span> \u542F\u52A8\u626B\u63CF\u6A21\u5F0F\u3002</li><li><strong>\u9009\u62E9:</strong> \u79FB\u52A8\u9F20\u6807\uFF0C\u60A8\u60F3\u626B\u63CF\u7684\u533A\u57DF\u4F1A\u663E\u793A\u9AD8\u4EAE\u6846\u3002\u5355\u51FB\u4EE5\u9009\u5B9A\u3002</li><li><strong>\u8C03\u6574:</strong> \u9009\u5B9A\u540E\u4F1A\u51FA\u73B0\u5DE5\u5177\u680F\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528<strong>\u6ED1\u5757</strong>\u6765\u6269\u5927\u6216\u7F29\u5C0F\u9009\u62E9\u8303\u56F4\u3002</li><li><strong>\u6682\u5B58:</strong> \u5982\u679C\u60A8\u60F3\u9009\u62E9\u591A\u4E2A\u4E0D\u76F8\u5173\u7684\u533A\u57DF\uFF0C\u53EF\u4EE5\u70B9\u51FB<span class="action-key">\u6682\u5B58</span>\u6309\u94AE\u4FDD\u5B58\u5F53\u524D\u9009\u62E9\uFF0C\u7136\u540E\u7EE7\u7EED\u9009\u62E9\u5176\u4ED6\u533A\u57DF\u3002</li><li><strong>\u786E\u8BA4:</strong> \u5B8C\u6210\u6240\u6709\u9009\u62E9\u540E\uFF0C\u70B9\u51FB<span class="action-key">\u786E\u8BA4</span>\u6309\u94AE\uFF0C\u7CFB\u7EDF\u5C06\u5F00\u59CB\u4ECE\u60A8\u9009\u62E9\u7684\u6240\u6709\u533A\u57DF\u4E2D\u63D0\u53D6\u6587\u672C\u3002</li></ol><p><strong>\u5982\u4F55\u9000\u51FA:</strong></p><ul><li>\u5728\u9009\u62E9\u8FC7\u7A0B\u4E2D\uFF08\u51FA\u73B0\u9AD8\u4EAE\u6846\u65F6\uFF09\uFF0C\u5728\u9875\u9762\u4EFB\u610F\u4F4D\u7F6E<strong>\u53F3\u952E\u5355\u51FB</strong>\u3002</li><li>\u5728\u4EFB\u4F55\u65F6\u5019\uFF0C\u6309\u4E0B<kbd>ESC</kbd>\u952E\u3002</li><li>\u5728\u4EFB\u4F55\u65F6\u5019\uFF0C\u518D\u6B21\u70B9\u51FB\u201C\u9009\u53D6\u5143\u7D20\u626B\u63CF\u201D\u56FE\u6807\u3002</li></ul>',
      sessionScanTitle: "\u52A8\u6001\u626B\u63CF\u6559\u7A0B",
      sessionScan: '<p><strong>\u529F\u80FD\u4ECB\u7ECD:</strong></p><p>\u52A8\u6001\u626B\u63CF\u4F1A\u6301\u7EED\u76D1\u63A7\u5E76\u81EA\u52A8\u8BB0\u5F55\u7F51\u9875\u4E0A\u6240\u6709\u52A8\u6001\u52A0\u8F7D\u6216\u53D8\u5316\u7684\u6587\u672C\uFF0C\u7279\u522B\u9002\u7528\u4E8E\u6293\u53D6\u5B9E\u65F6\u804A\u5929\u3001\u6EDA\u52A8\u52A0\u8F7D\u5185\u5BB9\u6216\u901A\u77E5\u7B49\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ul><li><strong>\u5F00\u59CB\u626B\u63CF:</strong> \u70B9\u51FB\u60AC\u6D6E\u6309\u94AE\u4E2D\u7684\u201C\u52A8\u6001\u626B\u63CF\u201D\u56FE\u6807 <span class="help-icon-placeholder dynamic-scan-icon"></span>\uFF0C\u626B\u63CF\u7ACB\u5373\u5F00\u59CB\u3002</li><li><strong>\u505C\u6B62\u626B\u63CF:</strong> \u518D\u6B21\u70B9\u51FB\u8BE5\u56FE\u6807 <span class="help-icon-placeholder stop-icon"></span>\uFF0C\u5373\u53EF\u505C\u6B62\u626B\u63CF\u3002</li><li><strong>\u67E5\u770B\u7ED3\u679C:</strong> \u505C\u6B62\u540E\uFF0C\u70B9\u51FB\u4E3B\u60AC\u6D6E\u6309\u94AE <span class="help-icon-placeholder summary-icon"></span> \u6253\u5F00\u7ED3\u679C\u7A97\u53E3\u3002</li></ul><p><strong>\u5982\u4F55\u9000\u51FA:</strong></p><ul><li>\u5728\u626B\u63CF\u8FC7\u7A0B\u4E2D\uFF0C\u518D\u6B21\u70B9\u51FB\u201C\u52A8\u6001\u626B\u63CF\u201D\u56FE\u6807\u3002</li><li>\u5728\u626B\u63CF\u8FC7\u7A0B\u4E2D\uFF0C\u968F\u65F6\u6309\u4E0B<kbd>ESC</kbd>\u952E\u53EF\u5FEB\u901F\u505C\u6B62\u3002</li></ul>',
      aiScanTitle: "AI \u7FFB\u8BD1\u8BF4\u660E",
      aiScan: "<p><strong>\u529F\u80FD\u4ECB\u7ECD:</strong></p><p>AI \u7FFB\u8BD1\u4F1A\u6301\u7EED\u6536\u96C6\u7F51\u9875\u4E2D\u7684\u5019\u9009\u6587\u672C\uFF0C\u5E76\u6839\u636E\u8BBE\u7F6E\u81EA\u52A8\u5904\u7406\u6216\u7B49\u5F85\u624B\u52A8\u63D0\u4EA4\u3002\u9876\u90E8\u6570\u5B57\u8868\u793A\u672C\u6B21\u5DF2\u6536\u96C6\u7684\u5019\u9009\u9879\u6570\u91CF\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ul><li>\u518D\u6B21\u70B9\u51FB AI \u60AC\u6D6E\u6309\u94AE\u5373\u53EF\u505C\u6B62\u7FFB\u8BD1\u3002</li><li>\u70B9\u51FB\u201C\u67E5\u770B\u6458\u8981\u201D\u53EF\u63D0\u4EA4\u5F85\u5904\u7406\u5185\u5BB9\u3001\u590D\u6838\u7ED3\u679C\u5E76\u590D\u5236\u6216\u5BFC\u51FA\u7FFB\u8BD1\u3002</li><li>\u91CD\u590D\u51FA\u73B0\u6216\u5DF2\u7ECF\u5904\u7406\u8FC7\u7684\u6587\u672C\u4E0D\u4F1A\u518D\u6B21\u63D0\u4EA4\u3002</li></ul>"
    }
  };
  // src/shared/i18n/zh-TW.json
  var zh_TW_default = {
    _meta: {
      name: "\u7E41\u9AD4\u4E2D\u6587"
    },
    script: {
      name: "\u7DB2\u9801\u6587\u672C\u63D0\u53D6\u5DE5\u5177"
    },
    common: {
      scan: "\u6383\u63CF",
      stop: "\u505C\u6B62",
      pause: "\u66AB\u505C",
      resume: "\u6062\u5FA9",
      clear: "\u6E05\u7A7A",
      copy: "\u8907\u88FD",
      save: "\u5132\u5B58",
      reset: "\u91CD\u8A2D",
      delete: "\u522A\u9664",
      discovered: "\u5DF2\u767C\u73FE:",
      confirm: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88",
      export: "\u532F\u51FA",
      reselect: "\u91CD\u65B0\u9078\u64C7",
      stage: "\u66AB\u5B58",
      processingElement: "\u8655\u7406\u5143\u7D20"
    },
    export: {
      exportAsTxt: "\u532F\u51FA\u70BA TXT",
      exportAsJson: "\u532F\u51FA\u70BA JSON",
      exportAsCsv: "\u532F\u51FA\u70BA CSV",
      csv: {
        id: "ID",
        original: "\u539F\u6587",
        translation: "\u8B6F\u6587"
      }
    },
    settings: {
      title: "\u8A2D\u5B9A",
      theme: "\u4E3B\u984C",
      language: "\u8A9E\u8A00",
      format: "\u8F38\u51FA\u683C\u5F0F",
      formats: {
        array: "\u5D4C\u5957\u9663\u5217",
        object: "\u9375\u503C\u5C0D\u7269\u4EF6",
        csv: "CSV \u5B57\u4E32"
      },
      output: {
        include_brackets: "\u5305\u542B\u9996\u5C3E\u7B26\u865F"
      },
      relatedSettings: "\u76F8\u95DC\u8A2D\u5B9A",
      filterRules: "\u5167\u5BB9\u904E\u6FFE\u898F\u5247",
      dynamicScanRefreshNotice: "\u4F7F\u7528\u52D5\u614B\u6383\u63CF\u6A21\u5F0F\u6642\uFF0C\u5132\u5B58\u904E\u6FFE\u898F\u5247\u5F8C\u9700\u8981\u91CD\u65B0\u6574\u7406\u7DB2\u9801\u624D\u80FD\u751F\u6548\u3002",
      filters: {
        numbers: "\u904E\u6FFE\u6578\u5B57/\u8CA8\u5E63",
        chinese: "\u904E\u6FFE\u7D14\u4E2D\u6587\u6587\u672C",
        contains_chinese: "\u904E\u6FFE\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u904E\u6FFE\u7D14\u8868\u60C5\u7B26\u865F\u6587\u672C",
        symbols: "\u904E\u6FFE\u7D14\u7B26\u865F\u6587\u672C",
        term: "\u904E\u6FFE\u7279\u5B9A\u8853\u8A9E",
        single_letter: "\u904E\u6FFE\u55AE\u500B\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u904E\u6FFE\u91CD\u8907\u5B57\u5143",
        file_paths: "\u904E\u6FFE\u6A94\u6848\u8DEF\u5F91",
        hex_color_codes: "\u904E\u6FFE\u5341\u516D\u9032\u4F4D\u984F\u8272\u4EE3\u78BC",
        email_addresses: "\u904E\u6FFE\u96FB\u5B50\u90F5\u4EF6\u5730\u5740",
        uuids: "\u904E\u6FFE UUID",
        git_commit_hashes: "\u904E\u6FFE Git \u63D0\u4EA4\u96DC\u6E4A\u503C",
        website_urls: "\u904E\u6FFE\u7DB2\u7AD9\u9023\u7D50",
        website_urls_title: "\u904E\u6FFE\u7DB2\u7AD9\u9023\u7D50",
        shorthand_numbers: "\u904E\u6FFE\u901F\u8A18\u6578\u5B57",
        shorthand_numbers_title: "\u904E\u6FFE\u901F\u8A18\u6578\u5B57"
      },
      display: {
        show_fab: "\u986F\u793A\u61F8\u6D6E\u6309\u9215",
        fab_position: "\u61F8\u6D6E\u6309\u9215\u4F4D\u7F6E",
        fab_positions: {
          bottom_right: "\u2198 \u53F3\u4E0B\u89D2",
          top_right: "\u2197 \u53F3\u4E0A\u89D2",
          bottom_left: "\u2199 \u5DE6\u4E0B\u89D2",
          top_left: "\u2196 \u5DE6\u4E0A\u89D2"
        },
        show_line_numbers: "\u986F\u793A\u884C\u865F",
        show_statistics: "\u986F\u793A\u7D71\u8A08\u8CC7\u8A0A",
        enable_word_wrap: "\u555F\u7528\u81EA\u52D5\u63DB\u884C",
        text_truncation_limit: "\u555F\u7528\u6587\u672C\u622A\u65B7\u9650\u5236",
        character_limit: "\u5B57\u5143\u9650\u5236",
        show_scan_count: "\u5728\u6A19\u984C\u4E2D\u555F\u7528\u6383\u63CF\u8A08\u6578"
      },
      advanced: {
        enable_debug_logging: "\u555F\u7528\u5075\u932F\u65E5\u8A8C\u8A18\u9304"
      },
      panel: {
        title: "\u8A2D\u5B9A\u9762\u677F"
      },
      contextual: {
        elementScanTitle: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u8A2D\u5B9A",
        sessionScanTitle: "\u52D5\u614B\u6383\u63CF\u8A2D\u5B9A",
        persistData: "\u8DE8\u9801\u9762\u6642\u4FDD\u7559\u6383\u63CF\u6578\u64DA"
      },
      languages: {
        auto: "\u81EA\u52D5\u6AA2\u6E2C",
        en: "\u82F1\u6587 (\u7F8E\u570B)",
        "zh-CN": "\u7C21\u9AD4\u4E2D\u6587",
        "zh-TW": "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "\u6DFA\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u96A8\u7CFB\u7D71"
      },
      ai: {
        title: "AI \u7FFB\u8B6F",
        enabled: "\u555F\u7528 AI \u529F\u80FD",
        enabledDescription: "\u95DC\u9589\u5F8C\u6703\u505C\u6B62 AI \u7FFB\u8B6F\u4E26\u96B1\u85CF AI \u61F8\u6D6E\u6309\u9215\uFF1B\u4E00\u822C\u6383\u63CF\u529F\u80FD\u4E0D\u53D7\u5F71\u97FF\u3002",
        betaBadge: "Beta",
        betaNotice: "\u76EE\u524D\u8A72\u529F\u80FD\u4E0D\u7A69\u5B9A\uFF0C\u554F\u984C\u8F03\u591A\uFF0C\u50C5\u4F9B\u6E2C\u8A66\u3002",
        general: "\u6383\u63CF\u8207\u7FFB\u8B6F",
        processingMode: "\u8655\u7406\u6A21\u5F0F",
        manual: "\u624B\u52D5\u63D0\u4EA4",
        automatic: "\u81EA\u52D5\u8655\u7406",
        targetLanguage: "\u76EE\u6A19\u8A9E\u8A00",
        simplifiedChinese: "\u4E2D\u6587\u7C21\u9AD4",
        traditionalChinese: "\u4E2D\u6587\u7E41\u9AD4",
        confidenceThreshold: "\u4FE1\u5FC3\u5EA6\u95BE\u503C",
        regexRuleComments: "\u5305\u542B\u6B63\u5247\u898F\u5247 ID \u8A3B\u89E3",
        regexRuleCommentsDescription: "\u5728\u6B63\u5247\u8F38\u51FA\u4E2D\u52A0\u5165 // qps-rule:<id> \u8A3B\u89E3\uFF0C\u65B9\u4FBF\u7A69\u5B9A\u8B58\u5225\u898F\u5247\u3002\u9810\u8A2D\u95DC\u9589\u4EE5\u4FDD\u6301\u7A0B\u5F0F\u78BC\u7C21\u6F54\u3002",
        provider: "\u4F9B\u61C9\u5546\u8A2D\u5B9A",
        currentProvider: "\u76EE\u524D\u4F9B\u61C9\u5546",
        providerName: "\u4F9B\u61C9\u5546\u540D\u7A31",
        apiUrl: "\u5B8C\u6574 API \u4F4D\u5740\uFF08chat/completions\uFF09",
        model: "\u6A21\u578B",
        responseMode: "\u56DE\u61C9\u6A21\u5F0F",
        jsonMode: "JSON \u6A21\u5F0F",
        promptJson: "Prompt JSON",
        apiKey: "API Key\uFF08\u7368\u7ACB\u5132\u5B58\uFF09",
        addProvider: "\u65B0\u589E\u4F9B\u61C9\u5546",
        newProvider: "\u65B0\u4F9B\u61C9\u5546",
        saveProvider: "\u5132\u5B58\u4F9B\u61C9\u5546\u8A2D\u5B9A",
        testConnection: "\u6E2C\u8A66\u8655\u7406\u8207\u5EF6\u9072",
        testDescription: "\u50B3\u9001\u4E00\u689D\u56FA\u5B9A\u7684\u5408\u6210\u77ED\u6587\u672C\uFF0C\u9A57\u8B49\u4F9B\u61C9\u5546\u80FD\u56DE\u50B3\u53EF\u89E3\u6790\u7684\u5206\u985E\u8207\u7FFB\u8B6F JSON\uFF1B\u4E0D\u6703\u50B3\u9001\u7DB2\u9801\u5167\u5BB9\u3002\u6E2C\u8A66\u53EF\u80FD\u7522\u751F\u6975\u5C0F\u8CBB\u7528\u3002",
        testing: "\u6B63\u5728\u6E2C\u8A66\u5206\u985E\u3001\u7FFB\u8B6F\u548C JSON \u7D50\u679C\uFF0C\u53EF\u80FD\u7522\u751F\u6975\u5C0F\u8CBB\u7528\u2026",
        processingOk: "\u8655\u7406\u6B63\u5E38",
        connectionOk: "\u8655\u7406\u6B63\u5E38",
        connectionFailed: "\u8655\u7406\u6E2C\u8A66\u5931\u6557",
        costControl: "\u6210\u672C\u63A7\u5236",
        maxBatchItems: "\u55AE\u6279\u6700\u591A\u9805\u76EE",
        maxBatchCharacters: "\u55AE\u6279\u6700\u591A\u5B57\u5143",
        maxOutputTokens: "\u55AE\u6279\u9810\u4F30\u8F38\u51FA Token \u4E0A\u9650",
        maxRequests: "\u55AE\u9801\u9762\u6700\u591A\u8ACB\u6C42",
        maxPageCharacters: "\u55AE\u9801\u9762\u6700\u591A\u5B57\u5143",
        dailyTokens: "\u6BCF\u65E5\u4F30\u7B97 Token \u4E0A\u9650",
        timeout: "\u8ACB\u6C42\u903E\u6642\uFF08\u79D2\uFF09",
        resetDailyUsage: "\u6E05\u9664\u4ECA\u65E5\u7528\u91CF",
        restoreDefaults: "\u6062\u5FA9\u9810\u8A2D",
        siteStyles: "\u7AD9\u9EDE\u7FFB\u8B6F\u504F\u597D\uFF08\u53EF\u9078\uFF09",
        siteStylesDescription: "\u9019\u662F\u53EF\u9078\u9805\u3002\u76F4\u63A5\u5132\u5B58\u5373\u53EF\u70BA\u76EE\u524D\u7DB2\u7AD9\u4F7F\u7528\u9810\u8A2D\u4E2D\u6587\u8868\u9054\uFF1B\u53EA\u6709\u9700\u8981\u56FA\u5B9A\u8853\u8A9E\u6216\u7279\u6B8A\u8868\u9054\u6642\u624D\u586B\u5BEB\u66F4\u591A\u5167\u5BB9\u3002",
        styleLibrary: "\u5DF2\u5132\u5B58\u504F\u597D",
        styleEditor: "\u76EE\u524D\u7DB2\u7AD9\u504F\u597D",
        searchStyles: "\u641C\u5C0B\u7AD9\u9EDE\u504F\u597D",
        sortStyles: "\u6392\u5E8F",
        sortRecent: "\u6700\u8FD1\u66F4\u65B0",
        sortOrigin: "\u6309\u7AD9\u9EDE",
        styleOrigin: "\u7AD9\u9EDE Origin",
        stylePath: "\u53EF\u9078\u8DEF\u5F91\u524D\u7DB4",
        styleTone: "\u8A9E\u6C23",
        styleGlossary: "\u8853\u8A9E\u8868\u8207\u5C08\u6709\u540D\u8A5E",
        stylePunctuation: "\u6A19\u9EDE\u7FD2\u6163",
        styleInstructions: "\u81EA\u8A02\u7FFB\u8B6F\u8981\u6C42",
        advancedStyleSettings: "\u9032\u968E\u5339\u914D\u8A2D\u5B9A",
        defaultStyleTone: "\u81EA\u7136\u3001\u6E05\u6670\uFF0C\u7B26\u5408\u4E2D\u6587\u7DB2\u9801\u8868\u9054",
        defaultStylePunctuation: "\u4F7F\u7528\u76EE\u6A19\u8A9E\u8A00\u7684\u6A19\u6E96\u4E2D\u6587\u6A19\u9EDE",
        useCurrentSite: "\u4F7F\u7528\u76EE\u524D\u7DB2\u7AD9",
        noStyles: "\u6C92\u6709\u7B26\u5408\u7684\u7AD9\u9EDE\u504F\u597D",
        saveStyle: "\u5132\u5B58\u76EE\u524D\u7DB2\u7AD9\u504F\u597D",
        clearStyles: "\u6E05\u7A7A\u5168\u90E8\u504F\u597D"
      },
      about: "\u95DC\u65BC",
      aboutPanel: {
        title: "\u95DC\u65BC",
        version: "\u7248\u672C",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u6383\u63CF",
      session: "\u52D5\u614B\u6383\u63CF",
      stagedCount: "\u5DF2\u66AB\u5B58:",
      elementFinished: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      startSession: "\u958B\u59CB\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      stopSession: "\u505C\u6B62\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      finished: "\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      quickFinished: "\u5FEB\u901F\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      sessionStarted: "\u52D5\u614B\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
      sessionInProgress: "\u6383\u63CF\u9032\u884C\u4E2D...",
      truncationWarning: "\u70BA\u4FDD\u6301\u4ECB\u9762\u6D41\u66A2\uFF0C\u6B64\u8655\u50C5\u986F\u793A\u90E8\u5206\u6587\u672C\u3002\u532F\u51FA\u5F8C\u5C07\u5305\u542B\u5B8C\u6574\u5167\u5BB9\u3002"
    },
    slider: {
      adjustFrameSize: "\u79FB\u52D5\u6ED1\u584A\u4EE5\u8ABF\u6574\u6846\u67B6\u5927\u5C0F",
      minLabel: "\u6700\u5C0F",
      maxLabel: "\u6700\u5927"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      aiTitle: "AI \u7FFB\u8B6F\u7D50\u679C",
      scanCountSession: "\u5DF2\u6383\u63CF {{count}} \u500B\u9805\u76EE",
      scanCountStatic: "\u5171\u6383\u63CF {{count}} \u500B\u9805\u76EE",
      scanCountAi: "AI \u5DF2\u6536\u96C6 {{count}} \u500B\u9805\u76EE",
      aiRunning: "\u5DE5\u4F5C\u4E2D",
      aiPaused: "\u5DF2\u66AB\u505C",
      aiStopped: "\u5DF2\u505C\u6B62",
      aiProcessing: "\u8655\u7406\u4E2D\u2026",
      aiBudgetBlocked: "\u50B3\u9001\u5DF2\u66AB\u505C\uFF0C\u9054\u5230\u9810\u7B97\u9650\u5236",
      aiRequestError: "\u8ACB\u6C42\u5931\u6557",
      aiReviewItems: "\u5F85\u8907\u6838\u5167\u5BB9",
      aiReviewRequired: "\u9700\u4EBA\u5DE5\u8907\u6838",
      aiReviewReturnToEditor: "\u8FD4\u56DE\u7DE8\u8F2F\u6846",
      aiReviewRemove: "\u79FB\u9664",
      aiRegexEditError: "\u6B63\u5247\u898F\u5247\u9700\u8907\u6838",
      aiOutput: {
        text: "\u7D14\u6587\u5B57",
        regex: "\u6B63\u5247\u7FFB\u8B6F"
      },
      aiCounts: {
        pending: "\u5F85\u8655\u7406",
        translated: "\u5DF2\u7FFB\u8B6F",
        textRules: "\u7D14\u6587\u5B57\u898F\u5247",
        regexRules: "\u6B63\u5247\u898F\u5247",
        removed: "\u79FB\u9664",
        review: "\u5F85\u8907\u6838",
        failed: "\u5931\u6557"
      },
      totalCharacters: "\u7E3D\u5B57\u5143\u6578",
      totalLines: "\u7E3D\u884C\u6578",
      noSummary: "\u7121\u53EF\u7528\u6458\u8981",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F\uFF01",
      settingsSaved: "\u8A2D\u5B9A\u5DF2\u5132\u5B58\uFF01",
      modalInitError: "\u6A21\u614B\u6846\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6C92\u6709\u53EF\u8907\u88FD\u7684\u5167\u5BB9\u3002",
      contentCleared: "\u5167\u5BB9\u5DF2\u6E05\u9664\u3002",
      noTextSelected: "\u672A\u9078\u64C7\u4EFB\u4F55\u6587\u672C\u3002",
      scanFailed: "\u6383\u63CF\u5931\u6557\u3002",
      elementScanStarted: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
      elementScanPaused: "\u5143\u7D20\u6383\u63CF\u5DF2\u66AB\u505C\u3002",
      elementScanResumed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u6703\u8A71\u5DF2\u5F9E\u4E0A\u4E00\u9801\u6062\u5FA9\u3002",
      elementScanContinued: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u7E7C\u7E8C\u3002",
      sessionScanStarted: "\u52D5\u614B\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
      sessionScanPaused: "\u52D5\u614B\u6383\u63CF\u5DF2\u66AB\u505C\u3002",
      sessionScanResumed: "\u52D5\u614B\u6383\u63CF\u6703\u8A71\u5DF2\u5F9E\u4E0A\u4E00\u9801\u6062\u5FA9\u3002",
      sessionScanContinued: "\u52D5\u614B\u6383\u63CF\u5DF2\u7E7C\u7E8C\u3002",
      cspWorkerWarning: "\u56E0\u7DB2\u7AD9\u5B89\u5168\u9650\u5236\uFF0C\u5DF2\u5207\u63DB\u81F3\u76F8\u5BB9\u6383\u63CF\u6A21\u5F0F\u3002",
      scanModeConflict: "\u8ACB\u5148\u505C\u6B62\u76EE\u524D\u6383\u63CF\u6A21\u5F0F\uFF0C\u518D\u555F\u52D5\u53E6\u4E00\u7A2E\u6383\u63CF\u3002",
      aiScanStarted: "AI \u7FFB\u8B6F\u5DF2\u958B\u59CB\u3002",
      aiScanPaused: "AI \u7FFB\u8B6F\u5DF2\u66AB\u505C\u3002",
      aiScanContinued: "AI \u7FFB\u8B6F\u5DF2\u6062\u5FA9\u3002",
      aiScanStopped: "AI \u7FFB\u8B6F\u5DF2\u505C\u6B62\u3002",
      aiScanStartFailed: "AI \u7FFB\u8B6F\u555F\u52D5\u5931\u6557\u3002",
      aiDisabled: "AI \u529F\u80FD\u5DF2\u95DC\u9589\uFF0C\u8ACB\u5148\u5728\u8A2D\u5B9A\u4E2D\u555F\u7528\u3002",
      aiBatchCompleted: "AI \u6279\u6B21\u8655\u7406\u5B8C\u6210\u3002",
      aiNothingPending: "\u76EE\u524D\u6C92\u6709\u5F85\u50B3\u9001\u5167\u5BB9\u3002",
      aiRequestFailed: "AI \u8ACB\u6C42\u5931\u6557\uFF0C\u9805\u76EE\u5DF2\u9032\u5165\u5F85\u8907\u6838\u3002",
      aiBudgetBlocked: "\u5DF2\u9054\u5230\u6210\u672C\u9650\u5236\uFF1B\u4ECD\u6703\u7E7C\u7E8C\u5728\u672C\u6A5F\u6536\u96C6\u3002",
      aiProviderRequired: "\u81F3\u5C11\u9700\u8981\u4FDD\u7559\u4E00\u500B\u4F9B\u61C9\u5546\u3002",
      aiProviderSaved: "\u4F9B\u61C9\u5546\u8A2D\u5B9A\u5DF2\u5132\u5B58\u3002",
      aiDailyUsageReset: "\u4ECA\u65E5\u4F30\u7B97\u7528\u91CF\u5DF2\u6E05\u9664\u3002",
      aiDefaultsRestored: "\u6210\u672C\u63A7\u5236\u5DF2\u6062\u5FA9\u9810\u8A2D\u503C\u3002",
      aiStyleOriginRequired: "\u7AD9\u9EDE Origin \u4E0D\u53EF\u70BA\u7A7A\u3002",
      aiStyleSaved: "\u7AD9\u9EDE\u7FFB\u8B6F\u504F\u597D\u5DF2\u5132\u5B58\u3002"
    },
    placeholders: {
      click: "\u9EDE\u64CA ",
      dynamicScan: "[\u52D5\u614B\u6383\u63CF]",
      startNewScanSession: " \u958B\u59CB\u65B0\u7684\u6383\u63CF\u6703\u8A71",
      staticScan: "[\u975C\u614B\u6383\u63CF]",
      performOneTimeScan: " \u57F7\u884C\u4E00\u6B21\u6027\u5FEB\u901F\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u60A8\u78BA\u5B9A\u8981\u6E05\u9664\u5167\u5BB9\u55CE\uFF1F\u6B64\u64CD\u4F5C\u7121\u6CD5\u64A4\u92B7\u3002",
      deleteProvider: "\u78BA\u5B9A\u522A\u9664\u76EE\u524D\u4F9B\u61C9\u5546\u8A2D\u5B9A\u55CE\uFF1F",
      deleteStyle: "\u78BA\u5B9A\u522A\u9664\u76EE\u524D\u7AD9\u9EDE\u7FFB\u8B6F\u504F\u597D\u55CE\uFF1F",
      clearStyles: "\u78BA\u5B9A\u6E05\u7A7A\u5168\u90E8\u7AD9\u9EDE\u7FFB\u8B6F\u504F\u597D\u55CE\uFF1F"
    },
    ai: {
      actions: {
        submitPending: "\u63D0\u4EA4\u5F85\u8655\u7406",
        retryReview: "\u91CD\u65B0\u8655\u7406"
      }
    },
    tooltip: {
      summary: "\u67E5\u770B\u6458\u8981",
      ai_scan: "AI \u7FFB\u8B6F\uFF08Beta\uFF09",
      ai_scan_stop: "\u505C\u6B62 AI \u7FFB\u8B6F",
      ai_disabled: "AI \u529F\u80FD\u5DF2\u95DC\u9589",
      dynamic_scan: "\u52D5\u614B\u6383\u63CF",
      static_scan: "\u975C\u614B\u6383\u63CF",
      element_scan: "\u9078\u53D6\u5143\u7D20\u6383\u63CF",
      pauseElementScan: "\u66AB\u505C\u5143\u7D20\u6383\u63CF",
      resumeElementScan: "\u6062\u5FA9\u5143\u7D20\u6383\u63CF",
      pauseSessionScan: "\u66AB\u505C\u52D5\u614B\u6383\u63CF",
      resumeSessionScan: "\u6062\u5FA9\u52D5\u614B\u6383\u63CF",
      pauseAiScan: "\u66AB\u505C AI \u7FFB\u8B6F",
      resumeAiScan: "\u6062\u5FA9 AI \u7FFB\u8B6F",
      tooltipHelp: "\u5E6B\u52A9",
      persistData: {
        title: "\u8CC7\u6599\u6301\u4E45\u5316\u8AAA\u660E",
        text: {
          sessionScan: "\u958B\u555F\u5F8C\uFF0C\u7576\u9EDE\u64CA\u93C8\u63A5\u8DF3\u8F49\u5230\u65B0\u9801\u9762\u6642\uFF0C\u6703\u81EA\u52D5\u6062\u5FA9\u4E26\u7E7C\u7E8C\u7D2F\u52A0\u4E0A\u4E00\u9801\u7684\u6383\u63CF\u7D50\u679C\u3002\u95DC\u9589\u6B64\u9078\u9805\uFF0C\u5247\u53EA\u6062\u5FA9\u6383\u63CF\u6A21\u5F0F\uFF0C\u4F46\u6703\u958B\u59CB\u4E00\u6B21\u5168\u65B0\u7684\u6383\u63CF\u3002",
          elementScan: "\u958B\u555F\u5F8C\uFF0C\u7576\u9EDE\u64CA\u93C8\u63A5\u8DF3\u8F49\u5230\u65B0\u9801\u9762\u6642\uFF0C\u6703\u81EA\u52D5\u6062\u5FA9\u7576\u524D\u5DF2\u66AB\u5B58\u7684\u6240\u6709\u6587\u672C\u3002\u95DC\u9589\u6B64\u9078\u9805\uFF0C\u5247\u53EA\u6062\u5FA9\u6383\u63CF\u6A21\u5F0F\uFF0C\u4F46\u66AB\u5B58\u5340\u6703\u662F\u7A7A\u7684\u3002"
        }
      },
      disabled: {
        scan_in_progress: "\u53E6\u4E00\u9805\u6383\u63CF\u6B63\u5728\u9032\u884C\u4E2D",
        ai_scan_active: "AI \u5DE5\u4F5C\u4E2D\uFF0C\u4E00\u822C\u6383\u63CF\u5DF2\u505C\u7528"
      },
      filters: {
        title: "\u5167\u5BB9\u904E\u6FFE\u5668\u8AAA\u660E",
        numbers: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u6578\u5B57\u3001\u7A7A\u683C\u3001\u5343\u4F4D\u5206\u9694\u7B26(,)\u3001\u5C0F\u6578\u9EDE(.)\u4EE5\u53CA\u90E8\u5206\u8CA8\u5E63\u7B26\u865F($, \u20AC, \xA3, \xA5)\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u6F22\u5B57\u548C\u7A7A\u683C\u7D44\u6210\uFF0C\u4E14\u4E0D\u542B\u4EFB\u4F55\u6A19\u9EDE\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (\u4E0D\u6703\u88AB\u904E\u6FFE)',
        contains_chinese: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u4EFB\u4F55\u542B\u6709\u81F3\u5C11\u4E00\u500B\u6F22\u5B57\u7684\u6587\u672C\uFF0C\u7121\u8AD6\u5176\u4ED6\u5B57\u5143\u662F\u4EC0\u9EBC\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u4F60\u597D World" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "\u7B2C\u4E00\u7AE0" (\u5C07\u88AB\u904E\u6FFE)',
        emoji_only: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u4E00\u500B\u6216\u591A\u500B\u8868\u60C5\u7B26\u865F\u53CA\u7A7A\u683C\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u5404\u7A2E\u6A19\u9EDE\u548C\u7B26\u865F\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u901A\u5E38\u4E0D\u9700\u8981\u7FFB\u8B6F\u7684\u5E38\u898BUI\u8853\u8A9E\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7531<strong>\u55AE\u500B</strong>\u82F1\u6587\u5B57\u6BCD\u7D44\u6210\u7684\u6587\u672C\uFF08\u4E0D\u5340\u5206\u5927\u5C0F\u5BEB\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "A" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "b" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "AB" (\u4E0D\u6703\u88AB\u904E\u6FFE)',
        repeating_chars: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7531<strong>\u540C\u4E00\u500B\u5B57\u5143</strong>\u9023\u7E8C\u91CD\u89072\u6B21\u6216\u4EE5\u4E0A\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: '\u6B64\u898F\u5247\u5617\u8A66\u8B58\u5225\u4E26\u904E\u6FFE\u6389\u985E\u4F3C\u4F5C\u696D\u7CFB\u7D71\u6A94\u6848\u8DEF\u5F91\u4E14<strong>\u5305\u542B\u6A94\u6848\u526F\u6A94\u540D</strong>\u7684\u6587\u672C\u3002\u5B83\u4E0D\u5339\u914D\u7DB2\u5740\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u6A19\u6E96\u7684CSS\u5341\u516D\u9032\u4F4D\u984F\u8272\u4EE3\u78BC\uFF083\u30014\u30016\u62168\u4F4D\uFF0C\u5F8C\u8005\u5305\u542B\u900F\u660E\u5EA6\u901A\u9053\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4\u4F4D)<br>\u2022 "#ff000080" (8\u4F4D)',
        email_addresses: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7B26\u5408\u6A19\u6E96\u96FB\u5B50\u90F5\u4EF6\u5730\u5740\u683C\u5F0F\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u901A\u7528\u552F\u4E00\u8B58\u5225\u78BC (UUID)\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u6A19\u6E96\u7684Git\u63D0\u4EA4\u96DC\u6E4A\u503C\uFF08\u9577\u6216\u77ED\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u7368\u7ACB\u7684\u7DB2\u5740</strong>\u3002\u5B83\u8A2D\u8A08\u5F97\u6BD4\u8F03\u56B4\u683C\uFF0C\u4EE5\u907F\u514D\u610F\u5916\u79FB\u9664\u4E0D\u662F\u9023\u7D50\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u4F7F\u7528<strong>\u5E38\u898B\u901F\u8A18\u5F8C\u7DB4</strong>\u8868\u793A\u5343(k)\u3001\u767E\u842C(m)\u6216\u5341\u5104(b)\u7684\u6578\u5B57\uFF08\u4E0D\u5340\u5206\u5927\u5C0F\u5BEB\uFF09\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "\u986F\u793A\u8A2D\u5B9A\u8AAA\u660E",
        show_fab: "\u63A7\u5236\u662F\u5426\u5728\u7DB2\u9801\u53F3\u4E0B\u89D2\u986F\u793A<strong>\u61F8\u6D6E\u64CD\u4F5C\u6309\u9215(FAB)</strong>\u3002\u9019\u662F\u9032\u884C\u975C\u614B\u548C\u52D5\u614B\u6587\u672C\u63D0\u53D6\u7684\u4E3B\u8981\u5165\u53E3\u3002<br><br>\u5982\u679C\u60A8\u7981\u7528\u4E86\u6B64\u6309\u9215\uFF0C\u53EF\u4EE5\u900F\u904E\u6CB9\u7334\u64F4\u5145\u5957\u4EF6\u9078\u55AE\u4E2D\u7684\u8A2D\u5B9A\u9762\u677F\u91CD\u65B0\u555F\u7528\u5B83\u3002",
        show_scan_count: "\u555F\u7528\u5F8C\uFF0C\u7D50\u679C\u8996\u7A97\u7684\u6A19\u984C\u5217\u5C07<strong>\u5373\u6642\u986F\u793A</strong>\u76EE\u524D\u6383\u63CF\u4E2D\u627E\u5230\u7684\u7E3D\u6587\u672C\u9805\u76EE\u6578\u3002\u9019\u5C0D\u65BC\u76E3\u63A7\u9577\u6642\u9593\u57F7\u884C\u7684<strong>\u52D5\u614B\u6383\u63CF</strong>\u7684\u9032\u5EA6\u7279\u5225\u6709\u7528\u3002",
        show_line_numbers: "\u5728\u7D50\u679C\u8996\u7A97\u7684\u6587\u672C\u5340\u57DF\u5DE6\u5074\u986F\u793A\u884C\u865F\u3002\u7576\u60A8\u9700\u8981\u8A0E\u8AD6\u6216\u8A18\u9304\u7279\u5B9A\u6587\u672C\u884C\u6642\uFF0C\u9019\u63D0\u4F9B\u4E86\u4E00\u500B<strong>\u7CBE\u78BA\u7684\u53C3\u8003\u9EDE</strong>\u3002",
        show_statistics: "\u5728\u7D50\u679C\u8996\u7A97\u5E95\u90E8\u7684\u72C0\u614B\u5217\u4E2D\u986F\u793A\u6709\u95DC\u63D0\u53D6\u5167\u5BB9\u7684<strong>\u5373\u6642\u7D71\u8A08\u6578\u64DA</strong>\uFF0C\u5305\u62EC<strong>\u7E3D\u884C\u6578</strong>\u548C<strong>\u7E3D\u5B57\u5143\u6578</strong>\u3002\u9019\u6709\u52A9\u65BC\u60A8\u5FEB\u901F\u8A55\u4F30\u5167\u5BB9\u7684\u9AD4\u91CF\u3002",
        enable_word_wrap: "\u63A7\u5236\u7D50\u679C\u8996\u7A97\u4E2D\u9577\u6587\u672C\u884C\u7684\u986F\u793A\u65B9\u5F0F\u3002<br><br>\u2022 <strong>\u555F\u7528:</strong> \u9577\u884C\u5C07\u81EA\u52D5\u63DB\u884C\u4EE5\u9069\u61C9\u8996\u7A97\u5BEC\u5EA6\u3002<br>\u2022 <strong>\u7981\u7528:</strong> \u9577\u884C\u5C07\u4FDD\u6301\u5728\u55AE\u884C\uFF0C\u4E26\u51FA\u73FE\u6C34\u5E73\u6372\u8EF8\u3002",
        text_truncation_limit: "\u9019\u662F\u4E00\u500B<strong>\u6548\u80FD\u512A\u5316</strong>\u529F\u80FD\u3002\u5982\u679C\u8173\u672C\u63D0\u53D6\u5230<strong>\u6975\u9577\u7684\u55AE\u884C\u6587\u672C</strong>\uFF08\u4F8B\u5982\uFF0Cbase64\u7DE8\u78BC\u7684\u5716\u7247\uFF09\uFF0C\u53EF\u80FD\u6703\u5C0E\u81F4\u700F\u89BD\u5668<strong>\u5361\u9813\u6216\u7121\u56DE\u61C9</strong>\u3002<br><br>\u6B64\u8A2D\u5B9A\u6703\u622A\u65B7\u4EFB\u4F55\u8D85\u904E\u6307\u5B9A\u9577\u5EA6\u7684\u55AE\u884C\u6587\u672C\uFF0C\u4EE5\u78BA\u4FDDUI\u4FDD\u6301\u6D41\u66A2\u3002<strong>\u6CE8\u610F\uFF1A\u9019\u50C5\u5F71\u97FF\u986F\u793A\uFF1B\u532F\u51FA\u7684\u6A94\u6848\u4ECD\u5C07\u5305\u542B\u5B8C\u6574\u7684\u3001\u672A\u622A\u65B7\u7684\u5167\u5BB9\u3002</strong>"
      },
      advanced: {
        title: "\u9032\u968E\u8A2D\u5B9A\u8AAA\u660E",
        enable_debug_logging: "\u555F\u7528\u5F8C\uFF0C\u8173\u672C\u6703\u5C07\u8A73\u7D30\u7684\u5167\u90E8\u72C0\u614B\u3001\u57F7\u884C\u6B65\u9A5F\u548C\u932F\u8AA4\u8A0A\u606F\u8F38\u51FA\u5230\u700F\u89BD\u5668\u7684<strong>\u958B\u767C\u8005\u5DE5\u5177\u63A7\u5236\u53F0</strong>\uFF08\u901A\u5E38\u7528F12\u958B\u555F\uFF09\u3002\u9019\u4E3B\u8981\u4F9B\u958B\u767C\u8005\u6216\u9700\u8981\u63D0\u4EA4\u8A73\u7D30\u932F\u8AA4\u5831\u544A\u7684\u4F7F\u7528\u8005\u4F7F\u7528\u3002"
      },
      output: {
        include_brackets: "\u63A7\u5236\u8F38\u51FA\u6587\u5B57\u662F\u5426\u5305\u542B\u683C\u5F0F\u7684\u9996\u5C3E\u7B26\u865F\uFF08\u5982\u9663\u5217\u683C\u5F0F\u7684 <code>[</code> \u548C <code>]</code>\uFF0C\u6216\u7269\u4EF6\u683C\u5F0F\u7684 <code>{</code> \u548C <code>}</code>\uFF09\u3002<br><br><strong>\u958B\u555F\u6642:</strong> \u5305\u542B\u5B8C\u6574\u7684\u683C\u5F0F\u7D50\u69CB\u3002<br><strong>\u95DC\u9589\u6642:</strong> \u50C5\u8F38\u51FA\u5167\u5BB9\u884C\uFF0C\u4E0D\u542B\u9996\u5C3E\u7B26\u865F\u3002"
      }
    },
    log: {
      prefix: "[\u6587\u672C\u63D0\u53D6\u8173\u672C-\u5075\u932F]",
      language: {
        switched: "\u8A9E\u8A00\u5DF2\u5207\u63DB\u81F3\uFF1A{{lang}}",
        notFound: "\u672A\u627E\u5230\u8A9E\u8A00 '{{lang}}'\uFF0C\u5DF2\u56DE\u9000\u81F3 'en'\u3002"
      },
      settings: {
        changed: "\u8A2D\u5B9A '{{key}}' \u5DF2\u5F9E '{{oldValue}}' \u8B8A\u66F4\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\u904E\u6FFE\u898F\u5247 '{{key}}' \u5DF2\u555F\u7528",
          disabled: "\u904E\u6FFE\u898F\u5247 '{{key}}' \u5DF2\u7981\u7528"
        },
        panel: {
          opening: "\u6B63\u5728\u958B\u555F\u8A2D\u5B9A\u9762\u677F...",
          closing: "\u6B63\u5728\u95DC\u9589\u8A2D\u5B9A\u9762\u677F...",
          saving: "\u6B63\u5728\u5132\u5B58\u8A2D\u5B9A..."
        },
        parseError: "\u89E3\u6790\u5DF2\u5132\u5B58\u7684\u8A2D\u5B9A\u6642\u51FA\u932F\uFF1A",
        invalidObject: "\u8A66\u5716\u70BA\u8A2D\u5B9A\u5132\u5B58\u4E00\u500B\u7121\u6548\u7269\u4EF6\uFF1A"
      },
      textProcessor: {
        filtered: '\u6587\u672C\u5DF2\u904E\u6FFE: "{{text}}" (\u539F\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\u5FEB\u901F\u6383\u63CF] \u6B63\u5728\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        fallbackFailed: "[\u5FEB\u901F\u6383\u63CF] \u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u57F7\u884C\u5931\u6557: {{error}}",
        fallback: {
          starting: "[\u5FEB\u901F\u6383\u63CF - \u5099\u9078] \u6B63\u5728\u4E3B\u7DDA\u7A0B\u4E2D\u958B\u59CB\u8655\u7406...",
          completed: "[\u5FEB\u901F\u6383\u63CF - \u5099\u9078] \u8655\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002"
        },
        worker: {
          logPrefix: "[\u5FEB\u901F\u6383\u63CF Worker]",
          starting: "[\u5FEB\u901F\u6383\u63CF] \u958B\u59CB\u57F7\u884C\uFF0C\u5617\u8A66\u4F7F\u7528 Web Worker...",
          completed: "[\u5FEB\u901F\u6383\u63CF] Worker \u8655\u7406\u6210\u529F\uFF0C\u6536\u5230 {{count}} \u689D\u6587\u672C\u3002",
          scanComplete: "[\u5FEB\u901F\u6383\u63CF Worker] \u8655\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002\u6B63\u5728\u767C\u56DE\u4E3B\u7DDA\u7A0B...",
          initFailed: "[\u5FEB\u901F\u6383\u63CF] Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u9019\u5F88\u53EF\u80FD\u662F\u7531\u65BC\u7DB2\u7AD9\u7684\u5167\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5C0E\u81F4\u7684\u3002",
          originalError: "[\u5FEB\u901F\u6383\u63CF] \u539F\u59CB\u932F\u8AA4: {{error}}",
          sendingData: "[\u5FEB\u901F\u6383\u63CF] Web Worker \u5DF2\u5EFA\u7ACB\uFF0C\u6B63\u5728\u767C\u9001 {{count}} \u689D\u6587\u672C\u9032\u884C\u8655\u7406...",
          initSyncError: "[\u5FEB\u901F\u6383\u63CF] Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}",
          cspBlocked: "[\u5FEB\u901F\u6383\u63CF] CSP\u6AA2\u67E5\u5931\u6557\uFF0C\u4E0D\u5141\u8A31\u5EFA\u7ACBWorker\u3002"
        }
      },
      sessionScan: {
        switchToFallback: "[\u52D5\u614B\u6383\u63CF] \u6B63\u5728\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        resuming: "\u6B63\u5728\u5F9E\u4E0A\u4E00\u9801\u6062\u5FA9\u52D5\u614B\u6383\u63CF...",
        domObserver: {
          stopped: "[\u52D5\u614B\u6383\u63CF] \u5DF2\u505C\u6B62\u76E3\u807D DOM \u8B8A\u5316\u3002"
        },
        fallback: {
          initialized: "[\u52D5\u614B\u6383\u63CF - \u5099\u9078] \u5DF2\u521D\u59CB\u5316\u3002",
          cleared: "[\u52D5\u614B\u6383\u63CF - \u5099\u9078] \u8CC7\u6599\u5DF2\u6E05\u9664\u3002"
        },
        worker: {
          logPrefix: "[\u52D5\u614B\u6383\u63CF Worker]",
          starting: "\u52D5\u614B\u6383\u63CF\uFF1A\u6B63\u5728\u5617\u8A66\u555F\u52D5 Web Worker...",
          initFailed: "[\u52D5\u614B\u6383\u63CF] Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u9019\u5F88\u53EF\u80FD\u662F\u7531\u65BC\u7DB2\u7AD9\u7684\u5167\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5C0E\u81F4\u7684\u3002",
          originalError: "[\u52D5\u614B\u6383\u63CF] \u539F\u59CB\u932F\u8AA4: {{error}}",
          initialized: "[\u52D5\u614B\u6383\u63CF] Worker \u521D\u59CB\u5316\u6210\u529F\uFF0C\u5DF2\u767C\u9001 {{count}} \u689D\u521D\u59CB\u6587\u672C\u4EE5\u958B\u59CB\u6703\u8A71\u3002",
          initSyncError: "[\u52D5\u614B\u6383\u63CF] Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}",
          clearCommandSent: "[\u52D5\u614B\u6383\u63CF] \u6E05\u9664\u547D\u4EE4\u5DF2\u767C\u9001\u81F3 worker\u3002",
          cspBlocked: "[\u52D5\u614B\u6383\u63CF] CSP\u6AA2\u67E5\u5931\u6557\uFF0C\u4E0D\u5141\u8A31\u5EFA\u7ACBWorker\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\u8907\u88FD\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u8907\u88FD\u4E86 {{count}} \u500B\u5B57\u5143\u3002",
          nothingToCopy: "\u8907\u88FD\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u4F46\u6C92\u6709\u5167\u5BB9\u53EF\u8907\u88FD\u6216\u6309\u9215\u88AB\u7981\u7528\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\u4F7F\u7528\u8005\u5DF2\u78BA\u8A8D\u6E05\u9664\u52D5\u614B\u6383\u63CF\u6587\u672C\uFF0C\u6B63\u5728\u8ABF\u7528\u56DE\u547C..."
          },
          quickScan: {
            confirmed: "\u4F7F\u7528\u8005\u5DF2\u78BA\u8A8D\u6E05\u9664\u5FEB\u901F\u6383\u63CF\u6587\u672C\u3002"
          },
          cancelled: "\u4F7F\u7528\u8005\u5DF2\u53D6\u6D88\u6E05\u9664\u64CD\u4F5C\u3002"
        },
        modal: {
          opening: "\u6B63\u5728\u958B\u555F\u4E3B\u6A21\u614B\u6846...",
          closing: "\u6B63\u5728\u95DC\u9589\u4E3B\u6A21\u614B\u6846...",
          scanFailed: "\u975C\u614B\u6383\u63CF\u5931\u6557: {{error}}",
          clearContent: "\u6E05\u7A7A\u5167\u5BB9\u6309\u9215\u5DF2\u9EDE\u64CA\u3002",
          clearingContent: "\u6B63\u5728\u6E05\u9664\u6A21\u5F0F\u7684\u5167\u5BB9: {{mode}}",
          footerCleanedUp: "\u6A21\u614B\u6846\u9801\u8173\u5DF2\u6E05\u7406\u3002",
          destroyed: "\u4E3B\u6A21\u614B\u6846\u5DF2\u92B7\u6BC0\u3002"
        },
        helpIcon: {
          clicked: "\u9EDE\u64CA\u4E86\u5E6B\u52A9\u5716\u793A\uFF0C\u986F\u793A\u5167\u5BB9\u9375\uFF1A{{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "\u532F\u51FA\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u683C\u5F0F: {{format}}\u3002",
        csvError: "\u89E3\u6790\u6587\u672C\u4E26\u7522\u751FCSV\u6642\u51FA\u932F: {{error}}",
        fileExported: "\u6A94\u6848\u5DF2\u532F\u51FA: {{filename}}",
        noContent: "\u7121\u5167\u5BB9\u53EF\u532F\u51FA\u3002",
        unknownFormat: "\u672A\u77E5\u7684\u532F\u51FA\u683C\u5F0F: {{format}}",
        uiCleanedUp: "\u532F\u51FAUI\u5DF2\u6E05\u7406\u3002",
        exportingUserContent: "\u6B63\u5728\u532F\u51FAUI\u4E2D\u4F7F\u7528\u8005\u7DE8\u8F2F\u7684\u5167\u5BB9\u3002",
        exportingRawData: "\u6B63\u5728\u532F\u51FA\u539F\u59CB\u8CC7\u6599\uFF08UI\u5167\u5BB9\u7121\u6548\u6216\u88AB\u622A\u65B7\uFF09\u3002"
      },
      main: {
        requestingSessionScanData: "\u6B63\u5728\u8ACB\u6C42\u52D5\u614B\u6383\u63CF\u6A21\u5F0F\u7684\u5B8C\u6574\u8CC7\u6599...",
        exportingQuickScanData: "\u6B63\u5728\u532F\u51FA\u5FEB\u901F\u6383\u63CF\u6A21\u5F0F\u8A18\u61B6\u9AD4\u4E2D\u7684\u5B8C\u6574\u8CC7\u6599...",
        inIframe: "\u8173\u672C\u5728 iframe \u4E2D\uFF0C\u5DF2\u8DF3\u904E\u521D\u59CB\u5316\u3002",
        initializing: "\u8173\u672C\u521D\u59CB\u5316\u958B\u59CB...",
        initialSettingsLoaded: "\u521D\u59CB\u8A2D\u5B9A\u5DF2\u8F09\u5165:",
        resumeFailed: "\u6062\u5FA9\u6703\u8A71\u5931\u6557"
      },
      dom: {
        ttpCreationError: "\u5EFA\u7ACB Trusted Type \u7B56\u7565\u5931\u6557:",
        svgParseError: "SVG \u5B57\u4E32\u7121\u6548\u6216\u89E3\u6790\u5931\u6557:"
      },
      persistence: {
        saveBlocked: "\u5132\u5B58\u88AB\u963B\u6B62\uFF0C\u56E0\u70BA\u6301\u4E45\u5316\u5DF2\u88AB\u7981\u7528\u3002",
        staleSession: "\u767C\u73FE\u904E\u671F\u7684\u6703\u8A71\uFF0C\u5DF2\u5FFD\u7565\u3002",
        parseError: "\u89E3\u6790\u5DF2\u5132\u5B58\u7684\u6703\u8A71\u5931\u6557\uFF0C\u6B63\u5728\u6E05\u9664\u3002"
      },
      worker: {
        sessionStarted: "\u6703\u8A71\u5DF2\u958B\u59CB\uFF0C\u521D\u59CB\u5305\u542B {{count}} \u500B\u9805\u76EE\u3002",
        sessionCleared: "\u6703\u8A71\u5DF2\u6E05\u9664\u3002"
      },
      elementScan: {
        starting: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
        stopping: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u505C\u6B62\u3002",
        listenersAdded: "\u5DF2\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u65B0\u589E\u5168\u57DF\u4E8B\u4EF6\u76E3\u807D\u5668\u3002",
        listenersRemoved: "\u5DF2\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u79FB\u9664\u5168\u57DF\u4E8B\u4EF6\u76E3\u807D\u5668\u3002",
        stateReset: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u72C0\u614B\u5DF2\u91CD\u8A2D\u3002",
        resuming: "\u6B63\u5728\u5F9E\u4E0A\u4E00\u9801\u6062\u5FA9\u5143\u7D20\u6383\u63CF...",
        restored: "\u5DF2\u6062\u5FA9 {{count}} \u500B\u66AB\u5B58\u9805\u76EE\u3002",
        skipRestore: "\u6839\u64DA\u8A2D\u5B9A\u8DF3\u904E\u8CC7\u6599\u6062\u5FA9\u3002",
        startingNewSession: "\u958B\u59CB\u65B0\u7684\u5143\u7D20\u6383\u63CF\u6703\u8A71\u3002",
        reselecting: "\u6B63\u5728\u8FD4\u56DE\u5143\u7D20\u91CD\u65B0\u9078\u64C7\u6A21\u5F0F\u3002",
        hovering: "\u6B63\u5728\u61F8\u505C\u65BC <{{tagName}}>\u3002",
        escapePressed: "\u6309\u4E0B Escape \u9375\uFF0C\u6B63\u5728\u505C\u6B62\u9078\u53D6\u5143\u7D20\u6383\u63CF\u3002",
        escapeIgnoredForSettings: "\u6309\u4E0B\u4E86Escape\u9375\uFF0C\u4F46\u56E0\u8A2D\u5B9A\u9762\u677F\u958B\u555F\u800C\u88AB\u5FFD\u7565\u3002",
        escapeIgnoredForModal: "\u6309\u4E0B\u4E86Escape\u9375\uFF0C\u4F46\u56E0\u6A21\u614B\u6846\u6216\u63D0\u793A\u7A97\u53E3\u958B\u555F\u800C\u88AB\u5FFD\u7565\u3002",
        escapePressedInAdjust: "\u5728\u8ABF\u6574\u6A21\u5F0F\u4E0B\u6309\u4E0B\u4E86Escape\u9375\uFF0C\u8FD4\u56DE\u91CD\u65B0\u9078\u64C7\u6A21\u5F0F\u3002",
        clickedEnteringAdjust: "\u5143\u7D20 <{{tagName}}> \u5DF2\u88AB\u9EDE\u64CA\uFF0C\u6B63\u5728\u9032\u5165\u8ABF\u6574\u6A21\u5F0F\u3002",
        pathBuilt: "\u5143\u7D20\u5C64\u7D1A\u8DEF\u5F91\u5DF2\u69CB\u5EFA\uFF0C\u6DF1\u5EA6\u70BA\uFF1A{{depth}}\u3002",
        adjustingLevel: "\u6B63\u5728\u8ABF\u6574\u9078\u64C7\u5C64\u7D1A\u81F3 {{level}} ({{tagName}})\u3002",
        confirmExtracting: "\u9078\u64C7\u5DF2\u78BA\u8A8D\uFF0C\u6B63\u5728\u5F9E <{{tagName}}> \u63D0\u53D6\u6587\u672C\u3002",
        staged: "\u5143\u7D20\u5DF2\u66AB\u5B58\u3002\u7E3D\u6578\uFF1A{{count}}\u3002",
        confirmingStaged: "\u78BA\u8A8D\u9078\u64C7\u3002\u6B63\u5728\u8655\u7406 {{count}} \u500B\u5DF2\u66AB\u5B58\u7684\u5143\u7D20\u3002",
        extractedCount: "\u5DF2\u5F9E\u5143\u7D20\u4E2D\u63D0\u53D6 {{count}} \u689D\u539F\u59CB\u6587\u672C\u3002",
        confirmFailedNoTarget: "\u78BA\u8A8D\u5931\u6557\uFF1A\u672A\u9078\u64C7\u4EFB\u4F55\u76EE\u6A19\u5143\u7D20\u3002",
        rightClickExit: "\u5075\u6E2C\u5230\u53F3\u9375\u9EDE\u64CA\uFF0C\u6B63\u5728\u505C\u6B62\u9078\u53D6\u5143\u7D20\u6383\u63CF\u3002",
        processingError: "\u6587\u672C\u8655\u7406\u904E\u7A0B\u4E2D\u767C\u751F\u932F\u8AA4: {{error}}",
        scrollListenersAdded: "\u5DF2\u70BA {{count}} \u500B\u7236\u5143\u7D20\u65B0\u589E\u6EFE\u52D5\u76E3\u807D\u5668\u3002",
        scrollListenersRemoved: "\u5DF2\u79FB\u9664\u6240\u6709\u6EFE\u52D5\u76E3\u807D\u5668\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u6B63\u5728\u555F\u52D5...",
          sendingData: "\u6B63\u5728\u5411\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u767C\u9001 {{count}} \u689D\u6587\u672C\u7247\u6BB5\u3002",
          completed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u5DF2\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002",
          initFailed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u700F\u89BD\u5668\u7684CSP\u53EF\u80FD\u963B\u6B62\u4E86 data: URL\u3002",
          initSyncError: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}",
          originalError: "\u539F\u59CB Worker \u932F\u8AA4: {{error}}",
          cspBlocked: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u7684CSP\u6AA2\u67E5\u5931\u6557\uFF0C\u4E0D\u5141\u8A31\u5EFA\u7ACBWorker\u3002",
          attemping: "\u6B63\u5728\u5617\u8A66\u4F7F\u7528 Web Worker \u9032\u884C\u904E\u6FFE...",
          fallback: "\u5DF2\u5207\u63DB\u5230\u4E3B\u57F7\u884C\u7DD2\u9032\u884C\u904E\u6FFE\u3002",
          cspHint: "\u9019\u53EF\u80FD\u662F\u7531\u65BC\u7DB2\u7AD9\u7684\u5167\u5BB9\u5B89\u5168\u7B56\u7565\uFF08CSP\uFF09\u5C0E\u81F4\u7684\u3002"
        },
        switchToFallback: "\u6B63\u5728\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        fallbackFailed: "\u300C\u9078\u53D6\u5143\u7D20\u6383\u63CF\u300D\u5099\u7528\u6A21\u5F0F\u5931\u6557\uFF1A{{error}}",
        stagingStarted: "\u958B\u59CB\u66AB\u5B58\u5143\u7D20\uFF1A<{{tagName}}>",
        stagedNothingNew: "\u672A\u80FD\u5F9E\u6B64\u5143\u7D20\u4E2D\u66AB\u5B58\u4EFB\u4F55\u65B0\u7684\u552F\u4E00\u6587\u672C\u3002",
        stagingFinished: "\u66AB\u5B58\u64CD\u4F5C\u5DF2\u5B8C\u6210\u3002",
        confirmStarted: "\u78BA\u8A8D\u6D41\u7A0B\u5DF2\u958B\u59CB...",
        confirmFinished: "\u78BA\u8A8D\u6D41\u7A0B\u5DF2\u6210\u529F\u5B8C\u6210\u3002",
        confirmFailed: "\u78BA\u8A8D\u6D41\u7A0B\u5931\u6557\u3002\u932F\u8AA4\uFF1A{{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u9996\u6B21\u5EFA\u7ACB\u9AD8\u4EAE\u5143\u7D20\u3002",
        updatingHighlight: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u70BA <{{tagName}}> \u66F4\u65B0\u9AD8\u4EAE\u3002",
        creatingToolbar: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u5EFA\u7ACB\u8ABF\u6574\u5DE5\u5177\u5217\u3002",
        toolbarPositioned: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u5DE5\u5177\u5217\u5DF2\u5B9A\u4F4D\u3002",
        sliderChanged: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6ED1\u687F\u5C64\u7D1A\u8B8A\u70BA {{level}}",
        reselectClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u91CD\u65B0\u9078\u64C7\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        stageClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u66AB\u5B58\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        cancelClicked: "\u5143\u7D20\u6383\u89C0UI\uFF1A\u300C\u53D6\u6D88\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        confirmClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u78BA\u8A8D\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        dragStarted: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u62D6\u52D5\u958B\u59CB\u3002",
        dragEnded: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u62D6\u52D5\u7D50\u675F\u3002",
        cleaningHighlights: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u9AD8\u4EAE\u5143\u7D20\u3002",
        cleaningToolbar: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u5DE5\u5177\u5217\u3002"
      },
      eventBus: {
        callbackError: "\u4E8B\u4EF6 '{{eventName}}' \u7684\u56DE\u547C\u51FD\u6578\u51FA\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\u5EFA\u7ACB Trusted Types worker \u7B56\u7565\u5931\u6557:",
        htmlPolicyError: "\u5EFA\u7ACB Trusted Types HTML \u7B56\u7565\u5931\u6557:",
        defaultWorkerPolicyWarning: "\u7528\u65BC worker URL \u7684 Trusted Types \u9810\u8A2D\u7B56\u7565\u5931\u6557\uFF0C\u56DE\u9000\u5230\u539F\u59CB URL\u3002",
        defaultHtmlPolicyWarning: "\u7528\u65BC HTML \u7684 Trusted Types \u9810\u8A2D\u7B56\u7565\u5931\u6557\uFF0C\u56DE\u9000\u5230\u539F\u59CB\u5B57\u4E32\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u6559\u7A0B",
      elementScan: '<p><strong>\u529F\u80FD\u4ECB\u7D39:</strong></p><p>\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5141\u8A31\u60A8\u7CBE\u78BA\u5730\u9078\u64C7\u7DB2\u9801\u4E0A\u7684\u4E00\u500B\u6216\u591A\u500B\u5340\u57DF\uFF08\u4F8B\u5982\u4E00\u500B\u6BB5\u843D\u3001\u4E00\u500B\u5217\u8868\u3001\u4E00\u500B\u5074\u908A\u6B04\uFF09\uFF0C\u4E26\u50C5\u5F9E\u9019\u4E9B\u5340\u57DF\u4E2D\u63D0\u53D6\u6587\u672C\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ol><li><strong>\u555F\u52D5:</strong> \u9EDE\u64CA\u61F8\u6D6E\u6309\u9215\u4E2D\u7684\u300C\u9078\u53D6\u5143\u7D20\u300D\u5716\u6A19 <span class="help-icon-placeholder element-scan-icon"></span> \u555F\u52D5\u6383\u63CF\u6A21\u5F0F\u3002</li><li><strong>\u9078\u64C7:</strong> \u79FB\u52D5\u9F20\u6A19\uFF0C\u60A8\u60F3\u6383\u63CF\u7684\u5340\u57DF\u6703\u986F\u793A\u9AD8\u4EAE\u6846\u3002\u55AE\u64CA\u4EE5\u9078\u5B9A\u3002</li><li><strong>\u8ABF\u6574:</strong> \u9078\u5B9A\u5F8C\u6703\u51FA\u73FE\u5DE5\u5177\u6B04\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528<strong>\u6ED1\u584A</strong>\u4F86\u64F4\u5927\u6216\u7E2E\u5C0F\u9078\u64C7\u7BC4\u570D\u3002</li><li><strong>\u66AB\u5B58:</strong> \u5982\u679C\u60A8\u60F3\u9078\u64C7\u591A\u500B\u4E0D\u76F8\u95DC\u7684\u5340\u57DF\uFF0C\u53EF\u4EE5\u9EDE\u64CA<span class="action-key">\u66AB\u5B58</span>\u6309\u9215\u4FDD\u5B58\u7576\u524D\u9078\u64C7\uFF0C\u7136\u5F8C\u7E7C\u7E8C\u9078\u64C7\u5176\u4ED6\u5340\u57DF\u3002</li><li><strong>\u78BA\u8A8D:</strong> \u5B8C\u6210\u6240\u6709\u9078\u64C7\u5F8C\uFF0C\u9EDE\u64CA<span class="action-key">\u78BA\u8A8D</span>\u6309\u9215\uFF0C\u7CFB\u7D71\u5C07\u958B\u59CB\u5F9E\u60A8\u9078\u64C7\u7684\u6240\u6709\u5340\u57DF\u4E2D\u63D0\u53D6\u6587\u672C\u3002</li></ol><p><strong>\u5982\u4F55\u9000\u51FA:</strong></p><ul><li>\u5728\u9078\u64C7\u904E\u7A0B\u4E2D\uFF08\u51FA\u73FE\u9AD8\u4EAE\u6846\u6642\uFF09\uFF0C\u5728\u9801\u9762\u4EFB\u610F\u4F4D\u7F6E<strong>\u53F3\u9375\u55AE\u64CA</strong>\u3002</li><li>\u5728\u4EFB\u4F55\u6642\u5019\uFF0C\u6309\u4E0B <kbd>ESC</kbd> \u9375\u3002</li><li>\u5728\u4EFB\u4F55\u6642\u5019\uFF0C\u518D\u6B21\u9EDE\u64CA\u300C\u9078\u53D6\u5143\u7D20\u6383\u63CF\u300D\u5716\u6A19\u3002</li></ul>',
      sessionScanTitle: "\u52D5\u614B\u6383\u63CF\u6559\u7A0B",
      sessionScan: '<p><strong>\u529F\u80FD\u4ECB\u7D39:</strong></p><p>\u52D5\u614B\u6383\u63CF\u6703\u6301\u7E8C\u76E3\u63A7\u4E26\u81EA\u52D5\u8A18\u9304\u7DB2\u9801\u4E0A\u6240\u6709\u52D5\u614B\u52A0\u8F09\u6216\u8B8A\u5316\u7684\u6587\u672C\uFF0C\u7279\u5225\u9069\u7528\u65BC\u6293\u53D6\u5BE6\u6642\u804A\u5929\u3001\u6EFE\u52D5\u52A0\u8F09\u5167\u5BB9\u6216\u901A\u77E5\u7B49\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ul><li><strong>\u958B\u59CB\u6383\u63CF:</strong> \u9EDE\u64CA\u61F8\u6D6E\u6309\u9215\u4E2D\u7684\u300C\u52D5\u614B\u6383\u63CF\u300D\u5716\u6A19 <span class="help-icon-placeholder dynamic-scan-icon"></span>\uFF0C\u6383\u63CF\u7ACB\u5373\u958B\u59CB\u3002</li><li><strong>\u505C\u6B62\u6383\u63CF:</strong> \u518D\u6B21\u9EDE\u64CA\u8A72\u5716\u6A19 <span class="help-icon-placeholder stop-icon"></span>\uFF0C\u5373\u53EF\u505C\u6B62\u6383\u63CF\u3002</li><li><strong>\u67E5\u770B\u7D50\u679C:</strong> \u505C\u6B62\u5F8C\uFF0C\u9EDE\u64CA\u4E3B\u61F8\u6D6E\u6309\u9215 <span class="help-icon-placeholder summary-icon"></span> \u6253\u958B\u7D50\u679C\u7A97\u53E3\u3002</li></ul><p><strong>\u5982\u4F55\u9000\u51FA:</strong></p><ul><li>\u5728\u6383\u63CF\u904E\u7A0B\u4E2D\uFF0C\u518D\u6B21\u9EDE\u64CA\u300C\u52D5\u614B\u6383\u63CF\u300D\u5716\u6A19\u3002</li><li>\u5728\u6383\u63CF\u904E\u7A0B\u4E2D\uFF0C\u96A8\u6642\u6309\u4E0B <kbd>ESC</kbd> \u9375\u53EF\u5FEB\u901F\u505C\u6B62\u3002</li></ul>',
      aiScanTitle: "AI \u7FFB\u8B6F\u8AAA\u660E",
      aiScan: "<p><strong>\u529F\u80FD\u4ECB\u7D39:</strong></p><p>AI \u7FFB\u8B6F\u6703\u6301\u7E8C\u6536\u96C6\u7DB2\u9801\u4E2D\u7684\u5019\u9078\u6587\u672C\uFF0C\u4E26\u4F9D\u8A2D\u5B9A\u81EA\u52D5\u8655\u7406\u6216\u7B49\u5F85\u624B\u52D5\u63D0\u4EA4\u3002\u9802\u90E8\u6578\u5B57\u8868\u793A\u672C\u6B21\u5DF2\u6536\u96C6\u7684\u5019\u9078\u9805\u76EE\u6578\u91CF\u3002</p><p><strong>\u5982\u4F55\u4F7F\u7528:</strong></p><ul><li>\u518D\u6B21\u9EDE\u64CA AI \u61F8\u6D6E\u6309\u9215\u5373\u53EF\u505C\u6B62\u7FFB\u8B6F\u3002</li><li>\u9EDE\u64CA\u300C\u67E5\u770B\u6458\u8981\u300D\u53EF\u63D0\u4EA4\u5F85\u8655\u7406\u5167\u5BB9\u3001\u8907\u6838\u7D50\u679C\u4E26\u8907\u88FD\u6216\u532F\u51FA\u7FFB\u8B6F\u3002</li><li>\u91CD\u8907\u51FA\u73FE\u6216\u5DF2\u7D93\u8655\u7406\u904E\u7684\u6587\u672C\u4E0D\u6703\u518D\u6B21\u63D0\u4EA4\u3002</li></ul>"
    }
  };
  // locales-ns:virtual:locales
  var locales = {
    "en": en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var resourceLanguages = [
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "zh-CN",
      "name": "\u7B80\u4F53\u4E2D\u6587"
    },
    {
      "code": "zh-TW",
      "name": "\u7E41\u9AD4\u4E2D\u6587"
    }
  ];
  // src/shared/utils/core/logger.js
  var isDebugEnabled = false;
  function updateLoggerState(isEnabled) {
    isDebugEnabled = isEnabled;
  }
  function log(...args) {
    if (isDebugEnabled) {
      console.log(t("log.prefix"), ...args);
    }
  }
  // src/shared/utils/core/eventBus.js
  var events = {};
  function on(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    return () => {
      events[eventName] = events[eventName].filter((cb) => cb !== callback);
    };
  }
  function fire(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          log(t("log.eventBus.callbackError", { eventName }), error);
        }
      });
    }
  }
  // src/shared/i18n/index.js
  var translationModules = locales;
  var supportedLanguages = [{ code: "auto", name: "Auto" }, ...resourceLanguages];
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentLanguage = "en";
  var currentTranslations = translations.en;
  function setLanguage(lang) {
    if (translations[lang]) {
      currentLanguage = lang;
      currentTranslations = translations[lang];
      log(t("log.language.switched", { lang }));
      fire("languageChanged", lang);
    } else {
      log(t("log.language.notFound", { lang }), "warn");
      currentLanguage = "en";
      currentTranslations = translations.en;
    }
  }
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      return value.replace(/{{\s*(\w+)\s*}}/g, (match, key2) => {
        return Object.prototype.hasOwnProperty.call(replacements, key2) ? replacements[key2] : match;
      });
    }
    return value;
  }
  function getTranslationObject(key) {
    return key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  // src/features/settings/config.js
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      type: "image-card-select",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light", icon: lightThemeIcon },
        { value: "dark", label: "settings.themes.dark", icon: darkThemeIcon },
        { value: "system", label: "settings.themes.system", icon: systemThemeIcon }
      ]
    },
    {
      id: "format-select",
      key: "outputFormat",
      // Match defaultSettings
      label: "settings.format",
      type: "image-card-select",
      icon: formatIcon,
      options: [
        { value: "array", label: "settings.formats.array", previewType: "code-array" },
        { value: "object", label: "settings.formats.object", previewType: "code-object" },
        { value: "csv", label: "settings.formats.csv", previewType: "code-csv" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      options: getAvailableLanguages().map((lang) => ({
        ...lang,
        label: lang.value === "auto" ? "settings.languages.auto" : `settings.languages.${lang.value}`
      }))
    }
  ];
  var outputSettingsDefinitions = [
    {
      id: "include-array-brackets",
      key: "includeArrayBrackets",
      label: "settings.output.include_brackets",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.output.include_brackets",
        text: "tooltip.output.include_brackets"
      }
    }
  ];
  var filterDefinitions = [
    {
      id: "filter-numbers",
      key: "numbers",
      label: "settings.filters.numbers",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.numbers", text: "tooltip.filters.numbers" }
    },
    {
      id: "filter-chinese",
      key: "chinese",
      label: "settings.filters.chinese",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.chinese", text: "tooltip.filters.chinese" }
    },
    {
      id: "filter-contains-chinese",
      key: "containsChinese",
      label: "settings.filters.contains_chinese",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.contains_chinese",
        text: "tooltip.filters.contains_chinese"
      }
    },
    {
      id: "filter-emoji-only",
      key: "emojiOnly",
      label: "settings.filters.emoji_only",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.emoji_only", text: "tooltip.filters.emoji_only" }
    },
    {
      id: "filter-symbols",
      key: "symbols",
      label: "settings.filters.symbols",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.symbols", text: "tooltip.filters.symbols" }
    },
    {
      id: "filter-term",
      key: "termFilter",
      label: "settings.filters.term",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.term", text: "tooltip.filters.term" }
    },
    {
      id: "filter-single-letter",
      key: "singleLetter",
      label: "settings.filters.single_letter",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.single_letter",
        text: "tooltip.filters.single_letter"
      }
    },
    {
      id: "filter-repeating-chars",
      key: "repeatingChars",
      label: "settings.filters.repeating_chars",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.repeating_chars",
        text: "tooltip.filters.repeating_chars"
      }
    },
    {
      id: "filter-file-paths",
      key: "filePath",
      label: "settings.filters.file_paths",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.file_paths", text: "tooltip.filters.file_paths" }
    },
    {
      id: "filter-hex-colors",
      key: "hexColor",
      label: "settings.filters.hex_color_codes",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.hex_color_codes",
        text: "tooltip.filters.hex_color_codes"
      }
    },
    {
      id: "filter-emails",
      key: "email",
      label: "settings.filters.email_addresses",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.email_addresses",
        text: "tooltip.filters.email_addresses"
      }
    },
    {
      id: "filter-uuids",
      key: "uuid",
      label: "settings.filters.uuids",
      tooltip: { titleIcon: infoIcon, title: "settings.filters.uuids", text: "tooltip.filters.uuids" }
    },
    {
      id: "filter-git-hashes",
      key: "gitCommitHash",
      label: "settings.filters.git_commit_hashes",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.git_commit_hashes",
        text: "tooltip.filters.git_commit_hashes"
      }
    },
    {
      id: "filter-website-urls",
      key: "websiteUrl",
      label: "settings.filters.website_urls",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.website_urls_title",
        text: "tooltip.filters.website_urls"
      }
    },
    {
      id: "filter-shorthand-numbers",
      key: "shorthandNumber",
      label: "settings.filters.shorthand_numbers",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.shorthand_numbers_title",
        text: "tooltip.filters.shorthand_numbers"
      }
    }
  ];
  var relatedSettingsDefinitions = [
    {
      id: "show-fab",
      key: "showFab",
      label: "settings.display.show_fab",
      tooltip: { titleIcon: infoIcon, title: "settings.display.show_fab", text: "tooltip.display.show_fab" }
    },
    {
      id: "fab-position",
      key: "fabPosition",
      label: "settings.display.fab_position",
      type: "select",
      options: [
        { value: "bottom-right", label: "settings.display.fab_positions.bottom_right" },
        { value: "top-right", label: "settings.display.fab_positions.top_right" },
        { value: "bottom-left", label: "settings.display.fab_positions.bottom_left" },
        { value: "top-left", label: "settings.display.fab_positions.top_left" }
      ]
    },
    {
      id: "show-scan-count",
      key: "showScanCount",
      label: "settings.display.show_scan_count",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.show_scan_count",
        text: "tooltip.display.show_scan_count"
      }
    },
    {
      id: "show-line-numbers",
      key: "showLineNumbers",
      label: "settings.display.show_line_numbers",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.show_line_numbers",
        text: "tooltip.display.show_line_numbers"
      }
    },
    {
      id: "show-statistics",
      key: "showStatistics",
      label: "settings.display.show_statistics",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.show_statistics",
        text: "tooltip.display.show_statistics"
      }
    },
    {
      id: "enable-word-wrap",
      key: "enableWordWrap",
      label: "settings.display.enable_word_wrap",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.enable_word_wrap",
        text: "tooltip.display.enable_word_wrap"
      }
    },
    {
      id: "enable-text-truncation",
      key: "enableTextTruncation",
      label: "settings.display.text_truncation_limit",
      linkedNumeric: {
        id: "text-truncation-length",
        key: "textTruncationLength"
      },
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.text_truncation_limit",
        text: "tooltip.display.text_truncation_limit"
      }
    },
    {
      id: "enable-debug-logging",
      key: "enableDebugLogging",
      label: "settings.advanced.enable_debug_logging",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.advanced.enable_debug_logging",
        text: "tooltip.advanced.enable_debug_logging"
      }
    }
  ];
  var appConfig = {
    // UI相关的常量
    ui: {
      // 悬浮按钮进入动画的延迟时间（毫秒）
      fabAnimationDelay: 50,
      // 所有UI元素的工具提示文本
      tooltips: {
        summary: "\u67E5\u770B\u603B\u7ED3\u6587\u672C",
        dynamicScan: "\u52A8\u6001\u626B\u63CF",
        staticScan: "\u9759\u6001\u626B\u63CF"
      },
      // 动态扫描实时计数器的前缀文本
      liveCounterPrefix: "\u5DF2\u53D1\u73B0\uFF1A",
      // 主模态框内容区域的默认高度
      modalContentHeight: "400px",
      // 通知系统的默认显示时长（毫秒）
      notificationDuration: 3e3
    },
    // 文本扫描与提取相关的常量
    scanner: {
      // 定义了文本提取的目标CSS选择器
      targetSelectors: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "li",
        "td",
        "th",
        "pre",
        "span",
        "a",
        "button",
        "article",
        "main",
        "div",
        "body *"
      ],
      // 定义了在扫描DOM元素时，需要提取其文本内容的属性列表
      attributesToExtract: ["placeholder", "alt", "title", "aria-label"],
      // 定义一个CSS选择器数组，任何匹配这些选择器的元素及其所有后代都将被文本提取过程完全忽略。
      ignoredSelectors: [
        // --- 语义化标签 ---
        "script",
        "style",
        "noscript",
        "code",
        "pre",
        "kbd",
        // --- 常见的非内容区域 ---
        ".no-translate",
        ".view-line"
      ]
    }
  };
  // src/shared/services/tampermonkey.js
  var registerMenuCommand = (caption, commandFunc) => {
    return GM_registerMenuCommand(caption, commandFunc);
  };
  var unregisterMenuCommand = (commandId) => {
    GM_unregisterMenuCommand(commandId);
  };
  var setClipboard = (text) => {
    GM_setClipboard(text, "text");
  };
  var getValue = (key, defaultValue) => {
    return GM_getValue(key, defaultValue);
  };
  var setValue = (key, value) => {
    return GM_setValue(key, value);
  };
  var deleteValue = (key) => {
    return GM_deleteValue(key);
  };
  var xmlHttpRequest = (details) => {
    return GM_xmlhttpRequest(details);
  };
  // src/shared/ui/theme.js
  function initTheme() {
    const { theme } = loadSettings();
    applyTheme(theme);
  }
  function applyTheme(theme) {
    let finalTheme = theme;
    if (theme === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    uiContainer.host.setAttribute("data-theme", finalTheme);
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const { theme } = loadSettings();
    if (theme === "system") {
      applyTheme("system");
    }
  });
  // src/shared/i18n/management/languageManager.js
  var SETTINGS_MENU_ID_KEY = "settings_menu_command_id";
  async function updateSettingsMenu(onClick) {
    const oldCommandId = await getValue(SETTINGS_MENU_ID_KEY, null);
    if (oldCommandId) {
      unregisterMenuCommand(oldCommandId);
    }
    const menuText = t("settings.panel.title");
    const newCommandId = registerMenuCommand(menuText, onClick);
    await setValue(SETTINGS_MENU_ID_KEY, newCommandId);
  }
  function isLanguageSupported(langCode) {
    return supportedLanguages.some((lang) => lang.code === langCode);
  }
  function initializeLanguage(settings) {
    let langToSet = "en";
    let targetLang = "auto";
    if (settings && settings.language) {
      targetLang = settings.language;
    }
    if (targetLang === "auto") {
      const browserLang = navigator.language;
      if (isLanguageSupported(browserLang) && browserLang !== "auto") {
        langToSet = browserLang;
      } else {
        if (browserLang.startsWith("zh")) {
          if (browserLang.toLowerCase().includes("tw") || browserLang.toLowerCase().includes("hk") || browserLang.toLowerCase().includes("hant")) {
            langToSet = "zh-TW";
          } else {
            langToSet = "zh-CN";
          }
        } else if (browserLang.startsWith("en")) {
          langToSet = "en";
        }
      }
    } else {
      if (isLanguageSupported(targetLang)) {
        langToSet = targetLang;
      }
    }
    setLanguage(langToSet);
  }
  function switchLanguage(langCode) {
    if (isLanguageSupported(langCode)) {
      const settings = loadSettings();
      settings.language = langCode;
      initializeLanguage(settings);
    }
  }
  // src/shared/utils/dom/trustedTypes.js
  var workerPolicy;
  var htmlPolicy;
  var GLOBAL_WORKER_POLICY_KEY = "__qing_scanner_worker_policy__";
  var GLOBAL_HTML_POLICY_KEY = "__qing_scanner_html_policy__";
  var POLICY_CANDIDATES = [
    "qing-page-scanner",
    // 默认首选
    "AGPolicy",
    // Google 系常用
    "opal",
    // Google 系常用
    "google#html",
    // Google 系常用
    "default",
    // 标准默认
    "sanitizer",
    // 常见库使用的名称
    "dompurify",
    // DOMPurify 默认名称
    "allow-duplicates"
    // 某些特殊的全部允许配置
  ];
  function createBestEffortPolicy(typePrefix, policyOptions, globalCacheKey) {
    if (window[globalCacheKey]) {
      return window[globalCacheKey];
    }
    for (const name of POLICY_CANDIDATES) {
      try {
        const policy = window.trustedTypes.createPolicy(name, policyOptions);
        window[globalCacheKey] = policy;
        log(t("log.trustedTypes.policyCreated", { name, type: typePrefix }));
        return policy;
      } catch (e) {
        continue;
      }
    }
    log(t("log.trustedTypes.allPoliciesFailed", { type: typePrefix }), null, true);
    return null;
  }
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    workerPolicy = createBestEffortPolicy(
      "worker",
      {
        createScriptURL: (url) => url
      },
      GLOBAL_WORKER_POLICY_KEY
    );
    htmlPolicy = createBestEffortPolicy(
      "html",
      {
        createHTML: (htmlString) => htmlString
      },
      GLOBAL_HTML_POLICY_KEY
    );
  }
  function createTrustedWorkerUrl(url) {
    if (workerPolicy) {
      return workerPolicy.createScriptURL(url);
    }
    if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      try {
        return window.trustedTypes.defaultPolicy.createScriptURL(url);
      } catch (e) {
        log(t("log.trustedTypes.defaultWorkerPolicyWarning"), e, true);
      }
    }
    return url;
  }
  function createTrustedHTML(htmlString) {
    if (htmlPolicy) {
      return htmlPolicy.createHTML(htmlString);
    }
    if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      try {
        return window.trustedTypes.defaultPolicy.createHTML(htmlString);
      } catch (e) {
        log(t("log.trustedTypes.defaultHtmlPolicyWarning"), e, true);
      }
    }
    return htmlString;
  }
  // src/shared/utils/core/csp-checker.js
  var isAllowed = null;
  async function isWorkerAllowed() {
    if (isAllowed !== null) {
      return isAllowed;
    }
    if (typeof Worker === "undefined" || typeof Blob === "undefined" || typeof URL === "undefined") {
      isAllowed = false;
      return isAllowed;
    }
    const testWorkerBlob = new Blob(["/* test */"], { type: "application/javascript" });
    let objectURL;
    let worker2;
    try {
      objectURL = URL.createObjectURL(testWorkerBlob);
      const workerURL = createTrustedWorkerUrl(objectURL);
      worker2 = new Worker(workerURL);
      isAllowed = true;
      worker2.terminate();
    } catch (e) {
      isAllowed = false;
      console.error("[CSP Checker] Worker creation failed:", e);
    } finally {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    }
    return isAllowed;
  }
  // src/shared/utils/text/formatting.js
  var formatTextsForTranslation = (texts, format = "array", options = {}) => {
    const { includeArrayBrackets = true } = options;
    const pairs = Array.isArray(texts) ? texts.map((item) => {
      if (typeof item === "string") {
        return { sourceText: item, translation: "" };
      }
      if (Array.isArray(item)) {
        return {
          sourceText: String(item[0] || ""),
          translation: String(item[1] || "")
        };
      }
      return {
        sourceText: String(item?.sourceText ?? item?.source ?? ""),
        translation: String(item?.translation ?? "")
      };
    }).filter((pair) => pair.sourceText !== "") : [];
    if (pairs.length === 0) {
      if (format === "object") return includeArrayBrackets ? "{}" : "";
      if (format === "csv") return "";
      return includeArrayBrackets ? "[]" : "";
    }
    if (format === "object") {
      const indent2 = includeArrayBrackets ? "    " : "";
      const result2 = pairs.map(
        (pair) => `${indent2}${JSON.stringify(pair.sourceText)}: ${JSON.stringify(pair.translation)}`
      );
      return includeArrayBrackets ? `{
${result2.join(",\n")}
}` : result2.join(",\n");
    }
    if (format === "csv") {
      return pairs.map((pair) => {
        const escapedSource = pair.sourceText.replace(/"/g, '""');
        const escapedTranslation = pair.translation.replace(/"/g, '""');
        return `"${escapedSource}","${escapedTranslation}"`;
      }).join("\n");
    }
    const indent = includeArrayBrackets ? "    " : "";
    const result = pairs.map(
      (pair) => `${indent}[${JSON.stringify(pair.sourceText)}, ${JSON.stringify(pair.translation)}]`
    );
    return includeArrayBrackets ? `[
${result.join(",\n")}
]` : result.join(",\n");
  };
  // src/shared/workers/worker-url.js
  var workerBlob = new Blob([`(() => {
  // src/shared/i18n/en.json
  var en_default = {
    _meta: {
      name: "English"
    },
    script: {
      name: "Web Text Extraction Tool"
    },
    common: {
      scan: "Scan",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      reset: "Reset",
      delete: "Delete",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage",
      processingElement: "Processing Element"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      format: "Output Format",
      formats: {
        array: "Nested Array",
        object: "Key-Value Object",
        csv: "CSV String"
      },
      output: {
        include_brackets: "Include Wrapper Symbols"
      },
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      dynamicScanRefreshNotice: "When using Dynamic Scan, refresh the webpage after saving for the new filtering rules to take effect.",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "\\u2198 Bottom Right",
          top_right: "\\u2197 Top Right",
          bottom_left: "\\u2199 Bottom Left",
          top_left: "\\u2196 Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      contextual: {
        elementScanTitle: "Element Scan Settings",
        sessionScanTitle: "Dynamic Scan Settings",
        persistData: "Persist data across pages"
      },
      languages: {
        auto: "Auto",
        en: "English (United States)",
        "zh-CN": "Chinese (Simplified)",
        "zh-TW": "Chinese (Traditional)"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      ai: {
        title: "AI Translate",
        enabled: "Enable AI Features",
        enabledDescription: "Turning this off stops AI translation and hides the AI floating button. Normal scans are unaffected.",
        betaBadge: "Beta",
        betaNotice: "This feature is currently unstable and has known issues. It is for testing only.",
        general: "Scan and Translation",
        processingMode: "Processing Mode",
        manual: "Manual Submit",
        automatic: "Automatic",
        targetLanguage: "Target Language",
        simplifiedChinese: "Simplified Chinese",
        traditionalChinese: "Traditional Chinese",
        confidenceThreshold: "Confidence Threshold",
        regexRuleComments: "Include Regex Rule ID Comments",
        regexRuleCommentsDescription: "Adds // qps-rule:<id> comments to regex output for stable rule identification. Disabled by default for cleaner code.",
        provider: "Provider Configuration",
        currentProvider: "Current Provider",
        providerName: "Name",
        apiUrl: "Full API URL (chat/completions)",
        model: "Model",
        responseMode: "Response Mode",
        jsonMode: "JSON Mode",
        promptJson: "Prompt JSON",
        apiKey: "API Key (stored separately)",
        addProvider: "Add Provider",
        newProvider: "New Provider",
        saveProvider: "Save Provider Configuration",
        testConnection: "Test Processing & Latency",
        testDescription: "Sends one fixed synthetic phrase and verifies a parseable classification and translation JSON response. No webpage content is sent. A tiny charge may apply.",
        testing: "Testing classification, translation, and JSON output; a tiny charge may apply\\u2026",
        processingOk: "Processing successful",
        connectionOk: "Processing successful",
        connectionFailed: "Processing test failed",
        costControl: "Cost Controls",
        maxBatchItems: "Max Items per Batch",
        maxBatchCharacters: "Max Characters per Batch",
        maxOutputTokens: "Max Estimated Output Tokens per Batch",
        maxRequests: "Max Requests per Page",
        maxPageCharacters: "Max Characters per Page",
        dailyTokens: "Daily Estimated Token Limit",
        timeout: "Request Timeout (seconds)",
        resetDailyUsage: "Reset Today's Usage",
        restoreDefaults: "Restore Defaults",
        siteStyles: "Site Translation Preferences (Optional)",
        siteStylesDescription: "This is optional. Save directly to use natural Chinese defaults for the current site; fill in more only for fixed terminology or special wording.",
        styleLibrary: "Saved Preferences",
        styleEditor: "Current Site Preferences",
        searchStyles: "Search Site Preferences",
        sortStyles: "Sort",
        sortRecent: "Recently Updated",
        sortOrigin: "By Site",
        styleOrigin: "Site Origin",
        stylePath: "Optional Path Prefix",
        styleTone: "Tone",
        styleGlossary: "Glossary and Proper Nouns",
        stylePunctuation: "Punctuation Style",
        styleInstructions: "Custom Translation Instructions",
        advancedStyleSettings: "Advanced Matching Settings",
        defaultStyleTone: "Natural, clear wording suitable for a Chinese website",
        defaultStylePunctuation: "Use standard Chinese punctuation for the target language",
        useCurrentSite: "Use Current Site",
        noStyles: "No matching site preferences",
        saveStyle: "Save Current Site Preferences",
        clearStyles: "Clear All Preferences"
      },
      about: "About",
      aboutPanel: {
        title: "About",
        version: "Version",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Dynamic Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    slider: {
      adjustFrameSize: "Move slider to adjust frame size",
      minLabel: "Min",
      maxLabel: "Max"
    },
    results: {
      title: "Extracted Text",
      aiTitle: "AI Translation Results",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      scanCountAi: "AI collected {{count}} items",
      aiRunning: "Working",
      aiPaused: "Paused",
      aiStopped: "Stopped",
      aiProcessing: "Processing\\u2026",
      aiBudgetBlocked: "Sending paused due to budget limit",
      aiRequestError: "Request failed",
      aiReviewItems: "Items to Review",
      aiReviewRequired: "Review required",
      aiReviewReturnToEditor: "Return to editor",
      aiReviewRemove: "Remove",
      aiRegexEditError: "Regex rule needs review",
      aiOutput: {
        text: "Pure text",
        regex: "Regex rules"
      },
      aiCounts: {
        pending: "Pending",
        translated: "Translated",
        textRules: "Text rules",
        regexRules: "Regex rules",
        removed: "Removed",
        review: "Review",
        failed: "Failed"
      },
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      elementScanPaused: "Element scan paused.",
      elementScanResumed: "Element scan session resumed from previous page.",
      elementScanContinued: "Element scan continued.",
      sessionScanStarted: "Session scan started.",
      sessionScanPaused: "Dynamic scan paused.",
      sessionScanResumed: "Dynamic scan session resumed from previous page.",
      sessionScanContinued: "Dynamic scan continued.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions.",
      scanModeConflict: "Stop the active scan mode before starting another one.",
      aiScanStarted: "AI translation started.",
      aiScanPaused: "AI translation paused.",
      aiScanContinued: "AI translation resumed.",
      aiScanStopped: "AI translation stopped.",
      aiScanStartFailed: "AI translation failed to start.",
      aiDisabled: "AI features are disabled. Enable them in Settings first.",
      aiBatchCompleted: "AI batch completed.",
      aiNothingPending: "There are no pending items to send.",
      aiRequestFailed: "The AI request failed; affected items require review.",
      aiBudgetBlocked: "A cost limit was reached; local collection will continue.",
      aiProviderRequired: "At least one provider is required.",
      aiProviderSaved: "Provider configuration saved.",
      aiDailyUsageReset: "Today's estimated usage was reset.",
      aiDefaultsRestored: "Cost controls restored to defaults.",
      aiStyleOriginRequired: "Site origin is required.",
      aiStyleSaved: "Site translation preferences saved."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone.",
      deleteProvider: "Delete the current provider configuration?",
      deleteStyle: "Delete the current site translation preferences?",
      clearStyles: "Clear all site translation preferences?"
    },
    ai: {
      actions: {
        submitPending: "Submit Pending",
        retryReview: "Process Again"
      }
    },
    tooltip: {
      summary: "View Summary",
      ai_scan: "AI Translate (Beta)",
      ai_scan_stop: "Stop AI Translate",
      ai_disabled: "AI features are disabled",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      pauseElementScan: "Pause Element Scan",
      resumeElementScan: "Resume Element Scan",
      pauseSessionScan: "Pause Dynamic Scan",
      resumeSessionScan: "Resume Dynamic Scan",
      pauseAiScan: "Pause AI Translation",
      resumeAiScan: "Resume AI Translation",
      tooltipHelp: "Help",
      persistData: {
        title: "Data Persistence Explanation",
        text: {
          sessionScan: "When enabled, automatically resumes and continues accumulating results from the previous page when you navigate to a new one. If disabled, only the scan mode is restored, and a new scan session begins.",
          elementScan: "When enabled, automatically restores all currently staged text when you navigate to a new page. If disabled, only the scan mode is restored, and the staged area will be empty."
        }
      },
      disabled: {
        scan_in_progress: "Another scan is in progress",
        ai_scan_active: "Regular scans are disabled while AI is working"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \\u20AC, \\xA3, \\xA5).<br><br><strong>More Examples:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (will be filtered)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (will not be filtered)',
        contains_chinese: \`This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D World" (will be filtered)<br>\\u2022 "Chapter 1" (will be filtered, as '\\u7B2C 1 \\u7AE0' contains '\\u7B2C' and '\\u7AE0')\`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\\u2022 "A" (will be filtered)<br>\\u2022 "b" (will be filtered)<br>\\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4-digit)<br>\\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      },
      output: {
        include_brackets: "Controls whether the output text includes the format's wrapper symbols (e.g., <code>[</code> and <code>]</code> for array format, or <code>{</code> and <code>}</code> for object format).<br><br><strong>Enabled:</strong> Includes the complete format structure.<br><strong>Disabled:</strong> Outputs only the content lines, without wrapper symbols."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}",
          cspBlocked: "[Quick Scan] CSP check failed. Worker creation is not allowed."
        }
      },
      sessionScan: {
        switchToFallback: "[Dynamic Scan] Switching to main thread fallback.",
        resuming: "Resuming session-scan from previous page...",
        domObserver: {
          stopped: "[Dynamic Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Dynamic Scan - Fallback] Initialized.",
          cleared: "[Dynamic Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Dynamic Scan Worker]",
          starting: "Dynamic Scan: Attempting to start Web Worker...",
          initFailed: "[Dynamic Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Dynamic Scan] Original error: {{error}}",
          initialized: "[Dynamic Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Dynamic Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Dynamic Scan] Clear command sent to worker.",
          cspBlocked: "[Dynamic Scan] CSP check failed. Worker creation is not allowed."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked.",
          clearingContent: "Clearing content for mode: {{mode}}",
          footerCleanedUp: "Modal footer cleaned up.",
          destroyed: "Main modal destroyed."
        },
        helpIcon: {
          clicked: "Help icon clicked, displaying content for key: {{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}",
        uiCleanedUp: "Export UI cleaned up.",
        exportingUserContent: "Exporting user-edited content from UI.",
        exportingRawData: "Exporting original raw data (UI content invalid or truncated)."
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:",
        resumeFailed: "Failed to resume session"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      persistence: {
        saveBlocked: "Save blocked because persistence is disabled.",
        staleSession: "Stale session found, ignoring.",
        parseError: "Failed to parse saved session, clearing."
      },
      worker: {
        sessionStarted: "Session started with {{count}} initial items.",
        sessionCleared: "Session cleared."
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        resuming: "Resuming element-scan from previous page...",
        restored: "Restored {{count}} staged items.",
        skipRestore: "Skipping data restoration based on settings.",
        startingNewSession: "Starting new element scan session.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        escapeIgnoredForSettings: "Escape key pressed, but ignored because a settings panel is open.",
        escapeIgnoredForModal: "Escape key pressed, but ignored because a modal or tooltip is open.",
        escapePressedInAdjust: "Escape key pressed in adjustment mode, returning to reselection.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}",
          cspBlocked: "Element Scan CSP check failed. Worker creation is not allowed.",
          attemping: "Attempting to use Web Worker for filtering...",
          fallback: "Switched to main thread for filtering.",
          cspHint: "This may be due to the site's Content Security Policy (CSP)."
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}",
        stagingStarted: "Staging started for element: <{{tagName}}>",
        stagedNothingNew: "No new unique text was staged from this element.",
        stagingFinished: "Staging finished.",
        confirmStarted: "Confirmation process started...",
        confirmFinished: "Confirmation process finished successfully.",
        confirmFailed: "Confirmation process failed. Error: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Tutorial",
      elementScan: '<p><strong>What it does:</strong></p><p>Element Scan allows you to precisely select one or more areas on a webpage (e.g., a paragraph, a list, a sidebar) and extract text only from those areas.</p><p><strong>How to use:</strong></p><ol><li><strong>Start:</strong> Click the "Element Scan" icon <span class="help-icon-placeholder element-scan-icon"></span> in the floating button to enter scan mode.</li><li><strong>Select:</strong> Move your mouse over the page. The area you want to scan will be highlighted. Click to select it.</li><li><strong>Adjust:</strong> A toolbar will appear after selection. You can use the <strong>slider</strong> to expand or shrink the selection area.</li><li><strong>Stage:</strong> If you want to select multiple unrelated areas, click the <span class="action-key">Stage</span> button to save the current selection and continue selecting other areas.</li><li><strong>Confirm:</strong> Once you have finished all selections, click the <span class="action-key">Confirm</span> button to start extracting text from all your chosen areas.</li></ol><p><strong>How to exit:</strong></p><ul><li>While the highlight box is visible, <strong>right-click</strong> anywhere on the page.</li><li>Press the <kbd>ESC</kbd> key at any time.</li><li>Click the "Element Scan" icon again at any time.</li></ul>',
      sessionScanTitle: "Dynamic Scan Tutorial",
      sessionScan: '<p><strong>What it does:</strong></p><p>Dynamic Scan continuously monitors and automatically records all text that dynamically loads or changes on a webpage. It is especially useful for capturing live chats, infinite scrolling content, or notifications.</p><p><strong>How to use:</strong></p><ul><li><strong>Start Scan:</strong> Click the "Dynamic Scan" icon <span class="help-icon-placeholder dynamic-scan-icon"></span> in the floating button to start scanning immediately.</li><li><strong>Stop Scan:</strong> Click the icon again <span class="help-icon-placeholder stop-icon"></span> to stop.</li><li><strong>View Results:</strong> After stopping, click the main floating button <span class="help-icon-placeholder summary-icon"></span> to open the results window.</li></ul><p><strong>How to exit:</strong></p><ul><li>Click the "Dynamic Scan" icon again during the scan.</li><li>Press the <kbd>ESC</kbd> key at any time to quickly stop the scan.</li></ul>',
      aiScanTitle: "AI Translation Guide",
      aiScan: "<p><strong>What it does:</strong></p><p>AI translation continuously collects candidate webpage text and either processes it automatically or waits for manual submission. The top counter shows how many candidates have been collected.</p><p><strong>How to use:</strong></p><ul><li>Click the AI floating button again to stop translation.</li><li>Open View Summary to submit pending items, review results, and copy or export translations.</li><li>Repeated or previously processed text is not submitted again.</li></ul>"
    }
  };
  // src/shared/i18n/zh-CN.json
  var zh_CN_default = {
    _meta: {
      name: "\\u7B80\\u4F53\\u4E2D\\u6587"
    },
    script: {
      name: "\\u7F51\\u9875\\u6587\\u672C\\u63D0\\u53D6\\u5DE5\\u5177"
    },
    common: {
      scan: "\\u626B\\u63CF",
      stop: "\\u505C\\u6B62",
      pause: "\\u6682\\u505C",
      resume: "\\u6062\\u590D",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u590D\\u5236",
      save: "\\u4FDD\\u5B58",
      reset: "\\u91CD\\u7F6E",
      delete: "\\u5220\\u9664",
      discovered: "\\u5DF2\\u53D1\\u73B0:",
      confirm: "\\u786E\\u8BA4",
      cancel: "\\u53D6\\u6D88",
      export: "\\u5BFC\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9009\\u62E9",
      stage: "\\u6682\\u5B58",
      processingElement: "\\u5904\\u7406\\u5143\\u7D20"
    },
    export: {
      exportAsTxt: "\\u5BFC\\u51FA\\u4E3A TXT",
      exportAsJson: "\\u5BFC\\u51FA\\u4E3A JSON",
      exportAsCsv: "\\u5BFC\\u51FA\\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8BD1\\u6587"
      }
    },
    settings: {
      title: "\\u8BBE\\u7F6E",
      theme: "\\u4E3B\\u9898",
      language: "\\u8BED\\u8A00",
      format: "\\u8F93\\u51FA\\u683C\\u5F0F",
      formats: {
        array: "\\u5D4C\\u5957\\u6570\\u7EC4",
        object: "\\u952E\\u503C\\u5BF9\\u5BF9\\u8C61",
        csv: "CSV \\u5B57\\u7B26\\u4E32"
      },
      output: {
        include_brackets: "\\u5305\\u542B\\u9996\\u5C3E\\u7B26\\u53F7"
      },
      relatedSettings: "\\u76F8\\u5173\\u8BBE\\u7F6E",
      filterRules: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u89C4\\u5219",
      dynamicScanRefreshNotice: "\\u4F7F\\u7528\\u52A8\\u6001\\u626B\\u63CF\\u6A21\\u5F0F\\u65F6\\uFF0C\\u4FDD\\u5B58\\u8FC7\\u6EE4\\u89C4\\u5219\\u540E\\u9700\\u8981\\u5237\\u65B0\\u7F51\\u9875\\u624D\\u80FD\\u751F\\u6548\\u3002",
      filters: {
        numbers: "\\u8FC7\\u6EE4\\u6570\\u5B57/\\u8D27\\u5E01",
        chinese: "\\u8FC7\\u6EE4\\u7EAF\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u8FC7\\u6EE4\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u8FC7\\u6EE4\\u7EAF\\u8868\\u60C5\\u7B26\\u53F7\\u6587\\u672C",
        symbols: "\\u8FC7\\u6EE4\\u7EAF\\u7B26\\u53F7\\u6587\\u672C",
        term: "\\u8FC7\\u6EE4\\u7279\\u5B9A\\u672F\\u8BED",
        single_letter: "\\u8FC7\\u6EE4\\u5355\\u4E2A\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u8FC7\\u6EE4\\u91CD\\u590D\\u5B57\\u7B26",
        file_paths: "\\u8FC7\\u6EE4\\u6587\\u4EF6\\u8DEF\\u5F84",
        hex_color_codes: "\\u8FC7\\u6EE4\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801",
        email_addresses: "\\u8FC7\\u6EE4\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740",
        uuids: "\\u8FC7\\u6EE4 UUID",
        git_commit_hashes: "\\u8FC7\\u6EE4 Git \\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C",
        website_urls: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        website_urls_title: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        shorthand_numbers: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57",
        shorthand_numbers_title: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57"
      },
      display: {
        show_fab: "\\u663E\\u793A\\u60AC\\u6D6E\\u6309\\u94AE",
        fab_position: "\\u60AC\\u6D6E\\u6309\\u94AE\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u2198 \\u53F3\\u4E0B\\u89D2",
          top_right: "\\u2197 \\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u2199 \\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u2196 \\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u663E\\u793A\\u884C\\u53F7",
        show_statistics: "\\u663E\\u793A\\u7EDF\\u8BA1\\u4FE1\\u606F",
        enable_word_wrap: "\\u542F\\u7528\\u81EA\\u52A8\\u6362\\u884C",
        text_truncation_limit: "\\u542F\\u7528\\u6587\\u672C\\u622A\\u65AD\\u9650\\u5236",
        character_limit: "\\u5B57\\u7B26\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6807\\u9898\\u4E2D\\u542F\\u7528\\u626B\\u63CF\\u8BA1\\u6570"
      },
      advanced: {
        enable_debug_logging: "\\u542F\\u7528\\u8C03\\u8BD5\\u65E5\\u5FD7\\u8BB0\\u5F55",
        init_i18n: "\\u521D\\u59CB\\u5316\\u56FD\\u9645\\u5316\\uFF08i18n\\uFF09",
        init_logger: "\\u6839\\u636E\\u8BBE\\u7F6E\\u521D\\u59CB\\u5316\\u65E5\\u5FD7\\u8BB0\\u5F55\\u5668"
      },
      panel: {
        title: "\\u8BBE\\u7F6E\\u9762\\u677F"
      },
      contextual: {
        elementScanTitle: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u8BBE\\u7F6E",
        sessionScanTitle: "\\u52A8\\u6001\\u626B\\u63CF\\u8BBE\\u7F6E",
        persistData: "\\u8DE8\\u9875\\u9762\\u65F6\\u4FDD\\u7559\\u626B\\u63CF\\u6570\\u636E"
      },
      languages: {
        auto: "\\u81EA\\u52A8\\u68C0\\u6D4B",
        en: "\\u82F1\\u6587 (\\u7F8E\\u56FD)",
        "zh-CN": "\\u7B80\\u4F53\\u4E2D\\u6587",
        "zh-TW": "\\u7E41\\u4F53\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6D45\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u968F\\u7CFB\\u7EDF"
      },
      ai: {
        title: "AI \\u7FFB\\u8BD1",
        enabled: "\\u542F\\u7528 AI \\u529F\\u80FD",
        enabledDescription: "\\u5173\\u95ED\\u540E\\u4F1A\\u505C\\u6B62 AI \\u7FFB\\u8BD1\\u5E76\\u9690\\u85CF AI \\u60AC\\u6D6E\\u6309\\u94AE\\uFF1B\\u666E\\u901A\\u626B\\u63CF\\u529F\\u80FD\\u4E0D\\u53D7\\u5F71\\u54CD\\u3002",
        betaBadge: "Beta",
        betaNotice: "\\u76EE\\u524D\\u8BE5\\u529F\\u80FD\\u4E0D\\u7A33\\u5B9A\\uFF0C\\u95EE\\u9898\\u8F83\\u591A\\uFF0C\\u4EC5\\u505A\\u6D4B\\u8BD5\\u3002",
        general: "\\u626B\\u63CF\\u4E0E\\u7FFB\\u8BD1",
        processingMode: "\\u5904\\u7406\\u6A21\\u5F0F",
        manual: "\\u624B\\u52A8\\u63D0\\u4EA4",
        automatic: "\\u81EA\\u52A8\\u5904\\u7406",
        targetLanguage: "\\u76EE\\u6807\\u8BED\\u8A00",
        simplifiedChinese: "\\u4E2D\\u6587\\u7B80\\u4F53",
        traditionalChinese: "\\u4E2D\\u6587\\u7E41\\u4F53",
        confidenceThreshold: "\\u7F6E\\u4FE1\\u5EA6\\u9608\\u503C",
        regexRuleComments: "\\u5305\\u542B\\u6B63\\u5219\\u89C4\\u5219 ID \\u6CE8\\u91CA",
        regexRuleCommentsDescription: "\\u5728\\u6B63\\u5219\\u8F93\\u51FA\\u4E2D\\u6DFB\\u52A0 // qps-rule:<id> \\u6CE8\\u91CA\\uFF0C\\u4FBF\\u4E8E\\u7A33\\u5B9A\\u8BC6\\u522B\\u89C4\\u5219\\u3002\\u9ED8\\u8BA4\\u5173\\u95ED\\u4EE5\\u4FDD\\u6301\\u4EE3\\u7801\\u7B80\\u6D01\\u3002",
        provider: "\\u4F9B\\u5E94\\u5546\\u914D\\u7F6E",
        currentProvider: "\\u5F53\\u524D\\u4F9B\\u5E94\\u5546",
        providerName: "\\u4F9B\\u5E94\\u5546\\u540D\\u79F0",
        apiUrl: "\\u5B8C\\u6574 API \\u5730\\u5740\\uFF08chat/completions\\uFF09",
        model: "\\u6A21\\u578B",
        responseMode: "\\u54CD\\u5E94\\u6A21\\u5F0F",
        jsonMode: "JSON \\u6A21\\u5F0F",
        promptJson: "Prompt JSON",
        apiKey: "API Key\\uFF08\\u72EC\\u7ACB\\u4FDD\\u5B58\\uFF09",
        addProvider: "\\u65B0\\u589E\\u4F9B\\u5E94\\u5546",
        newProvider: "\\u65B0\\u4F9B\\u5E94\\u5546",
        saveProvider: "\\u4FDD\\u5B58\\u4F9B\\u5E94\\u5546\\u914D\\u7F6E",
        testConnection: "\\u6D4B\\u8BD5\\u5904\\u7406\\u4E0E\\u5EF6\\u8FDF",
        testDescription: "\\u53D1\\u9001\\u4E00\\u6761\\u56FA\\u5B9A\\u7684\\u5408\\u6210\\u77ED\\u6587\\u672C\\uFF0C\\u9A8C\\u8BC1\\u4F9B\\u5E94\\u5546\\u80FD\\u8FD4\\u56DE\\u53EF\\u89E3\\u6790\\u7684\\u5206\\u7C7B\\u4E0E\\u7FFB\\u8BD1 JSON\\uFF1B\\u4E0D\\u4F1A\\u53D1\\u9001\\u7F51\\u9875\\u5185\\u5BB9\\u3002\\u6D4B\\u8BD5\\u53EF\\u80FD\\u4EA7\\u751F\\u6781\\u5C0F\\u8D39\\u7528\\u3002",
        testing: "\\u6B63\\u5728\\u6D4B\\u8BD5\\u5206\\u7C7B\\u3001\\u7FFB\\u8BD1\\u548C JSON \\u7ED3\\u679C\\uFF0C\\u53EF\\u80FD\\u4EA7\\u751F\\u6781\\u5C0F\\u8D39\\u7528\\u2026",
        processingOk: "\\u5904\\u7406\\u6B63\\u5E38",
        connectionOk: "\\u5904\\u7406\\u6B63\\u5E38",
        connectionFailed: "\\u5904\\u7406\\u6D4B\\u8BD5\\u5931\\u8D25",
        costControl: "\\u6210\\u672C\\u63A7\\u5236",
        maxBatchItems: "\\u5355\\u6279\\u6700\\u591A\\u6761\\u76EE",
        maxBatchCharacters: "\\u5355\\u6279\\u6700\\u591A\\u5B57\\u7B26",
        maxOutputTokens: "\\u5355\\u6279\\u9884\\u4F30\\u8F93\\u51FA Token \\u4E0A\\u9650",
        maxRequests: "\\u5355\\u9875\\u9762\\u6700\\u591A\\u8BF7\\u6C42",
        maxPageCharacters: "\\u5355\\u9875\\u9762\\u6700\\u591A\\u5B57\\u7B26",
        dailyTokens: "\\u6BCF\\u65E5\\u4F30\\u7B97 Token \\u4E0A\\u9650",
        timeout: "\\u8BF7\\u6C42\\u8D85\\u65F6\\uFF08\\u79D2\\uFF09",
        resetDailyUsage: "\\u6E05\\u9664\\u4ECA\\u65E5\\u7528\\u91CF",
        restoreDefaults: "\\u6062\\u590D\\u9ED8\\u8BA4",
        siteStyles: "\\u7AD9\\u70B9\\u7FFB\\u8BD1\\u504F\\u597D\\uFF08\\u53EF\\u9009\\uFF09",
        siteStylesDescription: "\\u8FD9\\u662F\\u53EF\\u9009\\u9879\\u3002\\u76F4\\u63A5\\u4FDD\\u5B58\\u5373\\u53EF\\u4E3A\\u5F53\\u524D\\u7F51\\u7AD9\\u4F7F\\u7528\\u9ED8\\u8BA4\\u4E2D\\u6587\\u8868\\u8FBE\\uFF1B\\u53EA\\u6709\\u9700\\u8981\\u56FA\\u5B9A\\u672F\\u8BED\\u6216\\u7279\\u6B8A\\u8868\\u8FBE\\u65F6\\u624D\\u586B\\u5199\\u66F4\\u591A\\u5185\\u5BB9\\u3002",
        styleLibrary: "\\u5DF2\\u4FDD\\u5B58\\u504F\\u597D",
        styleEditor: "\\u5F53\\u524D\\u7F51\\u7AD9\\u504F\\u597D",
        searchStyles: "\\u641C\\u7D22\\u7AD9\\u70B9\\u504F\\u597D",
        sortStyles: "\\u6392\\u5E8F",
        sortRecent: "\\u6700\\u8FD1\\u66F4\\u65B0",
        sortOrigin: "\\u6309\\u7AD9\\u70B9",
        styleOrigin: "\\u7AD9\\u70B9 Origin",
        stylePath: "\\u53EF\\u9009\\u8DEF\\u5F84\\u524D\\u7F00",
        styleTone: "\\u8BED\\u6C14",
        styleGlossary: "\\u672F\\u8BED\\u8868\\u4E0E\\u4E13\\u6709\\u540D\\u8BCD",
        stylePunctuation: "\\u6807\\u70B9\\u4E60\\u60EF",
        styleInstructions: "\\u81EA\\u5B9A\\u4E49\\u7FFB\\u8BD1\\u8981\\u6C42",
        advancedStyleSettings: "\\u9AD8\\u7EA7\\u5339\\u914D\\u8BBE\\u7F6E",
        defaultStyleTone: "\\u81EA\\u7136\\u3001\\u6E05\\u6670\\uFF0C\\u7B26\\u5408\\u4E2D\\u6587\\u7F51\\u9875\\u8868\\u8FBE",
        defaultStylePunctuation: "\\u4F7F\\u7528\\u76EE\\u6807\\u8BED\\u8A00\\u7684\\u6807\\u51C6\\u4E2D\\u6587\\u6807\\u70B9",
        useCurrentSite: "\\u4F7F\\u7528\\u5F53\\u524D\\u7F51\\u7AD9",
        noStyles: "\\u6CA1\\u6709\\u5339\\u914D\\u7684\\u7AD9\\u70B9\\u504F\\u597D",
        saveStyle: "\\u4FDD\\u5B58\\u5F53\\u524D\\u7F51\\u7AD9\\u504F\\u597D",
        clearStyles: "\\u6E05\\u7A7A\\u5168\\u90E8\\u504F\\u597D"
      },
      about: "\\u5173\\u4E8E",
      aboutPanel: {
        title: "\\u5173\\u4E8E",
        version: "\\u7248\\u672C",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u626B\\u63CF",
      session: "\\u52A8\\u6001\\u626B\\u63CF",
      stagedCount: "\\u5DF2\\u6682\\u5B58:",
      elementFinished: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      startSession: "\\u5F00\\u59CB\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      stopSession: "\\u505C\\u6B62\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      finished: "\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      sessionStarted: "\\u52A8\\u6001\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      sessionInProgress: "\\u626B\\u63CF\\u8FDB\\u884C\\u4E2D...",
      truncationWarning: "\\u4E3A\\u4FDD\\u6301\\u754C\\u9762\\u6D41\\u7545\\uFF0C\\u6B64\\u5904\\u4EC5\\u663E\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u5BFC\\u51FA\\u540E\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u5185\\u5BB9\\u3002"
    },
    slider: {
      adjustFrameSize: "\\u79FB\\u52A8\\u6ED1\\u5757\\u4EE5\\u8C03\\u6574\\u6846\\u67B6\\u5927\\u5C0F",
      minLabel: "\\u6700\\u5C0F",
      maxLabel: "\\u6700\\u5927"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      aiTitle: "AI \\u7FFB\\u8BD1\\u7ED3\\u679C",
      scanCountSession: "\\u5DF2\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      scanCountStatic: "\\u5171\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      scanCountAi: "AI \\u5DF2\\u6536\\u96C6 {{count}} \\u4E2A\\u9879\\u76EE",
      aiRunning: "\\u5DE5\\u4F5C\\u4E2D",
      aiPaused: "\\u5DF2\\u6682\\u505C",
      aiStopped: "\\u5DF2\\u505C\\u6B62",
      aiProcessing: "\\u5904\\u7406\\u4E2D\\u2026",
      aiBudgetBlocked: "\\u53D1\\u9001\\u5DF2\\u6682\\u505C\\uFF0C\\u8FBE\\u5230\\u9884\\u7B97\\u9650\\u5236",
      aiRequestError: "\\u8BF7\\u6C42\\u5931\\u8D25",
      aiReviewItems: "\\u5F85\\u590D\\u6838\\u5185\\u5BB9",
      aiReviewRequired: "\\u9700\\u4EBA\\u5DE5\\u590D\\u6838",
      aiReviewReturnToEditor: "\\u8FD4\\u56DE\\u7F16\\u8F91\\u6846",
      aiReviewRemove: "\\u79FB\\u9664",
      aiRegexEditError: "\\u6B63\\u5219\\u89C4\\u5219\\u9700\\u590D\\u6838",
      aiOutput: {
        text: "\\u7EAF\\u6587\\u672C",
        regex: "\\u6B63\\u5219\\u7FFB\\u8BD1"
      },
      aiCounts: {
        pending: "\\u5F85\\u5904\\u7406",
        translated: "\\u5DF2\\u7FFB\\u8BD1",
        textRules: "\\u7EAF\\u6587\\u672C\\u89C4\\u5219",
        regexRules: "\\u6B63\\u5219\\u89C4\\u5219",
        removed: "\\u79FB\\u9664",
        review: "\\u5F85\\u590D\\u6838",
        failed: "\\u5931\\u8D25"
      },
      totalCharacters: "\\u603B\\u5B57\\u7B26\\u6570",
      totalLines: "\\u603B\\u884C\\u6570",
      noSummary: "\\u65E0\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u590D\\u5236\\u5230\\u526A\\u8D34\\u677F\\uFF01",
      settingsSaved: "\\u8BBE\\u7F6E\\u5DF2\\u4FDD\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u6001\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6CA1\\u6709\\u53EF\\u590D\\u5236\\u7684\\u5185\\u5BB9\\u3002",
      contentCleared: "\\u5185\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u626B\\u63CF\\u5931\\u8D25\\u3002",
      elementScanStarted: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      elementScanPaused: "\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u6682\\u505C\\u3002",
      elementScanResumed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u4F1A\\u8BDD\\u5DF2\\u4ECE\\u4E0A\\u4E00\\u9875\\u6062\\u590D\\u3002",
      elementScanContinued: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u7EE7\\u7EED\\u3002",
      sessionScanStarted: "\\u52A8\\u6001\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      sessionScanPaused: "\\u52A8\\u6001\\u626B\\u63CF\\u5DF2\\u6682\\u505C\\u3002",
      sessionScanResumed: "\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD\\u5DF2\\u4ECE\\u4E0A\\u4E00\\u9875\\u6062\\u590D\\u3002",
      sessionScanContinued: "\\u52A8\\u6001\\u626B\\u63CF\\u5DF2\\u7EE7\\u7EED\\u3002",
      cspWorkerWarning: "\\u56E0\\u7F51\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u6362\\u81F3\\u517C\\u5BB9\\u626B\\u63CF\\u6A21\\u5F0F\\u3002",
      scanModeConflict: "\\u8BF7\\u5148\\u505C\\u6B62\\u5F53\\u524D\\u626B\\u63CF\\u6A21\\u5F0F\\uFF0C\\u518D\\u542F\\u52A8\\u53E6\\u4E00\\u79CD\\u626B\\u63CF\\u3002",
      aiScanStarted: "AI \\u7FFB\\u8BD1\\u5DF2\\u5F00\\u59CB\\u3002",
      aiScanPaused: "AI \\u7FFB\\u8BD1\\u5DF2\\u6682\\u505C\\u3002",
      aiScanContinued: "AI \\u7FFB\\u8BD1\\u5DF2\\u6062\\u590D\\u3002",
      aiScanStopped: "AI \\u7FFB\\u8BD1\\u5DF2\\u505C\\u6B62\\u3002",
      aiScanStartFailed: "AI \\u7FFB\\u8BD1\\u542F\\u52A8\\u5931\\u8D25\\u3002",
      aiDisabled: "AI \\u529F\\u80FD\\u5DF2\\u5173\\u95ED\\uFF0C\\u8BF7\\u5148\\u5728\\u8BBE\\u7F6E\\u4E2D\\u542F\\u7528\\u3002",
      aiBatchCompleted: "AI \\u6279\\u6B21\\u5904\\u7406\\u5B8C\\u6210\\u3002",
      aiNothingPending: "\\u5F53\\u524D\\u6CA1\\u6709\\u5F85\\u53D1\\u9001\\u5185\\u5BB9\\u3002",
      aiRequestFailed: "AI \\u8BF7\\u6C42\\u5931\\u8D25\\uFF0C\\u6761\\u76EE\\u5DF2\\u8FDB\\u5165\\u5F85\\u590D\\u6838\\u3002",
      aiBudgetBlocked: "\\u5DF2\\u8FBE\\u5230\\u6210\\u672C\\u9650\\u5236\\uFF1B\\u4ECD\\u4F1A\\u7EE7\\u7EED\\u5728\\u672C\\u5730\\u6536\\u96C6\\u3002",
      aiProviderRequired: "\\u81F3\\u5C11\\u9700\\u8981\\u4FDD\\u7559\\u4E00\\u4E2A\\u4F9B\\u5E94\\u5546\\u3002",
      aiProviderSaved: "\\u4F9B\\u5E94\\u5546\\u914D\\u7F6E\\u5DF2\\u4FDD\\u5B58\\u3002",
      aiDailyUsageReset: "\\u4ECA\\u65E5\\u4F30\\u7B97\\u7528\\u91CF\\u5DF2\\u6E05\\u9664\\u3002",
      aiDefaultsRestored: "\\u6210\\u672C\\u63A7\\u5236\\u5DF2\\u6062\\u590D\\u9ED8\\u8BA4\\u503C\\u3002",
      aiStyleOriginRequired: "\\u7AD9\\u70B9 Origin \\u4E0D\\u80FD\\u4E3A\\u7A7A\\u3002",
      aiStyleSaved: "\\u7AD9\\u70B9\\u7FFB\\u8BD1\\u504F\\u597D\\u5DF2\\u4FDD\\u5B58\\u3002"
    },
    placeholders: {
      click: "\\u70B9\\u51FB ",
      dynamicScan: "[\\u52A8\\u6001\\u626B\\u63CF]",
      startNewScanSession: " \\u5F00\\u59CB\\u65B0\\u7684\\u626B\\u63CF\\u4F1A\\u8BDD",
      staticScan: "[\\u9759\\u6001\\u626B\\u63CF]",
      performOneTimeScan: " \\u6267\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u786E\\u5B9A\\u8981\\u6E05\\u9664\\u5185\\u5BB9\\u5417\\uFF1F\\u6B64\\u64CD\\u4F5C\\u65E0\\u6CD5\\u64A4\\u9500\\u3002",
      deleteProvider: "\\u786E\\u5B9A\\u5220\\u9664\\u5F53\\u524D\\u4F9B\\u5E94\\u5546\\u914D\\u7F6E\\u5417\\uFF1F",
      deleteStyle: "\\u786E\\u5B9A\\u5220\\u9664\\u5F53\\u524D\\u7AD9\\u70B9\\u7FFB\\u8BD1\\u504F\\u597D\\u5417\\uFF1F",
      clearStyles: "\\u786E\\u5B9A\\u6E05\\u7A7A\\u5168\\u90E8\\u7AD9\\u70B9\\u7FFB\\u8BD1\\u504F\\u597D\\u5417\\uFF1F"
    },
    ai: {
      actions: {
        submitPending: "\\u63D0\\u4EA4\\u5F85\\u5904\\u7406",
        retryReview: "\\u91CD\\u65B0\\u5904\\u7406"
      }
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      ai_scan: "AI \\u7FFB\\u8BD1\\uFF08Beta\\uFF09",
      ai_scan_stop: "\\u505C\\u6B62 AI \\u7FFB\\u8BD1",
      ai_disabled: "AI \\u529F\\u80FD\\u5DF2\\u5173\\u95ED",
      dynamic_scan: "\\u52A8\\u6001\\u626B\\u63CF",
      static_scan: "\\u9759\\u6001\\u626B\\u63CF",
      element_scan: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF",
      pauseElementScan: "\\u6682\\u505C\\u5143\\u7D20\\u626B\\u63CF",
      resumeElementScan: "\\u6062\\u590D\\u5143\\u7D20\\u626B\\u63CF",
      pauseSessionScan: "\\u6682\\u505C\\u52A8\\u6001\\u626B\\u63CF",
      resumeSessionScan: "\\u6062\\u590D\\u52A8\\u6001\\u626B\\u63CF",
      pauseAiScan: "\\u6682\\u505C AI \\u7FFB\\u8BD1",
      resumeAiScan: "\\u6062\\u590D AI \\u7FFB\\u8BD1",
      tooltipHelp: "\\u5E2E\\u52A9",
      persistData: {
        title: "\\u6570\\u636E\\u6301\\u4E45\\u5316\\u8BF4\\u660E",
        text: {
          sessionScan: "\\u5F00\\u542F\\u540E\\uFF0C\\u5F53\\u70B9\\u51FB\\u94FE\\u63A5\\u8DF3\\u8F6C\\u5230\\u65B0\\u9875\\u9762\\u65F6\\uFF0C\\u4F1A\\u81EA\\u52A8\\u6062\\u590D\\u5E76\\u7EE7\\u7EED\\u7D2F\\u52A0\\u4E0A\\u4E00\\u9875\\u7684\\u626B\\u63CF\\u7ED3\\u679C\\u3002\\u5173\\u95ED\\u6B64\\u9009\\u9879\\uFF0C\\u5219\\u53EA\\u6062\\u590D\\u626B\\u63CF\\u6A21\\u5F0F\\uFF0C\\u4F46\\u4F1A\\u5F00\\u59CB\\u4E00\\u6B21\\u5168\\u65B0\\u7684\\u626B\\u63CF\\u3002",
          elementScan: "\\u5F00\\u542F\\u540E\\uFF0C\\u5F53\\u70B9\\u51FB\\u94FE\\u63A5\\u8DF3\\u8F6C\\u5230\\u65B0\\u9875\\u9762\\u65F6\\uFF0C\\u4F1A\\u81EA\\u52A8\\u6062\\u590D\\u5F53\\u524D\\u5DF2\\u6682\\u5B58\\u7684\\u6240\\u6709\\u6587\\u672C\\u3002\\u5173\\u95ED\\u6B64\\u9009\\u9879\\uFF0C\\u5219\\u53EA\\u6062\\u590D\\u626B\\u63CF\\u6A21\\u5F0F\\uFF0C\\u4F46\\u6682\\u5B58\\u533A\\u4F1A\\u662F\\u7A7A\\u7684\\u3002"
        }
      },
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9879\\u626B\\u63CF\\u6B63\\u5728\\u8FDB\\u884C\\u4E2D",
        ai_scan_active: "AI \\u5DE5\\u4F5C\\u4E2D\\uFF0C\\u666E\\u901A\\u626B\\u63CF\\u5DF2\\u7981\\u7528"
      },
      filters: {
        title: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u5668\\u8BF4\\u660E",
        numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6570\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6570\\u70B9(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8D27\\u5E01\\u7B26\\u53F7($, \\u20AC, \\xA3, \\xA5)\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6C49\\u5B57\\u548C\\u7A7A\\u683C\\u7EC4\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6807\\u70B9\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        contains_chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u4E2A\\u6C49\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u65E0\\u8BBA\\u5176\\u4ED6\\u5B57\\u7B26\\u662F\\u4EC0\\u4E48\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C06\\u88AB\\u8FC7\\u6EE4)',
        emoji_only: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u4E2A\\u6216\\u591A\\u4E2A\\u8868\\u60C5\\u7B26\\u53F7\\u53CA\\u7A7A\\u683C\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u79CD\\u6807\\u70B9\\u548C\\u7B26\\u53F7\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8BD1\\u7684\\u5E38\\u89C1UI\\u672F\\u8BED\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u5355\\u4E2A</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7EC4\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "A" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "b" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "AB" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        repeating_chars: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u540C\\u4E00\\u4E2A\\u5B57\\u7B26</strong>\\u8FDE\\u7EED\\u91CD\\u590D2\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u89C4\\u5219\\u5C1D\\u8BD5\\u8BC6\\u522B\\u5E76\\u8FC7\\u6EE4\\u6389\\u7C7B\\u4F3C\\u64CD\\u4F5C\\u7CFB\\u7EDF\\u6587\\u4EF6\\u8DEF\\u5F84\\u4E14<strong>\\u5305\\u542B\\u6587\\u4EF6\\u6269\\u5C55\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7F51\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684CSS\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u540E\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7B26\\u5408\\u6807\\u51C6\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u7528\\u552F\\u4E00\\u6807\\u8BC6\\u7B26 (UUID)\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684Git\\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C\\uFF08\\u957F\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u72EC\\u7ACB\\u7684\\u7F51\\u5740</strong>\\u3002\\u5B83\\u8BBE\\u8BA1\\u5F97\\u6BD4\\u8F83\\u4E25\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u94FE\\u63A5\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u89C1\\u901F\\u8BB0\\u540E\\u7F00</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u4E07(m)\\u6216\\u5341\\u4EBF(b)\\u7684\\u6570\\u5B57\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u663E\\u793A\\u8BBE\\u7F6E\\u8BF4\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7F51\\u9875\\u53F3\\u4E0B\\u89D2\\u663E\\u793A<strong>\\u60AC\\u6D6E\\u64CD\\u4F5C\\u6309\\u94AE(FAB)</strong>\\u3002\\u8FD9\\u662F\\u8FDB\\u884C\\u9759\\u6001\\u548C\\u52A8\\u6001\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u94AE\\uFF0C\\u53EF\\u4EE5\\u901A\\u8FC7\\u6CB9\\u7334\\u6269\\u5C55\\u83DC\\u5355\\u4E2D\\u7684\\u8BBE\\u7F6E\\u9762\\u677F\\u91CD\\u65B0\\u542F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u542F\\u7528\\u540E\\uFF0C\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6807\\u9898\\u680F\\u5C06<strong>\\u5B9E\\u65F6\\u663E\\u793A</strong>\\u5F53\\u524D\\u626B\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u603B\\u6587\\u672C\\u9879\\u76EE\\u6570\\u3002\\u8FD9\\u5BF9\\u4E8E\\u76D1\\u63A7\\u957F\\u65F6\\u95F4\\u8FD0\\u884C\\u7684<strong>\\u52A8\\u6001\\u626B\\u63CF</strong>\\u7684\\u8FDB\\u5EA6\\u7279\\u522B\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6587\\u672C\\u533A\\u57DF\\u5DE6\\u4FA7\\u663E\\u793A\\u884C\\u53F7\\u3002\\u5F53\\u60A8\\u9700\\u8981\\u8BA8\\u8BBA\\u6216\\u8BB0\\u5F55\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u65F6\\uFF0C\\u8FD9\\u63D0\\u4F9B\\u4E86\\u4E00\\u4E2A<strong>\\u7CBE\\u786E\\u7684\\u53C2\\u8003\\u70B9</strong>\\u3002",
        show_statistics: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u5E95\\u90E8\\u7684\\u72B6\\u6001\\u680F\\u4E2D\\u663E\\u793A\\u6709\\u5173\\u63D0\\u53D6\\u5185\\u5BB9\\u7684<strong>\\u5B9E\\u65F6\\u7EDF\\u8BA1\\u6570\\u636E</strong>\\uFF0C\\u5305\\u62EC<strong>\\u603B\\u884C\\u6570</strong>\\u548C<strong>\\u603B\\u5B57\\u7B26\\u6570</strong>\\u3002\\u8FD9\\u6709\\u52A9\\u4E8E\\u60A8\\u5FEB\\u901F\\u8BC4\\u4F30\\u5185\\u5BB9\\u7684\\u4F53\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7ED3\\u679C\\u7A97\\u53E3\\u4E2D\\u957F\\u6587\\u672C\\u884C\\u7684\\u663E\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u542F\\u7528:</strong> \\u957F\\u884C\\u5C06\\u81EA\\u52A8\\u6362\\u884C\\u4EE5\\u9002\\u5E94\\u7A97\\u53E3\\u5BBD\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u957F\\u884C\\u5C06\\u4FDD\\u6301\\u5728\\u5355\\u884C\\uFF0C\\u5E76\\u51FA\\u73B0\\u6C34\\u5E73\\u6EDA\\u52A8\\u6761\\u3002",
        text_truncation_limit: "\\u8FD9\\u662F\\u4E00\\u4E2A<strong>\\u6027\\u80FD\\u4F18\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u811A\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6781\\u957F\\u7684\\u5355\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7F16\\u7801\\u7684\\u56FE\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u4F1A\\u5BFC\\u81F4\\u6D4F\\u89C8\\u5668<strong>\\u5361\\u987F\\u6216\\u65E0\\u54CD\\u5E94</strong>\\u3002<br><br>\\u6B64\\u8BBE\\u7F6E\\u4F1A\\u622A\\u65AD\\u4EFB\\u4F55\\u8D85\\u8FC7\\u6307\\u5B9A\\u957F\\u5EA6\\u7684\\u5355\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u786E\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u7545\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u8FD9\\u4EC5\\u5F71\\u54CD\\u663E\\u793A\\uFF1B\\u5BFC\\u51FA\\u7684\\u6587\\u4EF6\\u4ECD\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65AD\\u7684\\u5185\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9AD8\\u7EA7\\u8BBE\\u7F6E\\u8BF4\\u660E",
        enable_debug_logging: "\\u542F\\u7528\\u540E\\uFF0C\\u811A\\u672C\\u4F1A\\u5C06\\u8BE6\\u7EC6\\u7684\\u5185\\u90E8\\u72B6\\u6001\\u3001\\u6267\\u884C\\u6B65\\u9AA4\\u548C\\u9519\\u8BEF\\u4FE1\\u606F\\u8F93\\u51FA\\u5230\\u6D4F\\u89C8\\u5668\\u7684<strong>\\u5F00\\u53D1\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u6253\\u5F00\\uFF09\\u3002\\u8FD9\\u4E3B\\u8981\\u4F9B\\u5F00\\u53D1\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8BE6\\u7EC6\\u9519\\u8BEF\\u62A5\\u544A\\u7684\\u7528\\u6237\\u4F7F\\u7528\\u3002"
      },
      output: {
        include_brackets: "\\u63A7\\u5236\\u8F93\\u51FA\\u6587\\u672C\\u662F\\u5426\\u5305\\u542B\\u683C\\u5F0F\\u7684\\u9996\\u5C3E\\u7B26\\u53F7\\uFF08\\u5982\\u6570\\u7EC4\\u683C\\u5F0F\\u7684 <code>[</code> \\u548C <code>]</code>\\uFF0C\\u6216\\u5BF9\\u8C61\\u683C\\u5F0F\\u7684 <code>{</code> \\u548C <code>}</code>\\uFF09\\u3002<br><br><strong>\\u5F00\\u542F\\u65F6:</strong> \\u5305\\u542B\\u5B8C\\u6574\\u7684\\u683C\\u5F0F\\u7ED3\\u6784\\u3002<br><strong>\\u5173\\u95ED\\u65F6:</strong> \\u4EC5\\u8F93\\u51FA\\u5185\\u5BB9\\u884C\\uFF0C\\u4E0D\\u542B\\u9996\\u5C3E\\u7B26\\u53F7\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u811A\\u672C-\\u8C03\\u8BD5]",
      language: {
        switched: "\\u8BED\\u8A00\\u5DF2\\u5207\\u6362\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8BED\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8BBE\\u7F6E '{{key}}' \\u5DF2\\u4ECE '{{oldValue}}' \\u66F4\\u6539\\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u542F\\u7528",
          disabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u8BBE\\u7F6E\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u8BBE\\u7F6E\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u4FDD\\u5B58\\u8BBE\\u7F6E..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BBE\\u7F6E\\u65F6\\u51FA\\u9519\\uFF1A",
        invalidObject: "\\u8BD5\\u56FE\\u4E3A\\u8BBE\\u7F6E\\u4FDD\\u5B58\\u4E00\\u4E2A\\u65E0\\u6548\\u5BF9\\u8C61\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u8FC7\\u6EE4: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u6B63\\u5728\\u4E3B\\u7EBF\\u7A0B\\u4E2D\\u5F00\\u59CB\\u5904\\u7406...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u626B\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u5F00\\u59CB\\u6267\\u884C\\uFF0C\\u5C1D\\u8BD5\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u5904\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u6761\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u626B\\u63CF Worker] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002\\u6B63\\u5728\\u53D1\\u56DE\\u4E3B\\u7EBF\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u626B\\u63CF] Web Worker \\u5DF2\\u521B\\u5EFA\\uFF0C\\u6B63\\u5728\\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u8FDB\\u884C\\u5904\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          cspBlocked: "[\\u5FEB\\u901F\\u626B\\u63CF] CSP\\u68C0\\u67E5\\u5931\\u8D25\\uFF0C\\u4E0D\\u5141\\u8BB8\\u521B\\u5EFAWorker\\u3002"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u52A8\\u6001\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        resuming: "\\u6B63\\u5728\\u4ECE\\u4E0A\\u4E00\\u9875\\u6062\\u590D\\u52A8\\u6001\\u626B\\u63CF...",
        domObserver: {
          stopped: "[\\u52A8\\u6001\\u626B\\u63CF] \\u5DF2\\u505C\\u6B62\\u76D1\\u542C DOM \\u53D8\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u52A8\\u6001\\u626B\\u63CF - \\u5907\\u9009] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u52A8\\u6001\\u626B\\u63CF - \\u5907\\u9009] \\u6570\\u636E\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u52A8\\u6001\\u626B\\u63CF Worker]",
          starting: "\\u52A8\\u6001\\u626B\\u63CF\\uFF1A\\u6B63\\u5728\\u5C1D\\u8BD5\\u542F\\u52A8 Web Worker...",
          initFailed: "[\\u52A8\\u6001\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u52A8\\u6001\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          initialized: "[\\u52A8\\u6001\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u53D1\\u9001 {{count}} \\u6761\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u5F00\\u59CB\\u4F1A\\u8BDD\\u3002",
          initSyncError: "[\\u52A8\\u6001\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          clearCommandSent: "[\\u52A8\\u6001\\u626B\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u53D1\\u9001\\u81F3 worker\\u3002",
          cspBlocked: "[\\u52A8\\u6001\\u626B\\u63CF] CSP\\u68C0\\u67E5\\u5931\\u8D25\\uFF0C\\u4E0D\\u5141\\u8BB8\\u521B\\u5EFAWorker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u590D\\u5236\\u4E86 {{count}} \\u4E2A\\u5B57\\u7B26\\u3002",
          nothingToCopy: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u4F46\\u6CA1\\u6709\\u5185\\u5BB9\\u53EF\\u590D\\u5236\\u6216\\u6309\\u94AE\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u52A8\\u6001\\u626B\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8C03\\u7528\\u56DE\\u8C03..."
          },
          quickScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u5FEB\\u901F\\u626B\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u7528\\u6237\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u4E3B\\u6A21\\u6001\\u6846...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u4E3B\\u6A21\\u6001\\u6846...",
          scanFailed: "\\u9759\\u6001\\u626B\\u63CF\\u5931\\u8D25: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5185\\u5BB9\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\u3002",
          clearingContent: "\\u6B63\\u5728\\u6E05\\u9664\\u6A21\\u5F0F\\u7684\\u5185\\u5BB9: {{mode}}",
          footerCleanedUp: "\\u6A21\\u6001\\u6846\\u9875\\u811A\\u5DF2\\u6E05\\u7406\\u3002",
          destroyed: "\\u4E3B\\u6A21\\u6001\\u6846\\u5DF2\\u9500\\u6BC1\\u3002"
        },
        helpIcon: {
          clicked: "\\u70B9\\u51FB\\u4E86\\u5E2E\\u52A9\\u56FE\\u6807\\uFF0C\\u663E\\u793A\\u5185\\u5BB9\\u952E\\uFF1A{{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "\\u5BFC\\u51FA\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u5E76\\u751F\\u6210CSV\\u65F6\\u51FA\\u9519: {{error}}",
        fileExported: "\\u6587\\u4EF6\\u5DF2\\u5BFC\\u51FA: {{filename}}",
        noContent: "\\u65E0\\u5185\\u5BB9\\u53EF\\u5BFC\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u5BFC\\u51FA\\u683C\\u5F0F: {{format}}",
        uiCleanedUp: "\\u5BFC\\u51FAUI\\u5DF2\\u6E05\\u7406\\u3002",
        exportingUserContent: "\\u6B63\\u5728\\u5BFC\\u51FAUI\\u4E2D\\u7528\\u6237\\u7F16\\u8F91\\u7684\\u5185\\u5BB9\\u3002",
        exportingRawData: "\\u6B63\\u5728\\u5BFC\\u51FA\\u539F\\u59CB\\u6570\\u636E\\uFF08UI\\u5185\\u5BB9\\u65E0\\u6548\\u6216\\u88AB\\u622A\\u65AD\\uFF09\\u3002"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8BF7\\u6C42\\u52A8\\u6001\\u626B\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        exportingQuickScanData: "\\u6B63\\u5728\\u5BFC\\u51FA\\u5FEB\\u901F\\u626B\\u63CF\\u6A21\\u5F0F\\u5185\\u5B58\\u4E2D\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        inIframe: "\\u811A\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u8FC7\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u811A\\u672C\\u521D\\u59CB\\u5316\\u5F00\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8BBE\\u7F6E\\u5DF2\\u52A0\\u8F7D:",
        resumeFailed: "\\u6062\\u590D\\u4F1A\\u8BDD\\u5931\\u8D25"
      },
      dom: {
        ttpCreationError: "\\u521B\\u5EFA Trusted Type \\u7B56\\u7565\\u5931\\u8D25:",
        svgParseError: "SVG \\u5B57\\u7B26\\u4E32\\u65E0\\u6548\\u6216\\u89E3\\u6790\\u5931\\u8D25:"
      },
      persistence: {
        saveBlocked: "\\u4FDD\\u5B58\\u88AB\\u963B\\u6B62\\uFF0C\\u56E0\\u4E3A\\u6301\\u6709\\u5316\\u5DF2\\u88AB\\u7981\\u7528\\u3002",
        staleSession: "\\u53D1\\u73B0\\u8FC7\\u671F\\u7684\\u4F1A\\u8BDD\\uFF0C\\u5DF2\\u5FFD\\u7565\\u3002",
        parseError: "\\u89E3\\u6790\\u5DF2\\u4FDD\\u5B58\\u7684\\u4F1A\\u8BDD\\u5931\\u8D25\\uFF0C\\u6B63\\u5728\\u6E05\\u9664\\u3002"
      },
      worker: {
        sessionStarted: "\\u4F1A\\u8BDD\\u5DF2\\u5F00\\u59CB\\uFF0C\\u521D\\u59CB\\u5305\\u542B {{count}} \\u4E2A\\u9879\\u76EE\\u3002",
        sessionCleared: "\\u4F1A\\u8BDD\\u5DF2\\u6E05\\u9664\\u3002"
      },
      elementScan: {
        starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
        stopping: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6DFB\\u52A0\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u79FB\\u9664\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        stateReset: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u72B6\\u6001\\u5DF2\\u91CD\\u7F6E\\u3002",
        resuming: "\\u6B63\\u5728\\u4ECE\\u4E0A\\u4E00\\u9875\\u6062\\u590D\\u5143\\u7D20\\u626B\\u63CF...",
        restored: "\\u5DF2\\u6062\\u590D {{count}} \\u4E2A\\u6682\\u5B58\\u9879\\u76EE\\u3002",
        skipRestore: "\\u6839\\u636E\\u8BBE\\u7F6E\\u8DF3\\u8FC7\\u6570\\u636E\\u6062\\u590D\\u3002",
        startingNewSession: "\\u5F00\\u59CB\\u65B0\\u7684\\u5143\\u7D20\\u626B\\u63CF\\u4F1A\\u8BDD\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9009\\u62E9\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u60AC\\u505C\\u4E8E <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u952E\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        escapeIgnoredForSettings: "\\u6309\\u4E0B\\u4E86Escape\\u952E\\uFF0C\\u4F46\\u56E0\\u8BBE\\u7F6E\\u9762\\u677F\\u6253\\u5F00\\u800C\\u88AB\\u5FFD\\u7565\\u3002",
        escapeIgnoredForModal: "\\u6309\\u4E0B\\u4E86Escape\\u952E\\uFF0C\\u4F46\\u56E0\\u6A21\\u6001\\u6846\\u6216\\u63D0\\u793A\\u7A97\\u53E3\\u6253\\u5F00\\u800C\\u88AB\\u5FFD\\u7565\\u3002",
        escapePressedInAdjust: "\\u5728\\u8C03\\u6574\\u6A21\\u5F0F\\u4E0B\\u6309\\u4E0B\\u4E86Escape\\u952E\\uFF0C\\u8FD4\\u56DE\\u91CD\\u65B0\\u9009\\u62E9\\u6A21\\u5F0F\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u8FDB\\u5165\\u8C03\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C42\\u7EA7\\u8DEF\\u5F84\\u5DF2\\u6784\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u4E3A\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8C03\\u6574\\u9009\\u62E9\\u5C42\\u7EA7\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9009\\u62E9\\u5DF2\\u786E\\u8BA4\\uFF0C\\u6B63\\u5728\\u4ECE <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u6682\\u5B58\\u3002\\u603B\\u6570\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u786E\\u8BA4\\u9009\\u62E9\\u3002\\u6B63\\u5728\\u5904\\u7406 {{count}} \\u4E2A\\u5DF2\\u6682\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u4ECE\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u6761\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u786E\\u8BA4\\u5931\\u8D25\\uFF1A\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u76EE\\u6807\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u68C0\\u6D4B\\u5230\\u53F3\\u952E\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u5904\\u7406\\u8FC7\\u7A0B\\u4E2D\\u53D1\\u751F\\u9519\\u8BEF: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u4E3A {{count}} \\u4E2A\\u7236\\u5143\\u7D20\\u6DFB\\u52A0\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u6B63\\u5728\\u542F\\u52A8...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002",
          initFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u6D4F\\u89C8\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u9519\\u8BEF: {{error}}",
          cspBlocked: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u7684CSP\\u68C0\\u67E5\\u5931\\u8D25\\uFF0C\\u4E0D\\u5141\\u8BB8\\u521B\\u5EFAWorker\\u3002",
          attemping: "\\u6B63\\u5728\\u5C1D\\u8BD5\\u4F7F\\u7528 Web Worker \\u8FDB\\u884C\\u8FC7\\u6EE4...",
          fallback: "\\u5DF2\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u8FDB\\u884C\\u8FC7\\u6EE4\\u3002",
          cspHint: "\\u8FD9\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565\\uFF08CSP\\uFF09\\u5BFC\\u81F4\\u7684\\u3002"
        },
        switchToFallback: "\\u6B63\\u5728\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u201C\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u201D\\u540E\\u5907\\u6A21\\u5F0F\\u5931\\u8D25\\uFF1A{{error}}",
        stagingStarted: "\\u5F00\\u59CB\\u6682\\u5B58\\u5143\\u7D20\\uFF1A<{{tagName}}>",
        stagedNothingNew: "\\u672A\\u80FD\\u4ECE\\u6B64\\u5143\\u7D20\\u4E2D\\u6682\\u5B58\\u4EFB\\u4F55\\u65B0\\u7684\\u552F\\u4E00\\u6587\\u672C\\u3002",
        stagingFinished: "\\u6682\\u5B58\\u64CD\\u4F5C\\u5DF2\\u5B8C\\u6210\\u3002",
        confirmStarted: "\\u786E\\u8BA4\\u6D41\\u7A0B\\u5DF2\\u5F00\\u59CB...",
        confirmFinished: "\\u786E\\u8BA4\\u6D41\\u7A0B\\u5DF2\\u6210\\u529F\\u5B8C\\u6210\\u3002",
        confirmFailed: "\\u786E\\u8BA4\\u6D41\\u7A0B\\u5931\\u8D25\\u3002\\u9519\\u8BEF\\uFF1A{{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u9996\\u6B21\\u521B\\u5EFA\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u4E3A <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u521B\\u5EFA\\u8C03\\u6574\\u5DE5\\u5177\\u680F\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u680F\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6ED1\\u5757\\u5C42\\u7EA7\\u53D8\\u4E3A {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u91CD\\u65B0\\u9009\\u62E9\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        stageClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u6682\\u5B58\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u53D6\\u6D88\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u786E\\u8BA4\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        dragStarted: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u5F00\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u7ED3\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u680F\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u8C03\\u51FD\\u6570\\u51FA\\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\\u521B\\u5EFA Trusted Types worker \\u7B56\\u7565\\u5931\\u8D25:",
        htmlPolicyError: "\\u521B\\u5EFA Trusted Types HTML \\u7B56\\u7565\\u5931\\u8D25:",
        defaultWorkerPolicyWarning: "\\u7528\\u4E8E worker URL \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u4E8E HTML \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u7B26\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B",
      elementScan: '<p><strong>\\u529F\\u80FD\\u4ECB\\u7ECD:</strong></p><p>\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5141\\u8BB8\\u60A8\\u7CBE\\u786E\\u5730\\u9009\\u62E9\\u7F51\\u9875\\u4E0A\\u7684\\u4E00\\u4E2A\\u6216\\u591A\\u4E2A\\u533A\\u57DF\\uFF08\\u4F8B\\u5982\\u4E00\\u4E2A\\u6BB5\\u843D\\u3001\\u4E00\\u4E2A\\u5217\\u8868\\u3001\\u4E00\\u4E2A\\u4FA7\\u8FB9\\u680F\\uFF09\\uFF0C\\u5E76\\u4EC5\\u4ECE\\u8FD9\\u4E9B\\u533A\\u57DF\\u4E2D\\u63D0\\u53D6\\u6587\\u672C\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ol><li><strong>\\u542F\\u52A8:</strong> \\u70B9\\u51FB\\u60AC\\u6D6E\\u6309\\u94AE\\u4E2D\\u7684\\u201C\\u9009\\u53D6\\u5143\\u7D20\\u201D\\u56FE\\u6807 <span class="help-icon-placeholder element-scan-icon"></span> \\u542F\\u52A8\\u626B\\u63CF\\u6A21\\u5F0F\\u3002</li><li><strong>\\u9009\\u62E9:</strong> \\u79FB\\u52A8\\u9F20\\u6807\\uFF0C\\u60A8\\u60F3\\u626B\\u63CF\\u7684\\u533A\\u57DF\\u4F1A\\u663E\\u793A\\u9AD8\\u4EAE\\u6846\\u3002\\u5355\\u51FB\\u4EE5\\u9009\\u5B9A\\u3002</li><li><strong>\\u8C03\\u6574:</strong> \\u9009\\u5B9A\\u540E\\u4F1A\\u51FA\\u73B0\\u5DE5\\u5177\\u680F\\u3002\\u60A8\\u53EF\\u4EE5\\u4F7F\\u7528<strong>\\u6ED1\\u5757</strong>\\u6765\\u6269\\u5927\\u6216\\u7F29\\u5C0F\\u9009\\u62E9\\u8303\\u56F4\\u3002</li><li><strong>\\u6682\\u5B58:</strong> \\u5982\\u679C\\u60A8\\u60F3\\u9009\\u62E9\\u591A\\u4E2A\\u4E0D\\u76F8\\u5173\\u7684\\u533A\\u57DF\\uFF0C\\u53EF\\u4EE5\\u70B9\\u51FB<span class="action-key">\\u6682\\u5B58</span>\\u6309\\u94AE\\u4FDD\\u5B58\\u5F53\\u524D\\u9009\\u62E9\\uFF0C\\u7136\\u540E\\u7EE7\\u7EED\\u9009\\u62E9\\u5176\\u4ED6\\u533A\\u57DF\\u3002</li><li><strong>\\u786E\\u8BA4:</strong> \\u5B8C\\u6210\\u6240\\u6709\\u9009\\u62E9\\u540E\\uFF0C\\u70B9\\u51FB<span class="action-key">\\u786E\\u8BA4</span>\\u6309\\u94AE\\uFF0C\\u7CFB\\u7EDF\\u5C06\\u5F00\\u59CB\\u4ECE\\u60A8\\u9009\\u62E9\\u7684\\u6240\\u6709\\u533A\\u57DF\\u4E2D\\u63D0\\u53D6\\u6587\\u672C\\u3002</li></ol><p><strong>\\u5982\\u4F55\\u9000\\u51FA:</strong></p><ul><li>\\u5728\\u9009\\u62E9\\u8FC7\\u7A0B\\u4E2D\\uFF08\\u51FA\\u73B0\\u9AD8\\u4EAE\\u6846\\u65F6\\uFF09\\uFF0C\\u5728\\u9875\\u9762\\u4EFB\\u610F\\u4F4D\\u7F6E<strong>\\u53F3\\u952E\\u5355\\u51FB</strong>\\u3002</li><li>\\u5728\\u4EFB\\u4F55\\u65F6\\u5019\\uFF0C\\u6309\\u4E0B<kbd>ESC</kbd>\\u952E\\u3002</li><li>\\u5728\\u4EFB\\u4F55\\u65F6\\u5019\\uFF0C\\u518D\\u6B21\\u70B9\\u51FB\\u201C\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u201D\\u56FE\\u6807\\u3002</li></ul>',
      sessionScanTitle: "\\u52A8\\u6001\\u626B\\u63CF\\u6559\\u7A0B",
      sessionScan: '<p><strong>\\u529F\\u80FD\\u4ECB\\u7ECD:</strong></p><p>\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u6301\\u7EED\\u76D1\\u63A7\\u5E76\\u81EA\\u52A8\\u8BB0\\u5F55\\u7F51\\u9875\\u4E0A\\u6240\\u6709\\u52A8\\u6001\\u52A0\\u8F7D\\u6216\\u53D8\\u5316\\u7684\\u6587\\u672C\\uFF0C\\u7279\\u522B\\u9002\\u7528\\u4E8E\\u6293\\u53D6\\u5B9E\\u65F6\\u804A\\u5929\\u3001\\u6EDA\\u52A8\\u52A0\\u8F7D\\u5185\\u5BB9\\u6216\\u901A\\u77E5\\u7B49\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ul><li><strong>\\u5F00\\u59CB\\u626B\\u63CF:</strong> \\u70B9\\u51FB\\u60AC\\u6D6E\\u6309\\u94AE\\u4E2D\\u7684\\u201C\\u52A8\\u6001\\u626B\\u63CF\\u201D\\u56FE\\u6807 <span class="help-icon-placeholder dynamic-scan-icon"></span>\\uFF0C\\u626B\\u63CF\\u7ACB\\u5373\\u5F00\\u59CB\\u3002</li><li><strong>\\u505C\\u6B62\\u626B\\u63CF:</strong> \\u518D\\u6B21\\u70B9\\u51FB\\u8BE5\\u56FE\\u6807 <span class="help-icon-placeholder stop-icon"></span>\\uFF0C\\u5373\\u53EF\\u505C\\u6B62\\u626B\\u63CF\\u3002</li><li><strong>\\u67E5\\u770B\\u7ED3\\u679C:</strong> \\u505C\\u6B62\\u540E\\uFF0C\\u70B9\\u51FB\\u4E3B\\u60AC\\u6D6E\\u6309\\u94AE <span class="help-icon-placeholder summary-icon"></span> \\u6253\\u5F00\\u7ED3\\u679C\\u7A97\\u53E3\\u3002</li></ul><p><strong>\\u5982\\u4F55\\u9000\\u51FA:</strong></p><ul><li>\\u5728\\u626B\\u63CF\\u8FC7\\u7A0B\\u4E2D\\uFF0C\\u518D\\u6B21\\u70B9\\u51FB\\u201C\\u52A8\\u6001\\u626B\\u63CF\\u201D\\u56FE\\u6807\\u3002</li><li>\\u5728\\u626B\\u63CF\\u8FC7\\u7A0B\\u4E2D\\uFF0C\\u968F\\u65F6\\u6309\\u4E0B<kbd>ESC</kbd>\\u952E\\u53EF\\u5FEB\\u901F\\u505C\\u6B62\\u3002</li></ul>',
      aiScanTitle: "AI \\u7FFB\\u8BD1\\u8BF4\\u660E",
      aiScan: "<p><strong>\\u529F\\u80FD\\u4ECB\\u7ECD:</strong></p><p>AI \\u7FFB\\u8BD1\\u4F1A\\u6301\\u7EED\\u6536\\u96C6\\u7F51\\u9875\\u4E2D\\u7684\\u5019\\u9009\\u6587\\u672C\\uFF0C\\u5E76\\u6839\\u636E\\u8BBE\\u7F6E\\u81EA\\u52A8\\u5904\\u7406\\u6216\\u7B49\\u5F85\\u624B\\u52A8\\u63D0\\u4EA4\\u3002\\u9876\\u90E8\\u6570\\u5B57\\u8868\\u793A\\u672C\\u6B21\\u5DF2\\u6536\\u96C6\\u7684\\u5019\\u9009\\u9879\\u6570\\u91CF\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ul><li>\\u518D\\u6B21\\u70B9\\u51FB AI \\u60AC\\u6D6E\\u6309\\u94AE\\u5373\\u53EF\\u505C\\u6B62\\u7FFB\\u8BD1\\u3002</li><li>\\u70B9\\u51FB\\u201C\\u67E5\\u770B\\u6458\\u8981\\u201D\\u53EF\\u63D0\\u4EA4\\u5F85\\u5904\\u7406\\u5185\\u5BB9\\u3001\\u590D\\u6838\\u7ED3\\u679C\\u5E76\\u590D\\u5236\\u6216\\u5BFC\\u51FA\\u7FFB\\u8BD1\\u3002</li><li>\\u91CD\\u590D\\u51FA\\u73B0\\u6216\\u5DF2\\u7ECF\\u5904\\u7406\\u8FC7\\u7684\\u6587\\u672C\\u4E0D\\u4F1A\\u518D\\u6B21\\u63D0\\u4EA4\\u3002</li></ul>"
    }
  };
  // src/shared/i18n/zh-TW.json
  var zh_TW_default = {
    _meta: {
      name: "\\u7E41\\u9AD4\\u4E2D\\u6587"
    },
    script: {
      name: "\\u7DB2\\u9801\\u6587\\u672C\\u63D0\\u53D6\\u5DE5\\u5177"
    },
    common: {
      scan: "\\u6383\\u63CF",
      stop: "\\u505C\\u6B62",
      pause: "\\u66AB\\u505C",
      resume: "\\u6062\\u5FA9",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u8907\\u88FD",
      save: "\\u5132\\u5B58",
      reset: "\\u91CD\\u8A2D",
      delete: "\\u522A\\u9664",
      discovered: "\\u5DF2\\u767C\\u73FE:",
      confirm: "\\u78BA\\u8A8D",
      cancel: "\\u53D6\\u6D88",
      export: "\\u532F\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9078\\u64C7",
      stage: "\\u66AB\\u5B58",
      processingElement: "\\u8655\\u7406\\u5143\\u7D20"
    },
    export: {
      exportAsTxt: "\\u532F\\u51FA\\u70BA TXT",
      exportAsJson: "\\u532F\\u51FA\\u70BA JSON",
      exportAsCsv: "\\u532F\\u51FA\\u70BA CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8B6F\\u6587"
      }
    },
    settings: {
      title: "\\u8A2D\\u5B9A",
      theme: "\\u4E3B\\u984C",
      language: "\\u8A9E\\u8A00",
      format: "\\u8F38\\u51FA\\u683C\\u5F0F",
      formats: {
        array: "\\u5D4C\\u5957\\u9663\\u5217",
        object: "\\u9375\\u503C\\u5C0D\\u7269\\u4EF6",
        csv: "CSV \\u5B57\\u4E32"
      },
      output: {
        include_brackets: "\\u5305\\u542B\\u9996\\u5C3E\\u7B26\\u865F"
      },
      relatedSettings: "\\u76F8\\u95DC\\u8A2D\\u5B9A",
      filterRules: "\\u5167\\u5BB9\\u904E\\u6FFE\\u898F\\u5247",
      dynamicScanRefreshNotice: "\\u4F7F\\u7528\\u52D5\\u614B\\u6383\\u63CF\\u6A21\\u5F0F\\u6642\\uFF0C\\u5132\\u5B58\\u904E\\u6FFE\\u898F\\u5247\\u5F8C\\u9700\\u8981\\u91CD\\u65B0\\u6574\\u7406\\u7DB2\\u9801\\u624D\\u80FD\\u751F\\u6548\\u3002",
      filters: {
        numbers: "\\u904E\\u6FFE\\u6578\\u5B57/\\u8CA8\\u5E63",
        chinese: "\\u904E\\u6FFE\\u7D14\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u904E\\u6FFE\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u904E\\u6FFE\\u7D14\\u8868\\u60C5\\u7B26\\u865F\\u6587\\u672C",
        symbols: "\\u904E\\u6FFE\\u7D14\\u7B26\\u865F\\u6587\\u672C",
        term: "\\u904E\\u6FFE\\u7279\\u5B9A\\u8853\\u8A9E",
        single_letter: "\\u904E\\u6FFE\\u55AE\\u500B\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u904E\\u6FFE\\u91CD\\u8907\\u5B57\\u5143",
        file_paths: "\\u904E\\u6FFE\\u6A94\\u6848\\u8DEF\\u5F91",
        hex_color_codes: "\\u904E\\u6FFE\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC",
        email_addresses: "\\u904E\\u6FFE\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740",
        uuids: "\\u904E\\u6FFE UUID",
        git_commit_hashes: "\\u904E\\u6FFE Git \\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C",
        website_urls: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        website_urls_title: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        shorthand_numbers: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57",
        shorthand_numbers_title: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57"
      },
      display: {
        show_fab: "\\u986F\\u793A\\u61F8\\u6D6E\\u6309\\u9215",
        fab_position: "\\u61F8\\u6D6E\\u6309\\u9215\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u2198 \\u53F3\\u4E0B\\u89D2",
          top_right: "\\u2197 \\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u2199 \\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u2196 \\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u986F\\u793A\\u884C\\u865F",
        show_statistics: "\\u986F\\u793A\\u7D71\\u8A08\\u8CC7\\u8A0A",
        enable_word_wrap: "\\u555F\\u7528\\u81EA\\u52D5\\u63DB\\u884C",
        text_truncation_limit: "\\u555F\\u7528\\u6587\\u672C\\u622A\\u65B7\\u9650\\u5236",
        character_limit: "\\u5B57\\u5143\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6A19\\u984C\\u4E2D\\u555F\\u7528\\u6383\\u63CF\\u8A08\\u6578"
      },
      advanced: {
        enable_debug_logging: "\\u555F\\u7528\\u5075\\u932F\\u65E5\\u8A8C\\u8A18\\u9304"
      },
      panel: {
        title: "\\u8A2D\\u5B9A\\u9762\\u677F"
      },
      contextual: {
        elementScanTitle: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u8A2D\\u5B9A",
        sessionScanTitle: "\\u52D5\\u614B\\u6383\\u63CF\\u8A2D\\u5B9A",
        persistData: "\\u8DE8\\u9801\\u9762\\u6642\\u4FDD\\u7559\\u6383\\u63CF\\u6578\\u64DA"
      },
      languages: {
        auto: "\\u81EA\\u52D5\\u6AA2\\u6E2C",
        en: "\\u82F1\\u6587 (\\u7F8E\\u570B)",
        "zh-CN": "\\u7C21\\u9AD4\\u4E2D\\u6587",
        "zh-TW": "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6DFA\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u96A8\\u7CFB\\u7D71"
      },
      ai: {
        title: "AI \\u7FFB\\u8B6F",
        enabled: "\\u555F\\u7528 AI \\u529F\\u80FD",
        enabledDescription: "\\u95DC\\u9589\\u5F8C\\u6703\\u505C\\u6B62 AI \\u7FFB\\u8B6F\\u4E26\\u96B1\\u85CF AI \\u61F8\\u6D6E\\u6309\\u9215\\uFF1B\\u4E00\\u822C\\u6383\\u63CF\\u529F\\u80FD\\u4E0D\\u53D7\\u5F71\\u97FF\\u3002",
        betaBadge: "Beta",
        betaNotice: "\\u76EE\\u524D\\u8A72\\u529F\\u80FD\\u4E0D\\u7A69\\u5B9A\\uFF0C\\u554F\\u984C\\u8F03\\u591A\\uFF0C\\u50C5\\u4F9B\\u6E2C\\u8A66\\u3002",
        general: "\\u6383\\u63CF\\u8207\\u7FFB\\u8B6F",
        processingMode: "\\u8655\\u7406\\u6A21\\u5F0F",
        manual: "\\u624B\\u52D5\\u63D0\\u4EA4",
        automatic: "\\u81EA\\u52D5\\u8655\\u7406",
        targetLanguage: "\\u76EE\\u6A19\\u8A9E\\u8A00",
        simplifiedChinese: "\\u4E2D\\u6587\\u7C21\\u9AD4",
        traditionalChinese: "\\u4E2D\\u6587\\u7E41\\u9AD4",
        confidenceThreshold: "\\u4FE1\\u5FC3\\u5EA6\\u95BE\\u503C",
        regexRuleComments: "\\u5305\\u542B\\u6B63\\u5247\\u898F\\u5247 ID \\u8A3B\\u89E3",
        regexRuleCommentsDescription: "\\u5728\\u6B63\\u5247\\u8F38\\u51FA\\u4E2D\\u52A0\\u5165 // qps-rule:<id> \\u8A3B\\u89E3\\uFF0C\\u65B9\\u4FBF\\u7A69\\u5B9A\\u8B58\\u5225\\u898F\\u5247\\u3002\\u9810\\u8A2D\\u95DC\\u9589\\u4EE5\\u4FDD\\u6301\\u7A0B\\u5F0F\\u78BC\\u7C21\\u6F54\\u3002",
        provider: "\\u4F9B\\u61C9\\u5546\\u8A2D\\u5B9A",
        currentProvider: "\\u76EE\\u524D\\u4F9B\\u61C9\\u5546",
        providerName: "\\u4F9B\\u61C9\\u5546\\u540D\\u7A31",
        apiUrl: "\\u5B8C\\u6574 API \\u4F4D\\u5740\\uFF08chat/completions\\uFF09",
        model: "\\u6A21\\u578B",
        responseMode: "\\u56DE\\u61C9\\u6A21\\u5F0F",
        jsonMode: "JSON \\u6A21\\u5F0F",
        promptJson: "Prompt JSON",
        apiKey: "API Key\\uFF08\\u7368\\u7ACB\\u5132\\u5B58\\uFF09",
        addProvider: "\\u65B0\\u589E\\u4F9B\\u61C9\\u5546",
        newProvider: "\\u65B0\\u4F9B\\u61C9\\u5546",
        saveProvider: "\\u5132\\u5B58\\u4F9B\\u61C9\\u5546\\u8A2D\\u5B9A",
        testConnection: "\\u6E2C\\u8A66\\u8655\\u7406\\u8207\\u5EF6\\u9072",
        testDescription: "\\u50B3\\u9001\\u4E00\\u689D\\u56FA\\u5B9A\\u7684\\u5408\\u6210\\u77ED\\u6587\\u672C\\uFF0C\\u9A57\\u8B49\\u4F9B\\u61C9\\u5546\\u80FD\\u56DE\\u50B3\\u53EF\\u89E3\\u6790\\u7684\\u5206\\u985E\\u8207\\u7FFB\\u8B6F JSON\\uFF1B\\u4E0D\\u6703\\u50B3\\u9001\\u7DB2\\u9801\\u5167\\u5BB9\\u3002\\u6E2C\\u8A66\\u53EF\\u80FD\\u7522\\u751F\\u6975\\u5C0F\\u8CBB\\u7528\\u3002",
        testing: "\\u6B63\\u5728\\u6E2C\\u8A66\\u5206\\u985E\\u3001\\u7FFB\\u8B6F\\u548C JSON \\u7D50\\u679C\\uFF0C\\u53EF\\u80FD\\u7522\\u751F\\u6975\\u5C0F\\u8CBB\\u7528\\u2026",
        processingOk: "\\u8655\\u7406\\u6B63\\u5E38",
        connectionOk: "\\u8655\\u7406\\u6B63\\u5E38",
        connectionFailed: "\\u8655\\u7406\\u6E2C\\u8A66\\u5931\\u6557",
        costControl: "\\u6210\\u672C\\u63A7\\u5236",
        maxBatchItems: "\\u55AE\\u6279\\u6700\\u591A\\u9805\\u76EE",
        maxBatchCharacters: "\\u55AE\\u6279\\u6700\\u591A\\u5B57\\u5143",
        maxOutputTokens: "\\u55AE\\u6279\\u9810\\u4F30\\u8F38\\u51FA Token \\u4E0A\\u9650",
        maxRequests: "\\u55AE\\u9801\\u9762\\u6700\\u591A\\u8ACB\\u6C42",
        maxPageCharacters: "\\u55AE\\u9801\\u9762\\u6700\\u591A\\u5B57\\u5143",
        dailyTokens: "\\u6BCF\\u65E5\\u4F30\\u7B97 Token \\u4E0A\\u9650",
        timeout: "\\u8ACB\\u6C42\\u903E\\u6642\\uFF08\\u79D2\\uFF09",
        resetDailyUsage: "\\u6E05\\u9664\\u4ECA\\u65E5\\u7528\\u91CF",
        restoreDefaults: "\\u6062\\u5FA9\\u9810\\u8A2D",
        siteStyles: "\\u7AD9\\u9EDE\\u7FFB\\u8B6F\\u504F\\u597D\\uFF08\\u53EF\\u9078\\uFF09",
        siteStylesDescription: "\\u9019\\u662F\\u53EF\\u9078\\u9805\\u3002\\u76F4\\u63A5\\u5132\\u5B58\\u5373\\u53EF\\u70BA\\u76EE\\u524D\\u7DB2\\u7AD9\\u4F7F\\u7528\\u9810\\u8A2D\\u4E2D\\u6587\\u8868\\u9054\\uFF1B\\u53EA\\u6709\\u9700\\u8981\\u56FA\\u5B9A\\u8853\\u8A9E\\u6216\\u7279\\u6B8A\\u8868\\u9054\\u6642\\u624D\\u586B\\u5BEB\\u66F4\\u591A\\u5167\\u5BB9\\u3002",
        styleLibrary: "\\u5DF2\\u5132\\u5B58\\u504F\\u597D",
        styleEditor: "\\u76EE\\u524D\\u7DB2\\u7AD9\\u504F\\u597D",
        searchStyles: "\\u641C\\u5C0B\\u7AD9\\u9EDE\\u504F\\u597D",
        sortStyles: "\\u6392\\u5E8F",
        sortRecent: "\\u6700\\u8FD1\\u66F4\\u65B0",
        sortOrigin: "\\u6309\\u7AD9\\u9EDE",
        styleOrigin: "\\u7AD9\\u9EDE Origin",
        stylePath: "\\u53EF\\u9078\\u8DEF\\u5F91\\u524D\\u7DB4",
        styleTone: "\\u8A9E\\u6C23",
        styleGlossary: "\\u8853\\u8A9E\\u8868\\u8207\\u5C08\\u6709\\u540D\\u8A5E",
        stylePunctuation: "\\u6A19\\u9EDE\\u7FD2\\u6163",
        styleInstructions: "\\u81EA\\u8A02\\u7FFB\\u8B6F\\u8981\\u6C42",
        advancedStyleSettings: "\\u9032\\u968E\\u5339\\u914D\\u8A2D\\u5B9A",
        defaultStyleTone: "\\u81EA\\u7136\\u3001\\u6E05\\u6670\\uFF0C\\u7B26\\u5408\\u4E2D\\u6587\\u7DB2\\u9801\\u8868\\u9054",
        defaultStylePunctuation: "\\u4F7F\\u7528\\u76EE\\u6A19\\u8A9E\\u8A00\\u7684\\u6A19\\u6E96\\u4E2D\\u6587\\u6A19\\u9EDE",
        useCurrentSite: "\\u4F7F\\u7528\\u76EE\\u524D\\u7DB2\\u7AD9",
        noStyles: "\\u6C92\\u6709\\u7B26\\u5408\\u7684\\u7AD9\\u9EDE\\u504F\\u597D",
        saveStyle: "\\u5132\\u5B58\\u76EE\\u524D\\u7DB2\\u7AD9\\u504F\\u597D",
        clearStyles: "\\u6E05\\u7A7A\\u5168\\u90E8\\u504F\\u597D"
      },
      about: "\\u95DC\\u65BC",
      aboutPanel: {
        title: "\\u95DC\\u65BC",
        version: "\\u7248\\u672C",
        projectUrl: "GitHub"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u6383\\u63CF",
      session: "\\u52D5\\u614B\\u6383\\u63CF",
      stagedCount: "\\u5DF2\\u66AB\\u5B58:",
      elementFinished: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      startSession: "\\u958B\\u59CB\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      stopSession: "\\u505C\\u6B62\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      finished: "\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      sessionStarted: "\\u52D5\\u614B\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      sessionInProgress: "\\u6383\\u63CF\\u9032\\u884C\\u4E2D...",
      truncationWarning: "\\u70BA\\u4FDD\\u6301\\u4ECB\\u9762\\u6D41\\u66A2\\uFF0C\\u6B64\\u8655\\u50C5\\u986F\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u532F\\u51FA\\u5F8C\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u5167\\u5BB9\\u3002"
    },
    slider: {
      adjustFrameSize: "\\u79FB\\u52D5\\u6ED1\\u584A\\u4EE5\\u8ABF\\u6574\\u6846\\u67B6\\u5927\\u5C0F",
      minLabel: "\\u6700\\u5C0F",
      maxLabel: "\\u6700\\u5927"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      aiTitle: "AI \\u7FFB\\u8B6F\\u7D50\\u679C",
      scanCountSession: "\\u5DF2\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      scanCountStatic: "\\u5171\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      scanCountAi: "AI \\u5DF2\\u6536\\u96C6 {{count}} \\u500B\\u9805\\u76EE",
      aiRunning: "\\u5DE5\\u4F5C\\u4E2D",
      aiPaused: "\\u5DF2\\u66AB\\u505C",
      aiStopped: "\\u5DF2\\u505C\\u6B62",
      aiProcessing: "\\u8655\\u7406\\u4E2D\\u2026",
      aiBudgetBlocked: "\\u50B3\\u9001\\u5DF2\\u66AB\\u505C\\uFF0C\\u9054\\u5230\\u9810\\u7B97\\u9650\\u5236",
      aiRequestError: "\\u8ACB\\u6C42\\u5931\\u6557",
      aiReviewItems: "\\u5F85\\u8907\\u6838\\u5167\\u5BB9",
      aiReviewRequired: "\\u9700\\u4EBA\\u5DE5\\u8907\\u6838",
      aiReviewReturnToEditor: "\\u8FD4\\u56DE\\u7DE8\\u8F2F\\u6846",
      aiReviewRemove: "\\u79FB\\u9664",
      aiRegexEditError: "\\u6B63\\u5247\\u898F\\u5247\\u9700\\u8907\\u6838",
      aiOutput: {
        text: "\\u7D14\\u6587\\u5B57",
        regex: "\\u6B63\\u5247\\u7FFB\\u8B6F"
      },
      aiCounts: {
        pending: "\\u5F85\\u8655\\u7406",
        translated: "\\u5DF2\\u7FFB\\u8B6F",
        textRules: "\\u7D14\\u6587\\u5B57\\u898F\\u5247",
        regexRules: "\\u6B63\\u5247\\u898F\\u5247",
        removed: "\\u79FB\\u9664",
        review: "\\u5F85\\u8907\\u6838",
        failed: "\\u5931\\u6557"
      },
      totalCharacters: "\\u7E3D\\u5B57\\u5143\\u6578",
      totalLines: "\\u7E3D\\u884C\\u6578",
      noSummary: "\\u7121\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u8907\\u88FD\\u5230\\u526A\\u8CBC\\u7C3F\\uFF01",
      settingsSaved: "\\u8A2D\\u5B9A\\u5DF2\\u5132\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u614B\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6C92\\u6709\\u53EF\\u8907\\u88FD\\u7684\\u5167\\u5BB9\\u3002",
      contentCleared: "\\u5167\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u6383\\u63CF\\u5931\\u6557\\u3002",
      elementScanStarted: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      elementScanPaused: "\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u66AB\\u505C\\u3002",
      elementScanResumed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6703\\u8A71\\u5DF2\\u5F9E\\u4E0A\\u4E00\\u9801\\u6062\\u5FA9\\u3002",
      elementScanContinued: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u7E7C\\u7E8C\\u3002",
      sessionScanStarted: "\\u52D5\\u614B\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      sessionScanPaused: "\\u52D5\\u614B\\u6383\\u63CF\\u5DF2\\u66AB\\u505C\\u3002",
      sessionScanResumed: "\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71\\u5DF2\\u5F9E\\u4E0A\\u4E00\\u9801\\u6062\\u5FA9\\u3002",
      sessionScanContinued: "\\u52D5\\u614B\\u6383\\u63CF\\u5DF2\\u7E7C\\u7E8C\\u3002",
      cspWorkerWarning: "\\u56E0\\u7DB2\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u63DB\\u81F3\\u76F8\\u5BB9\\u6383\\u63CF\\u6A21\\u5F0F\\u3002",
      scanModeConflict: "\\u8ACB\\u5148\\u505C\\u6B62\\u76EE\\u524D\\u6383\\u63CF\\u6A21\\u5F0F\\uFF0C\\u518D\\u555F\\u52D5\\u53E6\\u4E00\\u7A2E\\u6383\\u63CF\\u3002",
      aiScanStarted: "AI \\u7FFB\\u8B6F\\u5DF2\\u958B\\u59CB\\u3002",
      aiScanPaused: "AI \\u7FFB\\u8B6F\\u5DF2\\u66AB\\u505C\\u3002",
      aiScanContinued: "AI \\u7FFB\\u8B6F\\u5DF2\\u6062\\u5FA9\\u3002",
      aiScanStopped: "AI \\u7FFB\\u8B6F\\u5DF2\\u505C\\u6B62\\u3002",
      aiScanStartFailed: "AI \\u7FFB\\u8B6F\\u555F\\u52D5\\u5931\\u6557\\u3002",
      aiDisabled: "AI \\u529F\\u80FD\\u5DF2\\u95DC\\u9589\\uFF0C\\u8ACB\\u5148\\u5728\\u8A2D\\u5B9A\\u4E2D\\u555F\\u7528\\u3002",
      aiBatchCompleted: "AI \\u6279\\u6B21\\u8655\\u7406\\u5B8C\\u6210\\u3002",
      aiNothingPending: "\\u76EE\\u524D\\u6C92\\u6709\\u5F85\\u50B3\\u9001\\u5167\\u5BB9\\u3002",
      aiRequestFailed: "AI \\u8ACB\\u6C42\\u5931\\u6557\\uFF0C\\u9805\\u76EE\\u5DF2\\u9032\\u5165\\u5F85\\u8907\\u6838\\u3002",
      aiBudgetBlocked: "\\u5DF2\\u9054\\u5230\\u6210\\u672C\\u9650\\u5236\\uFF1B\\u4ECD\\u6703\\u7E7C\\u7E8C\\u5728\\u672C\\u6A5F\\u6536\\u96C6\\u3002",
      aiProviderRequired: "\\u81F3\\u5C11\\u9700\\u8981\\u4FDD\\u7559\\u4E00\\u500B\\u4F9B\\u61C9\\u5546\\u3002",
      aiProviderSaved: "\\u4F9B\\u61C9\\u5546\\u8A2D\\u5B9A\\u5DF2\\u5132\\u5B58\\u3002",
      aiDailyUsageReset: "\\u4ECA\\u65E5\\u4F30\\u7B97\\u7528\\u91CF\\u5DF2\\u6E05\\u9664\\u3002",
      aiDefaultsRestored: "\\u6210\\u672C\\u63A7\\u5236\\u5DF2\\u6062\\u5FA9\\u9810\\u8A2D\\u503C\\u3002",
      aiStyleOriginRequired: "\\u7AD9\\u9EDE Origin \\u4E0D\\u53EF\\u70BA\\u7A7A\\u3002",
      aiStyleSaved: "\\u7AD9\\u9EDE\\u7FFB\\u8B6F\\u504F\\u597D\\u5DF2\\u5132\\u5B58\\u3002"
    },
    placeholders: {
      click: "\\u9EDE\\u64CA ",
      dynamicScan: "[\\u52D5\\u614B\\u6383\\u63CF]",
      startNewScanSession: " \\u958B\\u59CB\\u65B0\\u7684\\u6383\\u63CF\\u6703\\u8A71",
      staticScan: "[\\u975C\\u614B\\u6383\\u63CF]",
      performOneTimeScan: " \\u57F7\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u78BA\\u5B9A\\u8981\\u6E05\\u9664\\u5167\\u5BB9\\u55CE\\uFF1F\\u6B64\\u64CD\\u4F5C\\u7121\\u6CD5\\u64A4\\u92B7\\u3002",
      deleteProvider: "\\u78BA\\u5B9A\\u522A\\u9664\\u76EE\\u524D\\u4F9B\\u61C9\\u5546\\u8A2D\\u5B9A\\u55CE\\uFF1F",
      deleteStyle: "\\u78BA\\u5B9A\\u522A\\u9664\\u76EE\\u524D\\u7AD9\\u9EDE\\u7FFB\\u8B6F\\u504F\\u597D\\u55CE\\uFF1F",
      clearStyles: "\\u78BA\\u5B9A\\u6E05\\u7A7A\\u5168\\u90E8\\u7AD9\\u9EDE\\u7FFB\\u8B6F\\u504F\\u597D\\u55CE\\uFF1F"
    },
    ai: {
      actions: {
        submitPending: "\\u63D0\\u4EA4\\u5F85\\u8655\\u7406",
        retryReview: "\\u91CD\\u65B0\\u8655\\u7406"
      }
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      ai_scan: "AI \\u7FFB\\u8B6F\\uFF08Beta\\uFF09",
      ai_scan_stop: "\\u505C\\u6B62 AI \\u7FFB\\u8B6F",
      ai_disabled: "AI \\u529F\\u80FD\\u5DF2\\u95DC\\u9589",
      dynamic_scan: "\\u52D5\\u614B\\u6383\\u63CF",
      static_scan: "\\u975C\\u614B\\u6383\\u63CF",
      element_scan: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF",
      pauseElementScan: "\\u66AB\\u505C\\u5143\\u7D20\\u6383\\u63CF",
      resumeElementScan: "\\u6062\\u5FA9\\u5143\\u7D20\\u6383\\u63CF",
      pauseSessionScan: "\\u66AB\\u505C\\u52D5\\u614B\\u6383\\u63CF",
      resumeSessionScan: "\\u6062\\u5FA9\\u52D5\\u614B\\u6383\\u63CF",
      pauseAiScan: "\\u66AB\\u505C AI \\u7FFB\\u8B6F",
      resumeAiScan: "\\u6062\\u5FA9 AI \\u7FFB\\u8B6F",
      tooltipHelp: "\\u5E6B\\u52A9",
      persistData: {
        title: "\\u8CC7\\u6599\\u6301\\u4E45\\u5316\\u8AAA\\u660E",
        text: {
          sessionScan: "\\u958B\\u555F\\u5F8C\\uFF0C\\u7576\\u9EDE\\u64CA\\u93C8\\u63A5\\u8DF3\\u8F49\\u5230\\u65B0\\u9801\\u9762\\u6642\\uFF0C\\u6703\\u81EA\\u52D5\\u6062\\u5FA9\\u4E26\\u7E7C\\u7E8C\\u7D2F\\u52A0\\u4E0A\\u4E00\\u9801\\u7684\\u6383\\u63CF\\u7D50\\u679C\\u3002\\u95DC\\u9589\\u6B64\\u9078\\u9805\\uFF0C\\u5247\\u53EA\\u6062\\u5FA9\\u6383\\u63CF\\u6A21\\u5F0F\\uFF0C\\u4F46\\u6703\\u958B\\u59CB\\u4E00\\u6B21\\u5168\\u65B0\\u7684\\u6383\\u63CF\\u3002",
          elementScan: "\\u958B\\u555F\\u5F8C\\uFF0C\\u7576\\u9EDE\\u64CA\\u93C8\\u63A5\\u8DF3\\u8F49\\u5230\\u65B0\\u9801\\u9762\\u6642\\uFF0C\\u6703\\u81EA\\u52D5\\u6062\\u5FA9\\u7576\\u524D\\u5DF2\\u66AB\\u5B58\\u7684\\u6240\\u6709\\u6587\\u672C\\u3002\\u95DC\\u9589\\u6B64\\u9078\\u9805\\uFF0C\\u5247\\u53EA\\u6062\\u5FA9\\u6383\\u63CF\\u6A21\\u5F0F\\uFF0C\\u4F46\\u66AB\\u5B58\\u5340\\u6703\\u662F\\u7A7A\\u7684\\u3002"
        }
      },
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9805\\u6383\\u63CF\\u6B63\\u5728\\u9032\\u884C\\u4E2D",
        ai_scan_active: "AI \\u5DE5\\u4F5C\\u4E2D\\uFF0C\\u4E00\\u822C\\u6383\\u63CF\\u5DF2\\u505C\\u7528"
      },
      filters: {
        title: "\\u5167\\u5BB9\\u904E\\u6FFE\\u5668\\u8AAA\\u660E",
        numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6578\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6578\\u9EDE(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8CA8\\u5E63\\u7B26\\u865F($, \\u20AC, \\xA3, \\xA5)\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6F22\\u5B57\\u548C\\u7A7A\\u683C\\u7D44\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6A19\\u9EDE\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        contains_chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u500B\\u6F22\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u7121\\u8AD6\\u5176\\u4ED6\\u5B57\\u5143\\u662F\\u4EC0\\u9EBC\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C07\\u88AB\\u904E\\u6FFE)',
        emoji_only: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u500B\\u6216\\u591A\\u500B\\u8868\\u60C5\\u7B26\\u865F\\u53CA\\u7A7A\\u683C\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u7A2E\\u6A19\\u9EDE\\u548C\\u7B26\\u865F\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8B6F\\u7684\\u5E38\\u898BUI\\u8853\\u8A9E\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u55AE\\u500B</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7D44\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "A" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "b" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "AB" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        repeating_chars: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u540C\\u4E00\\u500B\\u5B57\\u5143</strong>\\u9023\\u7E8C\\u91CD\\u89072\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u898F\\u5247\\u5617\\u8A66\\u8B58\\u5225\\u4E26\\u904E\\u6FFE\\u6389\\u985E\\u4F3C\\u4F5C\\u696D\\u7CFB\\u7D71\\u6A94\\u6848\\u8DEF\\u5F91\\u4E14<strong>\\u5305\\u542B\\u6A94\\u6848\\u526F\\u6A94\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7DB2\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684CSS\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u5F8C\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7B26\\u5408\\u6A19\\u6E96\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u7528\\u552F\\u4E00\\u8B58\\u5225\\u78BC (UUID)\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684Git\\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C\\uFF08\\u9577\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u7368\\u7ACB\\u7684\\u7DB2\\u5740</strong>\\u3002\\u5B83\\u8A2D\\u8A08\\u5F97\\u6BD4\\u8F03\\u56B4\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u9023\\u7D50\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u898B\\u901F\\u8A18\\u5F8C\\u7DB4</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u842C(m)\\u6216\\u5341\\u5104(b)\\u7684\\u6578\\u5B57\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u986F\\u793A\\u8A2D\\u5B9A\\u8AAA\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7DB2\\u9801\\u53F3\\u4E0B\\u89D2\\u986F\\u793A<strong>\\u61F8\\u6D6E\\u64CD\\u4F5C\\u6309\\u9215(FAB)</strong>\\u3002\\u9019\\u662F\\u9032\\u884C\\u975C\\u614B\\u548C\\u52D5\\u614B\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u9215\\uFF0C\\u53EF\\u4EE5\\u900F\\u904E\\u6CB9\\u7334\\u64F4\\u5145\\u5957\\u4EF6\\u9078\\u55AE\\u4E2D\\u7684\\u8A2D\\u5B9A\\u9762\\u677F\\u91CD\\u65B0\\u555F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u555F\\u7528\\u5F8C\\uFF0C\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6A19\\u984C\\u5217\\u5C07<strong>\\u5373\\u6642\\u986F\\u793A</strong>\\u76EE\\u524D\\u6383\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u7E3D\\u6587\\u672C\\u9805\\u76EE\\u6578\\u3002\\u9019\\u5C0D\\u65BC\\u76E3\\u63A7\\u9577\\u6642\\u9593\\u57F7\\u884C\\u7684<strong>\\u52D5\\u614B\\u6383\\u63CF</strong>\\u7684\\u9032\\u5EA6\\u7279\\u5225\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6587\\u672C\\u5340\\u57DF\\u5DE6\\u5074\\u986F\\u793A\\u884C\\u865F\\u3002\\u7576\\u60A8\\u9700\\u8981\\u8A0E\\u8AD6\\u6216\\u8A18\\u9304\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u6642\\uFF0C\\u9019\\u63D0\\u4F9B\\u4E86\\u4E00\\u500B<strong>\\u7CBE\\u78BA\\u7684\\u53C3\\u8003\\u9EDE</strong>\\u3002",
        show_statistics: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u5E95\\u90E8\\u7684\\u72C0\\u614B\\u5217\\u4E2D\\u986F\\u793A\\u6709\\u95DC\\u63D0\\u53D6\\u5167\\u5BB9\\u7684<strong>\\u5373\\u6642\\u7D71\\u8A08\\u6578\\u64DA</strong>\\uFF0C\\u5305\\u62EC<strong>\\u7E3D\\u884C\\u6578</strong>\\u548C<strong>\\u7E3D\\u5B57\\u5143\\u6578</strong>\\u3002\\u9019\\u6709\\u52A9\\u65BC\\u60A8\\u5FEB\\u901F\\u8A55\\u4F30\\u5167\\u5BB9\\u7684\\u9AD4\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7D50\\u679C\\u8996\\u7A97\\u4E2D\\u9577\\u6587\\u672C\\u884C\\u7684\\u986F\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u555F\\u7528:</strong> \\u9577\\u884C\\u5C07\\u81EA\\u52D5\\u63DB\\u884C\\u4EE5\\u9069\\u61C9\\u8996\\u7A97\\u5BEC\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u9577\\u884C\\u5C07\\u4FDD\\u6301\\u5728\\u55AE\\u884C\\uFF0C\\u4E26\\u51FA\\u73FE\\u6C34\\u5E73\\u6372\\u8EF8\\u3002",
        text_truncation_limit: "\\u9019\\u662F\\u4E00\\u500B<strong>\\u6548\\u80FD\\u512A\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u8173\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6975\\u9577\\u7684\\u55AE\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7DE8\\u78BC\\u7684\\u5716\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u6703\\u5C0E\\u81F4\\u700F\\u89BD\\u5668<strong>\\u5361\\u9813\\u6216\\u7121\\u56DE\\u61C9</strong>\\u3002<br><br>\\u6B64\\u8A2D\\u5B9A\\u6703\\u622A\\u65B7\\u4EFB\\u4F55\\u8D85\\u904E\\u6307\\u5B9A\\u9577\\u5EA6\\u7684\\u55AE\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u78BA\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u66A2\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u9019\\u50C5\\u5F71\\u97FF\\u986F\\u793A\\uFF1B\\u532F\\u51FA\\u7684\\u6A94\\u6848\\u4ECD\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65B7\\u7684\\u5167\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9032\\u968E\\u8A2D\\u5B9A\\u8AAA\\u660E",
        enable_debug_logging: "\\u555F\\u7528\\u5F8C\\uFF0C\\u8173\\u672C\\u6703\\u5C07\\u8A73\\u7D30\\u7684\\u5167\\u90E8\\u72C0\\u614B\\u3001\\u57F7\\u884C\\u6B65\\u9A5F\\u548C\\u932F\\u8AA4\\u8A0A\\u606F\\u8F38\\u51FA\\u5230\\u700F\\u89BD\\u5668\\u7684<strong>\\u958B\\u767C\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u958B\\u555F\\uFF09\\u3002\\u9019\\u4E3B\\u8981\\u4F9B\\u958B\\u767C\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8A73\\u7D30\\u932F\\u8AA4\\u5831\\u544A\\u7684\\u4F7F\\u7528\\u8005\\u4F7F\\u7528\\u3002"
      },
      output: {
        include_brackets: "\\u63A7\\u5236\\u8F38\\u51FA\\u6587\\u5B57\\u662F\\u5426\\u5305\\u542B\\u683C\\u5F0F\\u7684\\u9996\\u5C3E\\u7B26\\u865F\\uFF08\\u5982\\u9663\\u5217\\u683C\\u5F0F\\u7684 <code>[</code> \\u548C <code>]</code>\\uFF0C\\u6216\\u7269\\u4EF6\\u683C\\u5F0F\\u7684 <code>{</code> \\u548C <code>}</code>\\uFF09\\u3002<br><br><strong>\\u958B\\u555F\\u6642:</strong> \\u5305\\u542B\\u5B8C\\u6574\\u7684\\u683C\\u5F0F\\u7D50\\u69CB\\u3002<br><strong>\\u95DC\\u9589\\u6642:</strong> \\u50C5\\u8F38\\u51FA\\u5167\\u5BB9\\u884C\\uFF0C\\u4E0D\\u542B\\u9996\\u5C3E\\u7B26\\u865F\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u8173\\u672C-\\u5075\\u932F]",
      language: {
        switched: "\\u8A9E\\u8A00\\u5DF2\\u5207\\u63DB\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8A9E\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8A2D\\u5B9A '{{key}}' \\u5DF2\\u5F9E '{{oldValue}}' \\u8B8A\\u66F4\\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u555F\\u7528",
          disabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u8A2D\\u5B9A\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u8A2D\\u5B9A\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u5132\\u5B58\\u8A2D\\u5B9A..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u5132\\u5B58\\u7684\\u8A2D\\u5B9A\\u6642\\u51FA\\u932F\\uFF1A",
        invalidObject: "\\u8A66\\u5716\\u70BA\\u8A2D\\u5B9A\\u5132\\u5B58\\u4E00\\u500B\\u7121\\u6548\\u7269\\u4EF6\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u904E\\u6FFE: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u6B63\\u5728\\u4E3B\\u7DDA\\u7A0B\\u4E2D\\u958B\\u59CB\\u8655\\u7406...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u6383\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u958B\\u59CB\\u57F7\\u884C\\uFF0C\\u5617\\u8A66\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u8655\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u689D\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u6383\\u63CF Worker] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002\\u6B63\\u5728\\u767C\\u56DE\\u4E3B\\u7DDA\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u6383\\u63CF] Web Worker \\u5DF2\\u5EFA\\u7ACB\\uFF0C\\u6B63\\u5728\\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u9032\\u884C\\u8655\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          cspBlocked: "[\\u5FEB\\u901F\\u6383\\u63CF] CSP\\u6AA2\\u67E5\\u5931\\u6557\\uFF0C\\u4E0D\\u5141\\u8A31\\u5EFA\\u7ACBWorker\\u3002"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u52D5\\u614B\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        resuming: "\\u6B63\\u5728\\u5F9E\\u4E0A\\u4E00\\u9801\\u6062\\u5FA9\\u52D5\\u614B\\u6383\\u63CF...",
        domObserver: {
          stopped: "[\\u52D5\\u614B\\u6383\\u63CF] \\u5DF2\\u505C\\u6B62\\u76E3\\u807D DOM \\u8B8A\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u52D5\\u614B\\u6383\\u63CF - \\u5099\\u9078] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u52D5\\u614B\\u6383\\u63CF - \\u5099\\u9078] \\u8CC7\\u6599\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u52D5\\u614B\\u6383\\u63CF Worker]",
          starting: "\\u52D5\\u614B\\u6383\\u63CF\\uFF1A\\u6B63\\u5728\\u5617\\u8A66\\u555F\\u52D5 Web Worker...",
          initFailed: "[\\u52D5\\u614B\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u52D5\\u614B\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          initialized: "[\\u52D5\\u614B\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u767C\\u9001 {{count}} \\u689D\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u958B\\u59CB\\u6703\\u8A71\\u3002",
          initSyncError: "[\\u52D5\\u614B\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          clearCommandSent: "[\\u52D5\\u614B\\u6383\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u767C\\u9001\\u81F3 worker\\u3002",
          cspBlocked: "[\\u52D5\\u614B\\u6383\\u63CF] CSP\\u6AA2\\u67E5\\u5931\\u6557\\uFF0C\\u4E0D\\u5141\\u8A31\\u5EFA\\u7ACBWorker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u8907\\u88FD\\u4E86 {{count}} \\u500B\\u5B57\\u5143\\u3002",
          nothingToCopy: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u4F46\\u6C92\\u6709\\u5167\\u5BB9\\u53EF\\u8907\\u88FD\\u6216\\u6309\\u9215\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u52D5\\u614B\\u6383\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8ABF\\u7528\\u56DE\\u547C..."
          },
          quickScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u5FEB\\u901F\\u6383\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u4F7F\\u7528\\u8005\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u4E3B\\u6A21\\u614B\\u6846...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u4E3B\\u6A21\\u614B\\u6846...",
          scanFailed: "\\u975C\\u614B\\u6383\\u63CF\\u5931\\u6557: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5167\\u5BB9\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\u3002",
          clearingContent: "\\u6B63\\u5728\\u6E05\\u9664\\u6A21\\u5F0F\\u7684\\u5167\\u5BB9: {{mode}}",
          footerCleanedUp: "\\u6A21\\u614B\\u6846\\u9801\\u8173\\u5DF2\\u6E05\\u7406\\u3002",
          destroyed: "\\u4E3B\\u6A21\\u614B\\u6846\\u5DF2\\u92B7\\u6BC0\\u3002"
        },
        helpIcon: {
          clicked: "\\u9EDE\\u64CA\\u4E86\\u5E6B\\u52A9\\u5716\\u793A\\uFF0C\\u986F\\u793A\\u5167\\u5BB9\\u9375\\uFF1A{{contentKey}}"
        }
      },
      exporter: {
        buttonClicked: "\\u532F\\u51FA\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u4E26\\u7522\\u751FCSV\\u6642\\u51FA\\u932F: {{error}}",
        fileExported: "\\u6A94\\u6848\\u5DF2\\u532F\\u51FA: {{filename}}",
        noContent: "\\u7121\\u5167\\u5BB9\\u53EF\\u532F\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u532F\\u51FA\\u683C\\u5F0F: {{format}}",
        uiCleanedUp: "\\u532F\\u51FAUI\\u5DF2\\u6E05\\u7406\\u3002",
        exportingUserContent: "\\u6B63\\u5728\\u532F\\u51FAUI\\u4E2D\\u4F7F\\u7528\\u8005\\u7DE8\\u8F2F\\u7684\\u5167\\u5BB9\\u3002",
        exportingRawData: "\\u6B63\\u5728\\u532F\\u51FA\\u539F\\u59CB\\u8CC7\\u6599\\uFF08UI\\u5167\\u5BB9\\u7121\\u6548\\u6216\\u88AB\\u622A\\u65B7\\uFF09\\u3002"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8ACB\\u6C42\\u52D5\\u614B\\u6383\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        exportingQuickScanData: "\\u6B63\\u5728\\u532F\\u51FA\\u5FEB\\u901F\\u6383\\u63CF\\u6A21\\u5F0F\\u8A18\\u61B6\\u9AD4\\u4E2D\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        inIframe: "\\u8173\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u904E\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u8173\\u672C\\u521D\\u59CB\\u5316\\u958B\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8A2D\\u5B9A\\u5DF2\\u8F09\\u5165:",
        resumeFailed: "\\u6062\\u5FA9\\u6703\\u8A71\\u5931\\u6557"
      },
      dom: {
        ttpCreationError: "\\u5EFA\\u7ACB Trusted Type \\u7B56\\u7565\\u5931\\u6557:",
        svgParseError: "SVG \\u5B57\\u4E32\\u7121\\u6548\\u6216\\u89E3\\u6790\\u5931\\u6557:"
      },
      persistence: {
        saveBlocked: "\\u5132\\u5B58\\u88AB\\u963B\\u6B62\\uFF0C\\u56E0\\u70BA\\u6301\\u4E45\\u5316\\u5DF2\\u88AB\\u7981\\u7528\\u3002",
        staleSession: "\\u767C\\u73FE\\u904E\\u671F\\u7684\\u6703\\u8A71\\uFF0C\\u5DF2\\u5FFD\\u7565\\u3002",
        parseError: "\\u89E3\\u6790\\u5DF2\\u5132\\u5B58\\u7684\\u6703\\u8A71\\u5931\\u6557\\uFF0C\\u6B63\\u5728\\u6E05\\u9664\\u3002"
      },
      worker: {
        sessionStarted: "\\u6703\\u8A71\\u5DF2\\u958B\\u59CB\\uFF0C\\u521D\\u59CB\\u5305\\u542B {{count}} \\u500B\\u9805\\u76EE\\u3002",
        sessionCleared: "\\u6703\\u8A71\\u5DF2\\u6E05\\u9664\\u3002"
      },
      elementScan: {
        starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
        stopping: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u65B0\\u589E\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u79FB\\u9664\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        stateReset: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u72C0\\u614B\\u5DF2\\u91CD\\u8A2D\\u3002",
        resuming: "\\u6B63\\u5728\\u5F9E\\u4E0A\\u4E00\\u9801\\u6062\\u5FA9\\u5143\\u7D20\\u6383\\u63CF...",
        restored: "\\u5DF2\\u6062\\u5FA9 {{count}} \\u500B\\u66AB\\u5B58\\u9805\\u76EE\\u3002",
        skipRestore: "\\u6839\\u64DA\\u8A2D\\u5B9A\\u8DF3\\u904E\\u8CC7\\u6599\\u6062\\u5FA9\\u3002",
        startingNewSession: "\\u958B\\u59CB\\u65B0\\u7684\\u5143\\u7D20\\u6383\\u63CF\\u6703\\u8A71\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9078\\u64C7\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u61F8\\u505C\\u65BC <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u9375\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        escapeIgnoredForSettings: "\\u6309\\u4E0B\\u4E86Escape\\u9375\\uFF0C\\u4F46\\u56E0\\u8A2D\\u5B9A\\u9762\\u677F\\u958B\\u555F\\u800C\\u88AB\\u5FFD\\u7565\\u3002",
        escapeIgnoredForModal: "\\u6309\\u4E0B\\u4E86Escape\\u9375\\uFF0C\\u4F46\\u56E0\\u6A21\\u614B\\u6846\\u6216\\u63D0\\u793A\\u7A97\\u53E3\\u958B\\u555F\\u800C\\u88AB\\u5FFD\\u7565\\u3002",
        escapePressedInAdjust: "\\u5728\\u8ABF\\u6574\\u6A21\\u5F0F\\u4E0B\\u6309\\u4E0B\\u4E86Escape\\u9375\\uFF0C\\u8FD4\\u56DE\\u91CD\\u65B0\\u9078\\u64C7\\u6A21\\u5F0F\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u9032\\u5165\\u8ABF\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C64\\u7D1A\\u8DEF\\u5F91\\u5DF2\\u69CB\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u70BA\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8ABF\\u6574\\u9078\\u64C7\\u5C64\\u7D1A\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9078\\u64C7\\u5DF2\\u78BA\\u8A8D\\uFF0C\\u6B63\\u5728\\u5F9E <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u66AB\\u5B58\\u3002\\u7E3D\\u6578\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u78BA\\u8A8D\\u9078\\u64C7\\u3002\\u6B63\\u5728\\u8655\\u7406 {{count}} \\u500B\\u5DF2\\u66AB\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u5F9E\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u689D\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u78BA\\u8A8D\\u5931\\u6557\\uFF1A\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u76EE\\u6A19\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u5075\\u6E2C\\u5230\\u53F3\\u9375\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u8655\\u7406\\u904E\\u7A0B\\u4E2D\\u767C\\u751F\\u932F\\u8AA4: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u70BA {{count}} \\u500B\\u7236\\u5143\\u7D20\\u65B0\\u589E\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u6B63\\u5728\\u555F\\u52D5...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002",
          initFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u700F\\u89BD\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u932F\\u8AA4: {{error}}",
          cspBlocked: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u7684CSP\\u6AA2\\u67E5\\u5931\\u6557\\uFF0C\\u4E0D\\u5141\\u8A31\\u5EFA\\u7ACBWorker\\u3002",
          attemping: "\\u6B63\\u5728\\u5617\\u8A66\\u4F7F\\u7528 Web Worker \\u9032\\u884C\\u904E\\u6FFE...",
          fallback: "\\u5DF2\\u5207\\u63DB\\u5230\\u4E3B\\u57F7\\u884C\\u7DD2\\u9032\\u884C\\u904E\\u6FFE\\u3002",
          cspHint: "\\u9019\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565\\uFF08CSP\\uFF09\\u5C0E\\u81F4\\u7684\\u3002"
        },
        switchToFallback: "\\u6B63\\u5728\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u300C\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u300D\\u5099\\u7528\\u6A21\\u5F0F\\u5931\\u6557\\uFF1A{{error}}",
        stagingStarted: "\\u958B\\u59CB\\u66AB\\u5B58\\u5143\\u7D20\\uFF1A<{{tagName}}>",
        stagedNothingNew: "\\u672A\\u80FD\\u5F9E\\u6B64\\u5143\\u7D20\\u4E2D\\u66AB\\u5B58\\u4EFB\\u4F55\\u65B0\\u7684\\u552F\\u4E00\\u6587\\u672C\\u3002",
        stagingFinished: "\\u66AB\\u5B58\\u64CD\\u4F5C\\u5DF2\\u5B8C\\u6210\\u3002",
        confirmStarted: "\\u78BA\\u8A8D\\u6D41\\u7A0B\\u5DF2\\u958B\\u59CB...",
        confirmFinished: "\\u78BA\\u8A8D\\u6D41\\u7A0B\\u5DF2\\u6210\\u529F\\u5B8C\\u6210\\u3002",
        confirmFailed: "\\u78BA\\u8A8D\\u6D41\\u7A0B\\u5931\\u6557\\u3002\\u932F\\u8AA4\\uFF1A{{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u9996\\u6B21\\u5EFA\\u7ACB\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u70BA <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u5EFA\\u7ACB\\u8ABF\\u6574\\u5DE5\\u5177\\u5217\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u5217\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6ED1\\u687F\\u5C64\\u7D1A\\u8B8A\\u70BA {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u91CD\\u65B0\\u9078\\u64C7\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        stageClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u66AB\\u5B58\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u6383\\u89C0UI\\uFF1A\\u300C\\u53D6\\u6D88\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u78BA\\u8A8D\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        dragStarted: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u958B\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u7D50\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u5217\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u547C\\u51FD\\u6578\\u51FA\\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\\u5EFA\\u7ACB Trusted Types worker \\u7B56\\u7565\\u5931\\u6557:",
        htmlPolicyError: "\\u5EFA\\u7ACB Trusted Types HTML \\u7B56\\u7565\\u5931\\u6557:",
        defaultWorkerPolicyWarning: "\\u7528\\u65BC worker URL \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u65BC HTML \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u7A0B",
      elementScan: '<p><strong>\\u529F\\u80FD\\u4ECB\\u7D39:</strong></p><p>\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5141\\u8A31\\u60A8\\u7CBE\\u78BA\\u5730\\u9078\\u64C7\\u7DB2\\u9801\\u4E0A\\u7684\\u4E00\\u500B\\u6216\\u591A\\u500B\\u5340\\u57DF\\uFF08\\u4F8B\\u5982\\u4E00\\u500B\\u6BB5\\u843D\\u3001\\u4E00\\u500B\\u5217\\u8868\\u3001\\u4E00\\u500B\\u5074\\u908A\\u6B04\\uFF09\\uFF0C\\u4E26\\u50C5\\u5F9E\\u9019\\u4E9B\\u5340\\u57DF\\u4E2D\\u63D0\\u53D6\\u6587\\u672C\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ol><li><strong>\\u555F\\u52D5:</strong> \\u9EDE\\u64CA\\u61F8\\u6D6E\\u6309\\u9215\\u4E2D\\u7684\\u300C\\u9078\\u53D6\\u5143\\u7D20\\u300D\\u5716\\u6A19 <span class="help-icon-placeholder element-scan-icon"></span> \\u555F\\u52D5\\u6383\\u63CF\\u6A21\\u5F0F\\u3002</li><li><strong>\\u9078\\u64C7:</strong> \\u79FB\\u52D5\\u9F20\\u6A19\\uFF0C\\u60A8\\u60F3\\u6383\\u63CF\\u7684\\u5340\\u57DF\\u6703\\u986F\\u793A\\u9AD8\\u4EAE\\u6846\\u3002\\u55AE\\u64CA\\u4EE5\\u9078\\u5B9A\\u3002</li><li><strong>\\u8ABF\\u6574:</strong> \\u9078\\u5B9A\\u5F8C\\u6703\\u51FA\\u73FE\\u5DE5\\u5177\\u6B04\\u3002\\u60A8\\u53EF\\u4EE5\\u4F7F\\u7528<strong>\\u6ED1\\u584A</strong>\\u4F86\\u64F4\\u5927\\u6216\\u7E2E\\u5C0F\\u9078\\u64C7\\u7BC4\\u570D\\u3002</li><li><strong>\\u66AB\\u5B58:</strong> \\u5982\\u679C\\u60A8\\u60F3\\u9078\\u64C7\\u591A\\u500B\\u4E0D\\u76F8\\u95DC\\u7684\\u5340\\u57DF\\uFF0C\\u53EF\\u4EE5\\u9EDE\\u64CA<span class="action-key">\\u66AB\\u5B58</span>\\u6309\\u9215\\u4FDD\\u5B58\\u7576\\u524D\\u9078\\u64C7\\uFF0C\\u7136\\u5F8C\\u7E7C\\u7E8C\\u9078\\u64C7\\u5176\\u4ED6\\u5340\\u57DF\\u3002</li><li><strong>\\u78BA\\u8A8D:</strong> \\u5B8C\\u6210\\u6240\\u6709\\u9078\\u64C7\\u5F8C\\uFF0C\\u9EDE\\u64CA<span class="action-key">\\u78BA\\u8A8D</span>\\u6309\\u9215\\uFF0C\\u7CFB\\u7D71\\u5C07\\u958B\\u59CB\\u5F9E\\u60A8\\u9078\\u64C7\\u7684\\u6240\\u6709\\u5340\\u57DF\\u4E2D\\u63D0\\u53D6\\u6587\\u672C\\u3002</li></ol><p><strong>\\u5982\\u4F55\\u9000\\u51FA:</strong></p><ul><li>\\u5728\\u9078\\u64C7\\u904E\\u7A0B\\u4E2D\\uFF08\\u51FA\\u73FE\\u9AD8\\u4EAE\\u6846\\u6642\\uFF09\\uFF0C\\u5728\\u9801\\u9762\\u4EFB\\u610F\\u4F4D\\u7F6E<strong>\\u53F3\\u9375\\u55AE\\u64CA</strong>\\u3002</li><li>\\u5728\\u4EFB\\u4F55\\u6642\\u5019\\uFF0C\\u6309\\u4E0B <kbd>ESC</kbd> \\u9375\\u3002</li><li>\\u5728\\u4EFB\\u4F55\\u6642\\u5019\\uFF0C\\u518D\\u6B21\\u9EDE\\u64CA\\u300C\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u300D\\u5716\\u6A19\\u3002</li></ul>',
      sessionScanTitle: "\\u52D5\\u614B\\u6383\\u63CF\\u6559\\u7A0B",
      sessionScan: '<p><strong>\\u529F\\u80FD\\u4ECB\\u7D39:</strong></p><p>\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u6301\\u7E8C\\u76E3\\u63A7\\u4E26\\u81EA\\u52D5\\u8A18\\u9304\\u7DB2\\u9801\\u4E0A\\u6240\\u6709\\u52D5\\u614B\\u52A0\\u8F09\\u6216\\u8B8A\\u5316\\u7684\\u6587\\u672C\\uFF0C\\u7279\\u5225\\u9069\\u7528\\u65BC\\u6293\\u53D6\\u5BE6\\u6642\\u804A\\u5929\\u3001\\u6EFE\\u52D5\\u52A0\\u8F09\\u5167\\u5BB9\\u6216\\u901A\\u77E5\\u7B49\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ul><li><strong>\\u958B\\u59CB\\u6383\\u63CF:</strong> \\u9EDE\\u64CA\\u61F8\\u6D6E\\u6309\\u9215\\u4E2D\\u7684\\u300C\\u52D5\\u614B\\u6383\\u63CF\\u300D\\u5716\\u6A19 <span class="help-icon-placeholder dynamic-scan-icon"></span>\\uFF0C\\u6383\\u63CF\\u7ACB\\u5373\\u958B\\u59CB\\u3002</li><li><strong>\\u505C\\u6B62\\u6383\\u63CF:</strong> \\u518D\\u6B21\\u9EDE\\u64CA\\u8A72\\u5716\\u6A19 <span class="help-icon-placeholder stop-icon"></span>\\uFF0C\\u5373\\u53EF\\u505C\\u6B62\\u6383\\u63CF\\u3002</li><li><strong>\\u67E5\\u770B\\u7D50\\u679C:</strong> \\u505C\\u6B62\\u5F8C\\uFF0C\\u9EDE\\u64CA\\u4E3B\\u61F8\\u6D6E\\u6309\\u9215 <span class="help-icon-placeholder summary-icon"></span> \\u6253\\u958B\\u7D50\\u679C\\u7A97\\u53E3\\u3002</li></ul><p><strong>\\u5982\\u4F55\\u9000\\u51FA:</strong></p><ul><li>\\u5728\\u6383\\u63CF\\u904E\\u7A0B\\u4E2D\\uFF0C\\u518D\\u6B21\\u9EDE\\u64CA\\u300C\\u52D5\\u614B\\u6383\\u63CF\\u300D\\u5716\\u6A19\\u3002</li><li>\\u5728\\u6383\\u63CF\\u904E\\u7A0B\\u4E2D\\uFF0C\\u96A8\\u6642\\u6309\\u4E0B <kbd>ESC</kbd> \\u9375\\u53EF\\u5FEB\\u901F\\u505C\\u6B62\\u3002</li></ul>',
      aiScanTitle: "AI \\u7FFB\\u8B6F\\u8AAA\\u660E",
      aiScan: "<p><strong>\\u529F\\u80FD\\u4ECB\\u7D39:</strong></p><p>AI \\u7FFB\\u8B6F\\u6703\\u6301\\u7E8C\\u6536\\u96C6\\u7DB2\\u9801\\u4E2D\\u7684\\u5019\\u9078\\u6587\\u672C\\uFF0C\\u4E26\\u4F9D\\u8A2D\\u5B9A\\u81EA\\u52D5\\u8655\\u7406\\u6216\\u7B49\\u5F85\\u624B\\u52D5\\u63D0\\u4EA4\\u3002\\u9802\\u90E8\\u6578\\u5B57\\u8868\\u793A\\u672C\\u6B21\\u5DF2\\u6536\\u96C6\\u7684\\u5019\\u9078\\u9805\\u76EE\\u6578\\u91CF\\u3002</p><p><strong>\\u5982\\u4F55\\u4F7F\\u7528:</strong></p><ul><li>\\u518D\\u6B21\\u9EDE\\u64CA AI \\u61F8\\u6D6E\\u6309\\u9215\\u5373\\u53EF\\u505C\\u6B62\\u7FFB\\u8B6F\\u3002</li><li>\\u9EDE\\u64CA\\u300C\\u67E5\\u770B\\u6458\\u8981\\u300D\\u53EF\\u63D0\\u4EA4\\u5F85\\u8655\\u7406\\u5167\\u5BB9\\u3001\\u8907\\u6838\\u7D50\\u679C\\u4E26\\u8907\\u88FD\\u6216\\u532F\\u51FA\\u7FFB\\u8B6F\\u3002</li><li>\\u91CD\\u8907\\u51FA\\u73FE\\u6216\\u5DF2\\u7D93\\u8655\\u7406\\u904E\\u7684\\u6587\\u672C\\u4E0D\\u6703\\u518D\\u6B21\\u63D0\\u4EA4\\u3002</li></ul>"
    }
  };
  // locales-ns:virtual:locales
  var locales = {
    "en": en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var resourceLanguages = [
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "zh-CN",
      "name": "\\u7B80\\u4F53\\u4E2D\\u6587"
    },
    {
      "code": "zh-TW",
      "name": "\\u7E41\\u9AD4\\u4E2D\\u6587"
    }
  ];
  // src/shared/i18n/index.js
  var translationModules = locales;
  var supportedLanguages = [{ code: "auto", name: "Auto" }, ...resourceLanguages];
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentTranslations = translations.en;
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      return value.replace(/{{\\s*(\\w+)\\s*}}/g, (match, key2) => {
        return Object.prototype.hasOwnProperty.call(replacements, key2) ? replacements[key2] : match;
      });
    }
    return value;
  }
  // src/shared/utils/text/ignoredTerms.js
  var IGNORED_TERMS_ARRAY = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "Modrinth",
    "Minecraft",
    "Modrinth+",
    "AI",
    "Bilibili",
    "QQ",
    "WeChat",
    "Discord",
    "Telegram",
    "WhatsApp",
    "Line",
    "Slack",
    "Zoom",
    "Skype",
    "TikTok",
    "Douyin",
    "Weibo",
    "Zhihu",
    "Xiaohongshu",
    "Steam",
    "Epic Games",
    "Spotify",
    "Apple Music",
    "NetEase Cloud Music",
    "Adobe Photoshop",
    "Adobe Premiere",
    "Microsoft Office",
    "WPS Office",
    "Modrinth",
    "CurseForge",
    "Thunder",
    "Baidu Netdisk",
    "Quark",
    "Alipay",
    "WeChat Pay",
    "Taobao",
    "JD.com",
    "Tmall",
    "Amazon",
    "eBay"
  ];
  var IGNORED_TERMS_SET = new Set(IGNORED_TERMS_ARRAY);
  var ignoredTerms_default = IGNORED_TERMS_SET;
  // src/shared/utils/text/filterLogic.js
  var FILTER_LABEL_KEYS = Object.freeze({
    numbers: "settings.filters.numbers",
    chinese: "settings.filters.chinese",
    containsChinese: "settings.filters.contains_chinese",
    emojiOnly: "settings.filters.emoji_only",
    symbols: "settings.filters.symbols",
    termFilter: "settings.filters.term",
    singleLetter: "settings.filters.single_letter",
    repeatingChars: "settings.filters.repeating_chars",
    filePath: "settings.filters.file_paths",
    hexColor: "settings.filters.hex_color_codes",
    email: "settings.filters.email_addresses",
    uuid: "settings.filters.uuids",
    gitCommitHash: "settings.filters.git_commit_hashes",
    websiteUrl: "settings.filters.website_urls",
    shorthandNumber: "settings.filters.shorthand_numbers"
  });
  var ruleChecks = /* @__PURE__ */ new Map([
    [
      "numbers",
      {
        regex: /^[$\\\u20AC\\\xA3\\\xA5\\d,.\\s]+$/,
        label: FILTER_LABEL_KEYS.numbers
      }
    ],
    [
      "chinese",
      {
        regex: /^[\\u4e00-\\u9fa5\\s]+$/u,
        label: FILTER_LABEL_KEYS.chinese
      }
    ],
    [
      "containsChinese",
      {
        regex: /[\\u4e00-\\u9fa5]/u,
        label: FILTER_LABEL_KEYS.containsChinese
      }
    ],
    [
      "emojiOnly",
      {
        regex: /^[\\p{Emoji}\\s]+$/u,
        label: FILTER_LABEL_KEYS.emojiOnly
      }
    ],
    [
      "symbols",
      {
        // \u8FD9\u4E2A\u903B\u8F91\u6BD4\u8F83\u7279\u6B8A\uFF0C\u662F\u201C\u4E0D\u5305\u542B\u5B57\u6BCD\u6216\u6570\u5B57\u201D\uFF0C\u6240\u4EE5\u6211\u4EEC\u7528\u4E00\u4E2A\u51FD\u6570\u6765\u5904\u7406
        test: (text) => !/[\\p{L}\\p{N}]/u.test(text),
        label: FILTER_LABEL_KEYS.symbols
      }
    ],
    [
      "termFilter",
      {
        // \u5C06 .includes() \u4FEE\u6539\u4E3A .has()
        test: (text) => ignoredTerms_default.has(text),
        label: FILTER_LABEL_KEYS.termFilter
      }
    ],
    [
      "singleLetter",
      {
        regex: /^[a-zA-Z]$/,
        label: FILTER_LABEL_KEYS.singleLetter
      }
    ],
    [
      "repeatingChars",
      {
        regex: /^\\s*(.)\\1+\\s*$/,
        label: FILTER_LABEL_KEYS.repeatingChars
      }
    ],
    [
      "filePath",
      {
        regex: /^(?:[a-zA-Z]:\\\\|\\\\\\\\|~|\\.\\.?\\/)[\\w\\-\\.\\/ \\\\]*[\\w\\-\\.]+\\.[\\w]{2,4}$/,
        label: FILTER_LABEL_KEYS.filePath
      }
    ],
    [
      "hexColor",
      {
        regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
        label: FILTER_LABEL_KEYS.hexColor
      }
    ],
    [
      "email",
      {
        regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,
        label: FILTER_LABEL_KEYS.email
      }
    ],
    [
      "uuid",
      {
        regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        label: FILTER_LABEL_KEYS.uuid
      }
    ],
    [
      "gitCommitHash",
      {
        regex: /^[0-9a-f]{7,40}$/i,
        label: FILTER_LABEL_KEYS.gitCommitHash
      }
    ],
    [
      "websiteUrl",
      {
        // \u5339\u914D\u5E38\u89C1\u7684\u7F51\u5740\u683C\u5F0F\uFF0C\u5305\u62EC\u534F\u8BAE\u3001www\u524D\u7F00\u548C\u88F8\u57DF\u540D\uFF0C\u8981\u6C42\u4E25\u683C\u5339\u914D\u6574\u4E2A\u5B57\u7B26\u4E32\u4EE5\u907F\u514D\u8BEF\u4F24\u3002
        regex: /^(?:(?:https?|ftp):\\/\\/)?(?:www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/.*)?$/,
        label: FILTER_LABEL_KEYS.websiteUrl
      }
    ],
    [
      "shorthandNumber",
      {
        // \u5339\u914D\u5E26k/m/b\u540E\u7F00\u7684\u6570\u5B57\uFF0C\u652F\u6301\u6574\u6570\u3001\u6D6E\u70B9\u6570\u3001\u5927\u5C0F\u5199\u4EE5\u53CA\u53EF\u9009\u7684\u7A7A\u683C\u3002
        regex: /^\\d+(\\.\\d+)?\\s?[kmb]$/i,
        label: FILTER_LABEL_KEYS.shorthandNumber
      }
    ]
  ]);
  function shouldFilter(text, filterRules2) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules2[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  // src/shared/utils/text/formatting.js
  var formatTextsForTranslation = (texts, format = "array", options = {}) => {
    const { includeArrayBrackets: includeArrayBrackets2 = true } = options;
    const pairs = Array.isArray(texts) ? texts.map((item) => {
      if (typeof item === "string") {
        return { sourceText: item, translation: "" };
      }
      if (Array.isArray(item)) {
        return {
          sourceText: String(item[0] || ""),
          translation: String(item[1] || "")
        };
      }
      return {
        sourceText: String(item?.sourceText ?? item?.source ?? ""),
        translation: String(item?.translation ?? "")
      };
    }).filter((pair) => pair.sourceText !== "") : [];
    if (pairs.length === 0) {
      if (format === "object") return includeArrayBrackets2 ? "{}" : "";
      if (format === "csv") return "";
      return includeArrayBrackets2 ? "[]" : "";
    }
    if (format === "object") {
      const indent2 = includeArrayBrackets2 ? "    " : "";
      const result2 = pairs.map(
        (pair) => \`\${indent2}\${JSON.stringify(pair.sourceText)}: \${JSON.stringify(pair.translation)}\`
      );
      return includeArrayBrackets2 ? \`{
\${result2.join(",\\n")}
}\` : result2.join(",\\n");
    }
    if (format === "csv") {
      return pairs.map((pair) => {
        const escapedSource = pair.sourceText.replace(/"/g, '""');
        const escapedTranslation = pair.translation.replace(/"/g, '""');
        return \`"\${escapedSource}","\${escapedTranslation}"\`;
      }).join("\\n");
    }
    const indent = includeArrayBrackets2 ? "    " : "";
    const result = pairs.map(
      (pair) => \`\${indent}[\${JSON.stringify(pair.sourceText)}, \${JSON.stringify(pair.translation)}]\`
    );
    return includeArrayBrackets2 ? \`[
\${result.join(",\\n")}
]\` : result.join(",\\n");
  };
  // src/shared/workers/processing.worker.js
  var sessionTexts = /* @__PURE__ */ new Set();
  var filterRules = {};
  var translations2 = {};
  var enableDebugLogging = false;
  var outputFormat = "array";
  var includeArrayBrackets = true;
  var t2 = (key, replacements) => {
    let value = translations2[key] || key;
    if (replacements) {
      let finalReplacements = { ...replacements };
      if (key === "textFiltered" && replacements.reason && translations2.filterReasons) {
        const reasonKey = replacements.reason;
        finalReplacements.reason = translations2.filterReasons[reasonKey] || reasonKey;
      }
      Object.keys(finalReplacements).forEach((placeholder) => {
        const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
        value = value.replace(regex, finalReplacements[placeholder]);
      });
    }
    return value;
  };
  var log2 = (...args) => {
    if (enableDebugLogging) {
      console.log(t2("workerLogPrefix"), ...args);
    }
  };
  function processText(rawText, textSet) {
    if (!rawText || typeof rawText !== "string") return false;
    const normalizedText = rawText.normalize("NFC");
    const textForFiltering = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n").trim();
    if (textForFiltering === "") return false;
    const filterResult = shouldFilter(textForFiltering, filterRules);
    if (filterResult) {
      log2(t2("textFiltered", { text: textForFiltering, reason: filterResult }));
      return false;
    }
    const originalSize = textSet.size;
    textSet.add(normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n"));
    return textSet.size > originalSize;
  }
  self.onmessage = (event) => {
    const { type, payload } = event.data;
    if (payload && payload.translations) {
      translations2 = payload.translations;
    }
    if (payload && typeof payload.enableDebugLogging !== "undefined") {
      enableDebugLogging = payload.enableDebugLogging;
    }
    if (payload && payload.filterRules) {
      filterRules = payload.filterRules;
    }
    if (payload && typeof payload.outputFormat !== "undefined") {
      outputFormat = payload.outputFormat;
    }
    if (payload && typeof payload.includeArrayBrackets !== "undefined") {
      includeArrayBrackets = payload.includeArrayBrackets;
    }
    switch (type) {
      /**
       * \u5904\u7406\u4E00\u6B21\u6027\u626B\u63CF\u4EFB\u52A1 (\u7528\u4E8E Quick Scan \u548C Element Scan)
       */
      case "process-single": {
        const { texts } = payload;
        const uniqueTexts = /* @__PURE__ */ new Set();
        if (Array.isArray(texts)) {
          texts.forEach((text) => processText(text, uniqueTexts));
        }
        const textsArray = Array.from(uniqueTexts);
        const formattedText = formatTextsForTranslation(textsArray, outputFormat, { includeArrayBrackets });
        log2(t2("scanComplete", { count: textsArray.length }));
        self.postMessage({
          type: "scanCompleted",
          payload: {
            formattedText,
            count: textsArray.length
          }
        });
        break;
      }
      /**
       * \u53EA\u8FC7\u6EE4\u6587\u672C\u5E76\u8FD4\u56DE\u6570\u7EC4 (\u7528\u4E8E Element Scan \u7684\u6682\u5B58)
       */
      case "filter-texts": {
        const { texts } = payload;
        const filteredTexts = /* @__PURE__ */ new Set();
        if (Array.isArray(texts)) {
          texts.forEach((text) => processText(text, filteredTexts));
        }
        self.postMessage({
          type: "textsFiltered",
          payload: {
            texts: Array.from(filteredTexts)
          }
        });
        break;
      }
      /**
       * \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u5F00\u59CB\u4E00\u4E2A\u65B0\u7684\u4F1A\u8BDD
       */
      case "session-start":
        const { initialData } = payload;
        sessionTexts.clear();
        const newTexts = [];
        if (Array.isArray(initialData)) {
          initialData.forEach((text) => {
            if (processText(text, sessionTexts)) {
              newTexts.push(text);
            }
          });
        }
        log2(t2("log.worker.sessionStarted", { count: sessionTexts.size }));
        self.postMessage({
          type: "countUpdated",
          payload: {
            count: sessionTexts.size,
            newTexts
          }
        });
        break;
      /**
       * \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u6DFB\u52A0\u6587\u672C
       */
      case "session-add-texts": {
        const { texts } = payload;
        const newTexts2 = [];
        if (Array.isArray(texts)) {
          texts.forEach((text) => {
            if (processText(text, sessionTexts)) {
              newTexts2.push(text);
            }
          });
        }
        if (newTexts2.length > 0) {
          self.postMessage({
            type: "countUpdated",
            payload: {
              count: sessionTexts.size,
              newTexts: newTexts2
            }
          });
        }
        break;
      }
      /**
       * \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u8BF7\u6C42\u603B\u7ED3
       */
      case "session-get-summary": {
        const sessionTextsArray = Array.from(sessionTexts);
        const formattedText = formatTextsForTranslation(sessionTextsArray, outputFormat, { includeArrayBrackets });
        self.postMessage({ type: "summaryReady", payload: formattedText });
        break;
      }
      /**
       * \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u6E05\u7A7A\u4F1A\u8BDD
       */
      case "session-clear":
        sessionTexts.clear();
        log2(t2("log.worker.sessionCleared"));
        self.postMessage({ type: "countUpdated", payload: { count: 0, newTexts: [] } });
        break;
      /**
       * \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u83B7\u53D6\u5F53\u524D\u8BA1\u6570\u503C
       */
      case "session-get-count":
        self.postMessage({ type: "countUpdated", payload: { count: sessionTexts.size } });
        break;
    }
  };
})();
`], { type: "application/javascript" });
  var workerUrl = URL.createObjectURL(workerBlob);
  var trustedWorkerUrl = createTrustedWorkerUrl(workerUrl);
  // src/shared/utils/dom/dom.js
  var parser = new DOMParser();
  function createSVGFromString(svgString) {
    if (!svgString || typeof svgString !== "string") return null;
    const sanitizedSVG = createTrustedHTML(svgString.trim());
    const doc = parser.parseFromString(sanitizedSVG, "image/svg+xml");
    const svgNode = doc.documentElement;
    if (!svgNode || svgNode.nodeName.toLowerCase() !== "svg" || svgNode.querySelector("parsererror")) {
      log(t("log.dom.svgParseError"), svgString);
      return null;
    }
    return document.importNode(svgNode, true);
  }
  // src/assets/icons/successIcon.js
  var successIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>';
  // src/assets/icons/closeIcon.js
  var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  // src/shared/ui/components/notification.js
  var NOTIFICATION_TRANSITION_MS = 500;
  var notificationContainer = null;
  function getNotificationContainer() {
    if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "tc-notification-container";
      uiContainer.appendChild(notificationContainer);
    }
    return notificationContainer;
  }
  function closeNotification(notification) {
    if (!notification || notification.classList.contains("tc-notification-fade-out")) {
      return;
    }
    notification.classList.remove("tc-notification-visible");
    notification.classList.add("tc-notification-fade-out");
    setTimeout(() => {
      notification.remove();
    }, NOTIFICATION_TRANSITION_MS);
  }
  function createNotificationElement(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `tc-notification tc-notification-${type}`;
    const iconDiv = document.createElement("div");
    iconDiv.className = "tc-notification-icon";
    const iconSVGString = type === "success" ? successIcon : infoIcon;
    const iconElement = createSVGFromString(iconSVGString);
    if (iconElement) {
      iconDiv.appendChild(iconElement);
    }
    const contentDiv = document.createElement("div");
    contentDiv.className = "tc-notification-content";
    contentDiv.textContent = message;
    const closeDiv = document.createElement("div");
    closeDiv.className = "tc-notification-close";
    const closeIconElement = createSVGFromString(closeIcon);
    if (closeIconElement) {
      closeDiv.appendChild(closeIconElement);
    }
    notification.appendChild(iconDiv);
    notification.appendChild(contentDiv);
    notification.appendChild(closeDiv);
    closeDiv.addEventListener("click", () => {
      closeNotification(notification);
    });
    return notification;
  }
  function showNotification(message, { type = "info", duration = appConfig.ui.notificationDuration } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);
    container.appendChild(notification);
    requestAnimationFrame(() => {
      if (notification.isConnected && !notification.classList.contains("tc-notification-fade-out")) {
        notification.classList.add("tc-notification-visible");
      }
    });
    const timer = setTimeout(() => {
      closeNotification(notification);
    }, duration);
    const closeButton = notification.querySelector(".tc-notification-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        clearTimeout(timer);
      });
    }
  }
  // src/shared/ui/components/iconTitle.js
  function createIconTitle(iconSVG, text) {
    const container = document.createElement("div");
    container.className = "tc-icon-title";
    if (iconSVG) {
      const iconWrapper = document.createElement("span");
      iconWrapper.className = "tc-icon-title-icon";
      iconWrapper.setAttribute("aria-hidden", "true");
      const svgElement = createSVGFromString(iconSVG);
      if (svgElement) {
        iconWrapper.appendChild(svgElement);
        container.appendChild(iconWrapper);
      }
    }
    const textNode = document.createElement("span");
    textNode.className = "icon-title-text";
    textNode.textContent = text;
    container.appendChild(textNode);
    return container;
  }
  // src/shared/utils/dom/templating.js
  var simpleTemplate = (template, values) => {
    if (!template) return "";
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      return values.hasOwnProperty(key) ? values[key] : match;
    });
  };
  // src/shared/ui/mainModal/modalHeader.js
  var titleContainer;
  var scanCountDisplay;
  var closeBtn;
  var unsubscribeLanguageChanged;
  var unsubscribeSettingsSaved;
  var currentScanState = { count: 0, type: null };
  var currentHeaderMode = "quick-scan";
  function renderHeaderTitle() {
    if (!titleContainer) return;
    const isAiMode = currentHeaderMode === "ai-scan";
    const title = createIconTitle(isAiMode ? aiIcon : summaryIcon, t(isAiMode ? "results.aiTitle" : "results.title"));
    if (scanCountDisplay) title.appendChild(scanCountDisplay);
    titleContainer.replaceChildren(title);
  }
  function updateScanCountDisplay() {
    const { showScanCount } = loadSettings();
    if (!scanCountDisplay) return;
    if (showScanCount && currentScanState.count > 0 && currentScanState.type) {
      const key = currentScanState.type === "ai" ? "results.scanCountAi" : currentScanState.type === "session" ? "results.scanCountSession" : "results.scanCountStatic";
      const template = t(key);
      scanCountDisplay.textContent = simpleTemplate(template, { count: currentScanState.count });
      scanCountDisplay.classList.add("is-visible");
    } else {
      scanCountDisplay.classList.remove("is-visible");
      setTimeout(() => {
        if (currentScanState.count === 0) {
          scanCountDisplay.textContent = "";
        }
      }, 300);
    }
  }
  function rerenderHeaderTexts() {
    renderHeaderTitle();
    updateScanCountDisplay();
  }
  function populateModalHeader(modalHeader, closeCallback) {
    titleContainer = document.createElement("div");
    titleContainer.id = "main-modal-title-container";
    const rightControlsContainer = document.createElement("div");
    rightControlsContainer.className = "header-right-controls";
    scanCountDisplay = document.createElement("span");
    scanCountDisplay.id = "scan-count-display";
    renderHeaderTitle();
    closeBtn = document.createElement("span");
    closeBtn.className = "tc-close-button text-extractor-modal-close";
    closeBtn.appendChild(createSVGFromString(closeIcon));
    rightControlsContainer.appendChild(closeBtn);
    modalHeader.appendChild(titleContainer);
    modalHeader.appendChild(rightControlsContainer);
    closeBtn.addEventListener("click", closeCallback);
    unsubscribeLanguageChanged = on("languageChanged", rerenderHeaderTexts);
    unsubscribeSettingsSaved = on("settingsSaved", updateScanCountDisplay);
  }
  function updateScanCount(count, type) {
    currentScanState = { count, type };
    updateScanCountDisplay();
  }
  function setModalHeaderMode(mode) {
    currentHeaderMode = mode;
    renderHeaderTitle();
  }
  // src/shared/utils/text/ignoredTerms.js
  var IGNORED_TERMS_ARRAY = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "Modrinth",
    "Minecraft",
    "Modrinth+",
    "AI",
    "Bilibili",
    "QQ",
    "WeChat",
    "Discord",
    "Telegram",
    "WhatsApp",
    "Line",
    "Slack",
    "Zoom",
    "Skype",
    "TikTok",
    "Douyin",
    "Weibo",
    "Zhihu",
    "Xiaohongshu",
    "Steam",
    "Epic Games",
    "Spotify",
    "Apple Music",
    "NetEase Cloud Music",
    "Adobe Photoshop",
    "Adobe Premiere",
    "Microsoft Office",
    "WPS Office",
    "Modrinth",
    "CurseForge",
    "Thunder",
    "Baidu Netdisk",
    "Quark",
    "Alipay",
    "WeChat Pay",
    "Taobao",
    "JD.com",
    "Tmall",
    "Amazon",
    "eBay"
  ];
  var IGNORED_TERMS_SET = new Set(IGNORED_TERMS_ARRAY);
  var ignoredTerms_default = IGNORED_TERMS_SET;
  // src/shared/utils/text/filterLogic.js
  var FILTER_LABEL_KEYS = Object.freeze({
    numbers: "settings.filters.numbers",
    chinese: "settings.filters.chinese",
    containsChinese: "settings.filters.contains_chinese",
    emojiOnly: "settings.filters.emoji_only",
    symbols: "settings.filters.symbols",
    termFilter: "settings.filters.term",
    singleLetter: "settings.filters.single_letter",
    repeatingChars: "settings.filters.repeating_chars",
    filePath: "settings.filters.file_paths",
    hexColor: "settings.filters.hex_color_codes",
    email: "settings.filters.email_addresses",
    uuid: "settings.filters.uuids",
    gitCommitHash: "settings.filters.git_commit_hashes",
    websiteUrl: "settings.filters.website_urls",
    shorthandNumber: "settings.filters.shorthand_numbers"
  });
  var ruleChecks = /* @__PURE__ */ new Map([
    [
      "numbers",
      {
        regex: /^[$\€\£\¥\d,.\s]+$/,
        label: FILTER_LABEL_KEYS.numbers
      }
    ],
    [
      "chinese",
      {
        regex: /^[\u4e00-\u9fa5\s]+$/u,
        label: FILTER_LABEL_KEYS.chinese
      }
    ],
    [
      "containsChinese",
      {
        regex: /[\u4e00-\u9fa5]/u,
        label: FILTER_LABEL_KEYS.containsChinese
      }
    ],
    [
      "emojiOnly",
      {
        regex: /^[\p{Emoji}\s]+$/u,
        label: FILTER_LABEL_KEYS.emojiOnly
      }
    ],
    [
      "symbols",
      {
        // 这个逻辑比较特殊，是“不包含字母或数字”，所以我们用一个函数来处理
        test: (text) => !/[\p{L}\p{N}]/u.test(text),
        label: FILTER_LABEL_KEYS.symbols
      }
    ],
    [
      "termFilter",
      {
        // 将 .includes() 修改为 .has()
        test: (text) => ignoredTerms_default.has(text),
        label: FILTER_LABEL_KEYS.termFilter
      }
    ],
    [
      "singleLetter",
      {
        regex: /^[a-zA-Z]$/,
        label: FILTER_LABEL_KEYS.singleLetter
      }
    ],
    [
      "repeatingChars",
      {
        regex: /^\s*(.)\1+\s*$/,
        label: FILTER_LABEL_KEYS.repeatingChars
      }
    ],
    [
      "filePath",
      {
        regex: /^(?:[a-zA-Z]:\\|\\\\|~|\.\.?\/)[\w\-\.\/ \\]*[\w\-\.]+\.[\w]{2,4}$/,
        label: FILTER_LABEL_KEYS.filePath
      }
    ],
    [
      "hexColor",
      {
        regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
        label: FILTER_LABEL_KEYS.hexColor
      }
    ],
    [
      "email",
      {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        label: FILTER_LABEL_KEYS.email
      }
    ],
    [
      "uuid",
      {
        regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        label: FILTER_LABEL_KEYS.uuid
      }
    ],
    [
      "gitCommitHash",
      {
        regex: /^[0-9a-f]{7,40}$/i,
        label: FILTER_LABEL_KEYS.gitCommitHash
      }
    ],
    [
      "websiteUrl",
      {
        // 匹配常见的网址格式，包括协议、www前缀和裸域名，要求严格匹配整个字符串以避免误伤。
        regex: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/,
        label: FILTER_LABEL_KEYS.websiteUrl
      }
    ],
    [
      "shorthandNumber",
      {
        // 匹配带k/m/b后缀的数字，支持整数、浮点数、大小写以及可选的空格。
        regex: /^\d+(\.\d+)?\s?[kmb]$/i,
        label: FILTER_LABEL_KEYS.shorthandNumber
      }
    ]
  ]);
  function shouldFilter(text, filterRules2) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules2[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  // src/shared/utils/text/textProcessor.js
  var ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
  var ourUiSelector = "#text-extractor-container";
  var blockElements = /* @__PURE__ */ new Set([
    "ADDRESS",
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "DETAILS",
    "DIALOG",
    "DD",
    "DIV",
    "DL",
    "DT",
    "FIELDSET",
    "FIGCAPTION",
    "FIGURE",
    "FOOTER",
    "FORM",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "HGROUP",
    "HR",
    "LI",
    "MAIN",
    "NAV",
    "OL",
    "P",
    "PRE",
    "SECTION",
    "TABLE",
    "UL"
  ]);
  var traverseDOMAndExtract = (node, textCallback) => {
    if (!node) {
      return;
    }
    switch (node.nodeType) {
      // 对于元素节点
      case Node.ELEMENT_NODE: {
        if (node.closest(ignoredSelectorString) || node.closest(ourUiSelector)) {
          return;
        }
        if (node.tagName === "BR") {
          textCallback("\n");
          return;
        }
        const attributesToExtract = appConfig.scanner.attributesToExtract;
        attributesToExtract.forEach((attr) => {
          const attrValue = node.getAttribute(attr);
          if (attrValue) {
            textCallback(attrValue);
          }
        });
        if (node.tagName === "INPUT" && ["button", "submit", "reset"].includes(node.type)) {
          const value = node.getAttribute("value");
          if (value) {
            textCallback(value);
          }
        }
        if (node.tagName === "IFRAME") {
          try {
            const iframeDoc = node.contentDocument || node.contentWindow && node.contentWindow.document;
            if (iframeDoc) {
              traverseDOMAndExtract(iframeDoc, textCallback);
            }
          } catch (e) {
          }
        }
        break;
      }
      // 对于文本节点
      case Node.TEXT_NODE: {
        const parent = node.parentElement;
        if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
          return;
        }
        textCallback(node.nodeValue);
        return;
      }
      // 对于其他类型的节点（如注释节点），我们什么都不做，但允许继续遍历其子节点
      default:
        break;
    }
    for (const child of node.childNodes) {
      traverseDOMAndExtract(child, textCallback);
    }
    const shadowRoot = node.shadowRoot || node._shadowRoot;
    if (node.nodeType === Node.ELEMENT_NODE && shadowRoot) {
      traverseDOMAndExtract(shadowRoot, textCallback);
    }
    if (node.nodeType === Node.ELEMENT_NODE && blockElements.has(node.tagName)) {
      textCallback("\n");
    }
  };
  var extractAndProcessText = () => {
    const uniqueTexts = /* @__PURE__ */ new Set();
    const processAndAddText = (rawText) => {
      if (!rawText) return;
      const normalizedText = rawText.normalize("NFC");
      let text = normalizedText.replace(/\r\n|\r/g, "\n");
      if (text.trim() === "" && !text.includes("\n")) {
        return;
      }
      uniqueTexts.add(text);
    };
    processAndAddText(document.title);
    if (document.body) {
      traverseDOMAndExtract(document.body, processAndAddText);
    }
    return Array.from(uniqueTexts);
  };
  var filterAndNormalizeTexts = (texts, filterRules2, enableDebugLogging, logFiltered) => {
    const uniqueTexts = /* @__PURE__ */ new Set();
    if (Array.isArray(texts)) {
      texts.forEach((rawText) => {
        if (!rawText || typeof rawText !== "string") return;
        const normalizedText = rawText.normalize("NFC").replace(/\r\n|\r/g, "\n");
        const textForFiltering = normalizedText.replace(/^[ \t]+|[ \t]+$/gm, "");
        if (textForFiltering === "") return;
        const filterResult = shouldFilter(textForFiltering, filterRules2);
        if (filterResult) {
          if (enableDebugLogging && logFiltered) {
            logFiltered(textForFiltering, filterResult);
          }
          return;
        }
        uniqueTexts.add(normalizedText);
      });
    }
    return Array.from(uniqueTexts);
  };
  var extractRawTextFromElement = (element) => {
    if (!element) return [];
    const texts = [];
    traverseDOMAndExtract(element, (rawText) => {
      texts.push(rawText);
    });
    return texts;
  };
  // src/features/quick-scan/logic.js
  var performQuickScan = () => {
    return new Promise(async (resolve, reject) => {
      const { filterRules: filterRules2, enableDebugLogging, outputFormat, includeArrayBrackets } = loadSettings();
      const [texts, workerAllowed] = await Promise.all([extractAndProcessText(), isWorkerAllowed()]);
      const runFallback = () => {
        log(t("log.quickScan.switchToFallback"));
        showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
        try {
          const logFiltered = (text, reason) => {
            log(t("log.textProcessor.filtered", { text, reason }));
          };
          const filteredTexts = filterAndNormalizeTexts(texts, filterRules2, enableDebugLogging, logFiltered);
          const formattedText = formatTextsForTranslation(filteredTexts, outputFormat, { includeArrayBrackets });
          const result = {
            formattedText,
            count: filteredTexts.length
          };
          updateScanCount(result.count, "static");
          resolve(result);
        } catch (fallbackError) {
          log(t("log.quickScan.fallbackFailed", { error: fallbackError.message }), "error");
          reject(fallbackError);
        }
      };
      if (!workerAllowed) {
        log(t("log.quickScan.worker.cspBlocked"), "warn");
        return runFallback();
      }
      try {
        log(t("log.quickScan.worker.starting"));
        const worker2 = new Worker(trustedWorkerUrl);
        worker2.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === "scanCompleted") {
            log(t("log.quickScan.worker.completed", { count: payload.count }));
            updateScanCount(payload.count, "static");
            resolve(payload);
            worker2.terminate();
          }
        };
        worker2.onerror = (error) => {
          log(t("log.quickScan.worker.initFailed"), "warn");
          log(t("log.quickScan.worker.originalError", { error: error.message }), "debug");
          worker2.terminate();
          runFallback();
        };
        log(t("log.quickScan.worker.sendingData", { count: texts.length }));
        worker2.postMessage({
          type: "process-single",
          payload: {
            texts,
            filterRules: filterRules2,
            enableDebugLogging,
            outputFormat,
            includeArrayBrackets,
            translations: {
              workerLogPrefix: t("log.quickScan.worker.logPrefix"),
              textFiltered: t("log.textProcessor.filtered"),
              scanComplete: t("log.quickScan.worker.completed"),
              filterReasons: getTranslationObject("filterReasons")
            }
          }
        });
      } catch (e) {
        log(t("log.quickScan.worker.initSyncError", { error: e.message }), "error");
        runFallback();
      }
    });
  };
  // src/shared/ui/mainModal/modalState.js
  var modalOverlay = null;
  var outputTextarea = null;
  var lineNumbersDiv = null;
  var statsContainer = null;
  var placeholder = null;
  var loadingContainer = null;
  var aiSummaryPanel = null;
  var aiOutputTabs = null;
  var aiOutputType = "text";
  var canvasContext = null;
  var currentLineMap = [];
  var currentMode = "quick-scan";
  var SHOW_PLACEHOLDER = "::show_placeholder::";
  var SHOW_LOADING = "::show_loading::";
  function setModalOverlay(element) {
    modalOverlay = element;
  }
  function setOutputTextarea(element) {
    outputTextarea = element;
  }
  function setLineNumbersDiv(element) {
    lineNumbersDiv = element;
  }
  function setStatsContainer(element) {
    statsContainer = element;
  }
  function setPlaceholder(element) {
    placeholder = element;
  }
  function setLoadingContainer(element) {
    loadingContainer = element;
  }
  function setAiSummaryPanel(element) {
    aiSummaryPanel = element;
  }
  function setAiOutputTabs(element) {
    aiOutputTabs = element;
  }
  function setCanvasContext(context) {
    canvasContext = context;
  }
  function setCurrentLineMap(map) {
    currentLineMap = map;
  }
  function setCurrentMode(mode) {
    currentMode = mode;
  }
  function getCurrentMode() {
    return currentMode;
  }
  function setAiOutputType(type) {
    aiOutputType = type === "regex" ? "regex" : "text";
  }
  function getAiOutputType() {
    return aiOutputType;
  }
  // src/shared/ui/mainModal/modalLayout.js
  function createModalLayout() {
    const modalOverlay2 = document.createElement("div");
    modalOverlay2.className = "text-extractor-modal-overlay";
    modalOverlay2.tabIndex = -1;
    setModalOverlay(modalOverlay2);
    const modal = document.createElement("div");
    modal.className = "text-extractor-modal";
    const modalHeader = document.createElement("div");
    modalHeader.className = "text-extractor-modal-header";
    const modalContent = document.createElement("div");
    modalContent.className = "text-extractor-modal-content";
    const modalFooter = document.createElement("div");
    modalFooter.className = "text-extractor-modal-footer";
    modal.appendChild(modalHeader);
    modal.appendChild(modalContent);
    modal.appendChild(modalFooter);
    modalOverlay2.appendChild(modal);
    uiContainer.appendChild(modalOverlay2);
    return { modal, modalHeader, modalContent, modalFooter };
  }
  // src/assets/icons/loadingSpinner.js
  var loadingSpinner = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite"/>
    </path>
  </svg>
`;
  // src/shared/ui/mainModal/modalContent.js
  var placeholder2;
  var unsubscribeLanguageChanged2;
  var currentMode2 = "quick-scan";
  var lastAiSnapshot = null;
  var lastAiReviewItems = [];
  var lastAiEditError = "";
  function renderAiOutputTabs(activeType = getAiOutputType()) {
    if (!aiOutputTabs) return;
    aiOutputTabs.querySelectorAll("[data-ai-output-type]").forEach((button) => {
      const isActive3 = button.dataset.aiOutputType === activeType;
      button.classList.toggle("is-active", isActive3);
      button.setAttribute("aria-selected", String(isActive3));
    });
  }
  function createAiOutputTabs() {
    const tabs = document.createElement("div");
    tabs.className = "ai-output-tabs";
    tabs.setAttribute("role", "tablist");
    [
      ["text", "results.aiOutput.text"],
      ["regex", "results.aiOutput.regex"]
    ].forEach(([type]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ai-output-tab";
      button.dataset.aiOutputType = type;
      button.setAttribute("role", "tab");
      button.addEventListener("click", () => fire("ai-output-type-change", type));
      tabs.appendChild(button);
    });
    setAiOutputTabs(tabs);
    updateAiOutputTabs();
    return tabs;
  }
  function renderAiSummaryPanel() {
    const panel = aiSummaryPanel;
    if (!panel) return;
    panel.replaceChildren();
    if (!lastAiSnapshot) return;
    const status = document.createElement("div");
    status.className = "ai-summary-status";
    status.setAttribute("role", "status");
    const statusDot = document.createElement("span");
    statusDot.className = `ai-status-dot ${lastAiSnapshot.paused ? "is-paused" : lastAiSnapshot.active ? "is-active" : ""}`;
    statusDot.setAttribute("aria-hidden", "true");
    const statusText = document.createElement("span");
    statusText.className = "ai-summary-status-text";
    const statusKey = lastAiSnapshot.paused ? "results.aiPaused" : lastAiSnapshot.active ? "results.aiRunning" : "results.aiStopped";
    statusText.textContent = t(statusKey);
    status.append(statusDot, statusText);
    panel.appendChild(status);
    const counts = document.createElement("div");
    counts.className = "ai-summary-counts";
    const countItems = [
      ["pending", "results.aiCounts.pending"],
      ["translated", "results.aiCounts.translated"],
      ["textRules", "results.aiCounts.textRules"],
      ["regexRules", "results.aiCounts.regexRules"],
      ["removed", "results.aiCounts.removed"],
      ["review", "results.aiCounts.review"],
      ["failed", "results.aiCounts.failed"]
    ];
    countItems.forEach(([key, labelKey]) => {
      const badge = document.createElement("span");
      badge.className = `ai-count-badge ai-count-${key}`;
      const count = lastAiSnapshot.counts?.[key] || 0;
      badge.classList.toggle("is-nonzero", count > 0);
      const label = t(labelKey);
      badge.setAttribute("aria-label", `${label}: ${count}`);
      const labelElement = document.createElement("span");
      labelElement.className = "ai-count-label";
      labelElement.textContent = label;
      const valueElement = document.createElement("strong");
      valueElement.className = "ai-count-value";
      valueElement.textContent = String(count);
      badge.append(labelElement, valueElement);
      counts.appendChild(badge);
    });
    panel.appendChild(counts);
    if (lastAiSnapshot.processing || lastAiSnapshot.budgetBlockedReason || lastAiSnapshot.lastErrorCode) {
      const notice = document.createElement("div");
      notice.className = `ai-summary-notice${lastAiSnapshot.processing ? " is-processing" : ""}`;
      if (lastAiSnapshot.processing) {
        notice.textContent = t("results.aiProcessing");
        notice.title = notice.textContent;
      } else if (lastAiSnapshot.budgetBlockedReason) {
        notice.textContent = `${t("results.aiBudgetBlocked")}: ${lastAiSnapshot.budgetBlockedReason}`;
      } else {
        notice.textContent = `${t("results.aiRequestError")}: ${lastAiSnapshot.lastErrorCode}`;
      }
      panel.appendChild(notice);
    }
    if (lastAiEditError) {
      const notice = document.createElement("div");
      notice.className = "ai-summary-notice is-error";
      notice.textContent = `${t("results.aiRegexEditError")}: ${lastAiEditError}`;
      panel.appendChild(notice);
    }
    if (lastAiReviewItems.length > 0) {
      const details = document.createElement("details");
      details.className = "ai-review-list";
      const summary = document.createElement("summary");
      summary.textContent = `${t("results.aiReviewItems")} (${lastAiReviewItems.length})`;
      details.appendChild(summary);
      lastAiReviewItems.forEach((item) => {
        const row = document.createElement("div");
        row.className = "ai-review-item";
        const source = document.createElement("div");
        source.className = "ai-review-source";
        source.textContent = item.sourceText;
        const reason = document.createElement("div");
        reason.className = "ai-review-reason";
        reason.textContent = item.reason || item.category || t("results.aiReviewRequired");
        const actions = document.createElement("div");
        actions.className = "ai-review-actions";
        const returnButton = document.createElement("button");
        returnButton.type = "button";
        returnButton.className = "ai-review-action ai-review-return-action";
        returnButton.dataset.reviewAction = "return-to-editor";
        returnButton.textContent = t("results.aiReviewReturnToEditor");
        returnButton.setAttribute("aria-label", returnButton.textContent);
        returnButton.disabled = Boolean(lastAiSnapshot.processing);
        returnButton.addEventListener("click", () => fire("ai-review-return-to-editor", item.id));
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "ai-review-action ai-review-remove-action";
        removeButton.dataset.reviewAction = "remove";
        removeButton.textContent = t("results.aiReviewRemove");
        removeButton.setAttribute("aria-label", removeButton.textContent);
        removeButton.disabled = Boolean(lastAiSnapshot.processing);
        removeButton.addEventListener("click", () => fire("ai-review-remove", item.id));
        actions.append(returnButton, removeButton);
        row.append(source, reason, actions);
        details.appendChild(row);
      });
      panel.appendChild(details);
    }
  }
  function rerenderPlaceholder() {
    if (!placeholder2) return;
    placeholder2.replaceChildren();
    const placeholderIconDiv = document.createElement("div");
    placeholderIconDiv.className = "placeholder-icon";
    const infoIconSVG = createSVGFromString(infoIcon);
    if (infoIconSVG) placeholderIconDiv.appendChild(infoIconSVG);
    const p1 = document.createElement("p");
    p1.textContent = t("results.noSummary");
    const p2 = document.createElement("p");
    p2.className = "placeholder-actions";
    p2.append(t("placeholders.click"));
    const span2 = document.createElement("span");
    span2.className = "placeholder-action-icon";
    const dynamicIconSVG = createSVGFromString(dynamicIcon);
    if (dynamicIconSVG) span2.appendChild(dynamicIconSVG);
    p2.appendChild(span2);
    const strong2 = document.createElement("strong");
    strong2.textContent = t("placeholders.dynamicScan");
    p2.appendChild(strong2);
    p2.append(t("placeholders.startNewScanSession"));
    const p3 = document.createElement("p");
    p3.className = "placeholder-actions";
    p3.append(t("placeholders.click"));
    const span3 = document.createElement("span");
    span3.className = "placeholder-action-icon";
    const translateIconSVG = createSVGFromString(translateIcon);
    if (translateIconSVG) span3.appendChild(translateIconSVG);
    p3.appendChild(span3);
    const strong3 = document.createElement("strong");
    strong3.textContent = t("placeholders.staticScan");
    p3.appendChild(strong3);
    p3.append(t("placeholders.performOneTimeScan"));
    placeholder2.appendChild(placeholderIconDiv);
    placeholder2.appendChild(p1);
    placeholder2.appendChild(p2);
    placeholder2.appendChild(p3);
  }
  function createLoadingSpinner() {
    const loadingContainer2 = document.createElement("div");
    loadingContainer2.className = "gm-loading-overlay";
    const spinner = document.createElement("div");
    spinner.className = "gm-loading-spinner";
    const spinnerSVG = createSVGFromString(loadingSpinner);
    if (spinnerSVG) spinner.appendChild(spinnerSVG);
    loadingContainer2.appendChild(spinner);
    return loadingContainer2;
  }
  function populateModalContent(modalContent) {
    if (appConfig.ui.modalContentHeight) {
      modalContent.style.height = appConfig.ui.modalContentHeight;
    }
    placeholder2 = document.createElement("div");
    placeholder2.id = "modal-placeholder";
    rerenderPlaceholder();
    setPlaceholder(placeholder2);
    const aiSummaryPanel2 = document.createElement("section");
    aiSummaryPanel2.className = "ai-summary-panel";
    aiSummaryPanel2.setAttribute("aria-live", "polite");
    setAiSummaryPanel(aiSummaryPanel2);
    const aiOutputTabs2 = createAiOutputTabs();
    const textareaContainer = document.createElement("div");
    textareaContainer.className = "tc-textarea-container";
    const lineNumbersDiv2 = document.createElement("div");
    lineNumbersDiv2.className = "tc-line-numbers";
    setLineNumbersDiv(lineNumbersDiv2);
    const outputTextarea2 = document.createElement("textarea");
    outputTextarea2.id = "text-extractor-output";
    outputTextarea2.className = "tc-textarea";
    setOutputTextarea(outputTextarea2);
    textareaContainer.appendChild(lineNumbersDiv2);
    textareaContainer.appendChild(outputTextarea2);
    const loadingContainer2 = createLoadingSpinner();
    setLoadingContainer(loadingContainer2);
    modalContent.appendChild(placeholder2);
    modalContent.appendChild(aiSummaryPanel2);
    modalContent.appendChild(aiOutputTabs2);
    modalContent.appendChild(textareaContainer);
    modalContent.appendChild(loadingContainer2);
    unsubscribeLanguageChanged2 = on("languageChanged", () => {
      rerenderPlaceholder();
      updateAiOutputTabs();
      renderAiSummaryPanel();
    });
  }
  function showLoading() {
    if (loadingContainer) loadingContainer.classList.add("is-visible");
    if (outputTextarea) outputTextarea.disabled = true;
  }
  function hideLoading() {
    if (loadingContainer) loadingContainer.classList.remove("is-visible");
    if (outputTextarea) outputTextarea.disabled = false;
  }
  function setModalContentMode(mode) {
    currentMode2 = mode;
    if (aiSummaryPanel) {
      aiSummaryPanel.classList.toggle("is-visible", currentMode2 === "ai-scan");
    }
    if (aiOutputTabs) aiOutputTabs.classList.toggle("is-visible", currentMode2 === "ai-scan");
  }
  function updateAiSummaryPanel(snapshot, reviewItems = [], editError = "") {
    lastAiSnapshot = snapshot;
    lastAiReviewItems = reviewItems;
    lastAiEditError = editError || "";
    renderAiSummaryPanel();
  }
  function updateAiOutputTabs(activeType = getAiOutputType()) {
    if (!aiOutputTabs) return;
    aiOutputTabs.querySelectorAll("[data-ai-output-type]").forEach((button) => {
      const type = button.dataset.aiOutputType;
      button.textContent = t(type === "regex" ? "results.aiOutput.regex" : "results.aiOutput.text");
    });
    renderAiOutputTabs(activeType);
  }
  // src/assets/icons/copyIcon.js
  var copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg>`;
  // src/assets/icons/clearIcon.js
  var clearIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-40v-280q0-83 58.5-141.5T320-520h40v-320q0-33 23.5-56.5T440-920h80q33 0 56.5 23.5T600-840v320h40q83 0 141.5 58.5T840-320v280H120Zm80-80h80v-120q0-17 11.5-28.5T320-280q17 0 28.5 11.5T360-240v120h80v-120q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240v120h80v-120q0-17 11.5-28.5T640-280q17 0 28.5 11.5T680-240v120h80v-200q0-50-35-85t-85-35H320q-50 0-85 35t-35 85v200Zm320-400v-320h-80v320h80Zm0 0h-80 80Z"/></svg>`;
  // src/shared/ui/components/button.js
  function createButton({
    id,
    className,
    textKey,
    tooltipKey,
    icon,
    onClick,
    disabled = false,
    iconOnly = false
  }) {
    const button = document.createElement("button");
    const controller2 = new AbortController();
    const { signal } = controller2;
    let iconAnimationTimer = null;
    if (id) {
      button.id = id;
    }
    if (iconOnly) {
      button.className = "tc-icon-button";
      if (className) {
        button.classList.add(className);
      }
      button.innerHTML = createTrustedHTML(icon);
      let currentTooltipKey = tooltipKey;
      button.addEventListener("mouseover", () => showTooltip(button, t(currentTooltipKey)), { signal });
      button.addEventListener("mouseout", hideTooltip, { signal });
      button.updateText = (newTooltipKey) => {
        currentTooltipKey = newTooltipKey;
      };
    } else {
      button.className = "tc-button";
      if (className) {
        button.classList.add(className);
      }
      button.appendChild(createIconTitle(icon, t(textKey)));
      button.updateText = (newTextKey) => {
        const textElement = button.querySelector(".icon-title-text");
        if (textElement) {
          textElement.textContent = t(newTextKey);
        }
      };
    }
    button.disabled = disabled;
    if (onClick && typeof onClick === "function") {
      button.addEventListener("click", onClick, { signal });
    }
    button.updateIcon = (newIcon) => {
      const newIconElement = createSVGFromString(newIcon);
      if (!newIconElement) return;
      const oldIconElements = Array.from(button.querySelectorAll("svg"));
      let iconWrapper = iconOnly ? button : button.querySelector(".tc-icon-title-icon");
      if (!iconWrapper) {
        iconWrapper = document.createElement("span");
        iconWrapper.className = "tc-icon-title-icon";
        iconWrapper.setAttribute("aria-hidden", "true");
        const title = button.querySelector(".tc-icon-title");
        if (title) title.prepend(iconWrapper);
        else button.appendChild(iconWrapper);
      }
      if (iconAnimationTimer) clearTimeout(iconAnimationTimer);
      iconWrapper.classList.add("is-changing");
      newIconElement.classList.add("is-icon-entering");
      newIconElement.style.opacity = "0";
      iconWrapper.appendChild(newIconElement);
      void newIconElement.offsetHeight;
      requestAnimationFrame(() => {
        oldIconElements.forEach((icon2) => {
          icon2.classList.add("is-icon-leaving");
          icon2.style.opacity = "0";
        });
        newIconElement.style.opacity = "1";
      });
      iconAnimationTimer = setTimeout(() => {
        oldIconElements.forEach((icon2) => icon2.remove());
        newIconElement.classList.remove("is-icon-entering");
        newIconElement.style.removeProperty("opacity");
        iconWrapper.classList.remove("is-changing");
        iconAnimationTimer = null;
      }, 200);
    };
    button.destroy = () => {
      if (iconAnimationTimer) clearTimeout(iconAnimationTimer);
      controller2.abort();
    };
    button.style.pointerEvents = "auto";
    return button;
  }
  // src/assets/icons/confirmIcon.js
  var confirmIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
  // src/shared/ui/components/confirmationModal.js
  var modalContainer = null;
  var resolvePromise = null;
  var confirmButton = null;
  var cancelButton = null;
  var controller = null;
  function showConfirmationModal(text, iconSVG) {
    return new Promise((resolve) => {
      resolvePromise = resolve;
      controller = new AbortController();
      const { signal } = controller;
      if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.className = "confirmation-modal-overlay";
        const modalContent = document.createElement("div");
        modalContent.className = "confirmation-modal-content";
        const iconContainer = document.createElement("div");
        iconContainer.className = "confirmation-modal-icon";
        const textContainer = document.createElement("p");
        textContainer.className = "confirmation-modal-text";
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "confirmation-modal-buttons";
        confirmButton = createButton({
          className: "confirm",
          textKey: "common.confirm",
          icon: confirmIcon,
          onClick: () => handleConfirmation(true)
        });
        cancelButton = createButton({
          className: "cancel",
          textKey: "common.cancel",
          icon: closeIcon,
          onClick: () => handleConfirmation(false)
        });
        buttonContainer.append(cancelButton, confirmButton);
        modalContent.append(iconContainer, textContainer, buttonContainer);
        modalContainer.append(modalContent);
        uiContainer.append(modalContainer);
        modalContainer.addEventListener(
          "click",
          (e) => {
            if (e.target === modalContainer) {
              handleConfirmation(false);
            }
          },
          { signal }
        );
      }
      modalContainer.querySelector(".confirmation-modal-icon").replaceChildren(createSVGFromString(iconSVG));
      modalContainer.querySelector(".confirmation-modal-text").textContent = text;
      setTimeout(() => {
        modalContainer.classList.add("is-visible");
      }, 50);
    });
  }
  function handleConfirmation(confirmed) {
    if (modalContainer) {
      modalContainer.classList.remove("is-visible");
      setTimeout(() => {
        if (confirmButton) {
          confirmButton.destroy();
          confirmButton = null;
        }
        if (cancelButton) {
          cancelButton.destroy();
          cancelButton = null;
        }
        if (controller) {
          controller.abort();
          controller = null;
        }
        modalContainer.remove();
        modalContainer = null;
        if (resolvePromise) {
          resolvePromise(confirmed);
          resolvePromise = null;
        }
      }, 300);
    }
  }
  // src/assets/icons/warningIcon.js
  var warningIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>`;
  // src/assets/icons/exportIcon.js
  var exportIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80 280-280l56-56 104 103v-407h80v407l104-103 56 56L480-80ZM146-260q-32-49-49-105T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105l-58-58q22-37 33-78t11-84q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 43 11 84t33 78l-58 58Z"/></svg>`;
  // src/features/export/ui.js
  var exportBtn;
  var unsubscribeLanguageChanged3;
  function rerenderExportTexts() {
    if (exportBtn) {
      exportBtn.updateText("common.export");
    }
  }
  function createExportButton() {
    const container = document.createElement("div");
    container.className = "tc-export-btn-container";
    exportBtn = createButton({
      className: "text-extractor-export-btn",
      textKey: "common.export",
      icon: exportIcon,
      disabled: true,
      onClick: () => {
        log(t("log.exporter.buttonClicked", { format: "auto" }));
        fire("exportToFile", {});
      }
    });
    container.appendChild(exportBtn);
    unsubscribeLanguageChanged3 = on("languageChanged", rerenderExportTexts);
    container.destroy = () => {
      if (exportBtn) {
        exportBtn.destroy();
        exportBtn = null;
      }
      if (unsubscribeLanguageChanged3) {
        unsubscribeLanguageChanged3();
        unsubscribeLanguageChanged3 = null;
      }
      log(t("log.exporter.uiCleanedUp"));
    };
    return container;
  }
  function updateExportButtonState(hasContent) {
    if (exportBtn) {
      exportBtn.disabled = !hasContent;
    }
  }
  // src/shared/ui/mainModal/modalFooter.js
  var clearBtn;
  var copyBtn;
  var exportBtnContainer;
  var aiSubmitBtn;
  var aiRetryBtn;
  var unsubscribeLanguageChanged4;
  var currentFooterMode = "quick-scan";
  function rerenderFooterTexts() {
    if (copyBtn) {
      copyBtn.updateText("common.copy");
    }
    if (clearBtn) {
      clearBtn.updateText("common.clear");
    }
    if (aiSubmitBtn) aiSubmitBtn.updateText("ai.actions.submitPending");
    if (aiRetryBtn) aiRetryBtn.updateText("ai.actions.retryReview");
    updateStatistics();
  }
  function populateModalFooter(modalFooter, updateContentCallback) {
    const statsContainer2 = document.createElement("div");
    statsContainer2.className = "tc-stats-container";
    setStatsContainer(statsContainer2);
    const footerButtonContainer = document.createElement("div");
    footerButtonContainer.className = "tc-footer-buttons";
    const handleCopyClick = () => {
      const textToCopy = outputTextarea.value;
      if (textToCopy && !copyBtn.disabled) {
        log(t("log.ui.copyButton.copied", { count: textToCopy.length }));
        setClipboard(textToCopy);
        showNotification(t("notifications.copiedToClipboard"), { type: "success" });
      } else {
        log(t("log.ui.copyButton.nothingToCopy"));
        showNotification(t("notifications.nothingToCopy"), { type: "info" });
      }
    };
    const handleClearClick = async () => {
      if (clearBtn.disabled) return;
      log(t("log.ui.modal.clearContent"));
      const confirmed = await showConfirmationModal(t("confirmation.clear"), warningIcon);
      if (confirmed) {
        const currentMode3 = currentMode;
        log(t("log.ui.modal.clearingContent", { mode: currentMode3 }));
        if (currentMode3 === "session-scan") {
          fire("clearSessionScan");
        } else if (currentMode3 === "element-scan") {
          fire("clearElementScan");
        } else if (currentMode3 === "ai-scan") {
          fire("ai-clear");
        }
        updateScanCount(0, null);
        updateContentCallback(SHOW_PLACEHOLDER, true, currentMode3);
        showNotification(t("notifications.contentCleared"), { type: "success" });
      } else {
        log(t("log.ui.confirmationModal.cancelled"));
      }
    };
    copyBtn = createButton({
      className: "text-extractor-copy-btn",
      textKey: "common.copy",
      icon: copyIcon,
      onClick: handleCopyClick,
      disabled: true
    });
    clearBtn = createButton({
      className: "text-extractor-clear-btn",
      textKey: "common.clear",
      icon: clearIcon,
      onClick: handleClearClick,
      disabled: true
    });
    exportBtnContainer = createExportButton();
    aiSubmitBtn = createButton({
      className: "ai-submit-btn",
      textKey: "ai.actions.submitPending",
      icon: aiIcon,
      onClick: () => fire("ai-submit-pending"),
      disabled: true
    });
    aiRetryBtn = createButton({
      className: "ai-retry-btn",
      textKey: "ai.actions.retryReview",
      icon: aiIcon,
      onClick: () => fire("ai-retry-review"),
      disabled: true
    });
    footerButtonContainer.appendChild(exportBtnContainer);
    footerButtonContainer.appendChild(aiRetryBtn);
    footerButtonContainer.appendChild(aiSubmitBtn);
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);
    modalFooter.appendChild(statsContainer2);
    modalFooter.appendChild(footerButtonContainer);
    unsubscribeLanguageChanged4 = on("languageChanged", rerenderFooterTexts);
  }
  function setModalFooterMode(mode) {
    currentFooterMode = mode;
    aiSubmitBtn?.classList.toggle("is-visible", mode === "ai-scan");
    aiRetryBtn?.classList.toggle("is-visible", mode === "ai-scan");
  }
  function updateAiFooterState(snapshot) {
    if (!snapshot) return;
    if (clearBtn && currentFooterMode === "ai-scan") {
      clearBtn.disabled = (snapshot.counts?.total || 0) === 0;
    }
    if (aiSubmitBtn) {
      aiSubmitBtn.disabled = snapshot.processing || (snapshot.counts?.pending || 0) === 0;
    }
    if (aiRetryBtn) {
      const retryCount = (snapshot.counts?.review || 0) + (snapshot.counts?.failed || 0);
      aiRetryBtn.disabled = snapshot.processing || retryCount === 0;
    }
    if (currentFooterMode !== "ai-scan") return;
  }
  function updateStatistics() {
    if (!statsContainer || !outputTextarea) return;
    requestAnimationFrame(() => {
      const text = outputTextarea.value;
      const lineCount = text.split("\n").length;
      const charCount = text.length;
      statsContainer.textContent = `${t("results.stats.lines")}: ${lineCount} | ${t("results.stats.chars")}: ${charCount}`;
    });
  }
  // src/shared/ui/mainModal/lineNumberLogic.js
  var stringLinesCache = /* @__PURE__ */ new Map();
  var lastCacheWidth = 0;
  var lastTextValue = null;
  var lastSplitLines = [];
  function calcStringLines(sentence, width) {
    if (!width || !canvasContext) return 1;
    if (width !== lastCacheWidth) {
      stringLinesCache.clear();
      lastCacheWidth = width;
    }
    const cacheKey = sentence;
    if (stringLinesCache.has(cacheKey)) {
      return stringLinesCache.get(cacheKey);
    }
    let lineCount = 0;
    let currentLine = "";
    if (canvasContext.measureText(sentence).width <= width) {
      lineCount = 1;
      stringLinesCache.set(cacheKey, 1);
      return 1;
    }
    for (let i = 0; i < sentence.length; i++) {
      const char = sentence[i];
      if (canvasContext.measureText(currentLine + char).width > width) {
        lineCount++;
        currentLine = char;
      } else {
        currentLine += char;
      }
    }
    if (currentLine !== "" || sentence === "") {
      lineCount++;
    }
    stringLinesCache.set(cacheKey, lineCount);
    return lineCount;
  }
  function calcLines() {
    const settings = loadSettings();
    const currentValue = outputTextarea.value;
    let lines;
    if (currentValue === lastTextValue) {
      lines = lastSplitLines;
    } else {
      lines = currentValue.split("\n");
      lastTextValue = currentValue;
      lastSplitLines = lines;
    }
    let lineNumbers = [];
    let lineMap = [];
    if (settings.enableWordWrap) {
      const textareaStyles = window.getComputedStyle(outputTextarea);
      const paddingLeft = parseFloat(textareaStyles.paddingLeft);
      const paddingRight = parseFloat(textareaStyles.paddingRight);
      const textareaContentWidth = outputTextarea.clientWidth - paddingLeft - paddingRight;
      lines.forEach((lineString, realLineIndex) => {
        const numLinesOfSentence = calcStringLines(lineString, textareaContentWidth);
        lineNumbers.push(realLineIndex + 1);
        lineMap.push(realLineIndex);
        if (numLinesOfSentence > 1) {
          for (let i = 0; i < numLinesOfSentence - 1; i++) {
            lineNumbers.push("");
            lineMap.push(realLineIndex);
          }
        }
      });
    } else {
      const totalLines = lines.length;
      for (let i = 0; i < totalLines; i++) {
        lineNumbers.push(i + 1);
        lineMap.push(i);
      }
    }
    return { lineNumbers, lineMap };
  }
  function _performActiveLineUpdate() {
    if (!lineNumbersDiv || !lineNumbersDiv.classList.contains("is-visible") || !outputTextarea)
      return;
    const settings = loadSettings();
    const textarea = outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;
    let cursorRealLineIndex = 0;
    for (let i = 0; i < selectionEnd; i++) {
      if (text[i] === "\n") {
        cursorRealLineIndex++;
      }
    }
    let finalVisualLineIndex = -1;
    if (settings.enableWordWrap) {
      let realLines;
      if (text === lastTextValue) {
        realLines = lastSplitLines;
      } else {
        realLines = text.split("\n");
        lastTextValue = text;
        lastSplitLines = realLines;
      }
      let positionInRealLine = selectionEnd;
      for (let i = 0; i < cursorRealLineIndex; i++) {
        positionInRealLine -= realLines[i].length + 1;
      }
      const textareaStyles = window.getComputedStyle(textarea);
      const paddingLeft = parseFloat(textareaStyles.paddingLeft);
      const paddingRight = parseFloat(textareaStyles.paddingRight);
      const textareaContentWidth = textarea.clientWidth - paddingLeft - paddingRight;
      const lineContent = realLines[cursorRealLineIndex];
      let visualLineOffset = 0;
      let currentLine = "";
      for (let i = 0; i < lineContent.length; i++) {
        const char = lineContent[i];
        const nextLine = currentLine + char;
        if (canvasContext.measureText(nextLine).width > textareaContentWidth) {
          visualLineOffset++;
          currentLine = char;
        } else {
          currentLine = nextLine;
        }
        if (i >= positionInRealLine - 1 && positionInRealLine > 0) {
          break;
        }
      }
      const firstVisualIndexOfRealLine = currentLineMap.indexOf(cursorRealLineIndex);
      if (firstVisualIndexOfRealLine !== -1) {
        finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;
      }
    } else {
      finalVisualLineIndex = cursorRealLineIndex;
    }
    const lineDivs = lineNumbersDiv.children;
    for (let i = 0; i < lineDivs.length; i++) {
      lineDivs[i].classList.remove("is-active");
    }
    if (finalVisualLineIndex !== -1 && lineDivs[finalVisualLineIndex]) {
      lineDivs[finalVisualLineIndex].classList.add("is-active");
    }
  }
  var isUpdateActiveLineScheduled = false;
  function updateActiveLine() {
    if (isUpdateActiveLineScheduled) return;
    isUpdateActiveLineScheduled = true;
    requestAnimationFrame(() => {
      _performActiveLineUpdate();
      isUpdateActiveLineScheduled = false;
    });
  }
  var isThrottled = false;
  function updateLineNumbers() {
    if (!lineNumbersDiv || !outputTextarea || isThrottled) return;
    isThrottled = true;
    requestAnimationFrame(() => {
      const { lineNumbers, lineMap } = calcLines();
      setCurrentLineMap(lineMap);
      const currentLineCount = lineNumbersDiv.children.length;
      const newLineCount = lineNumbers.length;
      for (let i = 0; i < newLineCount; i++) {
        const lineText = lineNumbers[i] === "" ? "\xA0" : lineNumbers[i];
        if (i < currentLineCount) {
          if (lineNumbersDiv.children[i].textContent !== lineText) {
            lineNumbersDiv.children[i].textContent = lineText;
          }
        } else {
          const div = document.createElement("div");
          div.textContent = lineText;
          div.classList.add("line-number-enter-active");
          lineNumbersDiv.appendChild(div);
          div.addEventListener(
            "animationend",
            () => {
              div.classList.remove("line-number-enter-active");
            },
            { once: true }
          );
        }
      }
      if (newLineCount < currentLineCount) {
        for (let i = currentLineCount - 1; i >= newLineCount; i--) {
          lineNumbersDiv.removeChild(lineNumbersDiv.children[i]);
        }
      }
      if (newLineCount > 0) {
        const maxLineNumber = lineNumbers[lineNumbers.length - 1];
        let maxNumStr = String(maxLineNumber);
        if (maxLineNumber === "") {
          for (let k = lineNumbers.length - 1; k >= 0; k--) {
            if (lineNumbers[k] !== "") {
              maxNumStr = String(lineNumbers[k]);
              break;
            }
          }
        }
        const textWidth = canvasContext.measureText(maxNumStr).width;
        const newWidth = Math.max(40, Math.ceil(textWidth + 12));
        lineNumbersDiv.style.setProperty("--line-number-width", `${newWidth}px`);
      }
      _performActiveLineUpdate();
      isThrottled = false;
    });
  }
  function initializeLineNumbers() {
    const canvas = document.createElement("canvas");
    const canvasContext2 = canvas.getContext("2d");
    const textareaStyles = window.getComputedStyle(outputTextarea);
    canvasContext2.font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    setCanvasContext(canvasContext2);
    const resizeObserver = new ResizeObserver(() => {
      if (!lineNumbersDiv || !outputTextarea) return;
      lineNumbersDiv.style.height = outputTextarea.clientHeight + "px";
      updateLineNumbers();
    });
    resizeObserver.observe(outputTextarea);
  }
  // src/shared/ui/mainModal/index.js
  var fullQuickScanContent = "";
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeModal();
    }
  };
  function createMainModal() {
    if (modalOverlay) return;
    const { modalHeader, modalContent, modalFooter } = createModalLayout();
    populateModalHeader(modalHeader, closeModal);
    populateModalContent(modalContent);
    populateModalFooter(modalFooter, updateModalContent);
    initializeLineNumbers();
    const handleTextareaUpdate2 = () => {
      updateLineNumbers();
      updateStatistics();
    };
    outputTextarea.addEventListener("input", handleTextareaUpdate2);
    outputTextarea.addEventListener("click", updateActiveLine);
    outputTextarea.addEventListener("keyup", updateActiveLine);
    outputTextarea.addEventListener("scroll", () => {
      lineNumbersDiv.scrollTop = outputTextarea.scrollTop;
    });
    updateModalAddonsVisibility();
  }
  async function openModal() {
    if (!modalOverlay) {
      console.error(t("notifications.modalInitError"));
      return;
    }
    log(t("log.ui.modal.opening"));
    updateModalContent(SHOW_LOADING, true, "quick-scan");
    try {
      const { formattedText, count } = await performQuickScan();
      hideLoading();
      fullQuickScanContent = formattedText;
      updateModalContent(formattedText, false, "quick-scan");
      const notificationText = simpleTemplate(t("scan.quickFinished"), { count });
      showNotification(notificationText, { type: "success" });
    } catch (error) {
      hideLoading();
      log(t("log.ui.modal.scanFailed", { error: error.message }));
      showNotification(t("scan.quickFailed"), { type: "error" });
      updateModalContent("[]", false, "quick-scan");
    }
  }
  function closeModal() {
    if (modalOverlay && modalOverlay.classList.contains("is-visible")) {
      log(t("log.ui.modal.closing"));
      modalOverlay.classList.remove("is-visible");
      modalOverlay.removeEventListener("keydown", handleKeyDown);
      fire("modalClosed");
    }
  }
  function updateModalContent(content, shouldOpen = false, mode = "quick-scan") {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    setCurrentMode(mode);
    setModalHeaderMode(mode);
    setModalContentMode(mode);
    setModalFooterMode(mode);
    const copyBtn2 = modalOverlay.querySelector(".text-extractor-copy-btn");
    const clearBtn2 = modalOverlay.querySelector(".text-extractor-clear-btn");
    const textareaContainer = outputTextarea.parentElement;
    const setButtonsDisabled = (disabled) => {
      if (copyBtn2) copyBtn2.disabled = disabled;
      if (clearBtn2) {
        clearBtn2.disabled = disabled;
      }
      updateExportButtonState(!disabled);
    };
    if (content === SHOW_LOADING) {
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      outputTextarea.value = "";
      outputTextarea.readOnly = true;
      showLoading();
      setButtonsDisabled(true);
    } else if (content === SHOW_PLACEHOLDER) {
      hideLoading();
      const isAiMode = mode === "ai-scan";
      textareaContainer.classList.toggle("is-visible", isAiMode);
      placeholder.classList.toggle("is-visible", !isAiMode);
      if (isAiMode) {
        outputTextarea.value = "";
        outputTextarea.readOnly = false;
        updateLineNumbers();
        updateStatistics();
        updateActiveLine();
      } else {
        outputTextarea.readOnly = true;
      }
      setButtonsDisabled(true);
    } else {
      hideLoading();
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      const settings = loadSettings();
      let displayText = content;
      if (mode !== "ai-scan" && settings.enableTextTruncation && content.length > settings.textTruncationLength) {
        displayText = content.substring(0, settings.textTruncationLength);
        const warningMessage = t("scan.truncationWarning");
        displayText += `
--- ${warningMessage} ---`;
      }
      const isData = content && content.trim().length > 0;
      if (!isData || content === t("results.noSummary")) {
        updateScanCount(0, mode);
      }
      requestAnimationFrame(() => {
        outputTextarea.value = displayText;
        setButtonsDisabled(!isData);
        outputTextarea.readOnly = mode !== "ai-scan" && !isData;
        if (mode === "ai-scan") {
          updateLineNumbers();
          updateStatistics();
        } else {
          outputTextarea.dispatchEvent(new Event("input"));
        }
        updateActiveLine();
      });
    }
    updateModalAddonsVisibility();
    if (shouldOpen) {
      modalOverlay.classList.add("is-visible");
      modalOverlay.addEventListener("keydown", handleKeyDown);
      modalOverlay.addEventListener(
        "transitionend",
        () => {
          modalOverlay.focus();
        },
        { once: true }
      );
    }
  }
  function updateModalAddonsVisibility() {
    if (!modalOverlay) return;
    const settings = loadSettings();
    if (lineNumbersDiv) {
      lineNumbersDiv.classList.toggle("is-visible", settings.showLineNumbers);
    }
    if (statsContainer) {
      const hasContent = outputTextarea && outputTextarea.parentElement.classList.contains("is-visible");
      statsContainer.classList.toggle("is-visible", settings.showStatistics && hasContent);
    }
    if (outputTextarea) {
      outputTextarea.classList.toggle("word-wrap-disabled", !settings.enableWordWrap);
    }
  }
  // src/shared/services/ai/contracts.js
  var AI_ACTIONS = Object.freeze({
    TRANSLATE: "translate",
    KEEP: "keep",
    REMOVE: "remove",
    REVIEW: "review"
  });
  var AI_TRANSLATION_TYPES = Object.freeze({
    TEXT: "text",
    REGEX: "regex"
  });
  var AI_CANDIDATE_STATUS = Object.freeze({
    PENDING: "pending",
    IN_FLIGHT: "inflight",
    TRANSLATED: "translated",
    KEEP: "keep",
    REMOVED: "removed",
    REVIEW: "review",
    FAILED: "failed"
  });
  var AI_PROCESSING_MODES = Object.freeze({
    AUTO: "auto",
    MANUAL: "manual"
  });
  var AI_TARGET_LANGUAGES = Object.freeze({
    SIMPLIFIED_CHINESE: "zh-CN",
    TRADITIONAL_CHINESE: "zh-TW"
  });
  var AI_RESPONSE_MODES = Object.freeze({
    JSON: "json-mode",
    PROMPT_JSON: "prompt-json"
  });
  var AI_SETTINGS_VERSION = 4;
  var DEFAULT_DEEPSEEK_PROVIDER = Object.freeze({
    id: "deepseek",
    name: "DeepSeek",
    apiUrl: "https://api.deepseek.com/chat/completions",
    model: "deepseek-v4-flash",
    protocol: "openai-chat-completions",
    responseMode: AI_RESPONSE_MODES.JSON
  });
  var AI_DEFAULT_SETTINGS = Object.freeze({
    version: AI_SETTINGS_VERSION,
    enabled: true,
    processingMode: AI_PROCESSING_MODES.MANUAL,
    targetLanguage: AI_TARGET_LANGUAGES.SIMPLIFIED_CHINESE,
    confidenceThreshold: 0.85,
    includeRegexRuleComments: false,
    activeProviderId: DEFAULT_DEEPSEEK_PROVIDER.id,
    providers: [DEFAULT_DEEPSEEK_PROVIDER],
    requestTimeoutMs: 45e3,
    batch: {
      maxItems: 200,
      maxCharacters: 6e4,
      maxEstimatedOutputTokens: 32768,
      debounceMs: 1200
    },
    budget: {
      maxRequestsPerSession: 100,
      maxCharactersPerSession: 2e5,
      maxEstimatedTokensPerDay: 1e5
    }
  });
  var ALLOWED_TARGETS = new Set(Object.values(AI_TARGET_LANGUAGES));
  var ALLOWED_PROCESSING_MODES = new Set(Object.values(AI_PROCESSING_MODES));
  var ALLOWED_RESPONSE_MODES = new Set(Object.values(AI_RESPONSE_MODES));
  function clampNumber(value, fallback, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  }
  function normalizeProvider(provider, index = 0) {
    const fallback = index === 0 ? DEFAULT_DEEPSEEK_PROVIDER : {
      id: `custom-${index}`,
      name: `Provider ${index + 1}`,
      apiUrl: "",
      model: "",
      protocol: "openai-chat-completions",
      responseMode: AI_RESPONSE_MODES.PROMPT_JSON
    };
    const id = String(provider?.id || fallback.id).replace(/[^a-zA-Z0-9_-]/g, "-");
    return {
      id: id || fallback.id,
      name: String(provider?.name || fallback.name).trim().slice(0, 80),
      apiUrl: String(provider?.apiUrl ?? fallback.apiUrl).trim().slice(0, 2048),
      model: String(provider?.model ?? fallback.model).trim().slice(0, 120),
      protocol: "openai-chat-completions",
      responseMode: ALLOWED_RESPONSE_MODES.has(provider?.responseMode) ? provider.responseMode : fallback.responseMode
    };
  }
  function mergeAiSettings(value = {}) {
    const providers = Array.isArray(value.providers) && value.providers.length > 0 ? value.providers.map(normalizeProvider) : [normalizeProvider(DEFAULT_DEEPSEEK_PROVIDER)];
    const providerIds = new Set(providers.map((provider) => provider.id));
    const activeProviderId = providerIds.has(value.activeProviderId) ? value.activeProviderId : providers[0].id;
    const shouldMigrateBatchDefaults = Number(value.version || 1) < AI_SETTINGS_VERSION && (Number(value.batch?.maxItems) === 20 && Number(value.batch?.maxCharacters) === 6e3 || Number(value.batch?.maxItems) === 100 && Number(value.batch?.maxCharacters) === 3e4 || Number(value.batch?.maxItems) === 200 && Number(value.batch?.maxCharacters) === 6e4 && Number(value.batch?.maxEstimatedOutputTokens) === 15360);
    const batchValue = shouldMigrateBatchDefaults ? {
      ...value.batch,
      maxItems: AI_DEFAULT_SETTINGS.batch.maxItems,
      maxCharacters: AI_DEFAULT_SETTINGS.batch.maxCharacters,
      maxEstimatedOutputTokens: AI_DEFAULT_SETTINGS.batch.maxEstimatedOutputTokens
    } : value.batch;
    return {
      version: AI_SETTINGS_VERSION,
      enabled: value.enabled !== false,
      processingMode: ALLOWED_PROCESSING_MODES.has(value.processingMode) ? value.processingMode : AI_DEFAULT_SETTINGS.processingMode,
      targetLanguage: ALLOWED_TARGETS.has(value.targetLanguage) ? value.targetLanguage : AI_DEFAULT_SETTINGS.targetLanguage,
      confidenceThreshold: clampNumber(value.confidenceThreshold, AI_DEFAULT_SETTINGS.confidenceThreshold, 0.5, 1),
      includeRegexRuleComments: value.includeRegexRuleComments === true,
      activeProviderId,
      providers,
      requestTimeoutMs: clampNumber(value.requestTimeoutMs, AI_DEFAULT_SETTINGS.requestTimeoutMs, 5e3, 12e4),
      batch: {
        maxItems: Math.round(clampNumber(batchValue?.maxItems, AI_DEFAULT_SETTINGS.batch.maxItems, 1, 500)),
        maxCharacters: Math.round(
          clampNumber(batchValue?.maxCharacters, AI_DEFAULT_SETTINGS.batch.maxCharacters, 1e3, 2e5)
        ),
        maxEstimatedOutputTokens: Math.round(
          clampNumber(
            batchValue?.maxEstimatedOutputTokens,
            AI_DEFAULT_SETTINGS.batch.maxEstimatedOutputTokens,
            4096,
            131072
          )
        ),
        debounceMs: Math.round(
          clampNumber(batchValue?.debounceMs, AI_DEFAULT_SETTINGS.batch.debounceMs, 200, 1e4)
        )
      },
      budget: {
        maxRequestsPerSession: Math.round(
          clampNumber(
            value.budget?.maxRequestsPerSession,
            AI_DEFAULT_SETTINGS.budget.maxRequestsPerSession,
            1,
            500
          )
        ),
        maxCharactersPerSession: Math.round(
          clampNumber(
            value.budget?.maxCharactersPerSession,
            AI_DEFAULT_SETTINGS.budget.maxCharactersPerSession,
            1e3,
            1e6
          )
        ),
        maxEstimatedTokensPerDay: Math.round(
          clampNumber(
            value.budget?.maxEstimatedTokensPerDay,
            AI_DEFAULT_SETTINGS.budget.maxEstimatedTokensPerDay,
            1e3,
            1e7
          )
        )
      }
    };
  }
  function getActiveProvider(aiSettings) {
    return aiSettings.providers.find((provider) => provider.id === aiSettings.activeProviderId) || aiSettings.providers[0] || null;
  }
  function hashText(value) {
    let hash = 2166136261;
    const input = String(value);
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }
  function createCandidateFingerprint(siteKey, targetLanguage, sourceText) {
    const normalizedText = String(sourceText).normalize("NFC").replace(/\s+/g, " ").trim();
    return hashText(`${siteKey}\0${targetLanguage}\0${normalizedText}`);
  }
  // src/features/settings/logic.js
  var defaultSettings = {
    // 语言设置, 'auto' 表示自动检测
    language: "auto",
    // 输出格式设置, 'array' 或 'object'
    outputFormat: "array",
    // 是否在输出中包含首尾符号（如数组的 [] 或对象的 {}）
    includeArrayBrackets: true,
    // 主题设置, 可选值: 'light', 'dark', 'system'
    theme: "system",
    // 是否显示悬浮按钮
    showFab: true,
    // 悬浮按钮位置
    fabPosition: "bottom-right",
    // 是否在标题栏显示扫描计数
    showScanCount: true,
    // 是否显示行号
    showLineNumbers: true,
    // 是否显示统计信息
    showStatistics: true,
    // 是否启用文本自动换行
    enableWordWrap: false,
    // 是否启用文本截断
    enableTextTruncation: true,
    // 文本截断长度
    textTruncationLength: 5e4,
    // 是否启用调试日志
    enableDebugLogging: false,
    // -- 以下为特定扫描模式的设置 --
    // 在元素扫描中跨页时是否保留已暂存的数据
    elementScan_persistData: true,
    // 在动态扫描中跨页时是否保留已扫描的数据
    sessionScan_persistData: true,
    ai: AI_DEFAULT_SETTINGS,
    // 过滤规则设置
    filterRules: {
      // 是否过滤纯数字和货币符号组成的字符串
      numbers: true,
      // 是否过滤纯中文字符串
      chinese: true,
      // 是否过滤包含中文字符的字符串
      containsChinese: false,
      // 是否过滤纯表情符号字符串
      emojiOnly: true,
      // 是否过滤纯符号字符串
      symbols: true,
      // 是否过滤特定术语列表中的字符串
      termFilter: true,
      // 是否过滤纯单个英文字母
      singleLetter: false,
      // 是否过滤单一重复字符
      repeatingChars: true,
      // 是否过滤文件路径
      filePath: true,
      // 是否过滤十六进制颜色代码
      hexColor: true,
      // 是否过滤邮件地址
      email: true,
      // 是否过滤 UUID
      uuid: true,
      // 是否过滤 Git Commit Hash
      gitCommitHash: true,
      // 是否过滤网址
      websiteUrl: true,
      // 是否过滤带单位的简写数字
      shorthandNumber: true
    }
  };
  function applySettings(newSettings, oldSettings) {
    updateLoggerState(newSettings.enableDebugLogging);
    applyTheme(newSettings.theme);
    const languageChanged = oldSettings.language !== newSettings.language;
    if (languageChanged) {
      switchLanguage(newSettings.language);
    }
    const fabContainer = uiContainer.querySelector(".text-extractor-fab-container");
    if (fabContainer) {
      fabContainer.classList.toggle("fab-container-visible", newSettings.showFab);
    }
    updateModalAddonsVisibility();
    setTimeout(() => {
      fire("settingsSaved");
      showNotification(t("notifications.settingsSaved"), { type: "success" });
    }, 50);
  }
  function loadSettings() {
    const savedSettings = getValue("script_settings", null);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const mergedSettings = {
          ...defaultSettings,
          // 级别1：应用默认设置
          ...parsedSettings,
          // 级别2：用已保存的设置覆盖
          filterRules: {
            ...defaultSettings.filterRules,
            // 级别3：应用默认的过滤规则
            ...parsedSettings.filterRules || {}
            // 级别4：用已保存的过滤规则覆盖
          },
          ai: mergeAiSettings(parsedSettings.ai)
        };
        return mergedSettings;
      } catch (error) {
        log(t("log.settings.parseError"), error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(newSettings) {
    if (typeof newSettings !== "object" || newSettings === null) {
      log(t("log.settings.invalidObject"), newSettings);
      return;
    }
    const oldSettings = loadSettings();
    Object.keys(newSettings).forEach((key) => {
      if (key !== "filterRules" && oldSettings[key] !== newSettings[key]) {
        log(
          t("log.settings.changed", {
            key,
            oldValue: oldSettings[key],
            newValue: newSettings[key]
          })
        );
      }
    });
    const oldRules = oldSettings.filterRules || {};
    const newRules = newSettings.filterRules || {};
    const allRuleKeys = /* @__PURE__ */ new Set([...Object.keys(oldRules), ...Object.keys(newRules)]);
    allRuleKeys.forEach((key) => {
      const oldValue = !!oldRules[key];
      const newValue = !!newRules[key];
      if (oldValue !== newValue) {
        const statusKey = newValue ? "log.settings.filterRuleChanged.enabled" : "log.settings.filterRuleChanged.disabled";
        log(t(statusKey, { key }));
      }
    });
    const mergedSettings = {
      ...oldSettings,
      ...newSettings,
      filterRules: {
        ...oldSettings.filterRules,
        ...newSettings.filterRules || {}
      },
      ai: mergeAiSettings(newSettings.ai || oldSettings.ai)
    };
    setValue("script_settings", JSON.stringify(mergedSettings));
    return mergedSettings;
  }
  // src/shared/services/scanModeCoordinator.js
  var SCAN_MODES = Object.freeze({
    IDLE: "idle",
    DYNAMIC: "normal-dynamic",
    STATIC: "static",
    ELEMENT: "element",
    AI: "ai"
  });
  var activeMode = SCAN_MODES.IDLE;
  var listeners = /* @__PURE__ */ new Set();
  function notify(previousMode) {
    listeners.forEach((listener) => {
      listener({ activeMode, previousMode });
    });
  }
  function canAcquireScanMode(mode) {
    return activeMode === SCAN_MODES.IDLE || activeMode === mode;
  }
  function acquireScanMode(mode) {
    if (!Object.values(SCAN_MODES).includes(mode) || mode === SCAN_MODES.IDLE) {
      return false;
    }
    if (!canAcquireScanMode(mode)) {
      return false;
    }
    if (activeMode === mode) {
      return true;
    }
    const previousMode = activeMode;
    activeMode = mode;
    notify(previousMode);
    return true;
  }
  function releaseScanMode(mode) {
    if (activeMode !== mode) {
      return false;
    }
    const previousMode = activeMode;
    activeMode = SCAN_MODES.IDLE;
    notify(previousMode);
    return true;
  }
  function subscribeScanMode(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  // src/shared/ui/components/fabExclusiveState.js
  var snapshots = /* @__PURE__ */ new Map();
  function applyAiExclusiveFabState(fabs, isAiActive, setDisabled, setTooltip) {
    const ordinaryFabs = fabs.filter(Boolean);
    if (isAiActive) {
      ordinaryFabs.forEach((fab) => {
        if (!snapshots.has(fab)) {
          snapshots.set(fab, {
            disabled: Boolean(fab.disabled),
            hadDisabledClass: fab.classList.contains("fab-disabled"),
            ariaDisabled: fab.getAttribute("aria-disabled"),
            tabIndex: fab.tabIndex,
            tooltipKey: fab.dataset.tooltipKey
          });
        }
        setDisabled(fab, true, "tooltip.disabled.ai_scan_active");
      });
      return;
    }
    ordinaryFabs.forEach((fab) => {
      const snapshot = snapshots.get(fab);
      if (!snapshot) return;
      fab.disabled = snapshot.disabled;
      fab.classList.toggle("fab-disabled", snapshot.hadDisabledClass);
      fab.setAttribute("aria-disabled", snapshot.ariaDisabled || String(snapshot.disabled));
      fab.tabIndex = snapshot.tabIndex;
      setTooltip(fab, snapshot.tooltipKey);
      snapshots.delete(fab);
    });
  }
  // src/shared/ui/components/fab.js
  var summaryFab;
  var aiFab;
  var dynamicFab;
  var staticFab;
  var elementScanFab;
  var unsubscribeScanMode = null;
  function syncAiFabAvailability() {
    if (!aiFab) return;
    const enabled = loadSettings().ai?.enabled !== false;
    aiFab.classList.toggle("fab-feature-hidden", !enabled);
    aiFab.setAttribute("aria-hidden", String(!enabled));
    const tooltipKey = !enabled ? "tooltip.ai_disabled" : aiFab.classList.contains("is-recording") ? "tooltip.ai_scan_stop" : "tooltip.ai_scan";
    setFabDisabled(aiFab, !enabled, tooltipKey);
  }
  function createSingleFab(className, iconSVGString, titleKey, onClick) {
    const fab = document.createElement("div");
    fab.className = `text-extractor-fab ${className}`;
    fab.setAttribute("role", "button");
    fab.setAttribute("aria-disabled", "false");
    fab.setAttribute("aria-label", t(titleKey));
    fab.tabIndex = 0;
    const svgIcon = createSVGFromString(iconSVGString);
    if (svgIcon) {
      fab.appendChild(svgIcon);
    }
    fab.dataset.tooltipKey = titleKey;
    fab.addEventListener("click", (event) => {
      if (fab.classList.contains("fab-disabled")) {
        event.stopPropagation();
        return;
      }
      onClick(event);
    });
    fab.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      fab.click();
    });
    fab.addEventListener("mouseenter", () => {
      showTooltip(fab, t(fab.dataset.tooltipKey));
    });
    fab.addEventListener("mouseleave", () => {
      hideTooltip();
    });
    fab.style.pointerEvents = "auto";
    return fab;
  }
  function createFab({ callbacks, isVisible }) {
    const { onStaticExtract, onDynamicExtract, onSummary, onElementScan, onAiScan } = callbacks;
    const fabContainer = document.createElement("div");
    fabContainer.className = "text-extractor-fab-container";
    summaryFab = createSingleFab("fab-summary", summaryIcon, "tooltip.summary", onSummary);
    aiFab = createSingleFab("fab-ai-scan", aiIcon, "tooltip.ai_scan", () => onAiScan(aiFab));
    dynamicFab = createSingleFab(
      "fab-dynamic",
      dynamicIcon,
      "tooltip.dynamic_scan",
      () => onDynamicExtract(dynamicFab)
      // 将fab元素本身传回去，方便UI更新
    );
    staticFab = createSingleFab("fab-static", translateIcon, "tooltip.static_scan", onStaticExtract);
    elementScanFab = createSingleFab(
      "fab-element-scan",
      elementScanIcon,
      "tooltip.element_scan",
      () => onElementScan(elementScanFab)
    );
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(aiFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    fabContainer.appendChild(elementScanFab);
    uiContainer.appendChild(fabContainer);
    syncAiFabAvailability();
    if (isVisible) {
      setTimeout(() => {
        fabContainer.classList.add("fab-container-visible");
      }, appConfig.ui.fabAnimationDelay);
    }
    updateFabPosition(fabContainer);
    on("settingsSaved", () => {
      updateFabPosition(fabContainer);
      syncAiFabAvailability();
    });
    on("languageChanged", () => {
      [summaryFab, aiFab, dynamicFab, staticFab, elementScanFab].forEach((fab) => {
        if (fab?.dataset.tooltipKey) fab.setAttribute("aria-label", t(fab.dataset.tooltipKey));
      });
    });
    if (unsubscribeScanMode) unsubscribeScanMode();
    unsubscribeScanMode = subscribeScanMode(({ activeMode: activeMode2 }) => {
      applyAiExclusiveFabState(
        [dynamicFab, staticFab, elementScanFab],
        activeMode2 === SCAN_MODES.AI,
        setFabDisabled,
        updateFabTooltip
      );
    });
  }
  function setFabDisabled(fabElement, disabled, tooltipKey = null) {
    if (!fabElement) return;
    fabElement.disabled = Boolean(disabled);
    fabElement.classList.toggle("fab-disabled", Boolean(disabled));
    fabElement.setAttribute("aria-disabled", String(Boolean(disabled)));
    fabElement.tabIndex = disabled ? -1 : 0;
    if (tooltipKey) updateFabTooltip(fabElement, tooltipKey);
  }
  function updateFabPosition(fabContainer) {
    if (!fabContainer) return;
    const settings = loadSettings();
    const position = settings.fabPosition || "bottom-right";
    fabContainer.classList.remove(
      "fab-position-bottom-right",
      "fab-position-top-right",
      "fab-position-bottom-left",
      "fab-position-top-left"
    );
    fabContainer.classList.add(`fab-position-${position}`);
  }
  function setFabIcon(fabElement, iconSVGString) {
    while (fabElement.firstChild) {
      fabElement.removeChild(fabElement.firstChild);
    }
    const newIcon = createSVGFromString(iconSVGString);
    if (newIcon) {
      fabElement.appendChild(newIcon);
    }
  }
  function getDynamicFab() {
    return dynamicFab;
  }
  function getAiFab() {
    return aiFab;
  }
  function getElementScanFab() {
    return elementScanFab;
  }
  function updateFabTooltip(fabElement, newTooltipKey) {
    if (fabElement) {
      fabElement.dataset.tooltipKey = newTooltipKey;
      fabElement.setAttribute("aria-label", t(newTooltipKey));
    }
  }
  // src/features/quick-scan/ui.js
  async function handleQuickScanClick() {
    if (!acquireScanMode(SCAN_MODES.STATIC)) {
      showNotification(t("notifications.scanModeConflict"), { type: "info" });
      return;
    }
    log(t("scan.quick"));
    try {
      await openModal();
    } finally {
      releaseScanMode(SCAN_MODES.STATIC);
    }
  }
  // src/features/session-scan/fallback.js
  var sessionTexts = /* @__PURE__ */ new Set();
  var filterRules = {};
  function initFallback(rules) {
    filterRules = rules || {};
    log(t("log.sessionScan.fallback.initialized"));
  }
  function processTextsInFallback(texts, logPrefix = "") {
    const originalSize = sessionTexts.size;
    const logFiltered = (text, reason) => {
      const prefix = logPrefix ? `${logPrefix} ` : "";
      log(prefix + t("log.textProcessor.filtered", { text, reason }));
    };
    const processedTexts = filterAndNormalizeTexts(texts, filterRules, true, logFiltered);
    processedTexts.forEach((text) => sessionTexts.add(text));
    return sessionTexts.size > originalSize;
  }
  function getCountInFallback() {
    return sessionTexts.size;
  }
  function getSummaryInFallback() {
    const textsArray = Array.from(sessionTexts);
    const { outputFormat, includeArrayBrackets } = loadSettings();
    return formatTextsForTranslation(textsArray, outputFormat, { includeArrayBrackets });
  }
  function clearInFallback() {
    sessionTexts.clear();
    log(t("log.sessionScan.fallback.cleared"));
  }
  // src/shared/services/sessionPersistence.js
  var SESSION_KEY = "qing_pagescanner_session";
  var RESUME_TIMEOUT_MS = 3e5;
  var isPersistenceEnabled = false;
  function enablePersistence() {
    isPersistenceEnabled = true;
  }
  async function saveActiveSession(mode, data = null) {
    if (!isPersistenceEnabled) {
      log(t("log.persistence.saveBlocked"));
      return;
    }
    let sessionData = data;
    if (mode === "session-scan") {
      const textsMirror = getSessionTexts();
      sessionData = Array.from(textsMirror);
    }
    const sessionState = {
      mode,
      data: sessionData,
      timestamp: Date.now()
    };
    await setValue(SESSION_KEY, JSON.stringify(sessionState));
  }
  async function clearActiveSession() {
    isPersistenceEnabled = false;
    await deleteValue(SESSION_KEY);
  }
  async function loadAndResumeSession() {
    const savedSessionJSON = await getValue(SESSION_KEY, null);
    if (!savedSessionJSON) {
      return;
    }
    await deleteValue(SESSION_KEY);
    try {
      const state = JSON.parse(savedSessionJSON);
      if (Date.now() - state.timestamp > RESUME_TIMEOUT_MS) {
        log(t("log.persistence.staleSession"));
        return;
      }
      fire("resumeScanSession", state);
    } catch (e) {
      log(t("log.persistence.parseError"), e);
      await clearActiveSession();
    }
  }
  // src/shared/services/translationBridge.js
  var TRANSLATION_STATE_ATTRIBUTE = "data-qing-web-translate-state";
  var TRANSLATION_STATE_EVENT = "qing-web-translate:state";
  var TRANSLATION_IDLE_STATE = "idle";
  var TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS = 1e4;
  var TRANSLATION_BRIDGE_MAX_WAIT_MS = 6e4;
  var TRANSLATION_CLIENT_ATTRIBUTE = "data-qing-page-scanner-client";
  var TRANSLATION_CLIENT_EVENT = "qing-page-scanner:client-ready";
  var TRANSLATION_CLIENT_VALUE = "active";
  function getTranslationBridgeState() {
    return document.documentElement?.getAttribute(TRANSLATION_STATE_ATTRIBUTE) ?? null;
  }
  function isTranslationBridgeActive() {
    return getTranslationBridgeState() !== null;
  }
  function isTranslationBridgeIdle() {
    const state = getTranslationBridgeState();
    return state === null || state === TRANSLATION_IDLE_STATE;
  }
  function registerTranslationBridgeClient() {
    const root = document.documentElement;
    if (!root) return false;
    root.setAttribute(TRANSLATION_CLIENT_ATTRIBUTE, TRANSLATION_CLIENT_VALUE);
    document.dispatchEvent(new CustomEvent(TRANSLATION_CLIENT_EVENT));
    return true;
  }
  function unregisterTranslationBridgeClient() {
    const root = document.documentElement;
    if (!root) return;
    root.removeAttribute(TRANSLATION_CLIENT_ATTRIBUTE);
    root.removeAttribute(TRANSLATION_STATE_ATTRIBUTE);
  }
  function onTranslationBridgeStateChange(callback) {
    const handler = () => callback(getTranslationBridgeState());
    document.addEventListener(TRANSLATION_STATE_EVENT, handler);
    return () => {
      document.removeEventListener(TRANSLATION_STATE_EVENT, handler);
    };
  }
  function waitForTranslationBridgeIdle(timeoutMs = TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS) {
    if (isTranslationBridgeIdle()) {
      return Promise.resolve({ timedOut: false });
    }
    return new Promise((resolve) => {
      let timeoutId = null;
      const cleanup = () => {
        document.removeEventListener(TRANSLATION_STATE_EVENT, handleStateChange);
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      };
      const finish = (timedOut) => {
        cleanup();
        resolve({ timedOut });
      };
      const handleStateChange = () => {
        if (isTranslationBridgeIdle()) {
          finish(false);
        }
      };
      document.addEventListener(TRANSLATION_STATE_EVENT, handleStateChange);
      if (isTranslationBridgeIdle()) {
        finish(false);
        return;
      }
      timeoutId = setTimeout(() => finish(true), timeoutMs);
    });
  }
  // src/features/session-scan/logic.js
  var isRecording = false;
  var isPaused = false;
  var observer = null;
  var worker = null;
  var useFallback = false;
  var onSummaryCallback = null;
  var onUpdateCallback = null;
  var currentCount = 0;
  var sessionTextsMirror = /* @__PURE__ */ new Set();
  var autoSaveInterval = null;
  var AUTO_SAVE_INTERVAL_MS = 5e3;
  var pendingDynamicRoots = /* @__PURE__ */ new Set();
  var pendingDynamicFlushTimeout = null;
  var pendingDynamicWaitStartedAt = null;
  function clearPendingDynamicRoots() {
    pendingDynamicRoots.clear();
    pendingDynamicWaitStartedAt = null;
    if (pendingDynamicFlushTimeout !== null) {
      clearTimeout(pendingDynamicFlushTimeout);
      pendingDynamicFlushTimeout = null;
    }
  }
  function processDynamicTexts(textsBatch) {
    if (textsBatch.length === 0) return;
    const logPrefix = "\u52A8\u6001\u65B0\u53D1\u73B0";
    if (useFallback) {
      if (processTextsInFallback(textsBatch, logPrefix)) {
        const count = getCountInFallback();
        if (onUpdateCallback) onUpdateCallback(count);
        updateScanCount(count, "session");
        saveActiveSession("session-scan");
      }
    } else if (worker) {
      worker.postMessage({
        type: "session-add-texts",
        payload: { texts: textsBatch }
      });
    }
  }
  function flushPendingDynamicRoots() {
    if (!isRecording || pendingDynamicRoots.size === 0) return;
    const pendingRoots2 = Array.from(pendingDynamicRoots);
    const pendingRootSet = new Set(pendingRoots2);
    const roots = pendingRoots2.filter((root) => {
      let parent = root.parentElement;
      while (parent) {
        if (pendingRootSet.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });
    clearPendingDynamicRoots();
    const textsBatch = [];
    const ignoredSelectorString2 = appConfig.scanner.ignoredSelectors.join(", ");
    roots.forEach((root) => {
      if (!root.isConnected || root.closest(ignoredSelectorString2)) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (walker.currentNode.nodeValue) {
          textsBatch.push(walker.currentNode.nodeValue);
        }
      }
    });
    processDynamicTexts(textsBatch);
  }
  function scheduleDynamicFlushFallback() {
    if (pendingDynamicFlushTimeout !== null) return;
    if (pendingDynamicWaitStartedAt === null) {
      pendingDynamicWaitStartedAt = performance.now();
    }
    pendingDynamicFlushTimeout = setTimeout(() => {
      pendingDynamicFlushTimeout = null;
      const bridgeStillBusy = isTranslationBridgeActive() && !isTranslationBridgeIdle();
      const waitedTooLong = pendingDynamicWaitStartedAt !== null && performance.now() - pendingDynamicWaitStartedAt >= TRANSLATION_BRIDGE_MAX_WAIT_MS;
      if (!bridgeStillBusy || waitedTooLong) {
        flushPendingDynamicRoots();
      } else {
        scheduleDynamicFlushFallback();
      }
    }, TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS);
  }
  function handleTranslationBridgeStateChange(state) {
    if (state === TRANSLATION_IDLE_STATE) {
      flushPendingDynamicRoots();
    }
  }
  onTranslationBridgeStateChange(handleTranslationBridgeStateChange);
  on("clearSessionScan", () => {
    clearSessionData();
  });
  on("settingsSaved", () => {
    if (!isRecording) return;
    const settings = loadSettings();
    if (worker) {
      worker.postMessage({
        type: "update-settings",
        payload: {
          outputFormat: settings.outputFormat,
          includeArrayBrackets: settings.includeArrayBrackets
        }
      });
      log(t("log.settings.changed", { key: "outputFormat", oldValue: "", newValue: settings.outputFormat }));
    }
  });
  var handleMutations = (mutations) => {
    if (!isRecording) return;
    const ignoredSelectorString2 = appConfig.scanner.ignoredSelectors.join(", ");
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE || node.closest(ignoredSelectorString2)) return;
        pendingDynamicRoots.add(node);
      });
    });
    if (pendingDynamicRoots.size === 0) return;
    if (isTranslationBridgeActive()) {
      scheduleDynamicFlushFallback();
    } else {
      flushPendingDynamicRoots();
    }
  };
  function clearSessionData() {
    currentCount = 0;
    sessionTextsMirror.clear();
    clearPendingDynamicRoots();
    saveActiveSession("session-scan");
    if (useFallback) {
      clearInFallback();
      if (onUpdateCallback) onUpdateCallback(0);
      updateScanCount(0, "session");
      fire("sessionCleared");
    } else if (worker) {
      worker.postMessage({ type: "session-clear" });
      log(t("log.sessionScan.worker.clearCommandSent"));
    }
  }
  var start = async (onUpdate, resumedData = null) => {
    if (isRecording) return;
    registerTranslationBridgeClient();
    isPaused = false;
    if (worker) {
      worker.terminate();
      worker = null;
    }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    currentCount = 0;
    sessionTextsMirror.clear();
    clearPendingDynamicRoots();
    onUpdateCallback = onUpdate;
    useFallback = false;
    isRecording = true;
    const [initialTexts, settings, workerAllowed] = await Promise.all([
      waitForTranslationBridgeIdle().then(() => extractAndProcessText()),
      loadSettings(),
      isWorkerAllowed()
    ]);
    enablePersistence();
    if (resumedData && Array.isArray(resumedData)) {
      resumedData.forEach((text) => {
        initialTexts.push(text);
        sessionTextsMirror.add(text);
      });
    }
    const { filterRules: filterRules2, enableDebugLogging, outputFormat, includeArrayBrackets } = settings;
    const activateFallbackMode = () => {
      log(t("log.sessionScan.switchToFallback"), "warn");
      if (worker) {
        worker.terminate();
        worker = null;
      }
      useFallback = true;
      initFallback(filterRules2);
      if (initialTexts.length > 0) {
        processTextsInFallback(initialTexts);
        const count = getCountInFallback();
        if (onUpdateCallback) onUpdateCallback(count);
        updateScanCount(count, "session");
        saveActiveSession("session-scan");
      }
    };
    if (workerAllowed) {
      try {
        log(t("log.sessionScan.worker.starting"));
        worker = new Worker(trustedWorkerUrl);
        worker.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === "countUpdated") {
            currentCount = payload.count;
            if (onUpdateCallback) onUpdateCallback(payload.count);
            updateScanCount(payload.count, "session");
            if (payload.newTexts && Array.isArray(payload.newTexts)) {
              payload.newTexts.forEach((text) => sessionTextsMirror.add(text));
            }
          } else if (type === "summaryReady" && onSummaryCallback) {
            onSummaryCallback(payload, currentCount);
            onSummaryCallback = null;
          }
        };
        worker.onerror = (error) => {
          log(t("log.sessionScan.worker.initFailed"), "warn");
          log(t("log.sessionScan.worker.originalError", { error: error.message }), "debug");
          showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
          activateFallbackMode();
        };
        worker.postMessage({
          type: "session-start",
          payload: {
            filterRules: filterRules2,
            enableDebugLogging,
            outputFormat,
            includeArrayBrackets,
            translations: {
              workerLogPrefix: t("log.sessionScan.worker.logPrefix"),
              textFiltered: t("log.textProcessor.filtered"),
              filterReasons: getTranslationObject("filterReasons")
            },
            initialData: initialTexts
          }
        });
        log(t("log.sessionScan.worker.initialized", { count: initialTexts.length }));
      } catch (e) {
        log(t("log.sessionScan.worker.initSyncError", { error: e.message }), "error");
        showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
        activateFallbackMode();
      }
    } else {
      log(t("log.sessionScan.worker.cspBlocked"), "warn");
      showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
      activateFallbackMode();
    }
    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("beforeunload", handleSessionScanUnload);
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    autoSaveInterval = setInterval(() => {
      if (isRecording) {
        saveActiveSession("session-scan");
      }
    }, AUTO_SAVE_INTERVAL_MS);
    saveActiveSession("session-scan");
    log(t("log.sessionScan.domObserver.started"));
  };
  var handleSessionScanUnload = () => {
    saveActiveSession("session-scan");
  };
  var stop = (onStopped) => {
    if (!isRecording) {
      unregisterTranslationBridgeClient();
      if (onStopped) onStopped(0);
      return;
    }
    log(t("log.sessionScan.domObserver.stopped"));
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    window.removeEventListener("beforeunload", handleSessionScanUnload);
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
      autoSaveInterval = null;
    }
    clearPendingDynamicRoots();
    unregisterTranslationBridgeClient();
    clearActiveSession();
    isRecording = false;
    isPaused = false;
    sessionTextsMirror.clear();
    onUpdateCallback = null;
    if (onStopped) {
      if (useFallback) {
        onStopped(getCountInFallback());
      } else if (worker) {
        const finalCountListener = (event) => {
          const { type, payload } = event.data;
          if (type === "countUpdated" && typeof payload.count !== "undefined") {
            onStopped(payload.count);
            worker.removeEventListener("message", finalCountListener);
          }
        };
        worker.addEventListener("message", finalCountListener);
        worker.postMessage({ type: "session-get-count" });
      } else {
        onStopped(0);
      }
    }
  };
  var getSessionTexts = () => {
    return sessionTextsMirror;
  };
  var requestSummary = (onReady) => {
    if (!onReady) return;
    if (useFallback) {
      const summaryText = getSummaryInFallback();
      const summaryCount = getCountInFallback();
      onReady(summaryText, summaryCount);
    } else if (worker) {
      onSummaryCallback = onReady;
      worker.postMessage({ type: "session-get-summary" });
    } else {
      onReady("[]", 0);
    }
  };
  var isSessionRecording = () => isRecording;
  var pauseSessionScan = () => {
    if (!isRecording || isPaused) return;
    isPaused = true;
    clearPendingDynamicRoots();
    showNotification(t("notifications.sessionScanPaused"), { type: "info" });
    if (observer) {
      observer.disconnect();
    }
  };
  var resumeSessionScan = () => {
    if (!isRecording || !isPaused) return;
    isPaused = false;
    showNotification(t("notifications.sessionScanContinued"), { type: "success" });
    if (observer) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };
  // src/assets/icons/questionMarkIcon.js
  var questionMarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  // src/shared/ui/components/infoTooltip.js
  var Tooltip = class {
    constructor() {
      this.tooltipElement = null;
      this.handleEscKey = this.handleEscKey.bind(this);
    }
    /**
     * @private
     * @description 根据配置创建提示窗口的 DOM 结构。
     * @param {object} config - 提示窗口的配置对象。
     */
    _createDOM(config) {
      const overlay = document.createElement("div");
      overlay.className = "info-tooltip-overlay";
      overlay.tabIndex = -1;
      const tooltip = document.createElement("div");
      tooltip.className = "info-tooltip-modal";
      if (config.width) tooltip.style.width = config.width;
      if (config.height) tooltip.style.height = config.height;
      const header = document.createElement("div");
      header.className = "info-tooltip-header";
      const titleContainer2 = document.createElement("div");
      titleContainer2.className = "info-tooltip-title-container";
      if (config.titleIcon) {
        const iconElement = createSVGFromString(config.titleIcon);
        iconElement.classList.add("info-tooltip-title-icon");
        titleContainer2.appendChild(iconElement);
      }
      const titleElement = document.createElement("h3");
      titleElement.className = "info-tooltip-title";
      titleElement.textContent = config.title;
      titleContainer2.appendChild(titleElement);
      const closeButton = document.createElement("span");
      closeButton.className = "info-tooltip-close";
      closeButton.appendChild(createSVGFromString(closeIcon));
      closeButton.addEventListener("click", () => this.hide());
      header.appendChild(titleContainer2);
      header.appendChild(closeButton);
      const content = document.createElement("div");
      content.className = "info-tooltip-content";
      const textElement = document.createElement("p");
      textElement.innerHTML = createTrustedHTML(config.text || "");
      content.appendChild(textElement);
      tooltip.appendChild(header);
      tooltip.appendChild(content);
      overlay.appendChild(tooltip);
      this.tooltipElement = overlay;
      uiContainer.appendChild(this.tooltipElement);
    }
    /**
     * @public
     * @description 显示并填充提示窗口。
     * @param {object} config - 提示窗口的配置对象。
     */
    show(config) {
      if (!this.tooltipElement) {
        this._createDOM(config);
      }
      fire("infoTooltipWillShow");
      setTimeout(() => {
        if (this.tooltipElement) {
          const onTransitionEnd = () => {
            this.tooltipElement.focus();
            this.tooltipElement.addEventListener("keydown", this.handleEscKey);
            this.tooltipElement.removeEventListener("transitionend", onTransitionEnd);
          };
          this.tooltipElement.addEventListener("transitionend", onTransitionEnd);
          this.tooltipElement.classList.add("is-visible");
        }
      }, 10);
    }
    /**
     * @public
     * @description 关闭并销毁提示窗口。
     */
    hide() {
      if (this.tooltipElement && this.tooltipElement.classList.contains("is-visible")) {
        this.tooltipElement.classList.remove("is-visible");
        this.tooltipElement.removeEventListener("keydown", this.handleEscKey);
        setTimeout(() => {
          if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
            this.tooltipElement = null;
            fire("infoTooltipDidHide");
          }
        }, 300);
      }
    }
    /**
     * @private
     * @description 处理在提示窗口激活时按键按下的事件。
     * @param {KeyboardEvent} event - 键盘事件对象。
     */
    handleEscKey(event) {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        this.hide();
      }
    }
  };
  var infoTooltip = new Tooltip();
  // src/shared/ui/components/helpIcon.js
  function createHelpIcon(contentKey) {
    const helpButton = document.createElement("button");
    helpButton.className = "tc-icon-button";
    helpButton.innerHTML = createTrustedHTML(questionMarkIcon);
    const controller2 = new AbortController();
    const { signal } = controller2;
    const handleClick = (event) => {
      event.stopPropagation();
      log(simpleTemplate(t("log.ui.helpIcon.clicked"), { contentKey }));
      const helpContent = t(contentKey);
      const helpTitle = t(`${contentKey}Title`);
      infoTooltip.show({
        title: helpTitle,
        text: helpContent,
        titleIcon: questionMarkIcon
      });
    };
    helpButton.addEventListener("click", handleClick, { signal });
    const handleMouseEnter = () => showTooltip(helpButton, t("tooltip.tooltipHelp"));
    const handleMouseLeave = () => hideTooltip();
    helpButton.addEventListener("mouseenter", handleMouseEnter, { signal });
    helpButton.addEventListener("mouseleave", handleMouseLeave, { signal });
    helpButton.destroy = () => controller2.abort();
    return helpButton;
  }
  // src/shared/utils/dom/animations.js
  function animateCount(element, start2, end, duration, easing) {
    const startTime = performance.now();
    function frame(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easing(progress);
      const currentCount2 = Math.round(start2 + (end - start2) * easedProgress);
      element.textContent = currentCount2;
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }
  var easeOutQuad = (t2) => t2 * (2 - t2);
  // src/shared/ui/components/topCenterCounter.js
  function createTopCenterCounter(labelKey) {
    const counterElement2 = document.createElement("div");
    counterElement2.className = "tc-top-center-counter";
    const textNode = document.createTextNode(t(labelKey));
    const countSpan = document.createElement("span");
    countSpan.textContent = "0";
    counterElement2.appendChild(textNode);
    counterElement2.appendChild(countSpan);
    counterElement2._countSpan = countSpan;
    const languageChangeHandler = () => {
      textNode.textContent = t(labelKey);
    };
    const unsubscribe = on("languageChanged", languageChangeHandler);
    counterElement2.destroy = () => {
      unsubscribe();
    };
    return counterElement2;
  }
  function updateTopCenterCounter(element, newCount) {
    if (!element || !element._countSpan) return;
    const countSpan = element._countSpan;
    const start2 = parseInt(countSpan.textContent, 10) || 0;
    const end = newCount;
    if (start2 === end) {
      countSpan.textContent = String(end);
      return;
    }
    const duration = 500 + Math.min(Math.abs(end - start2) * 10, 1e3);
    animateCount(countSpan, start2, end, duration, easeOutQuad);
  }
  // src/assets/icons/pauseIcon.js
  var pauseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  // src/assets/icons/resumeIcon.js
  var resumeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  // src/assets/icons/settingsIcon.js
  var settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>`;
  // src/shared/ui/components/counterWithHelp.js
  var counterWithHelpContainer = null;
  var counterElement = null;
  var helpIcon = null;
  var pauseResumeButton = null;
  var settingsButton = null;
  function handleSpacebarPauseResume(event) {
    if (event.key !== " " && event.code !== "Space") {
      return;
    }
    if (!pauseResumeButton || !counterWithHelpContainer || !counterWithHelpContainer.classList.contains("is-visible")) {
      return;
    }
    let finalActiveElement = document.activeElement;
    while (finalActiveElement && finalActiveElement.shadowRoot && finalActiveElement.shadowRoot.activeElement) {
      finalActiveElement = finalActiveElement.shadowRoot.activeElement;
    }
    if (finalActiveElement) {
      const tagName = finalActiveElement.tagName.toUpperCase();
      const isContentEditable = finalActiveElement.isContentEditable;
      if (tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable) {
        return;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    pauseResumeButton.click();
  }
  function createCounterWithHelp({ counterKey, helpKey, onPause, onResume, scanType, onSettingsClick }) {
    let isPaused4 = false;
    counterWithHelpContainer = document.createElement("div");
    counterWithHelpContainer.className = "counter-with-help-container";
    counterWithHelpContainer.style.pointerEvents = "auto";
    counterElement = createTopCenterCounter(counterKey);
    helpIcon = createHelpIcon(helpKey);
    counterWithHelpContainer.appendChild(counterElement);
    const separator = document.createElement("div");
    separator.className = "counter-with-help-separator";
    counterWithHelpContainer.appendChild(separator);
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "counter-actions-container";
    if (onPause && onResume && scanType) {
      pauseResumeButton = createButton({
        icon: pauseIcon,
        iconOnly: true,
        tooltipKey: `tooltip.pause${scanType}`,
        onClick: () => {
          isPaused4 = !isPaused4;
          if (isPaused4) {
            onPause();
            pauseResumeButton.updateIcon(resumeIcon);
            pauseResumeButton.updateText(`tooltip.resume${scanType}`);
          } else {
            onResume();
            pauseResumeButton.updateIcon(pauseIcon);
            pauseResumeButton.updateText(`tooltip.pause${scanType}`);
          }
        }
      });
      actionsContainer.appendChild(pauseResumeButton);
    }
    actionsContainer.appendChild(helpIcon);
    if (onSettingsClick) {
      settingsButton = createButton({
        icon: settingsIcon,
        iconOnly: true,
        tooltipKey: "settings.title",
        onClick: onSettingsClick
      });
      actionsContainer.appendChild(settingsButton);
    }
    counterWithHelpContainer.appendChild(actionsContainer);
    uiContainer.appendChild(counterWithHelpContainer);
    updateCounterValue(0);
    return counterWithHelpContainer;
  }
  function showCounterWithHelp() {
    if (!counterWithHelpContainer) return;
    requestAnimationFrame(() => {
      counterWithHelpContainer.classList.add("is-visible");
    });
    document.addEventListener("keydown", handleSpacebarPauseResume, true);
  }
  function hideCounterWithHelp() {
    document.removeEventListener("keydown", handleSpacebarPauseResume, true);
    if (!counterWithHelpContainer) return;
    const containerToRemove = counterWithHelpContainer;
    const counterToRemove = counterElement;
    const iconToRemove = helpIcon;
    const buttonToRemove = pauseResumeButton;
    const settingsButtonToRemove = settingsButton;
    counterWithHelpContainer = null;
    counterElement = null;
    helpIcon = null;
    pauseResumeButton = null;
    settingsButton = null;
    containerToRemove.classList.remove("is-visible");
    setTimeout(() => {
      if (counterToRemove && typeof counterToRemove.destroy === "function") {
        counterToRemove.destroy();
      }
      if (iconToRemove && typeof iconToRemove.destroy === "function") {
        iconToRemove.destroy();
      }
      if (buttonToRemove && typeof buttonToRemove.destroy === "function") {
        buttonToRemove.destroy();
      }
      if (settingsButtonToRemove && typeof settingsButtonToRemove.destroy === "function") {
        settingsButtonToRemove.destroy();
      }
      if (containerToRemove) {
        containerToRemove.remove();
      }
    }, 400);
  }
  function updateCounterValue(newCount) {
    if (!counterElement) return;
    updateTopCenterCounter(counterElement, newCount);
  }
  // src/assets/icons/stopIcon.js
  var stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-280v-400h400v400H280Z"/></svg>`;
  // src/shared/utils/dom/clickOutside.js
  function listenClickOutside(element, onClickOutside, { signal, shouldIgnore } = {}) {
    const handleDocumentClick = (event) => {
      if (signal?.aborted) return;
      const path = event.composedPath();
      if (path.includes(element)) {
        return;
      }
      const root2 = element.getRootNode();
      if (root2 instanceof ShadowRoot) {
        if (event.currentTarget === document && event.target === root2.host) {
          return;
        }
      }
      if (shouldIgnore) {
        const shouldIgnoreClick = path.some((node) => {
          return node instanceof Element && shouldIgnore(node);
        });
        if (shouldIgnoreClick) {
          return;
        }
      }
      onClickOutside(event);
    };
    const listenerOptions = { capture: true };
    if (signal) {
      listenerOptions.signal = signal;
    }
    document.addEventListener("click", handleDocumentClick, listenerOptions);
    const root = element.getRootNode();
    if (root instanceof ShadowRoot) {
      root.addEventListener("click", handleDocumentClick, listenerOptions);
    }
  }
  // src/assets/icons/arrowDownIcon.js
  var arrowDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
  // src/shared/ui/components/customSelect.js
  var CustomSelect = class {
    /**
     * @param {HTMLElement} parentElement - 组件将被附加到的父容器。
     * @param {Array<Object>} options - 选项数组，每个对象包含 { value, label, icon }。
     * @param {string} initialValue - 初始选中的值。
     */
    constructor(parentElement, options, initialValue) {
      this.parentElement = parentElement;
      this.options = options;
      this.currentValue = initialValue;
      this.isOpen = false;
      this.abortController = null;
      this.render();
      this.bindEvents();
    }
    /**
     * @private
     * @description 渲染组件的 DOM 结构。
     */
    render() {
      this.container = document.createElement("div");
      this.container.className = "custom-select-container";
      this.container.dataset.value = this.currentValue;
      this.trigger = document.createElement("div");
      this.trigger.className = "custom-select-trigger";
      this.trigger.tabIndex = 0;
      this.trigger.setAttribute("role", "combobox");
      this.trigger.setAttribute("aria-haspopup", "listbox");
      this.trigger.setAttribute("aria-expanded", "false");
      this.selectedContent = document.createElement("div");
      this.selectedContent.className = "selected-option-content";
      const arrowDiv = document.createElement("div");
      arrowDiv.className = "custom-select-arrow";
      const arrowSVG = createSVGFromString(arrowDownIcon);
      if (arrowSVG) {
        arrowDiv.appendChild(arrowSVG);
      }
      this.trigger.appendChild(this.selectedContent);
      this.trigger.appendChild(arrowDiv);
      this.optionsContainer = document.createElement("div");
      this.optionsContainer.className = "custom-select-options";
      this.optionsContainer.setAttribute("role", "listbox");
      this.container.appendChild(this.trigger);
      this.container.appendChild(this.optionsContainer);
      this.parentElement.appendChild(this.container);
      let initialOption = this.options.find((opt) => opt.value === this.currentValue);
      if (!initialOption && this.options.length > 0) {
        console.warn(`CustomSelect: \u521D\u59CB\u503C "${this.currentValue}" \u5728\u9009\u9879\u4E2D\u672A\u627E\u5230\u3002\u5C06\u9ED8\u8BA4\u9009\u62E9\u7B2C\u4E00\u4E2A\u9009\u9879\u3002`);
        initialOption = this.options[0];
        this.currentValue = initialOption.value;
      }
      this.populateOptions();
      this.updateSelectedContent(initialOption);
    }
    /**
     * @private
     * @description 填充选项列表。
     */
    populateOptions() {
      this.options.forEach((option) => {
        const optionEl = document.createElement("div");
        optionEl.className = "custom-select-option";
        optionEl.dataset.value = option.value;
        optionEl.setAttribute("role", "option");
        if (option.value === this.currentValue) {
          optionEl.classList.add("selected");
        }
        const optionContent = createIconTitle(option.icon, option.label);
        optionEl.appendChild(optionContent);
        this.optionsContainer.appendChild(optionEl);
      });
    }
    /**
     * @private
     * @description 更新触发器区域显示的内容。
     * @param {Object} option - 被选中的选项对象。
     */
    updateSelectedContent(option) {
      while (this.selectedContent.firstChild) {
        this.selectedContent.removeChild(this.selectedContent.firstChild);
      }
      const content = createIconTitle(option.icon, option.label);
      this.selectedContent.appendChild(content);
    }
    /**
     * @private
     * @description 绑定所有必要的事件监听器。
     */
    bindEvents() {
      this.handleTriggerClick = this.toggle.bind(this);
      this.handleTriggerKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.toggle();
        } else if (event.key === "Escape") {
          this.close();
        }
      };
      this.handleOptionClick = (e) => {
        const optionEl = e.target.closest(".custom-select-option");
        if (optionEl) {
          this.select(optionEl.dataset.value);
        }
      };
      this.trigger.addEventListener("click", this.handleTriggerClick);
      this.trigger.addEventListener("keydown", this.handleTriggerKeyDown);
      this.optionsContainer.addEventListener("click", this.handleOptionClick);
    }
    /**
     * @private
     * @description 处理点击组件外部的事件（通用处理）。
     */
    /**
     * @public
     * @description 切换下拉菜单的打开/关闭状态。
     */
    toggle() {
      this.isOpen = !this.isOpen;
      this.container.classList.toggle("open", this.isOpen);
      this.trigger.setAttribute("aria-expanded", String(this.isOpen));
      if (this.isOpen) {
        this.abortController = new AbortController();
        listenClickOutside(this.container, () => this.close(), {
          signal: this.abortController.signal
        });
      } else {
        this.close();
      }
    }
    /**
     * @public
     * @description 关闭下拉菜单。
     */
    close() {
      if (this.isOpen) {
        this.isOpen = false;
        this.container.classList.remove("open");
        this.trigger.setAttribute("aria-expanded", "false");
        if (this.abortController) {
          this.abortController.abort();
          this.abortController = null;
        }
      }
    }
    /**
     * @private
     * @description 移除所有外部点击监听器。
     */
    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项的 value。
     */
    select(value, { emit = true } = {}) {
      if (value === this.currentValue) {
        this.close();
        return;
      }
      const selectedOption = this.options.find((opt) => opt.value === value);
      if (!selectedOption) {
        return;
      }
      this.currentValue = value;
      this.container.dataset.value = value;
      this.updateSelectedContent(selectedOption);
      this.optionsContainer.querySelector(".custom-select-option.selected")?.classList.remove("selected");
      const newSelectedOptionEl = Array.from(this.optionsContainer.children).find(
        (option) => option.dataset.value === value
      );
      if (newSelectedOptionEl) {
        newSelectedOptionEl.classList.add("selected");
      }
      this.close();
      if (emit) {
        this.container.dispatchEvent(
          new CustomEvent("custom-select-change", {
            detail: { value }
          })
        );
      }
    }
    /**
     * @public
     * @param {string} value
     * @param {object} [options]
     */
    setValue(value, options = { emit: false }) {
      this.select(value, options);
    }
    /**
     * @public
     * @returns {string} - 返回当前选中的值。
     */
    getValue() {
      return this.currentValue;
    }
    /**
     * @public
     * @description 更新下拉菜单的选项列表。
     * @param {Array<Object>} newOptions - 新的选项数组。
     */
    updateOptions(newOptions) {
      this.options = newOptions;
      if (!this.options.some((option) => option.value === this.currentValue)) {
        this.currentValue = this.options[0]?.value || "";
        this.container.dataset.value = this.currentValue;
      }
      while (this.optionsContainer.firstChild) {
        this.optionsContainer.removeChild(this.optionsContainer.firstChild);
      }
      this.populateOptions();
      const currentSelectedOption = this.options.find((opt) => opt.value === this.currentValue);
      if (currentSelectedOption) {
        this.updateSelectedContent(currentSelectedOption);
      }
    }
    /**
     * @public
     * @description 销毁组件，移除所有事件监听器。
     */
    destroy() {
      this.close();
      if (this.trigger && this.handleTriggerClick) {
        this.trigger.removeEventListener("click", this.handleTriggerClick);
      }
      if (this.trigger && this.handleTriggerKeyDown) {
        this.trigger.removeEventListener("keydown", this.handleTriggerKeyDown);
      }
      if (this.optionsContainer && this.handleOptionClick) {
        this.optionsContainer.removeEventListener("click", this.handleOptionClick);
      }
    }
  };
  // src/shared/ui/components/imageCardSelect.js
  var ImageCardSelect = class {
    /**
     * @param {HTMLElement} parentElement - 组件将被附加到的父容器。
     * @param {Array<Object>} options - 选项数组，每个对象包含 { value, label, icon, previewType }。
     * @param {string} initialValue - 初始选中的值。
     */
    constructor(parentElement, options, initialValue, includeBrackets = true) {
      this.parentElement = parentElement;
      this.options = options;
      this.currentValue = initialValue;
      this.includeBrackets = includeBrackets;
      this.render();
      this.bindEvents();
    }
    /**
     * @private
     * @description 渲染组件的 DOM 结构。
     */
    render() {
      this.container = document.createElement("div");
      this.container.className = "image-card-select-container";
      this.options.forEach((option) => {
        const card = document.createElement("div");
        card.className = "image-card-option";
        card.dataset.value = option.value;
        if (option.value === this.currentValue) {
          card.classList.add("selected");
        }
        const preview = document.createElement("div");
        preview.className = "image-card-preview";
        if (option.previewType === "code-array") {
          preview.appendChild(this.createCodePreview("array", this.includeBrackets));
        } else if (option.previewType === "code-object") {
          preview.appendChild(this.createCodePreview("object", this.includeBrackets));
        } else if (option.previewType === "code-csv") {
          preview.appendChild(this.createCodePreview("csv", this.includeBrackets));
        } else {
          preview.appendChild(this.createThemeSchematic());
        }
        card.appendChild(preview);
        const labelContainer = document.createElement("div");
        labelContainer.className = "image-card-label";
        const radioCircle = document.createElement("div");
        radioCircle.className = "image-card-radio";
        const radioDot = document.createElement("div");
        radioDot.className = "radio-dot";
        radioCircle.appendChild(radioDot);
        const labelText = document.createElement("span");
        labelText.textContent = option.label;
        labelContainer.appendChild(radioCircle);
        labelContainer.appendChild(labelText);
        if (option.icon) {
          const labelIcon = document.createElement("div");
          labelIcon.className = "image-card-label-icon";
          labelIcon.appendChild(createSVGFromString(option.icon));
          labelContainer.appendChild(labelIcon);
        }
        card.appendChild(labelContainer);
        this.container.appendChild(card);
      });
      this.parentElement.appendChild(this.container);
    }
    /**
     * @private
     * @description 创建默认的主题示意图。
     */
    createThemeSchematic() {
      const container = document.createElement("div");
      container.className = "schematic-container";
      const schematicCard = document.createElement("div");
      schematicCard.className = "schematic-card";
      const iconBox = document.createElement("div");
      iconBox.className = "schematic-icon-box";
      const linesContainer = document.createElement("div");
      linesContainer.className = "schematic-lines";
      const line1 = document.createElement("div");
      line1.className = "schematic-line primary";
      const line2 = document.createElement("div");
      line2.className = "schematic-line secondary";
      linesContainer.appendChild(line1);
      linesContainer.appendChild(line2);
      schematicCard.appendChild(iconBox);
      schematicCard.appendChild(linesContainer);
      container.appendChild(schematicCard);
      return container;
    }
    /**
     * @private
     * @description 创建代码格式预览示意图 (文本模式)。
     * @param {string} type - 'array', 'object', or 'csv'
     */
    createCodePreview(type, includeBrackets = true) {
      const container = document.createElement("div");
      container.className = `code-preview ${type}`;
      if (!includeBrackets) {
        container.classList.add("hide-brackets");
      }
      const codeBlock = document.createElement("div");
      codeBlock.className = "code-text-preview";
      if (type === "array") {
        codeBlock.innerHTML = createTrustedHTML(`
                <span class="wrapper-bracket"><span class="punct">[</span><br></span><span class="wrapper-indent">&nbsp;&nbsp;</span><span class="punct">[</span><span class="str">"Hello"</span><span class="punct">,</span> <span class="str">""</span><span class="punct">],</span><br>
                <span class="wrapper-indent">&nbsp;&nbsp;</span><span class="punct">[</span><span class="str">"World"</span><span class="punct">,</span> <span class="str">""</span><span class="punct">]</span><span class="wrapper-bracket"><br><span class="punct">]</span></span>
            `);
      } else if (type === "object") {
        codeBlock.innerHTML = createTrustedHTML(`
                <span class="wrapper-bracket"><span class="punct">{</span><br></span><span class="wrapper-indent">&nbsp;&nbsp;</span><span class="str">"Hello"</span><span class="punct">:</span> <span class="str">""</span><span class="punct">,</span><br>
                <span class="wrapper-indent">&nbsp;&nbsp;</span><span class="str">"World"</span><span class="punct">:</span> <span class="str">""</span><span class="wrapper-bracket"><br><span class="punct">}</span></span>
            `);
      } else if (type === "csv") {
        codeBlock.innerHTML = createTrustedHTML(`
                <span class="str">"Hello"</span><span class="punct">,</span><span class="str">""</span><br>
                <span class="str">"World"</span><span class="punct">,</span><span class="str">""</span>
            `);
      }
      container.appendChild(codeBlock);
      return container;
    }
    /**
     * @private
     * @description 绑定事件监听器。
     */
    bindEvents() {
      this.handleCardClick = (e) => {
        const card = e.target.closest(".image-card-option");
        if (card) {
          this.select(card.dataset.value);
        }
      };
      this.container.addEventListener("click", this.handleCardClick);
    }
    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项值。
     */
    select(value) {
      if (this.currentValue === value) return;
      this.currentValue = value;
      const cards = this.container.querySelectorAll(".image-card-option");
      cards.forEach((card) => {
        if (card.dataset.value === value) {
          card.classList.add("selected");
        } else {
          card.classList.remove("selected");
        }
      });
    }
    /**
     * @public
     * @returns {string} - 返回当前选中的值。
     */
    getValue() {
      return this.currentValue;
    }
    /**
     * @public
     * @description 更新首尾符号预览状态，并重新渲染代码预览卡片。
     * @param {boolean} includeBrackets - 是否包含首尾符号。
     */
    updateBracketsPreview(includeBrackets) {
      if (this.includeBrackets === includeBrackets) return;
      this.includeBrackets = includeBrackets;
      const cards = this.container.querySelectorAll(".image-card-option");
      cards.forEach((card, index) => {
        const option = this.options[index];
        if (option.previewType && option.previewType.startsWith("code-")) {
          const codePreview = card.querySelector(".code-preview");
          if (codePreview) {
            if (includeBrackets) {
              codePreview.classList.remove("hide-brackets");
            } else {
              codePreview.classList.add("hide-brackets");
            }
          }
        }
      });
    }
    /**
     * @public
     * @description 销毁组件。
     */
    destroy() {
      if (this.container && this.handleCardClick) {
        this.container.removeEventListener("click", this.handleCardClick);
        this.container.remove();
      }
    }
  };
  // src/shared/ui/components/checkbox.js
  function createCheckbox(id, labelText, isChecked, tooltipConfig) {
    const label = document.createElement("label");
    label.className = "checkbox-group";
    label.htmlFor = id;
    label.appendChild(document.createTextNode(labelText));
    if (tooltipConfig && tooltipConfig.text) {
      const infoIconElement = document.createElement("span");
      infoIconElement.className = "info-icon";
      infoIconElement.appendChild(createSVGFromString(infoIcon));
      infoIconElement.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const translatedConfig = {
          ...tooltipConfig,
          title: t(tooltipConfig.title),
          text: t(tooltipConfig.text)
        };
        infoTooltip.show(translatedConfig);
      });
      label.appendChild(infoIconElement);
    }
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    if (isChecked) {
      input.checked = true;
    }
    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    label.appendChild(input);
    label.appendChild(checkmark);
    return label;
  }
  // src/shared/ui/components/numericInput.js
  function createNumericInput(id, labelText, value, options = {}) {
    const { min, max, step, disabled = false } = options;
    const container = document.createElement("div");
    container.className = "numeric-input-group";
    const label = document.createElement("label");
    label.className = "numeric-input-label";
    label.htmlFor = id;
    if (labelText) {
      label.textContent = labelText;
    }
    const input = document.createElement("input");
    input.type = "number";
    input.id = id;
    input.value = value;
    input.className = "numeric-input";
    if (typeof min !== "undefined") {
      input.min = min;
    }
    if (typeof max !== "undefined") {
      input.max = max;
    }
    if (typeof step !== "undefined") {
      input.step = step;
    }
    if (disabled) {
      input.disabled = true;
    }
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }
  // src/assets/icons/relatedSettingsIcon.js
  var relatedSettingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-280h320v-400H320v400Zm80-80v-240h160v240H400Zm40-120h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
  // src/assets/icons/filterIcon.js
  var filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>`;
  // src/assets/icons/githubIcon.js
  var githubIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
  // src/features/settings/panelBuilder.js
  var TABS = [
    { id: "tab-related", label: "settings.relatedSettings", icon: relatedSettingsIcon },
    { id: "tab-filters", label: "settings.filterRules", icon: filterIcon },
    { id: "tab-format", label: "settings.format", icon: formatIcon },
    { id: "tab-language", label: "settings.language", icon: languageIcon_default },
    { id: "tab-theme", label: "settings.theme", icon: themeIcon },
    { id: "tab-ai", label: "settings.ai.title", icon: aiIcon },
    { id: "tab-about", label: "settings.about", icon: infoIcon }
  ];
  function buildPanelDOM(settings) {
    const modal = document.createElement("div");
    modal.className = "settings-panel-modal";
    const header = document.createElement("div");
    header.className = "settings-panel-header";
    const titleContainer2 = document.createElement("div");
    titleContainer2.id = "settings-panel-title-container";
    const closeBtn2 = document.createElement("span");
    closeBtn2.className = "tc-close-button settings-panel-close";
    closeBtn2.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer2);
    header.appendChild(closeBtn2);
    modal.appendChild(header);
    const body = document.createElement("div");
    body.className = "settings-panel-body";
    const sidebar = document.createElement("div");
    sidebar.className = "settings-sidebar";
    const highlight = document.createElement("div");
    highlight.className = "sidebar-highlight";
    sidebar.appendChild(highlight);
    TABS.forEach((tab, index) => {
      const item = document.createElement("div");
      item.className = `settings-sidebar-item ${index === 0 ? "active" : ""}`;
      item.dataset.target = tab.id;
      item.appendChild(createSVGFromString(tab.icon));
      const span = document.createElement("span");
      span.textContent = t(tab.label);
      item.appendChild(span);
      sidebar.appendChild(item);
    });
    body.appendChild(sidebar);
    const contentArea = document.createElement("div");
    contentArea.className = "settings-content-area";
    const relatedTab = createTabContent("tab-related", true);
    const relatedTitleContainer = document.createElement("div");
    relatedTitleContainer.id = "related-setting-title-container";
    relatedTitleContainer.className = "setting-title-container";
    relatedTab.appendChild(relatedTitleContainer);
    relatedSettingsDefinitions.forEach((setting) => {
      relatedTab.appendChild(createRelatedSettingDOM(setting, settings));
    });
    contentArea.appendChild(relatedTab);
    const filterTab = createTabContent("tab-filters", false);
    const filterTitleContainer = document.createElement("div");
    filterTitleContainer.id = "filter-setting-title-container";
    filterTitleContainer.className = "setting-title-container";
    filterTab.appendChild(filterTitleContainer);
    const filterNotice = createIconTitle(infoIcon, t("settings.dynamicScanRefreshNotice"));
    filterNotice.classList.add("settings-info-notice");
    filterNotice.setAttribute("role", "note");
    const filterNoticeIcon = filterNotice.firstElementChild;
    if (filterNoticeIcon) {
      filterNoticeIcon.classList.add("settings-info-notice-icon");
      filterNoticeIcon.setAttribute("aria-hidden", "true");
    }
    filterTab.appendChild(filterNotice);
    filterDefinitions.forEach((filter) => {
      const checkboxElement = createCheckbox(
        filter.id,
        t(filter.label),
        settings.filterRules[filter.key],
        filter.tooltip
      );
      checkboxElement.classList.add("setting-item");
      filterTab.appendChild(checkboxElement);
    });
    contentArea.appendChild(filterTab);
    const formatTab = createTabContent("tab-format", false);
    const formatDef = selectSettingsDefinitions.find((d) => d.key === "outputFormat");
    if (formatDef) {
      formatTab.appendChild(createSelectSettingDOM(formatDef));
    }
    outputSettingsDefinitions.forEach((setting) => {
      const checkboxElement = createCheckbox(
        setting.id,
        t(setting.label),
        settings.includeArrayBrackets,
        setting.tooltip
      );
      checkboxElement.classList.add("setting-item");
      formatTab.appendChild(checkboxElement);
    });
    contentArea.appendChild(formatTab);
    const languageTab = createTabContent("tab-language", false);
    const langDef = selectSettingsDefinitions.find((d) => d.key === "language");
    if (langDef) {
      languageTab.appendChild(createSelectSettingDOM(langDef));
    }
    contentArea.appendChild(languageTab);
    const themeTab = createTabContent("tab-theme", false);
    const themeDef = selectSettingsDefinitions.find((d) => d.key === "theme");
    if (themeDef) {
      themeTab.appendChild(createSelectSettingDOM(themeDef));
    }
    contentArea.appendChild(themeTab);
    const aiTab = createTabContent("tab-ai", false);
    const aiSettingsMount = document.createElement("div");
    aiSettingsMount.id = "ai-settings-mount";
    aiSettingsMount.className = "ai-settings-mount";
    aiTab.appendChild(aiSettingsMount);
    contentArea.appendChild(aiTab);
    const aboutTab = createTabContent("tab-about", false);
    aboutTab.appendChild(createAboutTabContent());
    contentArea.appendChild(aboutTab);
    const footer = document.createElement("div");
    footer.className = "settings-panel-footer";
    contentArea.appendChild(footer);
    body.appendChild(contentArea);
    modal.appendChild(body);
    return modal;
  }
  function createTabContent(id, isActive3) {
    const div = document.createElement("div");
    div.id = id;
    div.className = `settings-tab-content ${isActive3 ? "active" : ""}`;
    return div;
  }
  function createSelectSettingDOM(definition) {
    const selectItem = document.createElement("div");
    selectItem.className = "setting-item";
    const titleContainer2 = document.createElement("div");
    titleContainer2.id = `${definition.id}-title-container`;
    titleContainer2.className = "setting-title-container";
    const selectWrapper = document.createElement("div");
    selectWrapper.id = `${definition.id}-wrapper`;
    selectItem.appendChild(titleContainer2);
    selectItem.appendChild(selectWrapper);
    return selectItem;
  }
  function createRelatedSettingDOM(setting, settings) {
    const item = document.createElement("div");
    item.className = "setting-item";
    if (setting.linkedNumeric) {
      const compositeContainer = document.createElement("div");
      compositeContainer.className = "composite-setting-container";
      const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
      compositeContainer.appendChild(checkboxElement);
      const numericConfig = setting.linkedNumeric;
      const numericValue = settings[numericConfig.key];
      const numericLabel = t("settings.display.character_limit");
      const numericInputElement = createNumericInput(numericConfig.id, numericLabel, numericValue, {
        min: 5,
        disabled: !settings[setting.key]
      });
      numericInputElement.classList.add("linked-numeric-input");
      compositeContainer.appendChild(numericInputElement);
      const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
      const numericInput = numericInputElement.querySelector('input[type="number"]');
      checkbox.addEventListener("change", (event) => {
        numericInput.disabled = !event.target.checked;
      });
      item.appendChild(compositeContainer);
    } else if (setting.type === "select") {
      const selectContainer = document.createElement("div");
      selectContainer.className = "setting-item-select";
      const selectTitle = document.createElement("div");
      selectTitle.className = "setting-label";
      selectTitle.textContent = t(setting.label);
      const selectWrapper = document.createElement("div");
      selectWrapper.id = setting.id;
      new CustomSelect(
        selectWrapper,
        setting.options.map((opt) => ({ ...opt, label: t(opt.label) })),
        settings[setting.key]
      );
      selectContainer.appendChild(selectTitle);
      selectContainer.appendChild(selectWrapper);
      item.appendChild(selectContainer);
    } else {
      const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
      item.appendChild(checkboxElement);
    }
    return item;
  }
  function createAboutTabContent() {
    const container = document.createElement("div");
    container.className = "about-tab-container";
    const logoContainer = document.createElement("div");
    logoContainer.className = "about-logo";
    const iconSrc = typeof GM_info !== "undefined" && GM_info.script && GM_info.script.icon ? GM_info.script.icon : "";
    if (iconSrc) {
      const img = document.createElement("img");
      img.src = iconSrc;
      img.alt = "Script Icon";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      logoContainer.appendChild(img);
    } else {
      logoContainer.innerHTML = translateIcon;
    }
    container.appendChild(logoContainer);
    const title = document.createElement("h2");
    title.className = "about-title";
    title.textContent = t("script.name");
    container.appendChild(title);
    const version = document.createElement("p");
    version.className = "about-version";
    const verNum = typeof GM_info !== "undefined" && GM_info.script ? GM_info.script.version : "1.0.0";
    version.textContent = `v${verNum}`;
    container.appendChild(version);
    const btnContainer = document.createElement("div");
    btnContainer.className = "about-actions";
    const githubBtn = createButton({
      id: "about-github-btn",
      textKey: "settings.aboutPanel.projectUrl",
      icon: githubIcon,
      onClick: () => {
        window.open("https://github.com/Qing90bing/Qing_PageScanner", "_blank");
      }
    });
    btnContainer.appendChild(githubBtn);
    container.appendChild(btnContainer);
    return container;
  }
  function buildContextualPanelDOM({ titleKey, icon, definitions, settings }) {
    const modal = document.createElement("div");
    modal.className = "settings-panel-modal contextual-settings-modal";
    const header = document.createElement("div");
    header.className = "settings-panel-header";
    const titleContainer2 = document.createElement("div");
    titleContainer2.id = "contextual-settings-title-container";
    if (icon) {
      titleContainer2.appendChild(createIconTitle(icon, t(titleKey)));
    } else {
      titleContainer2.textContent = t(titleKey);
    }
    const closeBtn2 = document.createElement("span");
    closeBtn2.className = "tc-close-button settings-panel-close";
    closeBtn2.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer2);
    header.appendChild(closeBtn2);
    const content = document.createElement("div");
    content.className = "settings-panel-content";
    definitions.forEach((setting) => {
      const item = document.createElement("div");
      item.className = "setting-item";
      if (setting.type === "checkbox") {
        const checkboxElement = createCheckbox(
          setting.id,
          t(setting.label),
          settings[setting.key],
          setting.tooltip
        );
        item.appendChild(checkboxElement);
      }
      content.appendChild(item);
    });
    const footer = document.createElement("div");
    footer.className = "settings-panel-footer";
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);
    return modal;
  }
  // src/assets/icons/saveIcon.js
  var saveIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;
  // src/shared/services/ai/storage.js
  var SESSION_KEY2 = "qing_pagescanner_ai_session_v1";
  var CACHE_KEY = "qing_pagescanner_ai_cache_v1";
  var DAILY_USAGE_KEY = "qing_pagescanner_ai_daily_usage_v1";
  var API_KEY_PREFIX = "qing_pagescanner_ai_provider_key_v1_";
  var CACHE_LIMIT = 5e3;
  var CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1e3;
  function parseStoredJson(value, fallback) {
    if (!value) return fallback;
    if (typeof value === "object") return value;
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  function safeProviderId(providerId) {
    return String(providerId || "").replace(/[^a-zA-Z0-9_-]/g, "-");
  }
  async function loadProviderApiKey(providerId) {
    return String(await getValue(`${API_KEY_PREFIX}${safeProviderId(providerId)}`, "") || "");
  }
  async function saveProviderApiKey(providerId, apiKey) {
    const storageKey = `${API_KEY_PREFIX}${safeProviderId(providerId)}`;
    if (!apiKey) {
      await deleteValue(storageKey);
      return;
    }
    await setValue(storageKey, String(apiKey));
  }
  async function deleteProviderApiKey(providerId) {
    await deleteValue(`${API_KEY_PREFIX}${safeProviderId(providerId)}`);
  }
  async function loadAiSession() {
    const stored = parseStoredJson(await getValue(SESSION_KEY2, null), null);
    return stored?.version === 1 ? stored : null;
  }
  async function saveAiSession(session) {
    await setValue(SESSION_KEY2, JSON.stringify({ ...session, version: 1, updatedAt: Date.now() }));
  }
  async function clearAiSession() {
    await deleteValue(SESSION_KEY2);
  }
  async function loadAiCache() {
    const stored = parseStoredJson(await getValue(CACHE_KEY, null), { version: 1, entries: [] });
    const cutoff = Date.now() - CACHE_TTL_MS;
    const entries = Array.isArray(stored.entries) ? stored.entries.filter((entry) => entry?.fingerprint && entry.updatedAt >= cutoff).slice(-CACHE_LIMIT) : [];
    return new Map(entries.map((entry) => [entry.fingerprint, entry]));
  }
  async function saveAiCache(cacheMap) {
    const entries = Array.from(cacheMap.values()).sort((left, right) => left.updatedAt - right.updatedAt).slice(-CACHE_LIMIT);
    await setValue(CACHE_KEY, JSON.stringify({ version: 1, entries }));
  }
  async function clearAiCacheForSite(siteKey, targetLanguage) {
    const cache2 = await loadAiCache();
    for (const [fingerprint, entry] of cache2.entries()) {
      if (entry.siteKey === siteKey && entry.targetLanguage === targetLanguage) {
        cache2.delete(fingerprint);
      }
    }
    await saveAiCache(cache2);
  }
  function currentDayKey(now = /* @__PURE__ */ new Date()) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }
  async function loadDailyUsage() {
    const stored = parseStoredJson(await getValue(DAILY_USAGE_KEY, null), null);
    const day = currentDayKey();
    if (!stored || stored.day !== day) return { day, tokens: 0 };
    return { day, tokens: Math.max(0, Number(stored.tokens) || 0) };
  }
  async function addDailyUsage(tokens) {
    const usage = await loadDailyUsage();
    usage.tokens += Math.max(0, Math.round(Number(tokens) || 0));
    await setValue(DAILY_USAGE_KEY, JSON.stringify(usage));
    return usage;
  }
  async function resetDailyUsage() {
    await deleteValue(DAILY_USAGE_KEY);
  }
  // src/shared/services/ai/candidateText.js
  var INVISIBLE_TEXT_PATTERN = /[\u200B-\u200D\u2060\uFEFF]/g;
  function normalizeAiSourceText(value) {
    return String(value ?? "").normalize("NFC").replace(/\r\n|\r/g, "\n").replace(INVISIBLE_TEXT_PATTERN, "").replace(/[ \t]+/g, " ").trim();
  }
  function hasMeaningfulAiSourceText(value) {
    return normalizeAiSourceText(value).length > 0;
  }
  function isSubmittableAiCandidate(candidate) {
    return Boolean(candidate && hasMeaningfulAiSourceText(candidate.sourceText));
  }
  // src/shared/services/ai/budgetGuard.js
  var AI_RESPONSE_TOKEN_LIMIT = 65536;
  var AI_BATCH_RESPONSE_TOKEN_BUDGET = 32768;
  function estimateTokens(value) {
    return Math.max(1, Math.ceil(String(value || "").length / 3));
  }
  function estimateCandidateResponseTokens(candidate) {
    return Math.max(48, String(candidate?.sourceText || "").length + 48);
  }
  function estimateBatchResponseTokens(candidates2) {
    return candidates2.reduce((total, candidate) => total + estimateCandidateResponseTokens(candidate), 32);
  }
  function selectBatch(candidates2, limits) {
    const selected = [];
    const oversized = [];
    const invalid = [];
    let characters = 0;
    let estimatedOutputTokens = 32;
    const outputTokenBudget = Math.min(
      AI_RESPONSE_TOKEN_LIMIT,
      Math.max(256, Number(limits.maxEstimatedOutputTokens) || AI_BATCH_RESPONSE_TOKEN_BUDGET)
    );
    for (const candidate of candidates2) {
      if (selected.length >= limits.maxItems) break;
      if (!isSubmittableAiCandidate(candidate)) {
        invalid.push(candidate);
        continue;
      }
      const length = candidate.sourceText.length;
      if (length > limits.maxCharacters) {
        oversized.push(candidate);
        continue;
      }
      if (selected.length > 0 && characters + length > limits.maxCharacters) break;
      const candidateOutputTokens = estimateCandidateResponseTokens(candidate);
      if (selected.length > 0 && estimatedOutputTokens + candidateOutputTokens > outputTokenBudget) break;
      selected.push(candidate);
      characters += length;
      estimatedOutputTokens += candidateOutputTokens;
    }
    return { candidates: selected, oversized, invalid, characters, estimatedOutputTokens };
  }
  function checkBudget({ settings, sessionUsage: sessionUsage2, dailyUsage, requestPayload, nextCharacters = 0 }) {
    const estimatedTokens = estimateTokens(JSON.stringify(requestPayload)) * 2;
    if (sessionUsage2.requests >= settings.maxRequestsPerSession) {
      return { allowed: false, reason: "session-requests", estimatedTokens };
    }
    if (sessionUsage2.characters + nextCharacters > settings.maxCharactersPerSession) {
      return { allowed: false, reason: "session-characters", estimatedTokens };
    }
    if (dailyUsage.tokens + estimatedTokens > settings.maxEstimatedTokensPerDay) {
      return { allowed: false, reason: "daily-tokens", estimatedTokens };
    }
    return { allowed: true, reason: null, estimatedTokens };
  }
  // src/shared/utils/text/regexRules.js
  var MAX_REGEX_PATTERN_LENGTH = 1e3;
  var MAX_REGEX_REPLACEMENT_LENGTH = 1e3;
  var ALLOWED_REGEX_FLAGS = /^[dgimsuvy]*$/;
  var RULE_MARKER_PATTERN = /qps-rule:([a-zA-Z0-9_-]+)/;
  var DYNAMIC_VALUE_MARKER = "<value>";
  var DYNAMIC_VALUE_PATTERN = /[$€£¥₹]\s*\d+(?:[.,]\d+)*|\b\d+(?:\.\d+)+(?:[a-z]+)?\b|\b\d+(?:[.,]\d+)?(?:p|k|m|b|ms|s)?\b/gi;
  function createDynamicRegexShape(sourceText) {
    const shape = String(sourceText || "").replace(/\s+/g, " ").trim().replace(DYNAMIC_VALUE_PATTERN, DYNAMIC_VALUE_MARKER);
    return shape.includes(DYNAMIC_VALUE_MARKER) ? shape.toLocaleLowerCase("en-US") : "";
  }
  function hasDynamicRegexValue(sourceText) {
    return Boolean(createDynamicRegexShape(sourceText));
  }
  function isSingleSampleRegexCandidate(sourceText) {
    return hasDynamicRegexValue(sourceText) && /[•:()/]/.test(String(sourceText || ""));
  }
  function escapeFixedRegexText(value) {
    return String(value).split(/(\s+)/).map((part) => /^\s+$/.test(part) ? "\\s+" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("");
  }
  function capturePatternForDynamicValue(value) {
    const currency = String(value).match(/^([$€£¥₹])\s*\d/);
    if (currency) return `(${escapeFixedRegexText(currency[1])}\\s*[\\d,.]+)`;
    const unit = String(value).match(/(?:p|k|m|b|ms|s)$/i)?.[0];
    if (unit) return `(\\d+(?:[.,]\\d+)?${escapeFixedRegexText(unit)})`;
    if (/\d(?:\.\d+)+/.test(value)) return "(\\d+(?:\\.\\d+)+)";
    return "(\\d+(?:[.,]\\d+)?)";
  }
  function createSingleSampleRegexRule({ id, sourceId, sourceText, translation, confidence = 1 }) {
    const source = String(sourceText || "");
    const target = String(translation || "");
    if (!isSingleSampleRegexCandidate(source) || !target || source.trim() === target.trim()) return null;
    const values = Array.from(source.matchAll(new RegExp(DYNAMIC_VALUE_PATTERN.source, DYNAMIC_VALUE_PATTERN.flags)));
    if (values.length === 0) return null;
    let sourceIndex = 0;
    let translationIndex = 0;
    let pattern = "^";
    let replacement = "";
    for (let index = 0; index < values.length; index += 1) {
      const value = values[index][0];
      const valueIndex = values[index].index;
      const targetValueIndex = target.indexOf(value, translationIndex);
      if (targetValueIndex < 0) return null;
      pattern += escapeFixedRegexText(source.slice(sourceIndex, valueIndex));
      pattern += capturePatternForDynamicValue(value);
      replacement += target.slice(translationIndex, targetValueIndex);
      replacement += `$${index + 1}`;
      sourceIndex = valueIndex + value.length;
      translationIndex = targetValueIndex + value.length;
    }
    pattern += `${escapeFixedRegexText(source.slice(sourceIndex))}$`;
    replacement += target.slice(translationIndex);
    const rule = {
      id,
      sourceIds: [sourceId],
      pattern,
      flags: "i",
      replacement,
      confidence,
      category: "single-sample-dynamic",
      reason: "future-proof-dynamic-value",
      origin: "ai"
    };
    const validated = validateRegexRuleDefinition(rule, {
      sourceTexts: [source],
      requireSourceMatch: true,
      requireAnchors: true,
      requireDynamicCapture: true
    });
    return validated.valid ? validated.rule : null;
  }
  function matchEditedRegexRulesToExisting(editedRules, existingRules) {
    const edited = Array.isArray(editedRules) ? editedRules : [];
    const existing = Array.isArray(existingRules) ? existingRules : [];
    const existingById = new Map(existing.map((rule) => [rule.id, rule]));
    const matches = Array(edited.length).fill(null);
    const usedIds = /* @__PURE__ */ new Set();
    edited.forEach((rule, index) => {
      const requestedId = String(rule?.id || "").trim();
      const match = requestedId ? existingById.get(requestedId) : null;
      if (!match) return;
      matches[index] = match;
      usedIds.add(match.id);
    });
    edited.forEach((rule, index) => {
      if (rule?.id || matches[index]) return;
      const exactMatch = existing.find(
        (candidate) => !usedIds.has(candidate.id) && candidate.pattern === rule.pattern && candidate.flags === rule.flags && candidate.replacement === rule.replacement
      );
      if (!exactMatch) return;
      matches[index] = exactMatch;
      usedIds.add(exactMatch.id);
    });
    const unmatchedEditedIndexes = edited.map((rule, index) => ({ rule, index })).filter(({ rule, index }) => !rule?.id && !matches[index]).map(({ index }) => index);
    const unmatchedExisting = existing.filter((rule) => !usedIds.has(rule.id));
    if (unmatchedEditedIndexes.length === 1 && unmatchedExisting.length === 1) {
      matches[unmatchedEditedIndexes[0]] = unmatchedExisting[0];
    } else if (unmatchedEditedIndexes.length > 0 && unmatchedExisting.length > 0) {
      return { valid: false, matches: [], error: "ambiguous-regex-edit" };
    }
    return { valid: true, matches };
  }
  function hasDuplicateCharacters(value) {
    return new Set(value).size !== value.length;
  }
  function hasUnsafeRegexShape(pattern) {
    return /\((?:[^()\\]|\\.)*(?:[+*]|\{\d+,\})(?:[^()\\]|\\.)*\)(?:[+*]|\{\d+,\})/.test(pattern);
  }
  function countCapturingGroups(pattern) {
    let count = 0;
    let escaped = false;
    let inCharacterClass = false;
    for (let index = 0; index < pattern.length; index += 1) {
      const character = pattern[index];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (character === "\\") {
        escaped = true;
        continue;
      }
      if (character === "[") {
        inCharacterClass = true;
        continue;
      }
      if (character === "]" && inCharacterClass) {
        inCharacterClass = false;
        continue;
      }
      if (!inCharacterClass && character === "(" && pattern[index + 1] !== "?") count += 1;
    }
    return count;
  }
  function replacementGroupReferences(replacement) {
    const references = [];
    const pattern = /\$(\d{1,2})/g;
    let match;
    while ((match = pattern.exec(replacement)) !== null) {
      references.push(Number(match[1]));
    }
    return references;
  }
  function normalizeRuleId(value, fallback = "") {
    const normalized = String(value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80);
    return normalized || fallback;
  }
  function testRuleAgainstSource(regex, sourceText) {
    regex.lastIndex = 0;
    const matched = regex.test(String(sourceText || ""));
    regex.lastIndex = 0;
    return matched;
  }
  function validateRegexRuleDefinition(rule, options = {}) {
    const sourceTexts = Array.isArray(options.sourceTexts) ? options.sourceTexts.map(String) : [];
    const requireSourceMatch = options.requireSourceMatch !== false;
    const pattern = typeof rule?.pattern === "string" ? rule.pattern : "";
    const flags = typeof rule?.flags === "string" ? rule.flags : "";
    const replacement = typeof rule?.replacement === "string" ? rule.replacement : "";
    const sourceIds = Array.isArray(rule?.sourceIds) ? Array.from(new Set(rule.sourceIds.map((id) => String(id).trim()).filter(Boolean))).slice(0, 100) : [];
    if (!pattern || pattern.length > MAX_REGEX_PATTERN_LENGTH) return { valid: false, reason: "invalid-regex-pattern" };
    if (replacement.length > MAX_REGEX_REPLACEMENT_LENGTH) {
      return { valid: false, reason: "invalid-regex-replacement" };
    }
    if (!ALLOWED_REGEX_FLAGS.test(flags) || hasDuplicateCharacters(flags)) {
      return { valid: false, reason: "invalid-regex-flags" };
    }
    if (hasUnsafeRegexShape(pattern)) return { valid: false, reason: "unsafe-regex-pattern" };
    if (options.requireAnchors && (!pattern.startsWith("^") || !pattern.endsWith("$"))) {
      return { valid: false, reason: "unanchored-single-sample-regex" };
    }
    let regex;
    try {
      regex = new RegExp(pattern, flags);
    } catch {
      return { valid: false, reason: "invalid-regex-pattern" };
    }
    const groupCount = countCapturingGroups(pattern);
    const groupReferences = replacementGroupReferences(replacement);
    if (groupReferences.some((group) => group < 1 || group > groupCount)) {
      return { valid: false, reason: "invalid-regex-capture" };
    }
    if (options.requireDynamicCapture && (groupCount < 1 || groupReferences.length < 1)) {
      return { valid: false, reason: "missing-single-sample-capture" };
    }
    if (requireSourceMatch && sourceTexts.some((sourceText) => !testRuleAgainstSource(regex, sourceText))) {
      return { valid: false, reason: "regex-source-mismatch" };
    }
    const normalized = {
      id: normalizeRuleId(rule?.id, createRegexRuleId(pattern, flags, replacement)),
      sourceIds,
      pattern,
      flags,
      replacement,
      confidence: Number.isFinite(Number(rule?.confidence)) ? Number(rule.confidence) : 0,
      category: typeof rule?.category === "string" ? rule.category.slice(0, 80) : "",
      reason: typeof rule?.reason === "string" ? rule.reason.slice(0, 300) : "",
      origin: rule?.origin === "manual" || rule?.origin === "user-edited" ? rule.origin : "ai"
    };
    return { valid: true, rule: normalized };
  }
  function escapeRegexLiteral(pattern) {
    const source = String(pattern);
    let result = "";
    let backslashRun = 0;
    for (const character of source) {
      if (character === "\\") {
        result += character;
        backslashRun += 1;
        continue;
      }
      if (character === "/") {
        result += backslashRun % 2 === 0 ? "\\/" : "/";
      } else if (character === "\r") {
        result += "\\r";
      } else if (character === "\n") {
        result += "\\n";
      } else {
        result += character;
      }
      backslashRun = 0;
    }
    return result;
  }
  function markerForRuleId(ruleId) {
    const safeId = normalizeRuleId(ruleId, "regex-rule");
    return `qps-rule:${safeId}`;
  }
  function formatRegexRulesForTranslation(rules, options = {}) {
    const includePropertyWrapper = options.includePropertyWrapper !== false;
    const includeRuleComments = options.includeRuleComments === true;
    const normalizedRules = Array.isArray(rules) ? rules : [];
    if (normalizedRules.length === 0) return includePropertyWrapper ? "regexRules: []" : "[]";
    const entries = normalizedRules.map((rule, index) => {
      const pattern = escapeRegexLiteral(rule.pattern);
      const flags = String(rule.flags || "");
      const replacement = JSON.stringify(String(rule.replacement || ""));
      const ruleId = rule.id || createRegexRuleId(rule.pattern, flags, rule.replacement, index);
      const marker = includeRuleComments ? ` // ${markerForRuleId(ruleId)}` : "";
      return `    [/${pattern}/${flags}, ${replacement}],${marker}`;
    });
    const body = `[
${entries.join("\n")}
]`;
    return includePropertyWrapper ? `regexRules: ${body}` : body;
  }
  function isWhitespace(character) {
    return Boolean(character && /\s/.test(character));
  }
  function skipWhitespaceAndComments(source, start2) {
    let index = start2;
    while (index < source.length) {
      if (isWhitespace(source[index]) || source[index] === ",") {
        index += 1;
        continue;
      }
      if (source.startsWith("//", index)) {
        const end = source.indexOf("\n", index + 2);
        index = end < 0 ? source.length : end + 1;
        continue;
      }
      if (source.startsWith("/*", index)) {
        const end = source.indexOf("*/", index + 2);
        if (end < 0) return { index: source.length, error: "unterminated-comment" };
        index = end + 2;
        continue;
      }
      break;
    }
    return { index };
  }
  function parseRegexLiteral(source, start2) {
    if (source[start2] !== "/") return { error: "expected-regex" };
    let index = start2 + 1;
    let escaped = false;
    let inCharacterClass = false;
    while (index < source.length) {
      const character = source[index];
      if (escaped) {
        escaped = false;
        index += 1;
        continue;
      }
      if (character === "\\") {
        escaped = true;
        index += 1;
        continue;
      }
      if (character === "\n" || character === "\r") return { error: "invalid-regex-pattern" };
      if (character === "[") inCharacterClass = true;
      if (character === "]" && inCharacterClass) inCharacterClass = false;
      if (character === "/" && !inCharacterClass) break;
      index += 1;
    }
    if (index >= source.length) return { error: "unterminated-regex" };
    const pattern = source.slice(start2 + 1, index);
    index += 1;
    const flagsStart = index;
    while (index < source.length && /[a-z]/i.test(source[index])) index += 1;
    return { pattern, flags: source.slice(flagsStart, index), index };
  }
  function parseStringLiteral(source, start2) {
    const quote = source[start2];
    if (quote !== '"' && quote !== "'") return { error: "expected-string" };
    let index = start2 + 1;
    let result = "";
    while (index < source.length) {
      const character = source[index];
      if (character === quote) return { value: result, index: index + 1 };
      if (character !== "\\") {
        if (character === "\n" || character === "\r") return { error: "unterminated-string" };
        result += character;
        index += 1;
        continue;
      }
      index += 1;
      if (index >= source.length) return { error: "unterminated-string" };
      const escaped = source[index];
      const escapeMap = { n: "\n", r: "\r", t: "	", b: "\b", f: "\f", v: "\v", 0: "\0" };
      if (escapeMap[escaped] !== void 0) {
        result += escapeMap[escaped];
        index += 1;
        continue;
      }
      if (escaped === "u" && /^[0-9a-f]{4}$/i.test(source.slice(index + 1, index + 5))) {
        result += String.fromCharCode(parseInt(source.slice(index + 1, index + 5), 16));
        index += 5;
        continue;
      }
      if (escaped === "x" && /^[0-9a-f]{2}$/i.test(source.slice(index + 1, index + 3))) {
        result += String.fromCharCode(parseInt(source.slice(index + 1, index + 3), 16));
        index += 3;
        continue;
      }
      result += escaped;
      index += 1;
    }
    return { error: "unterminated-string" };
  }
  function readRuleMarker(source, start2) {
    let index = start2;
    let marker = null;
    while (index < source.length) {
      if (isWhitespace(source[index]) || source[index] === ",") {
        index += 1;
        continue;
      }
      if (source.startsWith("//", index)) {
        const end = source.indexOf("\n", index + 2);
        const comment = source.slice(index + 2, end < 0 ? source.length : end);
        marker = comment.match(RULE_MARKER_PATTERN)?.[1] || marker;
        index = end < 0 ? source.length : end + 1;
        continue;
      }
      if (source.startsWith("/*", index)) {
        const end = source.indexOf("*/", index + 2);
        if (end < 0) return { error: "unterminated-comment" };
        const comment = source.slice(index + 2, end);
        marker = comment.match(RULE_MARKER_PATTERN)?.[1] || marker;
        index = end + 2;
        continue;
      }
      break;
    }
    return { index, marker };
  }
  function parseRegexRules(content) {
    if (typeof content !== "string" || !content.trim()) return { valid: false, rules: [], error: "empty-regex-output" };
    const source = content.replace(/^\uFEFF/, "").trim();
    let index = 0;
    if (source.startsWith("regexRules")) {
      index = "regexRules".length;
      while (isWhitespace(source[index])) index += 1;
      if (source[index] !== ":") return { valid: false, rules: [], error: "invalid-regex-wrapper" };
      index += 1;
    }
    while (isWhitespace(source[index])) index += 1;
    if (source[index] !== "[") return { valid: false, rules: [], error: "invalid-regex-wrapper" };
    index += 1;
    const rules = [];
    const ids = /* @__PURE__ */ new Set();
    while (index < source.length) {
      const skipped = skipWhitespaceAndComments(source, index);
      if (skipped.error) return { valid: false, rules: [], error: skipped.error };
      index = skipped.index;
      if (source[index] === "]") {
        index += 1;
        break;
      }
      if (source[index] !== "[") return { valid: false, rules: [], error: "invalid-regex-entry" };
      index += 1;
      const regexResult = parseRegexLiteral(source, index);
      if (regexResult.error) return { valid: false, rules: [], error: regexResult.error };
      index = regexResult.index;
      while (isWhitespace(source[index])) index += 1;
      if (source[index] !== ",") return { valid: false, rules: [], error: "invalid-regex-entry" };
      index += 1;
      while (isWhitespace(source[index])) index += 1;
      const stringResult = parseStringLiteral(source, index);
      if (stringResult.error) return { valid: false, rules: [], error: stringResult.error };
      index = stringResult.index;
      while (isWhitespace(source[index])) index += 1;
      if (source[index] !== "]") return { valid: false, rules: [], error: "invalid-regex-entry" };
      index += 1;
      const markerResult = readRuleMarker(source, index);
      if (markerResult.error) return { valid: false, rules: [], error: markerResult.error };
      index = markerResult.index;
      if (markerResult.marker && ids.has(markerResult.marker)) {
        return { valid: false, rules: [], error: "duplicate-regex-rule-id" };
      }
      if (markerResult.marker) ids.add(markerResult.marker);
      const parsedRule = {
        id: markerResult.marker || null,
        sourceIds: [],
        pattern: regexResult.pattern,
        flags: regexResult.flags,
        replacement: stringResult.value,
        origin: markerResult.marker ? "user-edited" : "manual"
      };
      const syntaxCheck = validateRegexRuleDefinition(parsedRule, { requireSourceMatch: false });
      if (!syntaxCheck.valid) return { valid: false, rules: [], error: syntaxCheck.reason };
      rules.push(parsedRule);
      if (source[index] === ",") index += 1;
    }
    const trailing = skipWhitespaceAndComments(source, index);
    if (trailing.error || trailing.index !== source.length) {
      return { valid: false, rules: [], error: trailing.error || "unexpected-regex-content" };
    }
    return { valid: true, rules };
  }
  function createRegexRuleId(pattern, flags, replacement, index = 0) {
    const seed = `${pattern}\0${flags}\0${replacement}\0${index}`;
    let hash = 2166136261;
    for (let characterIndex = 0; characterIndex < seed.length; characterIndex += 1) {
      hash ^= seed.charCodeAt(characterIndex);
      hash = Math.imul(hash, 16777619);
    }
    return `regex-${(hash >>> 0).toString(36)}`;
  }
  // src/shared/services/ai/promptBuilder.js
  var TARGET_LABELS = {
    "zh-CN": "Simplified Chinese",
    "zh-TW": "Traditional Chinese"
  };
  var REGEX_HINT_LIMIT = 24;
  function buildRegexCandidateGroups(candidates2) {
    const groupsByShape = /* @__PURE__ */ new Map();
    candidates2.forEach((candidate, index) => {
      const shape = createDynamicRegexShape(candidate.sourceText);
      if (!shape) return;
      const group = groupsByShape.get(shape) || { shape, sourceIds: [], firstIndex: index };
      group.sourceIds.push(candidate.id);
      groupsByShape.set(shape, group);
    });
    return Array.from(groupsByShape.values()).filter(
      (group) => group.sourceIds.length >= 2 || isSingleSampleRegexCandidate(candidates2[group.firstIndex]?.sourceText)
    ).sort((left, right) => right.sourceIds.length - left.sourceIds.length || left.firstIndex - right.firstIndex).slice(0, REGEX_HINT_LIMIT).map((group, index) => ({
      id: `regex-candidate-${index + 1}`,
      sourceIds: group.sourceIds,
      sharedShape: group.shape
    }));
  }
  function limitText(value, maxLength) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
  }
  function sanitizeContext(context = {}) {
    return {
      tagName: limitText(context.tagName, 24),
      role: limitText(context.role, 40),
      blockType: limitText(context.blockType, 40),
      domPath: limitText(context.domPath, 160),
      label: limitText(context.label, 120),
      pageTitle: limitText(context.pageTitle, 200),
      nearestHeading: limitText(context.nearestHeading, 240),
      headingChain: limitText(context.headingChain, 240),
      breadcrumb: limitText(context.breadcrumb, 240),
      precedingText: limitText(context.precedingText, 150),
      followingText: limitText(context.followingText, 150),
      nearbyText: limitText(context.nearbyText, 360),
      listIndex: Math.min(9999, Math.max(0, Number(context.listIndex) || 0)),
      placeholders: Array.isArray(context.placeholders) ? context.placeholders.map((item) => limitText(item, 120)).slice(0, 20) : []
    };
  }
  function sanitizePageContext(page = {}) {
    return {
      url: limitText(page.url, 512),
      siteName: limitText(page.siteName, 120),
      title: limitText(page.title, 200),
      langHint: limitText(page.langHint, 32),
      description: limitText(page.description, 240),
      type: limitText(page.type, 32),
      navigation: Array.isArray(page.navigation) ? page.navigation.map((item) => limitText(item, 24)).filter(Boolean).slice(0, 12) : [],
      targetLanguage: limitText(page.targetLanguage, 16)
    };
  }
  function buildTranslationRequest({ provider, candidates: candidates2, targetLanguage, styleProfile, pageContext }) {
    const validCandidates = candidates2.filter(isSubmittableAiCandidate);
    if (validCandidates.length === 0 || validCandidates.length !== candidates2.length) {
      throw new TypeError("empty-candidate-batch");
    }
    const targetLabel = TARGET_LABELS[targetLanguage] || TARGET_LABELS["zh-CN"];
    const style = styleProfile ? {
      tone: limitText(styleProfile.tone, 300),
      glossary: limitText(styleProfile.glossary, 1200),
      punctuation: limitText(styleProfile.punctuation, 300),
      instructions: limitText(styleProfile.instructions, 1200)
    } : null;
    const systemContent = [
      "You are a web UI text classifier and translator.",
      `The source language may be any language. Translate only into ${targetLabel}.`,
      "A page profile may be included with the site name, URL, title, language hint, and navigation terms. Use it to understand the site domain and vocabulary.",
      "Treat the page language hint as a weak signal: if the source text language differs from the hint, follow the actual text.",
      "Classify every item as translate, remove, or review.",
      "translate: user-facing UI copy that should be translated into the target language and enter the translation library.",
      "remove: anything that should not enter the translation library, including copy already in the target language, proper nouns or brands that stay untranslated, and dynamic or user-specific data such as project, plan, or product names.",
      "review: uncertain meaning or insufficient context.",
      "URLs, codes, identifiers, numbers, emails, and similar noise are usually already removed by local filters before submission.",
      "Preserve every placeholder exactly. Do not add, remove, rename, or translate placeholders.",
      "Return one item result for every input id. Never return HTML or Markdown outside JSON strings.",
      'For normal translatable items, use translationType "text" and put the translated text in translation.',
      "Before classifying individual items, inspect regexCandidateGroups and the full item list for repeated source structures. The groups are non-authoritative hints: use a group only when its items can safely share one translated replacement.",
      "Within this batch, prefer a regex rule when at least two source items share a translatable fixed sentence shell and differ only in reusable values such as prices, counts, dates, durations, or versions. Different dynamic values are not a reason to remove the items.",
      "A one-item regexCandidateGroup may also become one regex rule when the source contains an explicit value that is likely to change later, such as a price, count, date, duration, resolution, or version inside an otherwise stable translatable sentence. This is allowed to future-proof a site change without waiting for a second sample.",
      "A single-sample rule must be anchored with ^ and $, capture every changing value, reuse those captures in replacement, and keep all fixed source wording literal and specific. Never create a single-sample regex for ordinary static copy or an untranslated model/product name.",
      "Do not create a regex merely to preserve an untranslated proper name. If the fixed shell does not need translation or a shared replacement would mistranslate any source, keep the normal classification.",
      "For a regex rule, capture dynamic values with numbered capture groups, preserve those values with $1, $2, and so on, and keep the rule specific to the provided examples. Prefer an anchored pattern for a complete UI string.",
      'Example: sources "Audio \u2022 Input: $3.50 / Output: $21.00" and "Audio \u2022 Input: $0.50 / Output: $1.50" should share a specific anchored regex that captures the two prices and translates the fixed Audio/Input/Output shell.',
      'Every regex source id must appear in exactly one regex rule. A repeated-template rule has at least two distinct source ids; a strict future-proof single-sample rule has exactly one. Items assigned to a regex rule use translationType "regex", an empty translation, and the matching regexRuleId.',
      'The action field always describes the classification and must be exactly "translate", "remove", or "review". Never put "text" or "regex" in action.',
      'A valid regex item looks exactly like {"id":"candidate-a","action":"translate","translationType":"regex","regexRuleId":"rule-a","translation":"","confidence":0.96}.',
      'Return JSON with shape {"items":[{"id":"...","action":"translate|remove|review","translationType":"text|regex","regexRuleId":"...","translation":"...","confidence":0.0,"category":"...","reason":"..."}],"regexRules":[{"id":"...","sourceIds":["..."],"pattern":"...","flags":"i","replacement":"...","confidence":0.0,"category":"...","reason":"..."}]}.'
    ].join("\n");
    const regexCandidateGroups = buildRegexCandidateGroups(validCandidates);
    const userContent = JSON.stringify({
      targetLanguage,
      sourceLanguageHint: "auto",
      ...pageContext ? { page: sanitizePageContext(pageContext) } : {},
      style,
      regexCandidateGroups,
      items: validCandidates.map((candidate) => ({
        id: candidate.id,
        sourceText: candidate.sourceText,
        context: sanitizeContext(candidate.context)
      }))
    });
    const regexRuleReserve = Math.min(8192, Math.max(512, Math.ceil(validCandidates.length / 2) * 96));
    const maxOutputTokens = Math.min(
      AI_RESPONSE_TOKEN_LIMIT,
      Math.max(1024, estimateBatchResponseTokens(validCandidates) + 512 + regexRuleReserve)
    );
    const request = {
      model: provider.model,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent }
      ],
      temperature: 0.1,
      max_tokens: maxOutputTokens,
      stream: false
    };
    if (provider.responseMode === "json-mode") {
      request.response_format = { type: "json_object" };
    }
    if (/^deepseek-/i.test(provider.model)) {
      request.thinking = { type: "disabled" };
    }
    return request;
  }
  var PROVIDER_TEST_CANDIDATE = Object.freeze({
    id: "provider-test",
    sourceText: "Save settings",
    context: Object.freeze({
      tagName: "button",
      role: "button",
      blockType: "interactive",
      pageTitle: "",
      nearestHeading: "",
      breadcrumb: "",
      nearbyText: "",
      placeholders: []
    })
  });
  function buildProviderProcessingTestRequest(provider, targetLanguage = "zh-CN") {
    const request = buildTranslationRequest({
      provider,
      candidates: [PROVIDER_TEST_CANDIDATE],
      targetLanguage,
      styleProfile: null
    });
    request.max_tokens = 1024;
    return request;
  }
  // src/shared/services/ai/responseValidator.js
  var ALLOWED_ACTIONS = new Set(Object.values(AI_ACTIONS));
  var PLACEHOLDER_PATTERN = /\{\{[^{}]+\}\}|\$\{[^{}]+\}|\{(?:\d+|[a-zA-Z_][\w.-]*)\}|%(?:\d+\$)?[sdif]|%[a-zA-Z_][\w-]*%|:[a-zA-Z_][\w-]*|https?:\/\/[^\s)\]}>'"]+/gi;
  function extractPlaceholders(text) {
    return Array.from(new Set(String(text || "").match(PLACEHOLDER_PATTERN) || [])).sort();
  }
  function parseJsonContent(content) {
    if (typeof content !== "string" || content.trim() === "") {
      throw new Error("empty-response");
    }
    const trimmed = content.trim();
    const withoutFence = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    return JSON.parse(withoutFence);
  }
  function placeholdersMatch(sourceText, translation) {
    return JSON.stringify(extractPlaceholders(sourceText)) === JSON.stringify(extractPlaceholders(translation));
  }
  function normalizeComparableText(value) {
    return String(value || "").normalize("NFC").replace(/\s+/g, " ").trim();
  }
  function isUnchangedTranslation(sourceText, translation) {
    return normalizeComparableText(sourceText) === normalizeComparableText(translation);
  }
  function normalizeResponseId(value) {
    return String(value || "").trim().slice(0, 120);
  }
  function normalizeRegexReference(value) {
    return normalizeResponseId(value).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80);
  }
  function normalizedConfidence(value) {
    const confidence = Number(value);
    return Number.isFinite(confidence) && confidence >= 0 && confidence <= 1 ? confidence : null;
  }
  function createReview(candidate, reason, item = {}, translationType = AI_TRANSLATION_TYPES.TEXT, regexRuleId = "") {
    return {
      id: candidate.id,
      sourceText: candidate.sourceText,
      action: AI_ACTIONS.REVIEW,
      translation: translationType === AI_TRANSLATION_TYPES.TEXT && typeof item.translation === "string" ? item.translation.trim() : "",
      translationType,
      ...regexRuleId ? { regexRuleId } : {},
      confidence: normalizedConfidence(item.confidence) ?? 0,
      category: typeof item.category === "string" ? item.category.slice(0, 80) : "validation",
      reason,
      status: AI_CANDIDATE_STATUS.REVIEW
    };
  }
  function normalizeAction(item) {
    if (item?.action === AI_ACTIONS.KEEP) return AI_ACTIONS.REMOVE;
    if (item?.action === AI_TRANSLATION_TYPES.REGEX && item?.translationType !== AI_TRANSLATION_TYPES.TEXT && normalizeRegexReference(item?.regexRuleId)) {
      return AI_ACTIONS.TRANSLATE;
    }
    return item?.action;
  }
  function normalizeTranslationType(item) {
    if (item?.translationType === AI_TRANSLATION_TYPES.REGEX) return AI_TRANSLATION_TYPES.REGEX;
    if (item?.action === AI_TRANSLATION_TYPES.REGEX && item?.translationType !== AI_TRANSLATION_TYPES.TEXT && normalizeRegexReference(item?.regexRuleId)) {
      return AI_TRANSLATION_TYPES.REGEX;
    }
    return AI_TRANSLATION_TYPES.TEXT;
  }
  function isConfidentTranslation(item, confidenceThreshold) {
    const confidence = normalizedConfidence(item?.confidence);
    return confidence !== null && confidence >= confidenceThreshold;
  }
  function isRegexItemForRule(item, ruleId, confidenceThreshold) {
    return normalizeAction(item) === AI_ACTIONS.TRANSLATE && normalizeTranslationType(item) === AI_TRANSLATION_TYPES.REGEX && normalizeRegexReference(item?.regexRuleId) === ruleId && isConfidentTranslation(item, confidenceThreshold);
  }
  function validateRegexResponseRule(rawRule, candidates2, responseById, confidenceThreshold, assignedSourceIds) {
    const ruleId = normalizeRegexReference(rawRule?.id);
    const rawSourceIds = Array.isArray(rawRule?.sourceIds) ? rawRule.sourceIds.map(normalizeResponseId) : [];
    const sourceIds = rawSourceIds.filter(Boolean);
    const invalidSourceIds = rawSourceIds.some((id) => !id) || rawSourceIds.length !== new Set(rawSourceIds).size || sourceIds.length < 1;
    if (!ruleId || invalidSourceIds) return { valid: false, ruleId, sourceIds, reason: "invalid-regex-sources" };
    if (sourceIds.some((id) => !responseById.has(id))) {
      return { valid: false, ruleId, sourceIds, reason: "unknown-regex-source" };
    }
    if (sourceIds.some((id) => assignedSourceIds.has(id))) {
      return { valid: false, ruleId, sourceIds, reason: "overlapping-regex-rules" };
    }
    const ruleConfidence = normalizedConfidence(rawRule?.confidence);
    if (ruleConfidence === null || ruleConfidence < confidenceThreshold) {
      return { valid: false, ruleId, sourceIds, reason: "low-confidence-regex-rule" };
    }
    if (sourceIds.some((id) => !isRegexItemForRule(responseById.get(id), ruleId, confidenceThreshold))) {
      return { valid: false, ruleId, sourceIds, reason: "regex-item-mismatch" };
    }
    const candidatesById = new Map(candidates2.map((candidate) => [candidate.id, candidate]));
    const sourceTexts = sourceIds.map((id) => candidatesById.get(id)?.sourceText || "");
    const singleSample = sourceIds.length === 1;
    if (singleSample && !hasDynamicRegexValue(sourceTexts[0])) {
      return { valid: false, ruleId, sourceIds, reason: "invalid-single-sample-regex" };
    }
    const validated = validateRegexRuleDefinition(
      { ...rawRule, id: ruleId, sourceIds, confidence: ruleConfidence },
      {
        sourceTexts,
        requireSourceMatch: true,
        requireAnchors: singleSample,
        requireDynamicCapture: singleSample
      }
    );
    if (!validated.valid) return { valid: false, ruleId, sourceIds, reason: validated.reason };
    sourceIds.forEach((id) => assignedSourceIds.add(id));
    return { valid: true, ruleId, sourceIds, rule: validated.rule };
  }
  function validateTranslationResponse(payload, candidates2, confidenceThreshold) {
    const candidateMap = new Map(candidates2.map((candidate) => [candidate.id, candidate]));
    const rawItems = Array.isArray(payload?.items) ? payload.items : [];
    const responseById = /* @__PURE__ */ new Map();
    rawItems.forEach((item) => {
      if (item && typeof item.id === "string" && candidateMap.has(item.id) && !responseById.has(item.id)) {
        responseById.set(item.id, item);
      }
    });
    const assignedSourceIds = /* @__PURE__ */ new Set();
    const validRegexRules = /* @__PURE__ */ new Map();
    const invalidRegexReasons = /* @__PURE__ */ new Map();
    const invalidRegexSourceReasons = /* @__PURE__ */ new Map();
    const rawRules = Array.isArray(payload?.regexRules) ? payload.regexRules : [];
    const seenRuleIds = /* @__PURE__ */ new Set();
    rawRules.forEach((rawRule) => {
      const ruleId = normalizeRegexReference(rawRule?.id);
      const sourceIds = Array.isArray(rawRule?.sourceIds) ? rawRule.sourceIds.map(normalizeResponseId).filter(Boolean) : [];
      if (seenRuleIds.has(ruleId)) {
        invalidRegexReasons.set(ruleId, "duplicate-regex-rule-id");
        sourceIds.forEach((id) => {
          invalidRegexReasons.set(id, "duplicate-regex-rule-id");
          invalidRegexSourceReasons.set(id, "duplicate-regex-rule-id");
        });
        return;
      }
      seenRuleIds.add(ruleId);
      const result = validateRegexResponseRule(
        rawRule,
        candidates2,
        responseById,
        confidenceThreshold,
        assignedSourceIds
      );
      if (result.valid) {
        validRegexRules.set(result.ruleId, result.rule);
      } else {
        invalidRegexReasons.set(result.ruleId, result.reason);
        result.sourceIds.forEach((id) => {
          invalidRegexReasons.set(id, result.reason);
          invalidRegexSourceReasons.set(id, result.reason);
        });
      }
    });
    const decisions2 = candidates2.map((candidate) => {
      const item = responseById.get(candidate.id);
      if (!item) return createReview(candidate, "missing-result", item);
      const action = normalizeAction(item);
      const confidence = normalizedConfidence(item.confidence);
      const translationType = normalizeTranslationType(item);
      const regexRuleId = normalizeRegexReference(item.regexRuleId);
      if (!ALLOWED_ACTIONS.has(action)) return createReview(candidate, "invalid-action", item, translationType);
      if (confidence === null)
        return createReview(candidate, "invalid-confidence", item, translationType, regexRuleId);
      if (action === AI_ACTIONS.REVIEW || confidence < confidenceThreshold) {
        return createReview(candidate, item.reason || "low-confidence", item, translationType, regexRuleId);
      }
      if (invalidRegexSourceReasons.has(candidate.id)) {
        return createReview(
          candidate,
          invalidRegexSourceReasons.get(candidate.id),
          item,
          translationType,
          regexRuleId
        );
      }
      if (action === AI_ACTIONS.TRANSLATE && translationType === AI_TRANSLATION_TYPES.REGEX) {
        if (!regexRuleId || !validRegexRules.has(regexRuleId) || invalidRegexReasons.has(candidate.id)) {
          return createReview(
            candidate,
            invalidRegexReasons.get(candidate.id) || "invalid-regex-rule",
            item,
            translationType,
            regexRuleId
          );
        }
        return {
          id: candidate.id,
          sourceText: candidate.sourceText,
          action,
          translation: "",
          translationType,
          regexRuleId,
          confidence,
          category: typeof item.category === "string" ? item.category.slice(0, 80) : "",
          reason: typeof item.reason === "string" ? item.reason.slice(0, 300) : "",
          status: AI_CANDIDATE_STATUS.TRANSLATED
        };
      }
      if (action === AI_ACTIONS.TRANSLATE) {
        const translation = typeof item.translation === "string" ? item.translation.trim() : "";
        if (!translation) return createReview(candidate, "empty-translation", item);
        if (isUnchangedTranslation(candidate.sourceText, translation)) {
          return {
            id: candidate.id,
            sourceText: candidate.sourceText,
            action: AI_ACTIONS.REMOVE,
            translation: "",
            translationType: AI_TRANSLATION_TYPES.TEXT,
            confidence,
            category: typeof item.category === "string" ? item.category.slice(0, 80) : "",
            reason: typeof item.reason === "string" && item.reason ? item.reason.slice(0, 300) : "unchanged-translation",
            status: AI_CANDIDATE_STATUS.REMOVED
          };
        }
        if (!placeholdersMatch(candidate.sourceText, translation)) {
          return createReview(candidate, "placeholder-mismatch", item);
        }
        return {
          id: candidate.id,
          sourceText: candidate.sourceText,
          action,
          translation,
          translationType: AI_TRANSLATION_TYPES.TEXT,
          confidence,
          category: typeof item.category === "string" ? item.category.slice(0, 80) : "",
          reason: typeof item.reason === "string" ? item.reason.slice(0, 300) : "",
          status: AI_CANDIDATE_STATUS.TRANSLATED
        };
      }
      const status = action === AI_ACTIONS.REMOVE ? AI_CANDIDATE_STATUS.REMOVED : AI_CANDIDATE_STATUS.REVIEW;
      return {
        id: candidate.id,
        sourceText: candidate.sourceText,
        action,
        translation: "",
        translationType: AI_TRANSLATION_TYPES.TEXT,
        confidence,
        category: typeof item.category === "string" ? item.category.slice(0, 80) : "",
        reason: typeof item.reason === "string" ? item.reason.slice(0, 300) : "",
        status
      };
    });
    const decisionById = new Map(decisions2.map((decision) => [decision.id, decision]));
    const invalidValidatedRuleIds = new Set(
      Array.from(validRegexRules.entries()).filter(
        ([, rule]) => !rule.sourceIds.every((sourceId) => {
          const decision = decisionById.get(sourceId);
          return decision?.translationType === AI_TRANSLATION_TYPES.REGEX && decision.status === AI_CANDIDATE_STATUS.TRANSLATED && decision.regexRuleId === rule.id;
        })
      ).map(([id]) => id)
    );
    const finalDecisions = decisions2.map((decision) => {
      if (!invalidValidatedRuleIds.has(decision.regexRuleId)) return decision;
      const candidate = candidateMap.get(decision.id);
      return createReview(
        candidate,
        "invalid-regex-group",
        responseById.get(decision.id),
        AI_TRANSLATION_TYPES.REGEX,
        decision.regexRuleId
      );
    });
    const finalDecisionById = new Map(finalDecisions.map((decision) => [decision.id, decision]));
    const finalRegexRules = Array.from(validRegexRules.entries()).filter(
      ([, rule]) => rule.sourceIds.every((sourceId) => {
        const decision = finalDecisionById.get(sourceId);
        return decision?.translationType === AI_TRANSLATION_TYPES.REGEX && decision.status === AI_CANDIDATE_STATUS.TRANSLATED && decision.regexRuleId === rule.id;
      })
    ).map(([, rule]) => rule);
    const usedRuleIds = new Set(finalRegexRules.map((rule) => rule.id));
    const promotedRulesByShape = /* @__PURE__ */ new Map();
    const promotedDecisions = finalDecisions.map((decision) => {
      if (decision.action !== AI_ACTIONS.TRANSLATE || decision.translationType !== AI_TRANSLATION_TYPES.TEXT || decision.status !== AI_CANDIDATE_STATUS.TRANSLATED) {
        return decision;
      }
      const candidate = candidateMap.get(decision.id);
      const generatedId = createRegexRuleId(candidate.sourceText, "i", decision.translation);
      const promotedRule = createSingleSampleRegexRule({
        id: generatedId,
        sourceId: candidate.id,
        sourceText: candidate.sourceText,
        translation: decision.translation,
        confidence: decision.confidence
      });
      if (!promotedRule) return decision;
      if (finalRegexRules.some((rule) => {
        const regex = new RegExp(rule.pattern, rule.flags);
        regex.lastIndex = 0;
        return regex.test(candidate.sourceText);
      })) {
        return decision;
      }
      const shapeKey = `${promotedRule.pattern}\0${promotedRule.flags}\0${promotedRule.replacement}`;
      const existingPromotedRule = promotedRulesByShape.get(shapeKey);
      if (existingPromotedRule) {
        existingPromotedRule.sourceIds.push(candidate.id);
        existingPromotedRule.confidence = Math.min(existingPromotedRule.confidence, decision.confidence);
        return {
          ...decision,
          translation: "",
          translationType: AI_TRANSLATION_TYPES.REGEX,
          regexRuleId: existingPromotedRule.id
        };
      }
      let ruleId = generatedId;
      let suffix = 0;
      while (usedRuleIds.has(ruleId)) {
        suffix += 1;
        ruleId = `${generatedId}-${suffix}`;
      }
      usedRuleIds.add(ruleId);
      const storedRule = {
        ...promotedRule,
        id: ruleId,
        category: decision.category || promotedRule.category,
        reason: decision.reason || promotedRule.reason
      };
      promotedRulesByShape.set(shapeKey, storedRule);
      return {
        ...decision,
        translation: "",
        translationType: AI_TRANSLATION_TYPES.REGEX,
        regexRuleId: ruleId
      };
    });
    return {
      decisions: promotedDecisions,
      regexRules: [...finalRegexRules, ...promotedRulesByShape.values()]
    };
  }
  // src/shared/services/ai/providerClient.js
  var AiProviderError = class extends Error {
    constructor(code, message, status = 0) {
      super(message);
      this.name = "AiProviderError";
      this.code = code;
      this.status = status;
    }
  };
  function validateProviderUrl(apiUrl) {
    let parsed;
    try {
      parsed = new URL(apiUrl);
    } catch {
      throw new AiProviderError("invalid-url", "Invalid API URL");
    }
    const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
    if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && isLocalhost)) {
      throw new AiProviderError("unsafe-url", "Only HTTPS or localhost HTTP endpoints are allowed");
    }
    if (parsed.username || parsed.password || parsed.search || parsed.hash) {
      throw new AiProviderError(
        "invalid-url",
        "Credentials, query strings, and fragments are not allowed in the API URL"
      );
    }
    if (!/\/chat\/completions\/?$/i.test(parsed.pathname)) {
      throw new AiProviderError("invalid-endpoint", "The API URL must be a full chat/completions endpoint");
    }
    return parsed.toString();
  }
  function validateProviderConfiguration(provider, apiKey) {
    if (!provider?.model) {
      throw new AiProviderError("missing-model", "A model is required");
    }
    if (!apiKey || !String(apiKey).trim()) {
      throw new AiProviderError("missing-api-key", "An API key is required");
    }
    if (String(apiKey).trim().length > 4096) {
      throw new AiProviderError("invalid-api-key", "The API key is too long");
    }
    return validateProviderUrl(provider.apiUrl);
  }
  function parseResponseBody(responseText) {
    try {
      return JSON.parse(responseText);
    } catch {
      throw new AiProviderError("invalid-json", "The provider returned invalid JSON");
    }
  }
  function createChatCompletionRequest({
    provider,
    apiKey,
    payload,
    timeoutMs = 45e3,
    transport = xmlHttpRequest
  }) {
    const url = validateProviderConfiguration(provider, apiKey);
    let requestHandle = null;
    let settled = false;
    const promise = new Promise((resolve, reject) => {
      const finish = (callback) => (value) => {
        if (settled) return;
        settled = true;
        callback(value);
      };
      const resolveOnce = finish(resolve);
      const rejectOnce = finish(reject);
      requestHandle = transport({
        method: "POST",
        url,
        redirect: "error",
        timeout: timeoutMs,
        headers: {
          Authorization: `Bearer ${String(apiKey).trim()}`,
          "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        responseType: "text",
        onload: (response) => {
          if (response.status < 200 || response.status >= 300) {
            const statusCode = Number(response.status) || 0;
            const code = statusCode === 401 || statusCode === 403 ? "authentication" : statusCode === 429 ? "rate-limit" : statusCode >= 500 ? "provider-unavailable" : "http-error";
            rejectOnce(
              new AiProviderError(code, `Provider request failed with HTTP ${statusCode}`, statusCode)
            );
            return;
          }
          if (String(response.responseText || "").length > 2e6) {
            rejectOnce(new AiProviderError("response-too-large", "The provider response is too large"));
            return;
          }
          try {
            const body = parseResponseBody(response.responseText);
            if (body?.choices?.[0]?.finish_reason === "length") {
              rejectOnce(new AiProviderError("truncated-response", "The provider response was truncated"));
              return;
            }
            const content = body?.choices?.[0]?.message?.content;
            if (typeof content !== "string") {
              rejectOnce(
                new AiProviderError(
                  "invalid-response",
                  "The provider response is missing choices[0].message.content"
                )
              );
              return;
            }
            resolveOnce({ body, content, usage: body.usage || null });
          } catch (error) {
            rejectOnce(error);
          }
        },
        ontimeout: () => rejectOnce(new AiProviderError("timeout", "The provider request timed out")),
        onerror: () => rejectOnce(new AiProviderError("network", "The provider request failed")),
        onabort: () => rejectOnce(new AiProviderError("aborted", "The provider request was aborted"))
      });
    });
    return {
      promise,
      abort() {
        if (!settled && requestHandle && typeof requestHandle.abort === "function") {
          requestHandle.abort();
        }
      }
    };
  }
  async function testProviderProcessing({
    provider,
    apiKey,
    timeoutMs,
    transport,
    targetLanguage = "zh-CN",
    confidenceThreshold = 0.85
  }) {
    const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    const request = createChatCompletionRequest({
      provider,
      apiKey,
      payload: buildProviderProcessingTestRequest(provider, targetLanguage),
      timeoutMs,
      transport
    });
    const response = await request.promise;
    let decision;
    try {
      const payload = parseJsonContent(response.content);
      ({
        decisions: [decision]
      } = validateTranslationResponse(payload, [PROVIDER_TEST_CANDIDATE], confidenceThreshold));
    } catch (error) {
      throw new AiProviderError("processing-test-failed", error?.message || "The processing test failed");
    }
    if (decision?.action !== AI_ACTIONS.TRANSLATE || decision?.status !== AI_CANDIDATE_STATUS.TRANSLATED || !decision.translation) {
      throw new AiProviderError(
        "processing-test-failed",
        `The provider did not return a valid translation (${decision?.reason || "invalid-result"})`
      );
    }
    const finishedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    return { latencyMs: Math.round(finishedAt - startedAt), translation: decision.translation };
  }
  // src/shared/services/ai/siteStyleStore.js
  var STYLE_KEY = "qing_pagescanner_ai_site_styles_v1";
  var MAX_PROFILES = 200;
  function parseProfiles(value) {
    if (!value) return [];
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      return parsed?.version === 1 && Array.isArray(parsed.profiles) ? parsed.profiles : [];
    } catch {
      return [];
    }
  }
  function normalizePathPrefix(value) {
    const trimmed = String(value || "/").trim();
    if (!trimmed || trimmed === "/") return "/";
    return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
  }
  function normalizeOrigin(value) {
    try {
      const parsed = new URL(String(value || "").trim());
      return ["http:", "https:"].includes(parsed.protocol) ? parsed.origin : "";
    } catch {
      return "";
    }
  }
  function normalizeStyleProfile(profile) {
    const origin = normalizeOrigin(profile.origin);
    const pathPrefix = normalizePathPrefix(profile.pathPrefix);
    const targetLanguage = profile.targetLanguage === "zh-TW" ? "zh-TW" : "zh-CN";
    return {
      id: profile.id || `style-${hashText(`${origin}|${pathPrefix}|${targetLanguage}`)}`,
      origin,
      pathPrefix,
      targetLanguage,
      tone: String(profile.tone || "").trim().slice(0, 300),
      glossary: String(profile.glossary || "").trim().slice(0, 1200),
      punctuation: String(profile.punctuation || "").trim().slice(0, 300),
      instructions: String(profile.instructions || "").trim().slice(0, 1200),
      version: Math.max(1, Number(profile.version) || 1),
      updatedAt: Number(profile.updatedAt) || Date.now(),
      lastUsedAt: Number(profile.lastUsedAt) || Date.now()
    };
  }
  async function loadStyleProfiles() {
    const profiles = parseProfiles(await getValue(STYLE_KEY, null));
    return profiles.map(normalizeStyleProfile).sort((left, right) => right.lastUsedAt - left.lastUsedAt);
  }
  async function saveStyleProfiles(profiles) {
    const normalized = profiles.map(normalizeStyleProfile).slice(0, MAX_PROFILES);
    await setValue(STYLE_KEY, JSON.stringify({ version: 1, profiles: normalized }));
    return normalized;
  }
  async function upsertStyleProfile(profile) {
    const profiles = await loadStyleProfiles();
    const normalized = normalizeStyleProfile(profile);
    if (!normalized.origin) throw new Error("invalid-style-origin");
    const existingIndex = profiles.findIndex((item) => item.id === normalized.id);
    if (existingIndex >= 0) {
      normalized.version = profiles[existingIndex].version + 1;
      profiles.splice(existingIndex, 1, normalized);
    } else {
      profiles.unshift(normalized);
    }
    await saveStyleProfiles(profiles);
    return normalized;
  }
  async function deleteStyleProfile(profileId) {
    const profiles = await loadStyleProfiles();
    await saveStyleProfiles(profiles.filter((profile) => profile.id !== profileId));
  }
  async function clearStyleProfiles() {
    await deleteValue(STYLE_KEY);
  }
  async function matchStyleProfile(locationLike, targetLanguage) {
    const profiles = await loadStyleProfiles();
    const origin = String(locationLike?.origin || "");
    const pathname = normalizePathPrefix(locationLike?.pathname || "/");
    const matched = profiles.filter(
      (profile) => profile.origin === origin && profile.targetLanguage === targetLanguage && pathname.startsWith(profile.pathPrefix)
    ).sort((left, right) => right.pathPrefix.length - left.pathPrefix.length)[0] || null;
    if (matched) {
      const now = Date.now();
      if (now - matched.lastUsedAt > 6e4) {
        matched.lastUsedAt = now;
        await saveStyleProfiles(profiles.map((profile) => profile.id === matched.id ? matched : profile));
      }
    }
    return matched;
  }
  // src/shared/ui/components/disclosure.js
  function createDisclosure({ id, title, icon = "", expanded = false }) {
    const controller2 = new AbortController();
    const element = document.createElement("div");
    element.className = "tc-disclosure";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tc-disclosure-trigger";
    trigger.setAttribute("aria-controls", `${id}-content`);
    trigger.appendChild(createIconTitle(icon, title));
    const arrow = document.createElement("span");
    arrow.className = "tc-disclosure-arrow";
    arrow.setAttribute("aria-hidden", "true");
    const arrowSvg = createSVGFromString(arrowDownIcon);
    if (arrowSvg) arrow.appendChild(arrowSvg);
    trigger.appendChild(arrow);
    const content = document.createElement("div");
    content.id = `${id}-content`;
    content.className = "tc-disclosure-content";
    const setExpanded = (nextExpanded) => {
      const isExpanded = Boolean(nextExpanded);
      trigger.setAttribute("aria-expanded", String(isExpanded));
      content.hidden = !isExpanded;
    };
    trigger.addEventListener("click", () => setExpanded(trigger.getAttribute("aria-expanded") !== "true"), {
      signal: controller2.signal
    });
    element.append(trigger, content);
    setExpanded(expanded);
    return {
      element,
      content,
      setExpanded,
      destroy: () => controller2.abort()
    };
  }
  // src/shared/ui/components/formField.js
  function createFieldShell(id, labelText, control) {
    const container = document.createElement("div");
    container.className = "tc-field-group";
    const label = document.createElement("label");
    label.className = "tc-field-label";
    label.htmlFor = id;
    label.textContent = labelText;
    container.append(label, control);
    return container;
  }
  function createTextField(id, labelText, value = "", options = {}) {
    const { type = "text", rows, autocomplete, spellcheck = false } = options;
    const input = rows ? document.createElement("textarea") : document.createElement("input");
    input.id = id;
    input.className = "tc-text-input";
    input.value = value ?? "";
    input.spellcheck = spellcheck;
    if (rows) {
      input.rows = rows;
      input.classList.add("tc-text-input-multiline");
    } else {
      input.type = type;
    }
    if (autocomplete) {
      input.autocomplete = autocomplete;
    }
    return { element: createFieldShell(id, labelText, input), input };
  }
  function createCustomSelectField(id, labelText, options, value) {
    const mount = document.createElement("div");
    mount.className = "tc-custom-select-mount";
    const select = new CustomSelect(mount, options, value);
    select.trigger.id = id;
    return { element: createFieldShell(id, labelText, mount), select };
  }
  // src/shared/ui/components/toggleSwitch.js
  function createToggleSwitch(id, title, description, checked = false) {
    const input = document.createElement("input");
    input.id = id;
    input.className = "tc-toggle-input";
    input.type = "checkbox";
    input.setAttribute("role", "switch");
    input.setAttribute("aria-describedby", `${id}-description`);
    input.checked = Boolean(checked);
    const titleElement = document.createElement("span");
    titleElement.className = "tc-toggle-title";
    titleElement.textContent = title;
    const descriptionElement = document.createElement("span");
    descriptionElement.id = `${id}-description`;
    descriptionElement.className = "tc-toggle-description";
    descriptionElement.textContent = description;
    const copy = document.createElement("span");
    copy.className = "tc-toggle-copy";
    copy.append(titleElement, descriptionElement);
    const control = document.createElement("span");
    control.className = "tc-toggle-control";
    control.setAttribute("aria-hidden", "true");
    const element = document.createElement("label");
    element.className = "tc-toggle-setting";
    element.append(copy, input, control);
    return { element, input };
  }
  // src/assets/icons/addIcon.js
  var addIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`;
  // src/assets/icons/budgetIcon.js
  var budgetIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" aria-hidden="true"><path d="M200-160q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720v80H200v400h560v-80h80v80q0 33-23.5 56.5T760-160H200Zm360-160q-33 0-56.5-23.5T480-400v-160q0-33 23.5-56.5T560-640h280q33 0 56.5 23.5T920-560v160q0 33-23.5 56.5T840-320H560Zm280-80v-160H560v160h280Zm-640-80v240-480 240Z"/></svg>`;
  // src/assets/icons/deleteIcon.js
  var deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" aria-hidden="true"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
  // src/assets/icons/jsonIcon.js
  var jsonIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M190-360h70q17 0 28.5-11.5T300-400v-200h-60v190h-40v-50h-50v60q0 17 11.5 28.5T190-360Zm177 0h60q17 0 28.5-11.5T467-400v-60q0-17-11.5-28.5T427-500h-50v-50h40v20h50v-30q0-17-11.5-28.5T427-600h-60q-17 0-28.5 11.5T327-560v60q0 17 11.5 28.5T367-460h50v50h-40v-20h-50v30q0 17 11.5 28.5T367-360Zm176-60v-120h40v120h-40Zm-10 60h60q17 0 28.5-11.5T633-400v-160q0-17-11.5-28.5T593-600h-60q-17 0-28.5 11.5T493-560v160q0 17 11.5 28.5T533-360Zm127 0h50v-105l40 105h50v-240h-50v105l-40-105h-50v240ZM120-160q-33 0-56.5-23.5T40-240v-480q0-33 23.5-56.5T120-800h720q33 0 56.5 23.5T920-720v480q0 33-23.5 56.5T840-160H120Zm0-80h720v-480H120v480Zm0 0v-480 480Z"/></svg>`;
  // src/assets/icons/resetIcon.js
  var resetIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" aria-hidden="true"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q88 0 169 41t135 111v-152h80v320H544v-80h196q-42-70-110-115t-150-45q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q94 0 168.5-57.5T752-408h82q-31 125-129.5 206.5T480-120Z"/></svg>`;
  // src/assets/icons/speedIcon.js
  var speedIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" aria-hidden="true"><path d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28 55.5t22 60.5Zm62-460q57 0 109 16.5t96 47.5l-70 47q-31-16-65.5-23.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 81t32.5 74l-66 44q-28-46-43-96.5T80-400q0-83 31.5-155.5t85.5-126q54-53.5 127-85.5T480-800Zm278 124q42 53 62 120.5T840-420q0 57-14.5 109T784-211l-66-44q20-35 31-74t11-81q0-40-10-78t-30-72l38-116ZM480-120q-63 0-120.5-20.5T256-199l66-44q35 20 75 31.5t83 11.5q43 0 83-11.5t75-31.5l66 44q-46 38-103.5 58.5T480-120Z"/></svg>`;
  // src/features/settings/aiPanel.js
  function localizedOptions(options) {
    return options.map(({ labelKey, ...option }) => ({ ...option, label: t(labelKey) }));
  }
  function createSelectField(id, labelKey, options, value) {
    return createCustomSelectField(id, t(labelKey), localizedOptions(options), value);
  }
  function createNumberField(id, labelKey, value, options) {
    const element = createNumericInput(id, t(labelKey), value, options);
    element.classList.add("ai-number-field");
    return { element, input: element.querySelector('input[type="number"]') };
  }
  function createSection(titleKey, icon) {
    const section = document.createElement("section");
    section.className = "ai-settings-section";
    const header = document.createElement("header");
    header.className = "ai-section-header setting-title-container";
    header.appendChild(createIconTitle(icon, t(titleKey)));
    const body = document.createElement("div");
    body.className = "ai-section-body";
    section.append(header, body);
    return { section, body };
  }
  function numberValue(input, fallback) {
    const value = Number(input.value);
    return Number.isFinite(value) ? value : fallback;
  }
  function mountAiSettingsPanel(container, currentAiSettings) {
    const settings = mergeAiSettings(currentAiSettings);
    let providers = settings.providers.map((provider2) => ({ ...provider2 }));
    let activeProviderId = settings.activeProviderId;
    const providerKeys = /* @__PURE__ */ new Map();
    const deletedProviderIds = /* @__PURE__ */ new Set();
    const buttons = [];
    const selects = [];
    const lifecycle = new AbortController();
    const { signal } = lifecycle;
    let isDestroyed = false;
    const registerSelect = (field) => {
      selects.push(field.select);
      return field;
    };
    const aiEnabled = createToggleSwitch(
      "ai-feature-enabled",
      t("settings.ai.enabled"),
      t("settings.ai.enabledDescription"),
      settings.enabled
    );
    const aiBetaBadge = document.createElement("span");
    aiBetaBadge.className = "ai-beta-badge";
    aiBetaBadge.textContent = t("settings.ai.betaBadge");
    aiEnabled.element.querySelector(".tc-toggle-title")?.append(aiBetaBadge);
    const aiBetaNotice = createIconTitle(warningIcon, t("settings.ai.betaNotice"));
    aiBetaNotice.classList.add("settings-info-notice", "ai-beta-notice");
    aiBetaNotice.setAttribute("role", "note");
    aiBetaNotice.firstElementChild?.classList.add("settings-info-notice-icon");
    const aiControls = document.createElement("div");
    aiControls.className = "ai-settings-controls";
    function syncAiControlsAvailability() {
      const disabled = !aiEnabled.input.checked;
      aiControls.classList.toggle("is-disabled", disabled);
      aiControls.setAttribute("aria-disabled", String(disabled));
      aiControls.inert = disabled;
    }
    aiEnabled.input.addEventListener("change", syncAiControlsAvailability, { signal });
    const general = createSection("settings.ai.general", aiIcon);
    const generalGrid = document.createElement("div");
    generalGrid.className = "ai-form-grid ai-general-grid";
    const mode = registerSelect(
      createSelectField(
        "ai-processing-mode",
        "settings.ai.processingMode",
        [
          { value: AI_PROCESSING_MODES.MANUAL, labelKey: "settings.ai.manual", icon: pauseIcon },
          { value: AI_PROCESSING_MODES.AUTO, labelKey: "settings.ai.automatic", icon: aiIcon }
        ],
        settings.processingMode
      )
    );
    const target = registerSelect(
      createSelectField(
        "ai-target-language",
        "settings.ai.targetLanguage",
        [
          {
            value: AI_TARGET_LANGUAGES.SIMPLIFIED_CHINESE,
            labelKey: "settings.ai.simplifiedChinese",
            icon: languageIcon_default
          },
          {
            value: AI_TARGET_LANGUAGES.TRADITIONAL_CHINESE,
            labelKey: "settings.ai.traditionalChinese",
            icon: languageIcon_default
          }
        ],
        settings.targetLanguage
      )
    );
    const confidence = createNumberField(
      "ai-confidence-threshold",
      "settings.ai.confidenceThreshold",
      settings.confidenceThreshold,
      { min: 0.5, max: 1, step: 0.01 }
    );
    const regexRuleComments = createToggleSwitch(
      "ai-regex-rule-comments",
      t("settings.ai.regexRuleComments"),
      t("settings.ai.regexRuleCommentsDescription"),
      settings.includeRegexRuleComments
    );
    generalGrid.append(mode.element, target.element, confidence.element);
    general.body.append(generalGrid, regexRuleComments.element);
    const provider = createSection("settings.ai.provider", settingsIcon);
    const providerToolbar = document.createElement("div");
    providerToolbar.className = "ai-provider-toolbar";
    const providerPicker = registerSelect(
      createCustomSelectField(
        "ai-active-provider",
        t("settings.ai.currentProvider"),
        providers.map((item) => ({ value: item.id, label: item.name, icon: settingsIcon })),
        activeProviderId
      )
    );
    providerPicker.element.classList.add("ai-provider-picker");
    const providerToolbarActions = document.createElement("div");
    providerToolbarActions.className = "ai-compact-actions";
    providerToolbar.append(providerPicker.element, providerToolbarActions);
    const providerName = createTextField("ai-provider-name", t("settings.ai.providerName"));
    const providerUrl = createTextField("ai-provider-url", t("settings.ai.apiUrl"), "", { type: "url" });
    const providerModel = createTextField("ai-provider-model", t("settings.ai.model"));
    const responseMode = registerSelect(
      createSelectField(
        "ai-response-mode",
        "settings.ai.responseMode",
        [
          { value: AI_RESPONSE_MODES.JSON, labelKey: "settings.ai.jsonMode", icon: jsonIcon },
          { value: AI_RESPONSE_MODES.PROMPT_JSON, labelKey: "settings.ai.promptJson", icon: jsonIcon }
        ],
        AI_RESPONSE_MODES.JSON
      )
    );
    const apiKey = createTextField("ai-provider-key", t("settings.ai.apiKey"), "", {
      type: "password",
      autocomplete: "off"
    });
    providerUrl.element.classList.add("ai-field-wide");
    const providerForm = document.createElement("div");
    providerForm.className = "ai-form-grid ai-provider-form";
    providerForm.append(providerName.element, providerModel.element, providerUrl.element, responseMode.element);
    const providerFooter = document.createElement("div");
    providerFooter.className = "ai-action-footer ai-provider-footer";
    providerFooter.hidden = true;
    const providerStatus = document.createElement("div");
    providerStatus.className = "ai-provider-status";
    providerStatus.setAttribute("aria-live", "polite");
    const providerTestDescription = createIconTitle(infoIcon, t("settings.ai.testDescription"));
    providerTestDescription.classList.add("settings-info-notice", "ai-provider-test-description");
    providerTestDescription.setAttribute("role", "note");
    providerTestDescription.firstElementChild?.classList.add("settings-info-notice-icon");
    function setProviderStatus(message = "", state = "") {
      providerStatus.textContent = message;
      providerStatus.dataset.state = state;
      providerFooter.hidden = !message;
    }
    function activeProvider() {
      return providers.find((item) => item.id === activeProviderId) || providers[0];
    }
    function syncProviderFromForm() {
      const index = providers.findIndex((item) => item.id === activeProviderId);
      if (index < 0) return;
      providers[index] = normalizeProvider(
        {
          ...providers[index],
          name: providerName.input.value,
          apiUrl: providerUrl.input.value,
          model: providerModel.input.value,
          responseMode: responseMode.select.getValue()
        },
        index
      );
      providerKeys.set(activeProviderId, apiKey.input.value);
    }
    async function persistProviderKeys() {
      await Promise.all(Array.from(providerKeys, ([id, key]) => saveProviderApiKey(id, key || "")));
      await Promise.all(Array.from(deletedProviderIds, (id) => deleteProviderApiKey(id)));
      deletedProviderIds.clear();
    }
    async function persistProviderConfiguration() {
      syncProviderFromForm();
      await persistProviderKeys();
      const storedSettings = loadSettings();
      saveSettings({
        ai: mergeAiSettings({
          ...storedSettings.ai,
          activeProviderId,
          providers
        })
      });
      showNotification(t("notifications.aiProviderSaved"), { type: "success" });
    }
    async function renderProviderForm() {
      const active = activeProvider();
      if (!active) return;
      activeProviderId = active.id;
      providerPicker.select.updateOptions(
        providers.map((item) => ({ value: item.id, label: item.name, icon: settingsIcon }))
      );
      providerPicker.select.setValue(activeProviderId);
      providerName.input.value = active.name;
      providerUrl.input.value = active.apiUrl;
      providerModel.input.value = active.model;
      responseMode.select.setValue(active.responseMode);
      setProviderStatus();
      deleteProviderBtn.disabled = providers.length <= 1;
      const cachedKey = providerKeys.get(active.id);
      apiKey.input.value = cachedKey || "";
      if (!providerKeys.has(active.id)) {
        const untouchedValue = apiKey.input.value;
        const storedKey = await loadProviderApiKey(active.id);
        if (isDestroyed) return;
        providerKeys.set(active.id, storedKey);
        if (activeProviderId === active.id && apiKey.input.value === untouchedValue) {
          apiKey.input.value = storedKey || "";
        }
      }
    }
    providerPicker.select.container.addEventListener(
      "custom-select-change",
      (event) => {
        syncProviderFromForm();
        activeProviderId = event.detail.value;
        void renderProviderForm();
      },
      { signal }
    );
    const addProviderBtn = createButton({
      textKey: "settings.ai.addProvider",
      icon: addIcon,
      onClick: () => {
        syncProviderFromForm();
        const id = `custom-${Date.now()}-${providers.length}`;
        providers.push(normalizeProvider({ id, name: t("settings.ai.newProvider") }, providers.length));
        activeProviderId = id;
        void renderProviderForm();
      }
    });
    const deleteProviderBtn = createButton({
      textKey: "common.delete",
      icon: deleteIcon,
      onClick: async () => {
        if (providers.length <= 1) return;
        const confirmed = await showConfirmationModal(t("confirmation.deleteProvider"), warningIcon);
        if (!confirmed) return;
        deletedProviderIds.add(activeProviderId);
        providerKeys.delete(activeProviderId);
        providers = providers.filter((item) => item.id !== activeProviderId);
        activeProviderId = providers[0].id;
        await renderProviderForm();
      }
    });
    const testProviderBtn = createButton({
      textKey: "settings.ai.testConnection",
      icon: speedIcon,
      onClick: async () => {
        syncProviderFromForm();
        setProviderStatus(t("settings.ai.testing"), "pending");
        testProviderBtn.disabled = true;
        try {
          const result = await testProviderProcessing({
            provider: activeProvider(),
            apiKey: apiKey.input.value,
            timeoutMs: numberValue(timeout.input, settings.requestTimeoutMs / 1e3) * 1e3,
            targetLanguage: target.select.getValue(),
            confidenceThreshold: numberValue(confidence.input, settings.confidenceThreshold)
          });
          setProviderStatus(
            `${t("settings.ai.processingOk")}: ${result.translation} \xB7 ${result.latencyMs} ms`,
            "success"
          );
        } catch (error) {
          setProviderStatus(
            `${t("settings.ai.connectionFailed")}: ${error?.code || error?.message || "unknown"}`,
            "error"
          );
        } finally {
          testProviderBtn.disabled = false;
        }
      }
    });
    const saveProviderBtn = createButton({
      textKey: "settings.ai.saveProvider",
      icon: saveIcon,
      onClick: async () => {
        saveProviderBtn.disabled = true;
        try {
          await persistProviderConfiguration();
        } catch (error) {
          setProviderStatus(
            `${t("settings.ai.connectionFailed")}: ${error?.code || error?.message || "storage"}`,
            "error"
          );
        } finally {
          saveProviderBtn.disabled = false;
        }
      }
    });
    buttons.push(addProviderBtn, deleteProviderBtn, testProviderBtn, saveProviderBtn);
    providerToolbarActions.append(addProviderBtn, deleteProviderBtn);
    const providerKeyRow = document.createElement("div");
    providerKeyRow.className = "ai-provider-key-row";
    providerKeyRow.append(apiKey.element, testProviderBtn, saveProviderBtn);
    providerFooter.append(providerStatus);
    provider.body.append(providerToolbar, providerForm, providerKeyRow, providerTestDescription, providerFooter);
    const budget = createSection("settings.ai.costControl", budgetIcon);
    const budgetGrid = document.createElement("div");
    budgetGrid.className = "ai-form-grid ai-budget-grid";
    const maxBatchItems = createNumberField(
      "ai-max-batch-items",
      "settings.ai.maxBatchItems",
      settings.batch.maxItems,
      { min: 1, max: 500 }
    );
    const maxBatchCharacters = createNumberField(
      "ai-max-batch-characters",
      "settings.ai.maxBatchCharacters",
      settings.batch.maxCharacters,
      { min: 500, max: 2e5 }
    );
    const maxOutputTokens = createNumberField(
      "ai-max-output-tokens",
      "settings.ai.maxOutputTokens",
      settings.batch.maxEstimatedOutputTokens,
      { min: 4096, max: 131072 }
    );
    const maxRequests = createNumberField(
      "ai-max-page-requests",
      "settings.ai.maxRequests",
      settings.budget.maxRequestsPerSession,
      { min: 1, max: 500 }
    );
    const maxCharacters = createNumberField(
      "ai-max-page-characters",
      "settings.ai.maxPageCharacters",
      settings.budget.maxCharactersPerSession,
      { min: 1e3, max: 1e6 }
    );
    const dailyTokens = createNumberField(
      "ai-daily-token-limit",
      "settings.ai.dailyTokens",
      settings.budget.maxEstimatedTokensPerDay,
      { min: 1e3, max: 1e7 }
    );
    const timeout = createNumberField("ai-request-timeout", "settings.ai.timeout", settings.requestTimeoutMs / 1e3, {
      min: 5,
      max: 120
    });
    budgetGrid.append(
      maxBatchItems.element,
      maxBatchCharacters.element,
      maxOutputTokens.element,
      maxRequests.element,
      maxCharacters.element,
      dailyTokens.element,
      timeout.element
    );
    const resetUsageBtn = createButton({
      textKey: "settings.ai.resetDailyUsage",
      icon: resetIcon,
      onClick: async () => {
        await resetDailyUsage();
        showNotification(t("notifications.aiDailyUsageReset"), { type: "success" });
      }
    });
    const restoreDefaultsBtn = createButton({
      textKey: "settings.ai.restoreDefaults",
      icon: resetIcon,
      onClick: () => {
        maxBatchItems.input.value = AI_DEFAULT_SETTINGS.batch.maxItems;
        maxBatchCharacters.input.value = AI_DEFAULT_SETTINGS.batch.maxCharacters;
        maxOutputTokens.input.value = AI_DEFAULT_SETTINGS.batch.maxEstimatedOutputTokens;
        maxRequests.input.value = AI_DEFAULT_SETTINGS.budget.maxRequestsPerSession;
        maxCharacters.input.value = AI_DEFAULT_SETTINGS.budget.maxCharactersPerSession;
        dailyTokens.input.value = AI_DEFAULT_SETTINGS.budget.maxEstimatedTokensPerDay;
        timeout.input.value = AI_DEFAULT_SETTINGS.requestTimeoutMs / 1e3;
        showNotification(t("notifications.aiDefaultsRestored"), { type: "success" });
      }
    });
    buttons.push(resetUsageBtn, restoreDefaultsBtn);
    const budgetFooter = document.createElement("div");
    budgetFooter.className = "ai-action-footer ai-action-footer-end";
    budgetFooter.appendChild(resetUsageBtn);
    budgetFooter.appendChild(restoreDefaultsBtn);
    budget.body.append(budgetGrid, budgetFooter);
    const styles = createSection("settings.ai.siteStyles", themeIcon);
    const stylesDescription = createIconTitle(infoIcon, t("settings.ai.siteStylesDescription"));
    stylesDescription.classList.add("settings-info-notice", "ai-style-description");
    stylesDescription.setAttribute("role", "note");
    stylesDescription.firstElementChild?.classList.add("settings-info-notice-icon");
    const styleToolbar = document.createElement("div");
    styleToolbar.className = "ai-style-toolbar";
    const styleSearch = createTextField("ai-style-search", t("settings.ai.searchStyles"), "", { type: "search" });
    const styleSort = registerSelect(
      createSelectField(
        "ai-style-sort",
        "settings.ai.sortStyles",
        [
          { value: "recent", labelKey: "settings.ai.sortRecent" },
          { value: "origin", labelKey: "settings.ai.sortOrigin" }
        ],
        "recent"
      )
    );
    styleToolbar.append(styleSearch.element, styleSort.element);
    const styleWorkspace = document.createElement("div");
    styleWorkspace.className = "ai-style-workspace";
    const styleLibrary = document.createElement("div");
    styleLibrary.className = "ai-style-library";
    const styleLibraryTitle = document.createElement("div");
    styleLibraryTitle.className = "ai-subsection-title";
    styleLibraryTitle.appendChild(createIconTitle(themeIcon, t("settings.ai.styleLibrary")));
    const styleList = document.createElement("div");
    styleList.className = "ai-style-list";
    const styleEditor = document.createElement("div");
    styleEditor.className = "ai-style-editor";
    const styleEditorTitle = document.createElement("div");
    styleEditorTitle.className = "ai-subsection-title";
    styleEditorTitle.appendChild(createIconTitle(settingsIcon, t("settings.ai.styleEditor")));
    const origin = createTextField("ai-style-origin", t("settings.ai.styleOrigin"), window.location.origin);
    const pathPrefix = createTextField("ai-style-path", t("settings.ai.stylePath"), "/");
    const styleTarget = registerSelect(
      createSelectField(
        "ai-style-target",
        "settings.ai.targetLanguage",
        [
          { value: "zh-CN", labelKey: "settings.ai.simplifiedChinese", icon: languageIcon_default },
          { value: "zh-TW", labelKey: "settings.ai.traditionalChinese", icon: languageIcon_default }
        ],
        settings.targetLanguage
      )
    );
    const tone = createTextField("ai-style-tone", t("settings.ai.styleTone"), t("settings.ai.defaultStyleTone"));
    const glossary = createTextField("ai-style-glossary", t("settings.ai.styleGlossary"), "", { rows: 4 });
    const punctuation = createTextField(
      "ai-style-punctuation",
      t("settings.ai.stylePunctuation"),
      t("settings.ai.defaultStylePunctuation")
    );
    const instructions = createTextField("ai-style-instructions", t("settings.ai.styleInstructions"), "", {
      rows: 4
    });
    tone.element.classList.add("ai-field-wide");
    glossary.element.classList.add("ai-field-wide");
    instructions.element.classList.add("ai-field-wide");
    const styleForm = document.createElement("div");
    styleForm.className = "ai-form-grid ai-style-form";
    styleForm.append(tone.element, glossary.element, instructions.element);
    const advancedStyleSettings = createDisclosure({
      id: "ai-style-advanced",
      title: t("settings.ai.advancedStyleSettings"),
      icon: settingsIcon
    });
    advancedStyleSettings.element.classList.add("ai-style-advanced");
    const advancedStyleForm = document.createElement("div");
    advancedStyleForm.className = "ai-form-grid ai-style-advanced-form";
    advancedStyleForm.append(origin.element, pathPrefix.element, styleTarget.element, punctuation.element);
    advancedStyleSettings.content.appendChild(advancedStyleForm);
    let styleProfiles = [];
    let editingStyleId = null;
    function updateStyleActionState() {
      deleteStyleBtn.disabled = !editingStyleId;
      clearStylesBtn.disabled = styleProfiles.length === 0;
    }
    function resetStyleForm() {
      editingStyleId = null;
      origin.input.value = window.location.origin;
      pathPrefix.input.value = "/";
      styleTarget.select.setValue(target.select.getValue());
      tone.input.value = t("settings.ai.defaultStyleTone");
      glossary.input.value = "";
      punctuation.input.value = t("settings.ai.defaultStylePunctuation");
      instructions.input.value = "";
      advancedStyleSettings.setExpanded(false);
      updateStyleActionState();
      renderStyles();
    }
    function editStyle(profile) {
      editingStyleId = profile.id;
      origin.input.value = profile.origin;
      pathPrefix.input.value = profile.pathPrefix;
      styleTarget.select.setValue(profile.targetLanguage);
      tone.input.value = profile.tone;
      glossary.input.value = profile.glossary;
      punctuation.input.value = profile.punctuation;
      instructions.input.value = profile.instructions;
      advancedStyleSettings.setExpanded(
        profile.origin !== window.location.origin || profile.pathPrefix !== "/" || profile.targetLanguage !== target.select.getValue() || profile.punctuation !== t("settings.ai.defaultStylePunctuation")
      );
      updateStyleActionState();
      renderStyles();
    }
    function renderStyles() {
      const query = styleSearch.input.value.trim().toLocaleLowerCase();
      const visible = styleProfiles.filter(
        (profile) => !query || [profile.origin, profile.pathPrefix, profile.tone, profile.glossary].some(
          (value) => String(value).toLocaleLowerCase().includes(query)
        )
      );
      visible.sort(
        styleSort.select.getValue() === "origin" ? (left, right) => left.origin.localeCompare(right.origin) : (left, right) => right.updatedAt - left.updatedAt
      );
      styleList.replaceChildren();
      visible.forEach((profile) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "ai-style-row";
        row.classList.toggle("is-active", profile.id === editingStyleId);
        row.setAttribute("aria-pressed", String(profile.id === editingStyleId));
        row.appendChild(createIconTitle(themeIcon, `${profile.origin}${profile.pathPrefix}`));
        const language = document.createElement("span");
        language.className = "ai-style-row-meta";
        language.textContent = profile.targetLanguage;
        row.appendChild(language);
        row.addEventListener("click", () => editStyle(profile));
        styleList.appendChild(row);
      });
      if (visible.length === 0) {
        const empty = document.createElement("div");
        empty.className = "ai-style-empty";
        empty.textContent = t("settings.ai.noStyles");
        styleList.appendChild(empty);
      }
      updateStyleActionState();
    }
    styleSearch.input.addEventListener("input", renderStyles, { signal });
    styleSort.select.container.addEventListener("custom-select-change", renderStyles, { signal });
    const saveStyleBtn = createButton({
      textKey: "settings.ai.saveStyle",
      icon: saveIcon,
      onClick: async () => {
        if (!origin.input.value.trim()) {
          showNotification(t("notifications.aiStyleOriginRequired"), { type: "error" });
          return;
        }
        try {
          await upsertStyleProfile({
            id: editingStyleId,
            origin: origin.input.value,
            pathPrefix: pathPrefix.input.value,
            targetLanguage: styleTarget.select.getValue(),
            tone: tone.input.value,
            glossary: glossary.input.value,
            punctuation: punctuation.input.value,
            instructions: instructions.input.value
          });
        } catch {
          showNotification(t("notifications.aiStyleOriginRequired"), { type: "error" });
          return;
        }
        styleProfiles = await loadStyleProfiles();
        resetStyleForm();
        showNotification(t("notifications.aiStyleSaved"), { type: "success" });
      }
    });
    const resetStyleBtn = createButton({
      textKey: "settings.ai.useCurrentSite",
      icon: resetIcon,
      onClick: resetStyleForm
    });
    const deleteStyleBtn = createButton({
      textKey: "common.delete",
      icon: deleteIcon,
      disabled: true,
      onClick: async () => {
        if (!editingStyleId) return;
        const confirmed = await showConfirmationModal(t("confirmation.deleteStyle"), warningIcon);
        if (!confirmed) return;
        await deleteStyleProfile(editingStyleId);
        styleProfiles = await loadStyleProfiles();
        resetStyleForm();
      }
    });
    const clearStylesBtn = createButton({
      textKey: "settings.ai.clearStyles",
      icon: clearIcon,
      disabled: true,
      onClick: async () => {
        const confirmed = await showConfirmationModal(t("confirmation.clearStyles"), warningIcon);
        if (!confirmed) return;
        await clearStyleProfiles();
        styleProfiles = [];
        resetStyleForm();
      }
    });
    buttons.push(saveStyleBtn, resetStyleBtn, deleteStyleBtn, clearStylesBtn);
    const styleLibraryFooter = document.createElement("div");
    styleLibraryFooter.className = "ai-style-library-footer";
    styleLibraryFooter.appendChild(clearStylesBtn);
    styleLibrary.append(styleLibraryTitle, styleList, styleLibraryFooter);
    const styleActions = document.createElement("div");
    styleActions.className = "ai-action-footer ai-style-actions";
    styleActions.append(resetStyleBtn, deleteStyleBtn, saveStyleBtn);
    styleEditor.append(styleEditorTitle, styleForm, advancedStyleSettings.element, styleActions);
    styleWorkspace.append(styleLibrary, styleEditor);
    styles.body.append(stylesDescription, styleToolbar, styleWorkspace);
    aiControls.append(general.section, provider.section, budget.section, styles.section);
    container.append(aiEnabled.element, aiBetaNotice, aiControls);
    syncAiControlsAvailability();
    void renderProviderForm();
    void loadStyleProfiles().then((profiles) => {
      if (isDestroyed) return;
      styleProfiles = profiles;
      renderStyles();
    });
    return {
      async getSettings() {
        syncProviderFromForm();
        await persistProviderKeys();
        return mergeAiSettings({
          enabled: aiEnabled.input.checked,
          processingMode: mode.select.getValue(),
          targetLanguage: target.select.getValue(),
          confidenceThreshold: numberValue(confidence.input, settings.confidenceThreshold),
          includeRegexRuleComments: regexRuleComments.input.checked,
          activeProviderId,
          providers,
          requestTimeoutMs: numberValue(timeout.input, settings.requestTimeoutMs / 1e3) * 1e3,
          batch: {
            maxItems: numberValue(maxBatchItems.input, settings.batch.maxItems),
            maxCharacters: numberValue(maxBatchCharacters.input, settings.batch.maxCharacters),
            maxEstimatedOutputTokens: numberValue(
              maxOutputTokens.input,
              settings.batch.maxEstimatedOutputTokens
            ),
            debounceMs: settings.batch.debounceMs
          },
          budget: {
            maxRequestsPerSession: numberValue(maxRequests.input, settings.budget.maxRequestsPerSession),
            maxCharactersPerSession: numberValue(maxCharacters.input, settings.budget.maxCharactersPerSession),
            maxEstimatedTokensPerDay: numberValue(dailyTokens.input, settings.budget.maxEstimatedTokensPerDay)
          }
        });
      },
      destroy() {
        isDestroyed = true;
        lifecycle.abort();
        selects.forEach((select) => select.destroy());
        buttons.forEach((button) => button.destroy?.());
        advancedStyleSettings.destroy();
      }
    };
  }
  // src/features/settings/ui.js
  var settingsPanel = null;
  var selectComponents = {};
  var isTooltipVisible = false;
  var saveBtn = null;
  var unsubscribeTooltipShow = null;
  var unsubscribeTooltipHide = null;
  var aiPanelController = null;
  var handleKeyDown2 = (event) => {
    if (isTooltipVisible) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      hideSettingsPanel();
    }
  };
  function showSettingsPanel(currentSettings, onSave) {
    log(t("log.settings.panel.opening"));
    if (settingsPanel) {
      setTimeout(() => settingsPanel.classList.add("is-visible"), 10);
      return;
    }
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.tabIndex = -1;
    const panelModal = buildPanelDOM(currentSettings);
    settingsPanel.appendChild(panelModal);
    uiContainer.appendChild(settingsPanel);
    const titleContainer2 = settingsPanel.querySelector("#settings-panel-title-container");
    titleContainer2.appendChild(createIconTitle(settingsIcon, t("settings.title")));
    selectComponents = {};
    selectSettingsDefinitions.forEach((definition) => {
      const titleContainer3 = settingsPanel.querySelector(`#${definition.id}-title-container`);
      if (titleContainer3) {
        titleContainer3.appendChild(createIconTitle(definition.icon, t(definition.label)));
      }
      const selectWrapper = settingsPanel.querySelector(`#${definition.id}-wrapper`);
      if (selectWrapper) {
        const options = definition.options.map((opt) => ({
          ...opt,
          label: t(opt.label)
          // 如果 config.js 中已经定义了 icon，这里会直接透传
        }));
        if (definition.type === "image-card-select") {
          const includeBrackets = definition.key === "outputFormat" ? currentSettings.includeArrayBrackets : true;
          selectComponents[definition.key] = new ImageCardSelect(
            selectWrapper,
            options,
            currentSettings[definition.key],
            includeBrackets
          );
        } else {
          selectComponents[definition.key] = new CustomSelect(
            selectWrapper,
            options,
            currentSettings[definition.key]
          );
        }
      }
    });
    const bracketsCheckbox = settingsPanel.querySelector("#include-array-brackets");
    if (bracketsCheckbox && selectComponents.outputFormat) {
      bracketsCheckbox.addEventListener("change", () => {
        selectComponents.outputFormat.updateBracketsPreview(bracketsCheckbox.checked);
      });
    }
    const relatedTitleContainer = settingsPanel.querySelector("#related-setting-title-container");
    if (relatedTitleContainer) {
      relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t("settings.relatedSettings")));
    }
    const filterTitleContainer = settingsPanel.querySelector("#filter-setting-title-container");
    if (filterTitleContainer) {
      filterTitleContainer.appendChild(createIconTitle(filterIcon, t("settings.filterRules")));
    }
    const aiMount = settingsPanel.querySelector("#ai-settings-mount");
    if (aiMount) {
      aiPanelController = mountAiSettingsPanel(aiMount, currentSettings.ai);
    }
    const footer = settingsPanel.querySelector(".settings-panel-footer");
    saveBtn = createButton({
      id: "save-settings-btn",
      textKey: "common.save",
      icon: saveIcon,
      onClick: () => handleSave(onSave)
    });
    footer.appendChild(saveBtn);
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    settingsPanel.addEventListener("keydown", handleKeyDown2);
    const sidebarItems = settingsPanel.querySelectorAll(".settings-sidebar-item");
    const highlight = settingsPanel.querySelector(".sidebar-highlight");
    const moveHighlight = (targetItem) => {
      if (!targetItem || !highlight) return;
      const offsetTop = targetItem.offsetTop;
      const offsetHeight = targetItem.offsetHeight;
      highlight.style.transform = `translateY(${offsetTop}px)`;
      highlight.style.height = `${offsetHeight}px`;
    };
    const initialActiveItem = settingsPanel.querySelector(".settings-sidebar-item.active");
    if (initialActiveItem) {
      setTimeout(() => moveHighlight(initialActiveItem), 0);
    }
    sidebarItems.forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.dataset.target;
        sidebarItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        moveHighlight(item);
        const contents = settingsPanel.querySelectorAll(".settings-tab-content");
        contents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === targetId) {
            content.classList.add("active");
          }
        });
      });
    });
    unsubscribeTooltipShow = on("infoTooltipWillShow", () => {
      isTooltipVisible = true;
    });
    unsubscribeTooltipHide = on("infoTooltipDidHide", () => {
      isTooltipVisible = false;
    });
    settingsPanel.addEventListener(
      "transitionend",
      () => {
        settingsPanel.focus();
      },
      { once: true }
    );
    setTimeout(() => {
      if (settingsPanel) settingsPanel.classList.add("is-visible");
    }, 10);
  }
  function hideSettingsPanel() {
    if (settingsPanel && settingsPanel.classList.contains("is-visible")) {
      log(t("log.settings.panel.closing"));
      settingsPanel.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.classList.remove("is-visible");
      if (unsubscribeTooltipShow) unsubscribeTooltipShow();
      if (unsubscribeTooltipHide) unsubscribeTooltipHide();
      unsubscribeTooltipShow = null;
      unsubscribeTooltipHide = null;
      if (saveBtn) {
        saveBtn.destroy();
        saveBtn = null;
      }
      for (const key in selectComponents) {
        if (selectComponents[key].destroy) {
          selectComponents[key].destroy();
        }
      }
      selectComponents = {};
      if (aiPanelController) {
        aiPanelController.destroy();
        aiPanelController = null;
      }
      setTimeout(() => {
        if (settingsPanel) {
          settingsPanel.remove();
          settingsPanel = null;
        }
      }, 300);
    }
  }
  async function handleSave(onSave) {
    log(t("log.settings.panel.saving"));
    const newSettings = {};
    for (const key in selectComponents) {
      newSettings[key] = selectComponents[key].getValue();
    }
    const newFilterRules = {};
    filterDefinitions.forEach((filter) => {
      const checkbox = settingsPanel.querySelector(`#${filter.id}`);
      if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });
    newSettings.filterRules = newFilterRules;
    relatedSettingsDefinitions.forEach((setting) => {
      if (setting.type === "select") {
        const selectContainer = settingsPanel.querySelector(`#${setting.id} .custom-select-container`);
        if (selectContainer) {
          newSettings[setting.key] = selectContainer.dataset.value;
        }
        return;
      }
      const checkbox = settingsPanel.querySelector(`#${setting.id}`);
      if (!checkbox) return;
      newSettings[setting.key] = checkbox.checked;
      if (setting.linkedNumeric) {
        const numericInput = settingsPanel.querySelector(`#${setting.linkedNumeric.id}`);
        if (numericInput) {
          let value = parseInt(numericInput.value, 10);
          if (isNaN(value) || value < 5) {
            value = 5;
            numericInput.value = value;
          }
          newSettings[setting.linkedNumeric.key] = value;
        }
      }
    });
    outputSettingsDefinitions.forEach((setting) => {
      const checkbox = settingsPanel.querySelector(`#${setting.id}`);
      if (checkbox) {
        newSettings[setting.key] = checkbox.checked;
      }
    });
    if (aiPanelController) {
      newSettings.ai = await aiPanelController.getSettings();
    }
    if (onSave) {
      onSave(newSettings);
    }
    hideSettingsPanel();
  }
  function initSettingsPanel(onOpen) {
    if (window.top === window.self) {
      (async () => {
        await updateSettingsMenu(onOpen);
      })();
      on("languageChanged", async () => {
        await updateSettingsMenu(onOpen);
      });
    }
  }
  function openSettingsPanel(settings, onSaveCallback) {
    showSettingsPanel(settings, onSaveCallback);
  }
  function openContextualSettingsPanel({ titleKey, icon, definitions, settings, onSave }) {
    let contextualPanel = document.createElement("div");
    contextualPanel.className = "settings-panel-overlay";
    contextualPanel.tabIndex = -1;
    const panelModal = buildContextualPanelDOM({ titleKey, icon, definitions, settings });
    contextualPanel.appendChild(panelModal);
    uiContainer.appendChild(contextualPanel);
    const handleKeyDown3 = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closePanel();
      }
    };
    const closePanel = () => {
      if (contextualPanel) {
        document.removeEventListener("keydown", handleKeyDown3, true);
        contextualPanel.classList.remove("is-visible");
        setTimeout(() => {
          contextualPanel.remove();
          contextualPanel = null;
        }, 300);
      }
    };
    const handleSave2 = () => {
      const newSettings = {};
      definitions.forEach((def) => {
        if (def.type === "checkbox") {
          const checkbox = contextualPanel.querySelector(`#${def.id}`);
          if (checkbox) newSettings[def.key] = checkbox.checked;
        }
      });
      if (onSave) {
        onSave(newSettings);
      }
      closePanel();
    };
    const footer = contextualPanel.querySelector(".settings-panel-footer");
    const saveButton = createButton({
      id: "save-contextual-settings-btn",
      textKey: "common.save",
      icon: saveIcon,
      onClick: handleSave2
    });
    footer.appendChild(saveButton);
    contextualPanel.querySelector(".settings-panel-close").addEventListener("click", closePanel);
    document.addEventListener("keydown", handleKeyDown3, true);
    setTimeout(() => {
      if (contextualPanel) {
        contextualPanel.classList.add("is-visible");
        contextualPanel.focus();
      }
    }, 10);
  }
  // src/features/session-scan/ui.js
  var currentSessionCount = 0;
  on("sessionCleared", () => {
    currentSessionCount = 0;
  });
  function showTopCenterUI() {
    createCounterWithHelp({
      counterKey: "common.discovered",
      helpKey: "tutorial.sessionScan",
      onPause: pauseSessionScan,
      onResume: resumeSessionScan,
      scanType: "SessionScan",
      onSettingsClick: () => {
        const currentSettings = loadSettings();
        const definitions = [
          {
            id: "persist-data-checkbox-session",
            key: "sessionScan_persistData",
            type: "checkbox",
            label: "settings.contextual.persistData",
            tooltip: {
              titleIcon: infoIcon,
              title: "tooltip.persistData.title",
              text: "tooltip.persistData.text.sessionScan"
            }
          }
        ];
        openContextualSettingsPanel({
          titleKey: "settings.contextual.sessionScanTitle",
          icon: settingsIcon,
          definitions,
          settings: currentSettings,
          onSave: (newSettings) => {
            const updatedSettings = { ...currentSettings, ...newSettings };
            saveSettings(updatedSettings);
            applySettings(updatedSettings, currentSettings);
          }
        });
      }
    });
    showCounterWithHelp();
  }
  function hideTopCenterUI() {
    hideCounterWithHelp();
  }
  function showSessionSummary() {
    log(t("tooltip.summary"));
    if (isSessionRecording()) {
      showNotification(t("scan.sessionInProgress"), { type: "info" });
    }
    updateScanCount(currentSessionCount, "session");
    updateModalContent(SHOW_LOADING, true, "session-scan");
    setTimeout(() => {
      requestSummary((formattedText, count) => {
        updateScanCount(count, "session");
        if (!formattedText || formattedText.trim().slice(1, -1).trim().length === 0) {
          updateModalContent(SHOW_PLACEHOLDER, true, "session-scan");
        } else {
          updateModalContent(formattedText, true, "session-scan");
        }
      });
    }, 50);
  }
  var handleEscForSessionScan = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    const isSettingsPanelOpen = uiContainer.querySelector(".settings-panel-overlay.is-visible");
    const isHelpTooltipOpen = uiContainer.querySelector(".info-tooltip-overlay.is-visible");
    const isMainModalOpen = modalOverlay.classList.contains("is-visible");
    if (isSettingsPanelOpen || isHelpTooltipOpen || isMainModalOpen) {
      return;
    }
    if (isSessionRecording()) {
      event.preventDefault();
      event.stopPropagation();
      const dynamicFab2 = getDynamicFab();
      if (dynamicFab2) {
        handleDynamicExtractClick(dynamicFab2);
      }
    }
  };
  function handleDynamicExtractClick(dynamicFab2) {
    const elementScanFab2 = getElementScanFab();
    if (isSessionRecording()) {
      log(t("scan.stopSession"));
      stop((finalCount) => {
        const notificationText = simpleTemplate(t("scan.finished"), { count: finalCount });
        showNotification(notificationText, { type: "success" });
        currentSessionCount = finalCount;
      });
      setFabIcon(dynamicFab2, dynamicIcon);
      dynamicFab2.classList.remove("is-recording");
      updateFabTooltip(dynamicFab2, "tooltip.dynamic_scan");
      hideTopCenterUI();
      if (elementScanFab2) {
        elementScanFab2.classList.remove("fab-disabled");
        if (elementScanFab2.dataset.originalTooltipKey) {
          updateFabTooltip(elementScanFab2, elementScanFab2.dataset.originalTooltipKey);
        }
      }
      document.removeEventListener("keydown", handleEscForSessionScan, true);
      releaseScanMode(SCAN_MODES.DYNAMIC);
    } else {
      if (!acquireScanMode(SCAN_MODES.DYNAMIC)) {
        showNotification(t("notifications.scanModeConflict"), { type: "info" });
        return;
      }
      log(t("scan.startSession"));
      setFabIcon(dynamicFab2, stopIcon);
      dynamicFab2.classList.add("is-recording");
      updateFabTooltip(dynamicFab2, "scan.stopSession");
      if (elementScanFab2) {
        elementScanFab2.dataset.originalTooltipKey = elementScanFab2.dataset.tooltipKey;
        updateFabTooltip(elementScanFab2, "tooltip.disabled.scan_in_progress");
        elementScanFab2.classList.add("fab-disabled");
      }
      showNotification(t("scan.sessionStarted"), { type: "info" });
      showTopCenterUI();
      void start((count) => {
        updateCounterValue(count);
        currentSessionCount = count;
      }).catch((error) => {
        log(t("log.sessionScan.worker.initSyncError", { error: error.message }), "error");
        setFabIcon(dynamicFab2, dynamicIcon);
        dynamicFab2.classList.remove("is-recording");
        updateFabTooltip(dynamicFab2, "tooltip.dynamic_scan");
        hideTopCenterUI();
        document.removeEventListener("keydown", handleEscForSessionScan, true);
        if (elementScanFab2) {
          elementScanFab2.classList.remove("fab-disabled");
          if (elementScanFab2.dataset.originalTooltipKey) {
            updateFabTooltip(elementScanFab2, elementScanFab2.dataset.originalTooltipKey);
          }
        }
        releaseScanMode(SCAN_MODES.DYNAMIC);
        showNotification(t("notifications.scanFailed"), { type: "error" });
      });
      document.addEventListener("keydown", handleEscForSessionScan, true);
    }
  }
  on("resumeScanSession", async (state) => {
    if (state.mode === "session-scan") {
      log(t("log.sessionScan.resuming"));
      const dynamicFab2 = getDynamicFab();
      const settings = await loadSettings();
      if (dynamicFab2 && !isSessionRecording()) {
        if (!acquireScanMode(SCAN_MODES.DYNAMIC)) {
          showNotification(t("notifications.scanModeConflict"), { type: "info" });
          return;
        }
        const resumedData = settings.sessionScan_persistData && state.data ? state.data : null;
        void start((count) => {
          updateCounterValue(count);
          currentSessionCount = count;
        }, resumedData).catch((error) => {
          releaseScanMode(SCAN_MODES.DYNAMIC);
          setFabIcon(dynamicFab2, dynamicIcon);
          dynamicFab2.classList.remove("is-recording");
          updateFabTooltip(dynamicFab2, "tooltip.dynamic_scan");
          hideTopCenterUI();
          const elementScanFab3 = getElementScanFab();
          if (elementScanFab3) {
            elementScanFab3.classList.remove("fab-disabled");
            if (elementScanFab3.dataset.originalTooltipKey) {
              updateFabTooltip(elementScanFab3, elementScanFab3.dataset.originalTooltipKey);
            }
          }
          log(t("log.main.resumeFailed"), error);
        });
        setFabIcon(dynamicFab2, stopIcon);
        dynamicFab2.classList.add("is-recording");
        updateFabTooltip(dynamicFab2, "scan.stopSession");
        showTopCenterUI();
        const elementScanFab2 = getElementScanFab();
        if (elementScanFab2) {
          elementScanFab2.dataset.originalTooltipKey = elementScanFab2.dataset.tooltipKey;
          updateFabTooltip(elementScanFab2, "tooltip.disabled.scan_in_progress");
          elementScanFab2.classList.add("fab-disabled");
        }
        if (settings.sessionScan_persistData) {
          showNotification(t("notifications.sessionScanResumed"), { type: "info" });
        } else {
          showNotification(t("notifications.sessionScanStarted"), { type: "info" });
        }
      }
    }
  });
  // src/assets/icons/reselectIcon.js
  var reselectIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200H160v400h320v80H160ZM760 0q-73 0-127.5-45.5T564-160h62q13 44 49.5 72T760-60q58 0 99-41t41-99q0-58-41-99t-99-41q-29 0-54 10.5T662-300h58v60H560v-160h60v57q27-26 63-41.5t77-15.5q83 0 141.5 58.5T960-200q0 83-58.5 141.5T760 0Z"/></svg>`;
  // src/assets/icons/stashIcon.js
  var stashIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-600v-80h360v80H360Zm0 120v-80h360v80H360Zm120 320H200h280Zm0 80H240q-50 0-85-35t-35-85v-120h120v-560h600v361q-20-2-40.5 1.5T760-505v-295H320v480h240l-80 80H200v40q0 17 11.5 28.5T240-160h240v80Zm80 0v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>`;
  // src/shared/ui/components/customSlider.js
  var CustomSlider = class {
    constructor({ min, max, value, onChange }) {
      this.min = min;
      this.max = max;
      this.value = value;
      this.onChange = onChange;
      this.isInitialized = false;
      this.observer = null;
      this.element = this.createSliderElement();
      this.thumb = this.element.querySelector(".custom-slider-thumb");
      this.track = this.element.querySelector(".custom-slider-track");
      this.ticksContainer = this.element.querySelector(".custom-slider-ticks");
      this.resizeHandler = this.updateThumbPosition.bind(this);
      this.initOnVisible();
    }
    initOnVisible() {
      this.observer = new IntersectionObserver(
        (entries, observer3) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!this.isInitialized) {
                this.performInitialMeasurement();
                this.isInitialized = true;
              }
              observer3.unobserve(this.element);
            }
          });
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.element);
    }
    performInitialMeasurement() {
      this.updateTicks();
      this.getStyleValues();
      this.updateThumbPosition();
      this.addEventListeners();
    }
    getStyleValues() {
      const ticksStyle = window.getComputedStyle(this.ticksContainer);
      const firstTick = this.ticksContainer.querySelector(".custom-slider-tick");
      this.padding = parseFloat(ticksStyle.paddingLeft) || 0;
      this.tickWidth = firstTick ? parseFloat(window.getComputedStyle(firstTick).width) || 0 : 0;
    }
    createSliderElement() {
      const container = document.createElement("div");
      container.className = "custom-slider-container";
      const infoText = document.createElement("div");
      infoText.className = "custom-slider-info-text";
      infoText.textContent = t("slider.adjustFrameSize");
      container.appendChild(infoText);
      const sliderWrapper = document.createElement("div");
      sliderWrapper.className = "custom-slider-wrapper";
      const minLabel = document.createElement("div");
      minLabel.className = "custom-slider-label custom-slider-label-min";
      minLabel.textContent = t("slider.minLabel");
      const maxLabel = document.createElement("div");
      maxLabel.className = "custom-slider-label custom-slider-label-max";
      maxLabel.textContent = t("slider.maxLabel");
      const track = document.createElement("div");
      track.className = "custom-slider-track";
      const ticks = document.createElement("div");
      ticks.className = "custom-slider-ticks";
      const thumb = document.createElement("div");
      thumb.className = "custom-slider-thumb";
      track.appendChild(ticks);
      track.appendChild(thumb);
      sliderWrapper.appendChild(minLabel);
      sliderWrapper.appendChild(track);
      sliderWrapper.appendChild(maxLabel);
      container.appendChild(sliderWrapper);
      return container;
    }
    updateTicks() {
      const numTicks = this.max - this.min + 1;
      if (numTicks > 1) {
        const ticksHtml = Array.from({ length: numTicks }, () => `<div class="custom-slider-tick"></div>`).join("");
        this.ticksContainer.innerHTML = createTrustedHTML(ticksHtml);
      } else {
        this.ticksContainer.innerHTML = createTrustedHTML("");
      }
    }
    updateThumbPosition() {
      if (!this.isInitialized) return;
      requestAnimationFrame(() => {
        if (!this.track || !this.thumb) return;
        const trackWidth = this.track.offsetWidth;
        const thumbWidth = this.thumb.offsetWidth;
        const travelRange = trackWidth - 2 * this.padding - this.tickWidth;
        const travelStart = this.padding + this.tickWidth / 2;
        const percentage = this.max > this.min ? (this.value - this.min) / (this.max - this.min) : 0;
        const thumbCenterTarget = travelStart + percentage * travelRange;
        let newLeft = thumbCenterTarget - thumbWidth / 2;
        this.thumb.style.left = `${newLeft}px`;
      });
    }
    addEventListeners() {
      this.boundHandleMouseDown = this.handleMouseDown.bind(this);
      this.boundHandleTrackClick = this.handleTrackClick.bind(this);
      this.thumb.addEventListener("mousedown", this.boundHandleMouseDown);
      this.track.addEventListener("click", this.boundHandleTrackClick);
      window.addEventListener("resize", this.resizeHandler);
    }
    handleTrackClick(e) {
      if (e.target === this.thumb || !this.isInitialized) return;
      const rect = this.track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const travelRange = rect.width - 2 * this.padding - this.tickWidth;
      const travelStart = this.padding + this.tickWidth / 2;
      const percentage = (clickX - travelStart) / travelRange;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));
      const newValue = Math.round(this.min + clampedPercentage * (this.max - this.min));
      this.setValue(newValue);
    }
    handleMouseDown(e) {
      if (!this.isInitialized) return;
      e.preventDefault();
      this.thumb.classList.add("is-dragging");
      this.boundHandleMouseMove = this.handleMouseMove.bind(this);
      this.boundHandleMouseUp = this.handleMouseUp.bind(this);
      document.addEventListener("mousemove", this.boundHandleMouseMove, { capture: true });
      document.addEventListener("mouseup", this.boundHandleMouseUp, { capture: true });
    }
    handleMouseMove(e) {
      if (!this.isInitialized) return;
      const rect = this.track.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const travelRange = rect.width - 2 * this.padding - this.tickWidth;
      const travelStart = this.padding + this.tickWidth / 2;
      const percentage = (newX - travelStart) / travelRange;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));
      const newValue = Math.round(this.min + clampedPercentage * (this.max - this.min));
      if (newValue !== this.value) {
        this.setValue(newValue);
      }
    }
    handleMouseUp() {
      if (!this.isInitialized) return;
      this.thumb.classList.remove("is-dragging");
      document.removeEventListener("mousemove", this.boundHandleMouseMove, { capture: true });
      document.removeEventListener("mouseup", this.boundHandleMouseUp, { capture: true });
      this.updateThumbPosition();
    }
    setValue(newValue) {
      const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
      if (this.value !== clampedValue) {
        this.value = clampedValue;
        this.updateThumbPosition();
        if (this.onChange) {
          this.onChange(this.value);
        }
      }
    }
    getElement() {
      return this.element;
    }
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
      if (this.thumb && this.boundHandleMouseDown) {
        this.thumb.removeEventListener("mousedown", this.boundHandleMouseDown);
      }
      if (this.track && this.boundHandleTrackClick) {
        this.track.removeEventListener("click", this.boundHandleTrackClick);
      }
      window.removeEventListener("resize", this.resizeHandler);
      this.track = null;
      this.thumb = null;
    }
  };
  // src/features/element-scan/ui.js
  var unsubscribeStagedCountChanged = null;
  var sliderInstance = null;
  var scanContainer = null;
  var highlightBorder = null;
  var tagNameTooltip = null;
  var toolbar = null;
  var reselectBtn = null;
  var stageBtn = null;
  var confirmBtn = null;
  function getElementSelector(element) {
    if (!element) return "";
    const currentTag = element.tagName.toLowerCase();
    const parent = element.parentElement;
    if (!parent || parent.tagName.toLowerCase() === "body") {
      return currentTag;
    }
    const parentTag = parent.tagName.toLowerCase();
    return `${parentTag} ${currentTag}`;
  }
  function createHighlightElements() {
    if (!scanContainer) {
      log(t("log.elementScanUI.creatingHighlights"));
      scanContainer = document.createElement("div");
      scanContainer.id = "element-scan-container";
      scanContainer.style.position = "absolute";
      scanContainer.style.top = "0";
      scanContainer.style.left = "0";
      scanContainer.style.willChange = "transform";
      highlightBorder = document.createElement("div");
      highlightBorder.id = "element-scan-highlight-border";
      scanContainer.appendChild(highlightBorder);
      tagNameTooltip = document.createElement("div");
      tagNameTooltip.id = "element-scan-tag-name";
      scanContainer.appendChild(tagNameTooltip);
      uiContainer.appendChild(scanContainer);
    }
    requestAnimationFrame(() => {
      scanContainer.classList.add("is-visible");
    });
  }
  function updateHighlight(targetElement, offset = { x: 0, y: 0 }) {
    if (!targetElement) return;
    createHighlightElements();
    if (scanContainer.classList.contains("is-confirmed")) {
      scanContainer.classList.remove("is-confirmed");
      void scanContainer.offsetWidth;
    }
    if (scanContainer.classList.contains("is-locked")) {
      scanContainer.classList.remove("is-locked");
    }
    if (scanContainer.classList.contains("is-error")) {
      scanContainer.classList.remove("is-error");
    }
    const rect = targetElement.getBoundingClientRect();
    const padding = 6;
    const elementSelector = getElementSelector(targetElement);
    const coordinates = {
      top: rect.top.toFixed(2),
      left: rect.left.toFixed(2),
      width: rect.width.toFixed(2),
      height: rect.height.toFixed(2)
    };
    log(simpleTemplate(t("log.elementScanUI.updatingHighlight"), { tagName: elementSelector }), coordinates);
    const newWidth = rect.width + padding * 2;
    const newHeight = rect.height + padding * 2;
    const newX = rect.left + offset.x - padding;
    const newY = rect.top + offset.y - padding;
    scanContainer.style.width = `${newWidth}px`;
    scanContainer.style.height = `${newHeight}px`;
    scanContainer.style.transform = `translate(${newX}px, ${newY}px)`;
    tagNameTooltip.textContent = elementSelector;
    updateToolbarTagAnimated(getElementSelector(targetElement));
  }
  function updateToolbarTagAnimated(newText) {
    const toolbarTag = uiContainer.querySelector("#element-scan-toolbar-tag");
    if (!toolbarTag) return;
    if (toolbarTag.textContent === newText) {
      return;
    }
    toolbarTag.style.opacity = "0";
    setTimeout(() => {
      toolbarTag.textContent = newText;
      toolbarTag.style.opacity = "1";
    }, 100);
  }
  function createAdjustmentToolbar(elementPath2, offset = { x: 0, y: 0 }) {
    if (toolbar) cleanupToolbar();
    log(t("log.elementScanUI.creatingToolbar"));
    toolbar = document.createElement("div");
    toolbar.id = "element-scan-toolbar";
    toolbar.style.pointerEvents = "auto";
    const staticContent = `
        <div id="element-scan-toolbar-title">${t("common.processingElement")}</div>
        <div id="element-scan-toolbar-tag" title="${t("tooltip.dragHint")}">${getElementSelector(elementPath2[0])}</div>
        <div id="element-scan-slider-container"></div>
        <div id="element-scan-toolbar-actions"></div>
    `;
    toolbar.innerHTML = createTrustedHTML(staticContent);
    const sliderContainer = toolbar.querySelector("#element-scan-slider-container");
    sliderInstance = new CustomSlider({
      min: 0,
      max: elementPath2.length - 1,
      value: 0,
      onChange: (newValue) => {
        log(simpleTemplate(t("log.elementScanUI.sliderChanged"), { level: newValue }));
        updateSelectionLevel(newValue);
      }
    });
    sliderContainer.appendChild(sliderInstance.getElement());
    uiContainer.appendChild(toolbar);
    const actionsContainer = toolbar.querySelector("#element-scan-toolbar-actions");
    reselectBtn = createButton({
      id: "element-scan-toolbar-reselect",
      textKey: "common.reselect",
      icon: reselectIcon,
      onClick: () => {
        log(t("log.elementScanUI.reselectClicked"));
        reselectElement();
      }
    });
    stageBtn = createButton({
      id: "element-scan-toolbar-stage",
      textKey: "common.stage",
      icon: stashIcon,
      onClick: () => {
        log(t("log.elementScanUI.stageClicked"));
        stageCurrentElement();
      }
    });
    confirmBtn = createButton({
      id: "element-scan-toolbar-confirm",
      textKey: "common.confirm",
      icon: confirmIcon,
      onClick: () => {
        log(t("log.elementScanUI.confirmClicked"));
        confirmSelectionAndExtract();
      }
    });
    actionsContainer.appendChild(reselectBtn);
    actionsContainer.appendChild(stageBtn);
    actionsContainer.appendChild(confirmBtn);
    const initialRect = elementPath2[0].getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const topCounter = uiContainer.querySelector(".counter-with-help-container.is-visible");
    const topOffset = topCounter ? topCounter.getBoundingClientRect().height + 5 : 0;
    const margin = 20 + topOffset;
    let top, left;
    const absRect = {
      top: initialRect.top + offset.y,
      bottom: initialRect.bottom + offset.y,
      left: initialRect.left + offset.x,
      right: initialRect.right + offset.x
    };
    const alignRight = () => {
      let l = absRect.right - toolbarRect.width;
      if (l < margin) l = margin;
      if (l + toolbarRect.width > viewportWidth - margin) {
        l = viewportWidth - toolbarRect.width - margin;
      }
      return l;
    };
    const topAbove = absRect.top - toolbarRect.height - 20;
    const topBelow = absRect.bottom + 10;
    const canPlaceAbove = topAbove > margin;
    const canPlaceBelow = topBelow + toolbarRect.height < viewportHeight - 10;
    if (canPlaceAbove) {
      top = topAbove;
      left = alignRight();
    } else if (canPlaceBelow) {
      top = topBelow;
      left = alignRight();
    } else {
      top = (viewportHeight - toolbarRect.height) / 2;
      left = (viewportWidth - toolbarRect.width) / 2;
    }
    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
    log(t("log.elementScanUI.toolbarPositioned"));
    toolbarCleanup = makeDraggable(toolbar);
    requestAnimationFrame(() => {
      toolbar.classList.add("is-visible");
    });
  }
  function makeDraggable(element) {
    let offsetX, offsetY;
    const onMouseMove = (e) => {
      if ((e.buttons & 1) === 0) {
        cleanupDrag();
        return;
      }
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rect = element.getBoundingClientRect();
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + rect.width > viewportWidth) newLeft = viewportWidth - rect.width;
      if (newTop + rect.height > viewportHeight) newTop = viewportHeight - rect.height;
      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    };
    const cleanupDrag = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", cleanupDrag);
      log(t("log.elementScanUI.dragEnded"));
    };
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      const isInteractive = e.target.closest("button, .custom-slider-thumb, .custom-slider-track");
      if (!isInteractive) {
        e.preventDefault();
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", cleanupDrag);
        log(t("log.elementScanUI.dragStarted"));
      }
    };
    const onContextMenu = () => {
      cleanupDrag();
    };
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("contextmenu", onContextMenu);
    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("contextmenu", onContextMenu);
      cleanupDrag();
    };
  }
  function cleanupUI() {
    if (scanContainer) {
      log(t("log.elementScanUI.cleaningHighlights"));
      scanContainer.classList.remove("is-visible");
    }
  }
  var toolbarCleanup = null;
  function cleanupToolbar() {
    if (toolbar) {
      log(t("log.elementScanUI.cleaningToolbar"));
      if (toolbarCleanup) {
        toolbarCleanup();
        toolbarCleanup = null;
      }
      if (sliderInstance) {
        sliderInstance.destroy();
        sliderInstance = null;
      }
      if (reselectBtn) {
        reselectBtn.destroy();
        reselectBtn = null;
      }
      if (stageBtn) {
        stageBtn.destroy();
        stageBtn = null;
      }
      if (confirmBtn) {
        confirmBtn.destroy();
        confirmBtn = null;
      }
      const toolbarToRemove = toolbar;
      toolbar = null;
      toolbarToRemove.classList.remove("is-visible");
      setTimeout(() => {
        toolbarToRemove.remove();
      }, 300);
    }
  }
  function showTopCenterUI2() {
    createCounterWithHelp({
      counterKey: "scan.stagedCount",
      helpKey: "tutorial.elementScan",
      onPause: pauseElementScan,
      onResume: resumeElementScan,
      scanType: "ElementScan",
      onSettingsClick: () => {
        const currentSettings = loadSettings();
        const definitions = [
          {
            id: "persist-data-checkbox",
            key: "elementScan_persistData",
            type: "checkbox",
            label: "settings.contextual.persistData",
            tooltip: {
              titleIcon: infoIcon,
              title: "tooltip.persistData.title",
              text: "tooltip.persistData.text.elementScan"
            }
          }
        ];
        openContextualSettingsPanel({
          titleKey: "settings.contextual.elementScanTitle",
          icon: settingsIcon,
          definitions,
          settings: currentSettings,
          onSave: (newSettings) => {
            const updatedSettings = { ...currentSettings, ...newSettings };
            saveSettings(updatedSettings);
            applySettings(updatedSettings, currentSettings);
          }
        });
      }
    });
    showCounterWithHelp();
    if (!unsubscribeStagedCountChanged) {
      unsubscribeStagedCountChanged = on("stagedCountChanged", (newCount) => {
        updateCounterValue(newCount);
      });
    }
  }
  function hideTopCenterUI2() {
    hideCounterWithHelp();
    if (typeof unsubscribeStagedCountChanged === "function") {
      unsubscribeStagedCountChanged();
      unsubscribeStagedCountChanged = null;
    }
  }
  function playScanConfirmationAnimation(onComplete) {
    if (!scanContainer) {
      if (onComplete) onComplete();
      return;
    }
    scanContainer.classList.add("is-confirmed");
    setTimeout(() => {
      if (onComplete) onComplete();
      setTimeout(() => {
        if (scanContainer) scanContainer.classList.remove("is-confirmed");
      }, 300);
    }, 500);
  }
  function playScanErrorAnimation() {
    if (!scanContainer) return;
    scanContainer.classList.remove("is-error");
    void scanContainer.offsetWidth;
    scanContainer.classList.add("is-error");
    setTimeout(() => {
      if (scanContainer) scanContainer.classList.remove("is-error");
    }, 500);
  }
  function playScanPulseAnimation() {
    if (!scanContainer) return;
    scanContainer.classList.remove("is-locked");
    void scanContainer.offsetWidth;
    scanContainer.classList.add("is-locked");
    setTimeout(() => {
      if (scanContainer) scanContainer.classList.remove("is-locked");
    }, 500);
  }
  // src/features/element-scan/logic.js
  var isActive = false;
  var isPaused2 = false;
  var isAdjusting = false;
  var currentTarget = null;
  var elementPath = [];
  var stagedTexts = /* @__PURE__ */ new Set();
  var shouldResumeAfterModalClose = false;
  var fallbackNotificationShown = false;
  var isHighlightUpdateQueued = false;
  var autoSaveInterval2 = null;
  var AUTO_SAVE_INTERVAL_MS2 = 5e3;
  var scrollableParents = [];
  var scrollUpdateQueued = false;
  var workerInstance = null;
  var iframeObserver = null;
  var reselectTimer = null;
  on("clearElementScan", () => {
    stagedTexts.clear();
    updateStagedCount();
  });
  on("resumeScanSession", async (state) => {
    if (state.mode === "element-scan") {
      const elementScanFab2 = getElementScanFab();
      const settings = await loadSettings();
      if (elementScanFab2 && !isElementScanActive()) {
        if (state && state.mode === "element-scan" && state.data && Array.isArray(state.data)) {
          log(t("log.elementScan.resuming"));
          if (settings.elementScan_persistData) {
            state.data.forEach((item) => stagedTexts.add(item));
            log(t("log.elementScan.restored", { count: stagedTexts.size }));
          } else {
            stagedTexts.clear();
            log(t("log.elementScan.skipRestore"));
          }
        } else {
          log(t("log.elementScan.startingNewSession"));
        }
        const started = startElementScan(elementScanFab2, { silent: true });
        if (!started) return;
        updateStagedCount();
        saveSessionState();
        if (settings.elementScan_persistData) {
          showNotification(t("notifications.elementScanResumed"), { type: "info" });
        } else {
          showNotification(t("notifications.elementScanStarted"), { type: "info" });
        }
      }
    }
  });
  on("modalClosed", () => {
    if (isElementScanActive() && getShouldResumeAfterModalClose()) {
      setShouldResumeAfterModalClose(false);
      reselectElement();
    }
  });
  function handleScroll() {
    if (!scrollUpdateQueued) {
      scrollUpdateQueued = true;
      requestAnimationFrame(() => {
        if (currentTarget && isAdjusting) {
          updateHighlight(currentTarget);
        }
        scrollUpdateQueued = false;
      });
    }
  }
  function addScrollListeners() {
    let parent = currentTarget.parentElement;
    while (parent) {
      if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) {
        scrollableParents.push(parent);
        parent.addEventListener("scroll", handleScroll, { passive: true });
      }
      parent = parent.parentElement;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    log(simpleTemplate(t("log.elementScan.scrollListenersAdded"), { count: scrollableParents.length }));
  }
  function removeScrollListeners() {
    scrollableParents.forEach((parent) => {
      parent.removeEventListener("scroll", handleScroll);
    });
    window.removeEventListener("scroll", handleScroll);
    scrollableParents = [];
    log(t("log.elementScan.scrollListenersRemoved"));
  }
  function isElementScanActive() {
    return isActive;
  }
  function getStagedTexts() {
    return stagedTexts;
  }
  function getShouldResumeAfterModalClose() {
    return shouldResumeAfterModalClose;
  }
  function setShouldResumeAfterModalClose(value) {
    shouldResumeAfterModalClose = value;
  }
  function handleElementScanClick(fabElement) {
    if (isActive) {
      stopElementScan(fabElement);
    } else {
      startElementScan(fabElement);
    }
  }
  function startElementScan(fabElement, options = {}) {
    if (!acquireScanMode(SCAN_MODES.ELEMENT)) {
      if (!options.silent) {
        showNotification(t("notifications.scanModeConflict"), { type: "info" });
      }
      return false;
    }
    log(t("log.elementScan.starting"));
    uiLifecycle.acquire();
    enablePersistence();
    if (!options.silent) {
      showNotification(t("notifications.elementScanStarted"), { type: "info" });
    }
    isActive = true;
    isAdjusting = false;
    fallbackNotificationShown = false;
    fabElement.classList.add("is-recording");
    updateFabTooltip(fabElement, "scan.stopSession");
    showTopCenterUI2();
    const dynamicFab2 = getDynamicFab();
    if (dynamicFab2) {
      dynamicFab2.dataset.originalTooltipKey = dynamicFab2.dataset.tooltipKey;
      updateFabTooltip(dynamicFab2, "tooltip.disabled.scan_in_progress");
      dynamicFab2.classList.add("fab-disabled");
    } else {
      log(t("log.elementScan.dynamicFabNotFound"), "warn");
    }
    addListenersToDocument(document);
    addListenersToIframes();
    setupIframeObserver();
    window.addEventListener("beforeunload", handleElementScanUnload);
    if (autoSaveInterval2) clearInterval(autoSaveInterval2);
    autoSaveInterval2 = setInterval(() => {
      if (isElementScanActive()) {
        saveSessionState();
      }
    }, AUTO_SAVE_INTERVAL_MS2);
    log(t("log.elementScan.listenersAdded"));
    return true;
  }
  function addListenersToDocument(doc) {
    try {
      doc.addEventListener("mouseover", handleMouseOver);
      doc.addEventListener("mouseout", handleMouseOut);
      doc.addEventListener("click", handleElementClick, true);
      doc.addEventListener("keydown", handleElementScanKeyDown);
      doc.addEventListener("contextmenu", handleContextMenu, true);
    } catch (e) {
      log(t("log.elementScan.addListenersFailed", { error: e.message }), "warn");
    }
  }
  function removeListenersFromDocument(doc) {
    try {
      doc.removeEventListener("mouseover", handleMouseOver);
      doc.removeEventListener("mouseout", handleMouseOut);
      doc.removeEventListener("click", handleElementClick, true);
      doc.removeEventListener("keydown", handleElementScanKeyDown);
      doc.removeEventListener("contextmenu", handleContextMenu, true);
    } catch (e) {
    }
  }
  function addListenersToIframes() {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      attachIframeListeners(iframe);
    });
  }
  function attachIframeListeners(iframe) {
    try {
      const attach = (win) => {
        try {
          const doc = win.document;
          if (doc) {
            doc._frameElement = iframe;
            addListenersToDocument(doc);
          }
        } catch (e) {
        }
      };
      if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.readyState === "complete") {
        attach(iframe.contentWindow);
      } else {
        iframe.addEventListener(
          "load",
          () => {
            if (iframe.contentWindow) {
              attach(iframe.contentWindow);
            }
          },
          { once: true }
        );
      }
    } catch (e) {
    }
  }
  function setupIframeObserver() {
    if (iframeObserver) return;
    iframeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === "IFRAME") {
              attachIframeListeners(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll) {
              const nestedIframes = node.querySelectorAll("iframe");
              nestedIframes.forEach(attachIframeListeners);
            }
          });
        }
      });
    });
    iframeObserver.observe(document.body, { childList: true, subtree: true });
    log(t("log.elementScan.iframeObserverStarted"));
  }
  function removeListenersFromIframes() {
    if (iframeObserver) {
      iframeObserver.disconnect();
      iframeObserver = null;
    }
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow && iframe.contentWindow.document;
        if (iframeDoc) {
          removeListenersFromDocument(iframeDoc);
          delete iframeDoc._frameElement;
        }
      } catch (e) {
      }
    });
  }
  function saveSessionState() {
    saveActiveSession("element-scan", Array.from(stagedTexts));
  }
  function handleElementScanUnload() {
    if (isElementScanActive()) {
      saveSessionState();
    }
  }
  function stopElementScan(fabElement) {
    if (!isActive) {
      releaseScanMode(SCAN_MODES.ELEMENT);
      return;
    }
    log(t("log.elementScan.stopping"));
    isActive = false;
    isAdjusting = false;
    isPaused2 = false;
    if (fabElement) {
      fabElement.classList.remove("is-recording");
      updateFabTooltip(fabElement, "tooltip.element_scan");
    }
    const dynamicFab2 = getDynamicFab();
    if (dynamicFab2) {
      dynamicFab2.classList.remove("fab-disabled");
      if (dynamicFab2.dataset.originalTooltipKey) {
        updateFabTooltip(dynamicFab2, dynamicFab2.dataset.originalTooltipKey);
      }
    } else {
      log(t("log.elementScan.dynamicFabNotFound"), "warn");
    }
    removeListenersFromDocument(document);
    removeListenersFromIframes();
    window.removeEventListener("beforeunload", handleElementScanUnload);
    if (autoSaveInterval2) {
      clearInterval(autoSaveInterval2);
      autoSaveInterval2 = null;
    }
    clearActiveSession();
    log(t("log.elementScan.listenersRemoved"));
    cleanupUI();
    cleanupToolbar();
    hideTopCenterUI2();
    removeScrollListeners();
    if (reselectTimer) {
      clearTimeout(reselectTimer);
      reselectTimer = null;
    }
    terminateWorker();
    elementPath = [];
    currentTarget = null;
    stagedTexts.clear();
    fallbackNotificationShown = false;
    updateStagedCount();
    log(t("log.elementScan.stateReset"));
    uiLifecycle.release();
    releaseScanMode(SCAN_MODES.ELEMENT);
  }
  function terminateWorker() {
    if (workerInstance) {
      workerInstance.terminate();
      workerInstance = null;
      log(t("log.elementScan.worker.terminated"));
    }
  }
  function pauseElementScan() {
    if (!isActive || isPaused2) return;
    isPaused2 = true;
    showNotification(t("notifications.elementScanPaused"), { type: "info" });
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();
    removeListenersFromDocument(document);
    removeListenersFromIframes();
  }
  function resumeElementScan() {
    if (!isActive || !isPaused2) return;
    isPaused2 = false;
    showNotification(t("notifications.elementScanContinued"), { type: "success" });
    reselectElement();
  }
  function reselectElement() {
    if (isPaused2) return;
    if (reselectTimer) {
      clearTimeout(reselectTimer);
      reselectTimer = null;
    }
    log(t("log.elementScan.reselecting"));
    isAdjusting = false;
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();
    addListenersToDocument(document);
    addListenersToIframes();
  }
  function filterTextsWithWorker(texts, settings) {
    return new Promise(async (resolve) => {
      const handleFallback = () => {
        log(t("log.elementScan.worker.fallback"), "info");
        if (!fallbackNotificationShown) {
          showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
          fallbackNotificationShown = true;
        }
        const logFiltered = (text, reason) => {
          log(t("log.textProcessor.filtered", { text, reason }));
        };
        const filteredTexts = filterAndNormalizeTexts(
          texts,
          settings.filterRules,
          settings.enableDebugLogging,
          logFiltered
        );
        resolve(filteredTexts);
      };
      const workerAllowed = await isWorkerAllowed();
      if (!workerAllowed) {
        log(t("log.elementScan.worker.cspBlocked"), "warn");
        handleFallback();
        return;
      }
      try {
        if (!workerInstance) {
          log(t("log.elementScan.worker.initializing"), "info");
          workerInstance = new Worker(trustedWorkerUrl);
          workerInstance.onerror = () => {
            log(t("log.elementScan.worker.error"), "error");
          };
        }
        workerInstance.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === "textsFiltered") {
            resolve(payload.texts);
          }
        };
        workerInstance.onerror = () => {
          log(t("log.elementScan.worker.runtimeError"), "warn");
          workerInstance.terminate();
          workerInstance = null;
          handleFallback();
        };
        workerInstance.postMessage({
          type: "filter-texts",
          payload: {
            texts,
            filterRules: settings.filterRules,
            enableDebugLogging: settings.enableDebugLogging,
            translations: {
              workerLogPrefix: t("log.elementScan.worker.logPrefix"),
              textFiltered: t("log.textProcessor.filtered"),
              filterReasons: getTranslationObject("filterReasons")
            }
          }
        });
      } catch (initError) {
        log(t("log.elementScan.worker.initSyncError", { error: initError.message }), "error");
        handleFallback();
      }
    });
  }
  async function stageCurrentElement() {
    if (!currentTarget) return;
    log(t("log.elementScan.stagingStarted", { tagName: currentTarget.tagName }));
    const rawTexts = extractRawTextFromElement(currentTarget);
    const settings = await loadSettings();
    try {
      const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
      const newlyStagedCount = filteredTexts.length;
      if (newlyStagedCount > 0) {
        filteredTexts.forEach((text) => stagedTexts.add(text));
        log(t("log.elementScan.staged", { count: newlyStagedCount, total: stagedTexts.size }));
        updateStagedCount();
        playScanPulseAnimation();
        if (reselectTimer) clearTimeout(reselectTimer);
        reselectTimer = setTimeout(() => {
          reselectElement();
          reselectTimer = null;
        }, 500);
      } else {
        log(t("log.elementScan.stagedNothingNew"));
        playScanErrorAnimation();
        if (reselectTimer) clearTimeout(reselectTimer);
        reselectTimer = setTimeout(() => {
          reselectElement();
          reselectTimer = null;
        }, 500);
      }
    } catch (error) {
      log(t("log.elementScan.processingError", { error: error.message }), "error");
      showNotification(t("notifications.scanFailed"), { type: "error" });
    }
    log(t("log.elementScan.stagingFinished"));
    reselectElement();
  }
  function updateStagedCount() {
    fire("stagedCountChanged", stagedTexts.size);
    if (isActive) {
      saveSessionState();
    }
  }
  function scheduledHighlightUpdate() {
    if (currentTarget) {
      let offset = { x: 0, y: 0 };
      const doc = currentTarget.ownerDocument;
      if (doc && doc !== document && doc._frameElement) {
        const rect = doc._frameElement.getBoundingClientRect();
        offset.x = rect.left;
        offset.y = rect.top;
      }
      updateHighlight(currentTarget, offset);
    }
    isHighlightUpdateQueued = false;
  }
  function handleMouseOver(event) {
    if (!isActive || isAdjusting || isPaused2) return;
    const target = event.target;
    if (target.ownerDocument === document) {
      if (target.closest(".text-extractor-fab-container") || target.closest("#text-extractor-container")) {
        if (currentTarget) {
          cleanupUI();
          currentTarget = null;
        }
        return;
      }
    }
    if (target !== currentTarget) {
      currentTarget = target;
      log(simpleTemplate(t("log.elementScan.hovering"), { tagName: currentTarget.tagName }));
      if (!isHighlightUpdateQueued) {
        isHighlightUpdateQueued = true;
        requestAnimationFrame(scheduledHighlightUpdate);
      }
    }
  }
  function handleMouseOut(event) {
    if (event.target === currentTarget) {
      cleanupUI();
    }
  }
  function handleElementScanKeyDown(event) {
    if (!isActive || event.key !== "Escape") {
      return;
    }
    const isSettingsPanelOpen = uiContainer.querySelector(".settings-panel-overlay.is-visible");
    const isHelpTooltipOpen = uiContainer.querySelector(".info-tooltip-overlay.is-visible");
    if (isSettingsPanelOpen || isHelpTooltipOpen) {
      log(t("log.elementScan.escapeIgnoredForModal"));
      return;
    }
    if (isAdjusting) {
      log(t("log.elementScan.escapePressedInAdjust"));
      reselectElement();
    } else {
      log(t("log.elementScan.escapePressed"));
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
    }
  }
  function handleContextMenu(event) {
    if (isActive && !isAdjusting) {
      event.preventDefault();
      log(t("log.elementScan.rightClickExit"));
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
    }
  }
  function handleElementClick(event) {
    if (event.detail === 0) {
      return;
    }
    if (!isActive || isAdjusting || !currentTarget || isPaused2) return;
    event.preventDefault();
    event.stopPropagation();
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t("log.elementScan.clickedEnteringAdjust"), { tagName }));
    isAdjusting = true;
    removeListenersFromDocument(document);
    removeListenersFromIframes();
    elementPath = [];
    let el = currentTarget;
    const ownerDoc = currentTarget.ownerDocument;
    const body = ownerDoc.body;
    while (el && el !== body) {
      elementPath.push(el);
      el = el.parentElement;
    }
    elementPath.push(body);
    log(simpleTemplate(t("log.elementScan.pathBuilt"), { depth: elementPath.length }));
    let offset = { x: 0, y: 0 };
    if (ownerDoc !== document && ownerDoc._frameElement) {
      const rect = ownerDoc._frameElement.getBoundingClientRect();
      offset.x = rect.left;
      offset.y = rect.top;
    }
    createAdjustmentToolbar(elementPath, offset);
    addScrollListeners();
  }
  function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
      currentTarget = targetElement;
      const tagName = targetElement.tagName.toLowerCase();
      log(simpleTemplate(t("log.elementScan.adjustingLevel"), { level, tagName }));
      let offset = { x: 0, y: 0 };
      const doc = targetElement.ownerDocument;
      if (doc !== document && doc._frameElement) {
        const rect = doc._frameElement.getBoundingClientRect();
        offset.x = rect.left;
        offset.y = rect.top;
      }
      updateHighlight(targetElement, offset);
    }
  }
  async function confirmSelectionAndExtract() {
    if (!currentTarget) {
      log(t("log.elementScan.confirmFailedNoTarget"));
      return;
    }
    log(t("log.elementScan.confirmStarted"));
    isAdjusting = true;
    const rawTexts = extractRawTextFromElement(currentTarget);
    const settings = await loadSettings();
    try {
      const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
      filteredTexts.forEach((text) => stagedTexts.add(text));
      updateStagedCount();
    } catch (error) {
      log(t("log.elementScan.processingError", { error: error.message }), "error");
      showNotification(t("notifications.scanFailed"), { type: "error" });
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
      return;
    }
    const totalToProcess = stagedTexts.size;
    log(simpleTemplate(t("log.elementScan.confirmingStaged"), { count: totalToProcess }));
    playScanConfirmationAnimation(() => {
      isAdjusting = true;
      removeListenersFromDocument(document);
      removeListenersFromIframes();
      cleanupUI();
      cleanupToolbar();
      removeScrollListeners();
      setShouldResumeAfterModalClose(true);
      try {
        const allTexts = Array.from(stagedTexts);
        log(simpleTemplate(t("log.elementScan.extractedCount"), { count: allTexts.length }));
        const { outputFormat, includeArrayBrackets } = settings;
        const formattedText = formatTextsForTranslation(allTexts, outputFormat, { includeArrayBrackets });
        const count = allTexts.length;
        updateModalContent(formattedText, true, "element-scan");
        updateScanCount(count, "element");
        const notificationText = simpleTemplate(t("scan.elementFinished"), { count });
        showNotification(notificationText, { type: "success" });
        log(t("log.elementScan.confirmFinished"));
      } catch (error) {
        log(t("log.elementScan.confirmFailed", { error: error.message }), "error");
        showNotification(t("notifications.scanFailed"), { type: "error" });
        const fabElement = uiContainer.querySelector(".fab-element-scan");
        stopElementScan(fabElement);
      }
    });
  }
  // src/shared/services/ai/candidateExtractor.js
  var CONTEXT_BLOCK_SELECTOR = "article, main, nav, header, footer, aside, form, dialog, section";
  var BREADCRUMB_SELECTOR = '[aria-label*="breadcrumb" i], nav.breadcrumb, .breadcrumb';
  var MAX_LOCAL_TEXT_LENGTH = 1e5;
  var NOISE_CLASS_PATTERN = /^(sc-|css-|_|ng-|v-|js-|react-)/i;
  var DYNAMIC_CLASS_PATTERN = /[a-f0-9]{8,}/i;
  function normalizeText(value) {
    return normalizeAiSourceText(value);
  }
  function limitText2(value, maxLength) {
    return normalizeText(value).replace(/\s+/g, " ").slice(0, maxLength);
  }
  function isIgnoredElement(element, ignoredSelector) {
    if (!element || typeof element.closest !== "function") return true;
    if (element.closest(ignoredSelector)) return true;
    if (element.closest('[hidden], [inert], [aria-hidden="true"]')) return true;
    const inlineStyle = element.getAttribute("style") || "";
    return /display\s*:\s*none|visibility\s*:\s*hidden/i.test(inlineStyle);
  }
  function findNearestHeading(element) {
    const block = element.closest(CONTEXT_BLOCK_SELECTOR) || element.parentElement;
    const heading = block?.querySelector("h1, h2, h3, h4, h5, h6");
    return limitText2(heading?.textContent, 240);
  }
  function buildDomPath(element, maxLength = 160) {
    const segments = [];
    let node = element;
    while (node && node.nodeType === Node.ELEMENT_NODE && segments.length < 5) {
      const tag = String(node.tagName || "").toLowerCase();
      if (!tag || tag === "html" || tag === "body") break;
      const id = typeof node.id === "string" && node.id.trim() ? `#${node.id.trim()}` : "";
      const classes = Array.from(node.classList || []).filter((name) => !DYNAMIC_CLASS_PATTERN.test(name) && !NOISE_CLASS_PATTERN.test(name)).slice(0, 2).join(".");
      const suffix = id || (classes ? `.${classes}` : "");
      segments.unshift(suffix ? `${tag}${suffix}` : tag);
      node = node.parentElement;
    }
    return String(segments.join(" > ")).slice(0, maxLength);
  }
  function findLabelText(element) {
    if (!element || typeof element.closest !== "function") return "";
    if (element.labels?.length) {
      return limitText2(element.labels[0].textContent, 120);
    }
    const labelledBy = element.getAttribute?.("aria-labelledby");
    if (labelledBy) {
      const root = element.getRootNode?.() || element.ownerDocument;
      const label = labelledBy.split(/\s+/).map((id) => {
        if (typeof root.getElementById === "function") return root.getElementById(id);
        const safeId = String(id).replace(/["\\]/g, "\\$&");
        return root.querySelector?.(`[id="${safeId}"]`);
      }).find(Boolean);
      if (label) return limitText2(label.textContent, 120);
    }
    return "";
  }
  function nearbySiblingText(element, side, maxSiblings = 2) {
    if (!element?.parentElement) return "";
    let sibling = side === "before" ? element.previousElementSibling : element.nextElementSibling;
    for (let index = 0; index < maxSiblings && sibling; index += 1) {
      const text = limitText2(sibling.textContent, 150);
      if (text) return text;
      sibling = side === "before" ? sibling.previousElementSibling : sibling.nextElementSibling;
    }
    return "";
  }
  function buildHeadingChain(element) {
    const chain = [];
    let node = element?.parentElement;
    while (node && node !== document.body && node !== document.documentElement) {
      const tag = String(node.tagName || "").toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const text = limitText2(node.textContent, 120);
        if (text && !chain.includes(text)) chain.unshift(text);
      }
      node = node.parentElement;
    }
    return limitText2(chain.join(" / "), 240);
  }
  function elementListIndex(element) {
    if (!element?.parentElement) return 0;
    const tag = String(element.tagName || "").toLowerCase();
    const parentTag = String(element.parentElement.tagName || "").toLowerCase();
    if (tag === "li" && (parentTag === "ul" || parentTag === "ol" || parentTag === "menu")) {
      return Array.from(element.parentElement.children).indexOf(element) + 1;
    }
    if (tag === "td" || tag === "th") {
      return Array.from(element.parentElement.children).indexOf(element) + 1;
    }
    return 0;
  }
  function buildContext(element, sourceText) {
    const block = element.closest(CONTEXT_BLOCK_SELECTOR);
    const breadcrumb = document.querySelector(BREADCRUMB_SELECTOR);
    return {
      tagName: element.tagName?.toLowerCase() || "",
      role: element.getAttribute?.("role") || "",
      blockType: block?.tagName?.toLowerCase() || "",
      domPath: buildDomPath(element),
      label: findLabelText(element),
      pageTitle: limitText2(document.title, 200),
      nearestHeading: findNearestHeading(element),
      headingChain: buildHeadingChain(element),
      breadcrumb: limitText2(breadcrumb?.textContent, 240),
      precedingText: nearbySiblingText(element, "before"),
      followingText: nearbySiblingText(element, "after"),
      nearbyText: limitText2(element.parentElement?.textContent, 360),
      listIndex: elementListIndex(element),
      placeholders: extractPlaceholders(sourceText)
    };
  }
  function createCandidate(element, sourceText, targetLanguage, siteKey) {
    const fingerprint = createCandidateFingerprint(siteKey, targetLanguage, sourceText);
    return {
      id: `ai-${fingerprint}-${sourceText.length}`,
      sourceText,
      siteKey,
      targetLanguage,
      fingerprint,
      context: buildContext(element, sourceText),
      status: "pending"
    };
  }
  function processElementAttributes(element, attributesToExtract, addCandidate) {
    attributesToExtract.forEach((attribute) => {
      const value = element.getAttribute?.(attribute);
      if (value) addCandidate(element, value);
    });
  }
  function extractSubtree(rootNode, { attributesToExtract, ignoredSelector, addCandidate }) {
    if (rootNode.nodeType === Node.TEXT_NODE) {
      const parent = rootNode.parentElement;
      if (parent && !isIgnoredElement(parent, ignoredSelector)) addCandidate(parent, rootNode.nodeValue);
      return;
    }
    const isDocument = rootNode.nodeType === Node.DOCUMENT_NODE;
    const elementRoot = isDocument ? rootNode.body : rootNode;
    if (!elementRoot || elementRoot.nodeType === Node.TEXT_NODE) return;
    const isElementRoot = elementRoot.nodeType === Node.ELEMENT_NODE;
    const isFragmentRoot = elementRoot.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
    if (!isElementRoot && !isFragmentRoot) return;
    if (isElementRoot && isIgnoredElement(elementRoot, ignoredSelector)) {
      return;
    }
    processElementAttributes(elementRoot, attributesToExtract, addCandidate);
    elementRoot.querySelectorAll?.("*").forEach((element) => {
      if (isIgnoredElement(element, ignoredSelector)) return;
      processElementAttributes(element, attributesToExtract, addCandidate);
      if (element.tagName === "IFRAME") {
        try {
          const iframeDoc = element.contentDocument || element.contentWindow && element.contentWindow.document;
          if (iframeDoc) extractSubtree(iframeDoc, { attributesToExtract, ignoredSelector, addCandidate });
        } catch {
        }
      }
      const shadowRoot = element.shadowRoot || element._shadowRoot;
      if (shadowRoot) extractSubtree(shadowRoot, { attributesToExtract, ignoredSelector, addCandidate });
    });
    if (elementRoot.tagName === "IFRAME") {
      try {
        const iframeDoc = elementRoot.contentDocument || elementRoot.contentWindow && elementRoot.contentWindow.document;
        if (iframeDoc) extractSubtree(iframeDoc, { attributesToExtract, ignoredSelector, addCandidate });
      } catch {
      }
    }
    const rootShadow = elementRoot.shadowRoot || elementRoot._shadowRoot;
    if (rootShadow) extractSubtree(rootShadow, { attributesToExtract, ignoredSelector, addCandidate });
    const walker = (elementRoot.ownerDocument || document).createTreeWalker(elementRoot, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement && !isIgnoredElement(node.parentElement, ignoredSelector) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while (walker.nextNode()) {
      addCandidate(walker.currentNode.parentElement, walker.currentNode.nodeValue);
    }
  }
  function extractAiCandidates(root, { filterRules: filterRules2, targetLanguage, scannerConfig, siteKey = window.location.origin }) {
    const candidates2 = /* @__PURE__ */ new Map();
    const isDocumentRoot = root?.nodeType === Node.DOCUMENT_NODE;
    const attributesToExtract = Array.isArray(scannerConfig?.attributesToExtract) ? scannerConfig.attributesToExtract : [];
    const ignoredSelectors = Array.isArray(scannerConfig?.ignoredSelectors) ? scannerConfig.ignoredSelectors : [];
    const ignoredSelector = [...ignoredSelectors, "#text-extractor-container"].join(", ");
    const addCandidate = (element, rawText) => {
      const sourceText = normalizeText(rawText).slice(0, MAX_LOCAL_TEXT_LENGTH);
      if (!sourceText || shouldFilter(sourceText, filterRules2)) return;
      const candidate = createCandidate(element, sourceText, targetLanguage, siteKey);
      if (!candidates2.has(candidate.fingerprint)) {
        candidates2.set(candidate.fingerprint, candidate);
      }
    };
    const rootNode = isDocumentRoot ? root.body : root;
    if (!rootNode) return [];
    if (isDocumentRoot && document.title) {
      addCandidate(document.documentElement, document.title);
    }
    if (rootNode.nodeType === Node.TEXT_NODE) {
      const parent = rootNode.parentElement;
      if (parent && !isIgnoredElement(parent, ignoredSelector)) addCandidate(parent, rootNode.nodeValue);
      return Array.from(candidates2.values());
    }
    extractSubtree(rootNode, { attributesToExtract, ignoredSelector, addCandidate });
    return Array.from(candidates2.values());
  }
  // src/shared/services/ai/pageContextBuilder.js
  var MAX_SITE_NAME = 120;
  var MAX_TITLE = 200;
  var MAX_DESCRIPTION = 240;
  var MAX_LANG_HINT = 32;
  var MAX_URL = 512;
  var MAX_NAV_ITEMS = 12;
  var MAX_NAV_TEXT = 24;
  function cleanText(value, maxLength) {
    return normalizeAiSourceText(value).slice(0, maxLength);
  }
  function metaContent(root, selectors) {
    for (const selector of selectors) {
      const content = root?.querySelector?.(selector)?.getAttribute?.("content");
      if (content && content.trim()) return content;
    }
    return "";
  }
  function getSiteName(root, locationLike) {
    const fromMeta = metaContent(root, [
      'meta[property="og:site_name"]',
      'meta[name="application-name"]',
      'meta[name="apple-mobile-web-app-title"]'
    ]);
    if (fromMeta) return cleanText(fromMeta, MAX_SITE_NAME);
    return cleanText(locationLike?.hostname || "", MAX_SITE_NAME);
  }
  function getNavigationTerms(root) {
    const terms = [];
    const seen = /* @__PURE__ */ new Set();
    const nodes = root?.querySelectorAll?.(
      'nav a, nav button, nav span, [role="navigation"] a, [role="navigation"] button'
    );
    if (!nodes) return terms;
    for (const node of nodes) {
      const text = cleanText(node.textContent, MAX_NAV_TEXT);
      if (!text || seen.has(text)) continue;
      seen.add(text);
      terms.push(text);
      if (terms.length >= MAX_NAV_ITEMS) break;
    }
    return terms;
  }
  function classifyPageType(locationLike, root) {
    const pathname = String(locationLike?.pathname || "").toLowerCase();
    if (/(^|\/)(settings|preferences|account|profile|billing)(\/|$)/.test(pathname)) return "settings";
    if (/(^|\/)(docs?|help|support|guide|manual)(\/|$)/.test(pathname)) return "docs";
    if (/(^|\/)(login|signin|sign-up|register|auth)(\/|$)/.test(pathname)) return "auth";
    if (/(^|\/)(checkout|cart|purchase|order)(\/|$)/.test(pathname)) return "commerce";
    const article = root?.querySelector?.("article");
    if (article && cleanText(article.textContent, 1e5).length > 800) return "article";
    if (root?.querySelector?.("form")) return "form";
    return "generic";
  }
  function buildPageContext({ targetLanguage, locationLike = window.location, root = document }) {
    const url = `${locationLike?.origin || ""}${locationLike?.pathname || ""}${locationLike?.search || ""}`;
    return {
      url: cleanText(url, MAX_URL),
      siteName: getSiteName(root, locationLike),
      title: cleanText(root?.title || locationLike?.title, MAX_TITLE),
      langHint: cleanText(root?.documentElement?.getAttribute?.("lang") || "", MAX_LANG_HINT),
      description: cleanText(
        metaContent(root, ['meta[name="description"]', 'meta[property="og:description"]']),
        MAX_DESCRIPTION
      ),
      type: classifyPageType(locationLike, root),
      navigation: getNavigationTerms(root),
      targetLanguage
    };
  }
  // src/features/ai-scan/resultView.js
  var HIDDEN_OUTPUT_STATUSES = /* @__PURE__ */ new Set([AI_CANDIDATE_STATUS.KEEP, AI_CANDIDATE_STATUS.REMOVED]);
  function isHiddenOutputStatus(status) {
    return HIDDEN_OUTPUT_STATUSES.has(status);
  }
  function buildAiDisplayData(candidateItems, decisionItems, regexRules2 = []) {
    const decisionById = new Map(decisionItems.map((decision) => [decision.id, decision]));
    const visibleRegexRules = Array.isArray(regexRules2) ? regexRules2.filter((rule) => typeof rule?.id === "string" && rule.id.trim() && Array.isArray(rule.sourceIds)) : [];
    const regexCandidateIds = new Set(visibleRegexRules.flatMap((rule) => rule.sourceIds));
    const textPairs = candidateItems.filter(
      (candidate) => hasMeaningfulAiSourceText(candidate.sourceText) && !HIDDEN_OUTPUT_STATUSES.has(candidate.status) && !regexCandidateIds.has(candidate.id)
    ).map((candidate) => {
      const decision = decisionById.get(candidate.id);
      const hasValidatedTranslation = candidate.status === AI_CANDIDATE_STATUS.TRANSLATED && decision?.action === AI_ACTIONS.TRANSLATE && decision?.translationType !== AI_TRANSLATION_TYPES.REGEX && typeof decision.translation === "string";
      return {
        sourceText: candidate.sourceText,
        translation: hasValidatedTranslation ? decision.translation : ""
      };
    });
    return { textPairs, regexRules: visibleRegexRules };
  }
  // src/features/ai-scan/summaryEdits.js
  var MAX_MANUAL_SOURCE_LENGTH = 1e5;
  function normalizeSourceList(sourceTexts) {
    return Array.from(
      new Set(
        sourceTexts.map((sourceText) => normalizeAiSourceText(sourceText).slice(0, MAX_MANUAL_SOURCE_LENGTH)).filter(Boolean)
      )
    );
  }
  function createManualSummaryCandidate(sourceText, { siteKey, targetLanguage }) {
    const normalizedSourceText = normalizeAiSourceText(sourceText).slice(0, MAX_MANUAL_SOURCE_LENGTH);
    if (!normalizedSourceText) return null;
    const fingerprint = createCandidateFingerprint(siteKey, targetLanguage, normalizedSourceText);
    return {
      id: `ai-manual-${fingerprint}-${normalizedSourceText.length}`,
      sourceText: normalizedSourceText,
      siteKey,
      targetLanguage,
      fingerprint,
      context: {},
      status: AI_CANDIDATE_STATUS.PENDING,
      origin: "summary-editor"
    };
  }
  function reconcileAiSummarySources(sourceTexts, currentCandidates, protectedCandidateIds = []) {
    const remainingSourceTexts = normalizeSourceList(Array.isArray(sourceTexts) ? sourceTexts : []);
    const remaining = new Set(remainingSourceTexts);
    const protectedIds = new Set(protectedCandidateIds);
    const candidatesBySource = /* @__PURE__ */ new Map();
    currentCandidates.forEach((candidate) => {
      const sourceText = normalizeAiSourceText(candidate?.sourceText);
      if (!sourceText) return;
      const matches = candidatesBySource.get(sourceText) || [];
      matches.push(candidate);
      candidatesBySource.set(sourceText, matches);
    });
    const addedSourceTexts = [];
    const revivedCandidateIds = [];
    remainingSourceTexts.forEach((sourceText) => {
      const matches = candidatesBySource.get(sourceText) || [];
      if (matches.some((candidate) => protectedIds.has(candidate.id) || !isHiddenOutputStatus(candidate.status))) {
        return;
      }
      const hiddenCandidate = matches.find((candidate) => isHiddenOutputStatus(candidate.status));
      if (hiddenCandidate) revivedCandidateIds.push(hiddenCandidate.id);
      else addedSourceTexts.push(sourceText);
    });
    const removedCandidateIds = currentCandidates.filter(
      (candidate) => !protectedIds.has(candidate.id) && !isHiddenOutputStatus(candidate.status) && !remaining.has(normalizeAiSourceText(candidate.sourceText))
    ).map((candidate) => candidate.id);
    return { addedSourceTexts, revivedCandidateIds, removedCandidateIds };
  }
  // src/features/ai-scan/logic.js
  var isActive2 = false;
  var isPaused3 = false;
  var observer2 = null;
  var rootFlushTimer = null;
  var autoSubmitTimer = null;
  var pendingRoots = /* @__PURE__ */ new Set();
  var candidates = /* @__PURE__ */ new Map();
  var candidateFingerprints = /* @__PURE__ */ new Set();
  var decisions = /* @__PURE__ */ new Map();
  var regexRules = /* @__PURE__ */ new Map();
  var cache = /* @__PURE__ */ new Map();
  var currentRequest = null;
  var inFlightCandidateIds = [];
  var generation = 0;
  var currentSiteKey = "";
  var currentTargetLanguage = "zh-CN";
  var sessionUsage = { requests: 0, characters: 0 };
  var lastError = null;
  var budgetBlockedReason = null;
  var persistenceChain = Promise.resolve();
  var isClearing = false;
  var submissionInProgress = false;
  var userRemovedFingerprints = /* @__PURE__ */ new Set();
  var MAX_PERSISTED_SESSION_ITEMS = 5e3;
  var AI_OBSERVER_OPTIONS = Object.freeze({
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["placeholder", "alt", "title", "aria-label"]
  });
  function getCounts() {
    const counts = {
      total: candidates.size,
      pending: 0,
      inflight: 0,
      translated: 0,
      keep: 0,
      removed: 0,
      review: 0,
      failed: 0,
      textRules: 0,
      regexRules: regexRules.size
    };
    candidates.forEach((candidate) => {
      if (Object.prototype.hasOwnProperty.call(counts, candidate.status)) {
        counts[candidate.status] += 1;
      }
    });
    decisions.forEach((decision) => {
      if (decision.status !== AI_CANDIDATE_STATUS.TRANSLATED || decision.action !== AI_ACTIONS.TRANSLATE) return;
      if (decision.translationType === AI_TRANSLATION_TYPES.REGEX) return;
      counts.textRules += 1;
    });
    return counts;
  }
  function emitState() {
    fire("aiStateChanged", getAiStateSnapshot());
  }
  function markInFlightAsPending() {
    inFlightCandidateIds.forEach((id) => {
      const candidate = candidates.get(id);
      if (candidate && candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
        candidate.status = AI_CANDIDATE_STATUS.PENDING;
      }
    });
    inFlightCandidateIds = [];
  }
  function serializeSession() {
    const persistedCandidates = Array.from(candidates.values()).slice(-MAX_PERSISTED_SESSION_ITEMS);
    const persistedIds = new Set(persistedCandidates.map((candidate) => candidate.id));
    return {
      siteKey: currentSiteKey,
      targetLanguage: currentTargetLanguage,
      candidates: persistedCandidates,
      decisions: Array.from(decisions.values()).filter((decision) => persistedIds.has(decision.id)),
      regexRules: Array.from(regexRules.values()).filter(
        (rule) => rule.sourceIds.length === 0 || rule.sourceIds.every((id) => persistedIds.has(id))
      ),
      sessionUsage
    };
  }
  async function persistState() {
    const snapshot = serializeSession();
    persistenceChain = persistenceChain.catch(() => void 0).then(() => saveAiSession(snapshot));
    await persistenceChain;
  }
  function hydrateCachedDecision(candidate, cacheEntry) {
    const cachedDecision = cacheEntry?.decision;
    if (!cachedDecision || cachedDecision.translationType === AI_TRANSLATION_TYPES.REGEX) return false;
    const decision = {
      ...cachedDecision,
      id: candidate.id,
      sourceText: candidate.sourceText
    };
    if (decision.action === AI_ACTIONS.KEEP) {
      decision.action = AI_ACTIONS.REMOVE;
      decision.status = AI_CANDIDATE_STATUS.REMOVED;
    }
    if (decision.action === AI_ACTIONS.TRANSLATE && decision.translationType !== AI_TRANSLATION_TYPES.REGEX && isUnchangedTranslation(candidate.sourceText, decision.translation)) {
      decision.action = AI_ACTIONS.REMOVE;
      decision.translation = "";
      decision.translationType = AI_TRANSLATION_TYPES.TEXT;
      decision.reason = "unchanged-translation";
      decision.status = AI_CANDIDATE_STATUS.REMOVED;
    }
    decisions.set(candidate.id, decision);
    candidate.status = decision.status;
    return true;
  }
  function addCandidateBatch(newCandidates) {
    let added = 0;
    newCandidates.forEach((candidate) => {
      if (!isSubmittableAiCandidate(candidate) || candidateFingerprints.has(candidate.fingerprint) || userRemovedFingerprints.has(candidate.fingerprint)) {
        return;
      }
      const cacheEntry = cache.get(candidate.fingerprint);
      hydrateCachedDecision(candidate, cacheEntry);
      candidates.set(candidate.id, candidate);
      candidateFingerprints.add(candidate.fingerprint);
      added += 1;
    });
    if (added > 0) {
      void persistState().catch(() => {
        lastError = { code: "storage" };
        emitState();
      });
      emitState();
      const aiSettings = mergeAiSettings(loadSettings().ai);
      if (isActive2 && aiSettings.processingMode === AI_PROCESSING_MODES.AUTO && !budgetBlockedReason) {
        scheduleAutoSubmit(aiSettings.batch.debounceMs);
      }
    }
    return added;
  }
  function collectFromRoot(root) {
    const settings = loadSettings();
    const extracted = extractAiCandidates(root, {
      filterRules: settings.filterRules,
      targetLanguage: currentTargetLanguage,
      siteKey: currentSiteKey,
      scannerConfig: appConfig.scanner
    });
    return addCandidateBatch(extracted);
  }
  async function flushPendingRoots(runGeneration = generation) {
    if (!isActive2 || isPaused3 || runGeneration !== generation || pendingRoots.size === 0) return;
    if (isTranslationBridgeActive() && !isTranslationBridgeIdle()) {
      await waitForTranslationBridgeIdle();
    }
    if (!isActive2 || isPaused3 || runGeneration !== generation) return;
    const roots = Array.from(pendingRoots);
    pendingRoots = /* @__PURE__ */ new Set();
    const rootSet = new Set(roots.filter((root) => root?.nodeType === Node.ELEMENT_NODE));
    const topLevelRoots = roots.filter((root) => {
      if (root?.nodeType !== Node.ELEMENT_NODE) return true;
      let parent = root.parentElement;
      while (parent) {
        if (rootSet.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });
    topLevelRoots.forEach(collectFromRoot);
  }
  function scheduleRootFlush() {
    if (isPaused3) return;
    if (rootFlushTimer !== null) clearTimeout(rootFlushTimer);
    const delay = mergeAiSettings(loadSettings().ai).batch.debounceMs;
    const runGeneration = generation;
    rootFlushTimer = setTimeout(() => {
      rootFlushTimer = null;
      void flushPendingRoots(runGeneration);
    }, delay);
  }
  function handleMutations2(mutations) {
    if (!isActive2 || isPaused3) return;
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        pendingRoots.add(mutation.target);
        return;
      }
      if (mutation.type === "attributes") {
        pendingRoots.add(mutation.target);
        return;
      }
      mutation.addedNodes.forEach((node) => pendingRoots.add(node));
    });
    if (pendingRoots.size > 0) scheduleRootFlush();
  }
  function scheduleAutoSubmit(delayMs) {
    if (!isActive2 || isPaused3 || currentRequest) return;
    if (autoSubmitTimer !== null) clearTimeout(autoSubmitTimer);
    const runGeneration = generation;
    autoSubmitTimer = setTimeout(() => {
      autoSubmitTimer = null;
      if (isActive2 && !isPaused3 && runGeneration === generation) {
        void submitPending();
      }
    }, delayMs);
  }
  async function restoreSession() {
    const saved = await loadAiSession();
    if (!saved || saved.siteKey !== currentSiteKey || saved.targetLanguage !== currentTargetLanguage) {
      candidates = /* @__PURE__ */ new Map();
      candidateFingerprints = /* @__PURE__ */ new Set();
      decisions = /* @__PURE__ */ new Map();
      regexRules = /* @__PURE__ */ new Map();
      sessionUsage = { requests: 0, characters: 0 };
      return;
    }
    const restoredCandidates = Array.isArray(saved.candidates) ? saved.candidates.filter(isSubmittableAiCandidate) : [];
    restoredCandidates.forEach((candidate) => {
      if (candidate.status === AI_CANDIDATE_STATUS.KEEP) {
        candidate.status = AI_CANDIDATE_STATUS.REMOVED;
      }
      if (candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
        candidate.status = AI_CANDIDATE_STATUS.PENDING;
      }
    });
    candidates = new Map(restoredCandidates.map((candidate) => [candidate.id, candidate]));
    candidateFingerprints = new Set(restoredCandidates.map((candidate) => candidate.fingerprint).filter(Boolean));
    const restoredDecisions = Array.isArray(saved.decisions) ? saved.decisions : [];
    decisions = new Map(
      restoredDecisions.filter((decision) => candidates.has(decision.id)).map((decision) => {
        const candidate = candidates.get(decision.id);
        if (decision.action === AI_ACTIONS.KEEP) {
          return [
            decision.id,
            { ...decision, action: AI_ACTIONS.REMOVE, status: AI_CANDIDATE_STATUS.REMOVED }
          ];
        }
        if (decision.action === AI_ACTIONS.TRANSLATE && decision.translationType !== AI_TRANSLATION_TYPES.REGEX && isUnchangedTranslation(candidate.sourceText, decision.translation)) {
          return [
            decision.id,
            {
              ...decision,
              action: AI_ACTIONS.REMOVE,
              translation: "",
              translationType: AI_TRANSLATION_TYPES.TEXT,
              reason: "unchanged-translation",
              status: AI_CANDIDATE_STATUS.REMOVED
            }
          ];
        }
        return [decision.id, decision];
      })
    );
    const restoredRules = /* @__PURE__ */ new Map();
    const restoredRuleIds = /* @__PURE__ */ new Set();
    const candidateById = new Map(candidates);
    const restoredRegexRules = Array.isArray(saved.regexRules) ? saved.regexRules : [];
    restoredRegexRules.forEach((rawRule) => {
      const ruleId = String(rawRule?.id || "").trim();
      if (!ruleId || restoredRuleIds.has(ruleId)) return;
      const sourceIds = Array.isArray(rawRule?.sourceIds) ? rawRule.sourceIds.map((id) => String(id || "").trim()).filter(Boolean) : [];
      if (new Set(sourceIds).size !== sourceIds.length) return;
      if (sourceIds.some((id) => !candidateById.has(id))) return;
      const origin = rawRule?.origin === "manual" || rawRule?.origin === "user-edited" ? rawRule.origin : "ai";
      if (origin === "ai" && sourceIds.length < 1) return;
      const sourceTexts = sourceIds.map((id) => candidateById.get(id).sourceText);
      const singleSample = origin === "ai" && sourceIds.length === 1;
      if (singleSample && !hasDynamicRegexValue(sourceTexts[0])) return;
      const validated = validateRegexRuleDefinition(
        { ...rawRule, id: ruleId, sourceIds, origin },
        {
          sourceTexts,
          requireSourceMatch: origin === "ai",
          requireAnchors: singleSample,
          requireDynamicCapture: singleSample
        }
      );
      if (!validated.valid) return;
      restoredRuleIds.add(ruleId);
      restoredRules.set(ruleId, validated.rule);
    });
    decisions.forEach((decision, id) => {
      if (decision.translationType !== AI_TRANSLATION_TYPES.REGEX) {
        const candidate2 = candidates.get(id);
        if (candidate2) candidate2.status = decision.status;
        return;
      }
      if (!restoredRules.has(decision.regexRuleId)) {
        const candidate2 = candidates.get(id);
        if (candidate2) candidate2.status = AI_CANDIDATE_STATUS.PENDING;
        decisions.delete(id);
        return;
      }
      const candidate = candidates.get(id);
      if (candidate) candidate.status = decision.status;
    });
    restoredRules.forEach((rule, ruleId) => {
      if (rule.sourceIds.length > 0 && !rule.sourceIds.every((sourceId) => {
        const decision = decisions.get(sourceId);
        return decision?.translationType === AI_TRANSLATION_TYPES.REGEX && decision.status === AI_CANDIDATE_STATUS.TRANSLATED && decision.regexRuleId === ruleId;
      })) {
        restoredRules.delete(ruleId);
        rule.sourceIds.forEach((sourceId) => {
          const decision = decisions.get(sourceId);
          if (decision?.translationType !== AI_TRANSLATION_TYPES.REGEX) return;
          const candidate = candidates.get(sourceId);
          if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
          decisions.delete(sourceId);
        });
      }
    });
    regexRules = restoredRules;
    sessionUsage = {
      requests: Math.max(0, Number(saved.sessionUsage?.requests) || 0),
      characters: Math.max(0, Number(saved.sessionUsage?.characters) || 0)
    };
  }
  async function startAiScan() {
    if (isActive2) return { started: true };
    const aiSettings = mergeAiSettings(loadSettings().ai);
    if (!aiSettings.enabled) {
      return { started: false, reason: "disabled" };
    }
    if (!acquireScanMode(SCAN_MODES.AI)) {
      return { started: false, reason: "mode-conflict" };
    }
    isActive2 = true;
    isPaused3 = false;
    generation += 1;
    lastError = null;
    budgetBlockedReason = null;
    userRemovedFingerprints = /* @__PURE__ */ new Set();
    currentSiteKey = window.location.origin;
    currentTargetLanguage = aiSettings.targetLanguage;
    try {
      registerTranslationBridgeClient();
      cache = await loadAiCache();
      await restoreSession();
      await waitForTranslationBridgeIdle();
      if (!isActive2) return { started: false, reason: "stopped" };
      collectFromRoot(document);
      observer2 = new MutationObserver(handleMutations2);
      observer2.observe(document.body, AI_OBSERVER_OPTIONS);
      emitState();
      return { started: true };
    } catch (error) {
      isActive2 = false;
      isPaused3 = false;
      unregisterTranslationBridgeClient();
      releaseScanMode(SCAN_MODES.AI);
      lastError = error;
      emitState();
      throw error;
    }
  }
  async function stopAiScan() {
    if (!isActive2) {
      releaseScanMode(SCAN_MODES.AI);
      return;
    }
    isActive2 = false;
    isPaused3 = false;
    generation += 1;
    if (observer2) {
      observer2.disconnect();
      observer2 = null;
    }
    if (rootFlushTimer !== null) {
      clearTimeout(rootFlushTimer);
      rootFlushTimer = null;
    }
    if (autoSubmitTimer !== null) {
      clearTimeout(autoSubmitTimer);
      autoSubmitTimer = null;
    }
    pendingRoots.clear();
    if (currentRequest) {
      currentRequest.abort();
      currentRequest = null;
    }
    markInFlightAsPending();
    unregisterTranslationBridgeClient();
    releaseScanMode(SCAN_MODES.AI);
    await persistState();
    emitState();
  }
  async function performSubmitPending() {
    if (currentRequest || isClearing) return { submitted: false, reason: "inactive-or-busy" };
    const submissionGeneration = generation;
    const settings = loadSettings();
    const aiSettings = mergeAiSettings(settings.ai);
    const provider = getActiveProvider(aiSettings);
    if (!provider) return { submitted: false, reason: "missing-provider" };
    const pending = Array.from(candidates.values()).filter(
      (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
    );
    const batch = selectBatch(pending, aiSettings.batch);
    batch.invalid.forEach((candidate) => {
      candidates.delete(candidate.id);
      decisions.delete(candidate.id);
      if (candidate.fingerprint) candidateFingerprints.delete(candidate.fingerprint);
    });
    batch.oversized.forEach((candidate) => {
      candidate.status = AI_CANDIDATE_STATUS.REVIEW;
      decisions.set(candidate.id, {
        id: candidate.id,
        sourceText: candidate.sourceText,
        action: AI_ACTIONS.REVIEW,
        translation: "",
        confidence: 0,
        category: "local-validation",
        reason: "source-too-long",
        status: AI_CANDIDATE_STATUS.REVIEW
      });
    });
    if (batch.invalid.length > 0 || batch.oversized.length > 0) {
      await persistState();
      emitState();
    }
    if (generation !== submissionGeneration || isClearing) {
      return { submitted: false, reason: "stale" };
    }
    if (batch.candidates.length === 0) return { submitted: false, reason: "empty" };
    const [apiKey, styleProfile, dailyUsage] = await Promise.all([
      loadProviderApiKey(provider.id),
      matchStyleProfile(window.location, currentTargetLanguage),
      loadDailyUsage()
    ]);
    if (generation !== submissionGeneration || isClearing) {
      return { submitted: false, reason: "stale" };
    }
    const pageContext = buildPageContext({ targetLanguage: currentTargetLanguage });
    const payload = buildTranslationRequest({
      provider,
      candidates: batch.candidates,
      targetLanguage: currentTargetLanguage,
      styleProfile,
      pageContext
    });
    try {
      validateProviderConfiguration(provider, apiKey);
    } catch (error) {
      lastError = error;
      emitState();
      fire("aiRequestFailed", { code: error?.code || "invalid-provider" });
      return { submitted: false, reason: error?.code || "invalid-provider" };
    }
    const budget = checkBudget({
      settings: aiSettings.budget,
      sessionUsage,
      dailyUsage,
      requestPayload: payload,
      nextCharacters: batch.characters
    });
    if (!budget.allowed) {
      budgetBlockedReason = budget.reason;
      emitState();
      fire("aiBudgetBlocked", budget.reason);
      return { submitted: false, reason: budget.reason };
    }
    budgetBlockedReason = null;
    try {
      await addDailyUsage(budget.estimatedTokens);
    } catch {
      lastError = { code: "storage" };
      emitState();
      return { submitted: false, reason: "storage" };
    }
    if (generation !== submissionGeneration || isClearing) {
      return { submitted: false, reason: "stale" };
    }
    batch.candidates.forEach((candidate) => {
      candidate.status = AI_CANDIDATE_STATUS.IN_FLIGHT;
    });
    const requestCandidateIds = batch.candidates.map((candidate) => candidate.id);
    inFlightCandidateIds = requestCandidateIds;
    sessionUsage.requests += 1;
    sessionUsage.characters += batch.characters;
    lastError = null;
    emitState();
    const requestGeneration = submissionGeneration;
    let requestHandle = null;
    try {
      requestHandle = createChatCompletionRequest({
        provider,
        apiKey,
        payload,
        timeoutMs: aiSettings.requestTimeoutMs
      });
      currentRequest = requestHandle;
      const response = await requestHandle.promise;
      if (requestGeneration !== generation) {
        return { submitted: false, reason: "stale" };
      }
      const parsed = parseJsonContent(response.content);
      const validated = validateTranslationResponse(parsed, batch.candidates, aiSettings.confidenceThreshold);
      const regexRuleIdMap = /* @__PURE__ */ new Map();
      validated.regexRules.forEach((rule) => {
        let ruleId = rule.id;
        let suffix = 0;
        while (regexRules.has(ruleId)) {
          suffix += 1;
          ruleId = `${rule.id}-${suffix}`;
        }
        regexRuleIdMap.set(rule.id, ruleId);
        regexRules.set(ruleId, { ...rule, id: ruleId });
      });
      validated.decisions.forEach((decision) => {
        const candidate = candidates.get(decision.id);
        if (!candidate) return;
        const storedDecision = decision.translationType === AI_TRANSLATION_TYPES.REGEX && regexRuleIdMap.has(decision.regexRuleId) ? { ...decision, regexRuleId: regexRuleIdMap.get(decision.regexRuleId) } : decision;
        candidate.status = storedDecision.status;
        decisions.set(decision.id, storedDecision);
        if (storedDecision.translationType !== AI_TRANSLATION_TYPES.REGEX && [AI_ACTIONS.TRANSLATE, AI_ACTIONS.KEEP, AI_ACTIONS.REMOVE].includes(storedDecision.action)) {
          cache.set(candidate.fingerprint, {
            fingerprint: candidate.fingerprint,
            siteKey: candidate.siteKey,
            targetLanguage: candidate.targetLanguage,
            sourceText: candidate.sourceText,
            providerId: provider.id,
            model: provider.model,
            styleVersion: styleProfile?.version || 0,
            decision: storedDecision,
            updatedAt: Date.now()
          });
        } else if (storedDecision.translationType === AI_TRANSLATION_TYPES.REGEX) {
          cache.delete(candidate.fingerprint);
        }
      });
      await Promise.all([saveAiCache(cache), persistState()]);
      return { submitted: true, count: validated.decisions.length };
    } catch (error) {
      if (requestGeneration !== generation) {
        return { submitted: false, reason: "stale" };
      }
      if (error?.code !== "aborted") {
        lastError = error;
        const validationFailure = error instanceof SyntaxError || error?.message === "empty-response" || ["truncated-response", "invalid-response"].includes(error?.code);
        requestCandidateIds.forEach((id) => {
          const candidate = candidates.get(id);
          if (!candidate) return;
          candidate.status = validationFailure ? AI_CANDIDATE_STATUS.REVIEW : AI_CANDIDATE_STATUS.FAILED;
          decisions.set(id, {
            id,
            sourceText: candidate.sourceText,
            action: AI_ACTIONS.REVIEW,
            translation: "",
            confidence: 0,
            category: validationFailure ? "validation" : "request-error",
            reason: validationFailure ? error?.code || error?.message || "invalid-response" : error?.code || "request-error",
            status: candidate.status
          });
        });
        await persistState();
        fire("aiRequestFailed", { code: error?.code || "unknown" });
      } else {
        requestCandidateIds.forEach((id) => {
          const candidate = candidates.get(id);
          if (candidate?.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
          }
        });
      }
      return { submitted: false, reason: error?.code || "unknown" };
    } finally {
      if (currentRequest === requestHandle) {
        currentRequest = null;
        inFlightCandidateIds = [];
      }
      emitState();
    }
  }
  async function submitPending() {
    if (currentRequest || isClearing || submissionInProgress) {
      return { submitted: false, reason: "inactive-or-busy" };
    }
    const pending = Array.from(candidates.values()).filter(
      (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
    );
    const invalid = pending.filter((candidate) => !isSubmittableAiCandidate(candidate));
    invalid.forEach((candidate) => {
      candidates.delete(candidate.id);
      decisions.delete(candidate.id);
      if (candidate.fingerprint) candidateFingerprints.delete(candidate.fingerprint);
    });
    if (invalid.length > 0) {
      await persistState();
      emitState();
    }
    if (!pending.some(isSubmittableAiCandidate)) {
      return { submitted: false, reason: "empty" };
    }
    submissionInProgress = true;
    emitState();
    let result;
    try {
      result = await performSubmitPending();
      return result;
    } finally {
      submissionInProgress = false;
      emitState();
      const latestSettings = mergeAiSettings(loadSettings().ai);
      if (result?.submitted && isActive2 && !isPaused3 && !isClearing && latestSettings.processingMode === AI_PROCESSING_MODES.AUTO && Array.from(candidates.values()).some((candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING) && !budgetBlockedReason) {
        queueMicrotask(() => void submitPending());
      }
    }
  }
  async function retryReviewItems() {
    decisions.forEach((decision, id) => {
      if (decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED) {
        const candidate = candidates.get(id);
        if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
        decisions.delete(id);
      }
    });
    budgetBlockedReason = null;
    await persistState();
    emitState();
    return submitPending();
  }
  function isReviewDecision(decision) {
    return decision?.status === AI_CANDIDATE_STATUS.REVIEW || decision?.status === AI_CANDIDATE_STATUS.FAILED;
  }
  function persistReviewMutation(cacheChanged = false) {
    const tasks = [persistState()];
    if (cacheChanged) tasks.push(saveAiCache(cache));
    Promise.all(tasks).catch(() => {
      lastError = { code: "storage" };
      emitState();
    });
    emitState();
  }
  function removeAiReviewItem(candidateId) {
    const id = String(candidateId || "").trim();
    const decision = decisions.get(id);
    if (!isReviewDecision(decision) || !candidates.has(id)) return { changed: false };
    const removed = removeAiCandidate(id);
    if (!removed.changed) return { changed: false };
    persistReviewMutation(removed.cacheChanged);
    return { changed: true };
  }
  function restoreAiReviewItem(candidateId) {
    const id = String(candidateId || "").trim();
    const candidate = candidates.get(id);
    const decision = decisions.get(id);
    if (!candidate || !isReviewDecision(decision)) return { changed: false };
    candidate.status = AI_CANDIDATE_STATUS.PENDING;
    decisions.delete(id);
    budgetBlockedReason = null;
    persistReviewMutation();
    return { changed: true };
  }
  async function clearAiData() {
    if (isClearing) return;
    isClearing = true;
    generation += 1;
    try {
      const requestToCancel = currentRequest;
      if (requestToCancel) {
        requestToCancel.abort();
        await requestToCancel.promise.catch(() => void 0);
      }
      currentRequest = null;
      inFlightCandidateIds = [];
      candidates.clear();
      candidateFingerprints.clear();
      decisions.clear();
      regexRules.clear();
      sessionUsage = { requests: 0, characters: 0 };
      lastError = null;
      budgetBlockedReason = null;
      userRemovedFingerprints.clear();
      await persistenceChain.catch(() => void 0);
      await Promise.all([
        clearAiSession(),
        clearAiCacheForSite(currentSiteKey || window.location.origin, currentTargetLanguage)
      ]);
      emitState();
    } finally {
      isClearing = false;
    }
  }
  function getAiDisplayData() {
    return buildAiDisplayData(
      Array.from(candidates.values()),
      Array.from(decisions.values()),
      Array.from(regexRules.values())
    );
  }
  function getReviewItems() {
    return Array.from(decisions.values()).filter(
      (decision) => decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED
    );
  }
  function applyAiSummaryEdits({ remainingSourceTexts = null, editedRegexRules = null } = {}) {
    const hasTextEdits = Array.isArray(remainingSourceTexts);
    let changed = false;
    let cacheChanged = false;
    let nextRegexRules = regexRules;
    if (Array.isArray(editedRegexRules)) {
      const existingRules = Array.from(regexRules.values());
      const matchedRules = matchEditedRegexRulesToExisting(editedRegexRules, existingRules);
      if (!matchedRules.valid) return { changed: false, error: matchedRules.error };
      nextRegexRules = /* @__PURE__ */ new Map();
      const assignedSourceIds = /* @__PURE__ */ new Set();
      for (let index = 0; index < editedRegexRules.length; index += 1) {
        const editedRule = editedRegexRules[index];
        const requestedId = String(editedRule?.id || "").trim();
        const existingRule = matchedRules.matches[index];
        const ruleId = requestedId || existingRule?.id || createRegexRuleId(
          editedRule?.pattern || "",
          editedRule?.flags || "",
          editedRule?.replacement || "",
          index
        );
        let uniqueRuleId = ruleId;
        let suffix = 0;
        while (!requestedId && !existingRule && (regexRules.has(uniqueRuleId) || nextRegexRules.has(uniqueRuleId))) {
          suffix += 1;
          uniqueRuleId = `${ruleId}-${suffix}`;
        }
        if (nextRegexRules.has(uniqueRuleId)) return { changed: false, error: "duplicate-regex-rule-id" };
        const sourceIds = existingRule ? [...existingRule.sourceIds] : Array.isArray(editedRule?.sourceIds) ? editedRule.sourceIds.map((id) => String(id || "").trim()).filter(Boolean) : [];
        if (sourceIds.some((id) => assignedSourceIds.has(id))) {
          return { changed: false, error: "overlapping-regex-rules" };
        }
        if (sourceIds.some((id) => !candidates.has(id))) return { changed: false, error: "unknown-regex-source" };
        const candidateSourceTexts = sourceIds.map((id) => candidates.get(id).sourceText);
        const validated = validateRegexRuleDefinition(
          {
            ...existingRule || {},
            ...editedRule,
            id: uniqueRuleId,
            sourceIds,
            confidence: existingRule?.confidence ?? (Number.isFinite(Number(editedRule?.confidence)) ? Number(editedRule.confidence) : 1),
            origin: existingRule ? "user-edited" : editedRule?.origin || "manual"
          },
          { sourceTexts: candidateSourceTexts, requireSourceMatch: false }
        );
        if (!validated.valid) return { changed: false, error: validated.reason };
        sourceIds.forEach((id) => assignedSourceIds.add(id));
        nextRegexRules.set(uniqueRuleId, validated.rule);
      }
      regexRules.forEach((rule, ruleId) => {
        if (nextRegexRules.has(ruleId)) return;
        rule.sourceIds.forEach((id) => {
          const removed = removeAiCandidate(id);
          cacheChanged = cacheChanged || removed.cacheChanged;
        });
        changed = true;
      });
      if (nextRegexRules.size !== regexRules.size) changed = true;
      else {
        nextRegexRules.forEach((rule, ruleId) => {
          const previous = regexRules.get(ruleId);
          if (!previous || previous.pattern !== rule.pattern || previous.flags !== rule.flags || previous.replacement !== rule.replacement) {
            changed = true;
          }
        });
      }
      regexRules = nextRegexRules;
    }
    const regexCandidateIds = new Set(
      Array.from(regexRules.values()).flatMap((rule) => Array.isArray(rule.sourceIds) ? rule.sourceIds : [])
    );
    if (hasTextEdits) {
      const reconciliation = reconcileAiSummarySources(
        remainingSourceTexts,
        Array.from(candidates.values()),
        regexCandidateIds
      );
      reconciliation.revivedCandidateIds.forEach((id) => {
        const candidate = candidates.get(id);
        if (!candidate) return;
        candidate.status = AI_CANDIDATE_STATUS.PENDING;
        decisions.delete(id);
        if (candidate.fingerprint) userRemovedFingerprints.delete(candidate.fingerprint);
        changed = true;
      });
      reconciliation.addedSourceTexts.forEach((sourceText) => {
        const candidate = createManualSummaryCandidate(sourceText, {
          siteKey: currentSiteKey || window.location.origin,
          targetLanguage: currentTargetLanguage
        });
        if (!candidate || candidateFingerprints.has(candidate.fingerprint)) return;
        candidates.set(candidate.id, candidate);
        candidateFingerprints.add(candidate.fingerprint);
        userRemovedFingerprints.delete(candidate.fingerprint);
        changed = true;
      });
      reconciliation.removedCandidateIds.forEach((id) => {
        const removed = removeAiCandidate(id);
        cacheChanged = cacheChanged || removed.cacheChanged;
        changed = removed.changed || changed;
      });
    }
    if (changed) {
      const tasks = [persistState()];
      if (cacheChanged) tasks.push(saveAiCache(cache));
      Promise.all(tasks).catch(() => {
        lastError = { code: "storage" };
        emitState();
      });
      emitState();
    }
    return { changed, error: null };
  }
  function removeAiCandidate(id) {
    const candidate = candidates.get(id);
    if (!candidate) return { changed: false, cacheChanged: false };
    candidates.delete(id);
    decisions.delete(id);
    let cacheChanged = false;
    if (candidate.fingerprint) {
      candidateFingerprints.delete(candidate.fingerprint);
      userRemovedFingerprints.add(candidate.fingerprint);
      cacheChanged = cache.delete(candidate.fingerprint);
    }
    return { changed: true, cacheChanged };
  }
  function getAiStateSnapshot() {
    return {
      active: isActive2,
      paused: isPaused3,
      processing: Boolean(currentRequest) || submissionInProgress,
      counts: getCounts(),
      sessionUsage: { ...sessionUsage },
      lastErrorCode: lastError?.code || null,
      budgetBlockedReason
    };
  }
  function isAiScanActive() {
    return isActive2;
  }
  function pauseAiScan() {
    if (!isActive2 || isPaused3) return false;
    isPaused3 = true;
    if (observer2) observer2.disconnect();
    if (rootFlushTimer !== null) {
      clearTimeout(rootFlushTimer);
      rootFlushTimer = null;
    }
    if (autoSubmitTimer !== null) {
      clearTimeout(autoSubmitTimer);
      autoSubmitTimer = null;
    }
    pendingRoots.clear();
    emitState();
    return true;
  }
  function resumeAiScan() {
    if (!isActive2 || !isPaused3) return false;
    isPaused3 = false;
    if (observer2 && document.body) observer2.observe(document.body, AI_OBSERVER_OPTIONS);
    const aiSettings = mergeAiSettings(loadSettings().ai);
    if (aiSettings.processingMode === AI_PROCESSING_MODES.AUTO && Array.from(candidates.values()).some((candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING) && !budgetBlockedReason) {
      scheduleAutoSubmit(aiSettings.batch.debounceMs);
    }
    emitState();
    return true;
  }
  function hasAiData() {
    return candidates.size > 0 || decisions.size > 0 || regexRules.size > 0;
  }
  // src/shared/utils/text/summaryParser.js
  var ARRAY_ENTRY_PATTERN = /\[\s*("(?:\\.|[^"\\])*")\s*,\s*("(?:\\.|[^"\\])*")?\s*\]/g;
  var OBJECT_ENTRY_PATTERN = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")?/g;
  var CSV_LINE_PATTERN = /^("(?:""|[^"])*")(?:,("(?:""|[^"])*"))?$/gm;
  function unescapeCsvField(field) {
    return field.slice(1, -1).replace(/""/g, '"');
  }
  function parseSummarySourceTexts(content, format = "array") {
    if (!content || typeof content !== "string" || !content.trim()) return [];
    if (format === "csv") {
      const sources2 = [];
      let match2;
      CSV_LINE_PATTERN.lastIndex = 0;
      while ((match2 = CSV_LINE_PATTERN.exec(content)) !== null) {
        if (match2[1]) sources2.push(unescapeCsvField(match2[1]));
      }
      return sources2;
    }
    if (format === "object") {
      const sources2 = [];
      let match2;
      OBJECT_ENTRY_PATTERN.lastIndex = 0;
      while ((match2 = OBJECT_ENTRY_PATTERN.exec(content)) !== null) {
        try {
          sources2.push(JSON.parse(match2[1]));
        } catch {
        }
      }
      return sources2;
    }
    const sources = [];
    let match;
    ARRAY_ENTRY_PATTERN.lastIndex = 0;
    while ((match = ARRAY_ENTRY_PATTERN.exec(content)) !== null) {
      try {
        sources.push(JSON.parse(match[1]));
      } catch {
      }
    }
    return sources;
  }
  // src/features/ai-scan/ui.js
  var initialized = false;
  var aiCounterVisible = false;
  var textareaEditSyncElement = null;
  var aiDrafts = { text: "", regex: "" };
  var aiDraftDirty = { text: false, regex: false };
  var aiSummaryEditError = "";
  var lastAiOutputFormat = null;
  var renderingAiSummary = false;
  var applyingAiSummaryEdit = false;
  function resetAiFab() {
    const aiFab2 = getAiFab();
    if (!aiFab2) return;
    setFabIcon(aiFab2, aiIcon);
    aiFab2.classList.remove("is-recording");
    updateFabTooltip(aiFab2, "tooltip.ai_scan");
  }
  function showAiCounter(snapshot = getAiStateSnapshot()) {
    if (!aiCounterVisible) {
      createCounterWithHelp({
        counterKey: "common.discovered",
        helpKey: "tutorial.aiScan",
        onPause: () => {
          if (pauseAiScan()) {
            showNotification(t("notifications.aiScanPaused"), { type: "info" });
          }
        },
        onResume: () => {
          if (resumeAiScan()) {
            showNotification(t("notifications.aiScanContinued"), { type: "success" });
          }
        },
        scanType: "AiScan"
      });
      showCounterWithHelp();
      aiCounterVisible = true;
    }
    updateCounterValue(snapshot.counts.total);
  }
  function hideAiCounter() {
    if (!aiCounterVisible) return;
    hideCounterWithHelp();
    aiCounterVisible = false;
  }
  function resetAiDrafts() {
    aiDrafts.text = "";
    aiDrafts.regex = "";
    aiDraftDirty.text = false;
    aiDraftDirty.regex = false;
    aiSummaryEditError = "";
  }
  function formatAiTextResults(pairs = getAiDisplayData().textPairs) {
    const settings = loadSettings();
    return formatTextsForTranslation(pairs, settings.outputFormat, {
      includeArrayBrackets: settings.includeArrayBrackets
    });
  }
  function formatAiRegexResults(rules = getAiDisplayData().regexRules) {
    const settings = loadSettings();
    return formatRegexRulesForTranslation(rules, {
      includeRuleComments: settings.ai?.includeRegexRuleComments === true
    });
  }
  function getAiOutputContent(data, type) {
    if (aiDraftDirty[type]) return aiDrafts[type];
    if (type === "regex") return data.regexRules.length > 0 ? formatAiRegexResults(data.regexRules) : SHOW_PLACEHOLDER;
    return data.textPairs.length > 0 ? formatAiTextResults(data.textPairs) : SHOW_PLACEHOLDER;
  }
  function syncAiSummary(open = false, options = {}) {
    if (options.resetDrafts) resetAiDrafts();
    ensureTextareaEditSync();
    const snapshot = getAiStateSnapshot();
    const data = getAiDisplayData();
    const settings = loadSettings();
    if (lastAiOutputFormat !== settings.outputFormat) {
      if (lastAiOutputFormat !== null) {
        aiDrafts.text = "";
        aiDraftDirty.text = false;
      }
      lastAiOutputFormat = settings.outputFormat;
    }
    const outputType = getAiOutputType();
    updateAiOutputTabs(outputType);
    updateAiSummaryPanel(snapshot, getReviewItems(), aiSummaryEditError);
    updateAiFooterState(snapshot);
    updateScanCount(snapshot.counts.total, "ai");
    if (!open) {
      const visibleAiModal = currentMode === "ai-scan" && modalOverlay?.classList.contains("is-visible");
      if (!visibleAiModal) return;
    }
    renderingAiSummary = true;
    updateModalContent(getAiOutputContent(data, outputType), open, "ai-scan");
    renderingAiSummary = false;
    updateAiOutputTabs(outputType);
    updateAiSummaryPanel(snapshot, getReviewItems(), aiSummaryEditError);
    updateAiFooterState(snapshot);
  }
  function switchAiOutputType(type) {
    if (type !== "text" && type !== "regex") return;
    setAiOutputType(type);
    syncAiSummary(false);
  }
  function syncAiSummaryEdits() {
    if (currentMode !== "ai-scan" || renderingAiSummary) return;
    const settings = loadSettings();
    const content = outputTextarea?.value || "";
    const outputType = getAiOutputType();
    aiDrafts[outputType] = content;
    aiDraftDirty[outputType] = true;
    if (outputType === "regex") {
      const parsed = parseRegexRules(content);
      if (!parsed.valid) {
        aiSummaryEditError = parsed.error || "invalid-regex-output";
        updateAiSummaryPanel(getAiStateSnapshot(), getReviewItems(), aiSummaryEditError);
        return;
      }
      let result2;
      applyingAiSummaryEdit = true;
      try {
        result2 = applyAiSummaryEdits({ editedRegexRules: parsed.rules });
      } finally {
        applyingAiSummaryEdit = false;
      }
      if (result2.error) {
        aiSummaryEditError = result2.error;
        updateAiSummaryPanel(getAiStateSnapshot(), getReviewItems(), aiSummaryEditError);
        return;
      }
      aiSummaryEditError = "";
      if (result2.changed) syncAiSummary(false);
      return;
    }
    const remaining = parseSummarySourceTexts(content, settings.outputFormat || "array");
    let result;
    applyingAiSummaryEdit = true;
    try {
      result = applyAiSummaryEdits({ remainingSourceTexts: remaining });
    } finally {
      applyingAiSummaryEdit = false;
    }
    if (result.changed) {
      aiSummaryEditError = "";
      syncAiSummary(false);
    }
  }
  function ensureTextareaEditSync() {
    if (textareaEditSyncElement === outputTextarea || !outputTextarea) return;
    outputTextarea.addEventListener("input", syncAiSummaryEdits);
    textareaEditSyncElement = outputTextarea;
  }
  async function handleSubmit() {
    try {
      const result = await submitPending();
      if (result.submitted) {
        showNotification(t("notifications.aiBatchCompleted"), { type: "success" });
      } else if (result.reason === "empty") {
        showNotification(t("notifications.aiNothingPending"), { type: "info" });
      } else if (["missing-provider", "storage"].includes(result.reason)) {
        showNotification(t("notifications.aiRequestFailed"), { type: "error" });
      }
    } catch {
      showNotification(t("notifications.aiRequestFailed"), { type: "error" });
    } finally {
      syncAiSummary(false, { resetDrafts: true });
    }
  }
  async function handleAiScanClick(aiFab2) {
    if (isAiScanActive()) {
      await stopAiScan();
      resetAiFab();
      hideAiCounter();
      showNotification(t("notifications.aiScanStopped"), { type: "success" });
      syncAiSummary(false);
      return;
    }
    try {
      const result = await startAiScan();
      if (!result.started) {
        const messageKey = result.reason === "disabled" ? "notifications.aiDisabled" : "notifications.scanModeConflict";
        showNotification(t(messageKey), { type: "info" });
        return;
      }
      setFabIcon(aiFab2, stopIcon);
      aiFab2.classList.add("is-recording");
      updateFabTooltip(aiFab2, "tooltip.ai_scan_stop");
      showAiCounter();
      showNotification(t("notifications.aiScanStarted"), { type: "info" });
      syncAiSummary(false);
    } catch {
      resetAiFab();
      hideAiCounter();
      showNotification(t("notifications.aiScanStartFailed"), { type: "error" });
    }
  }
  function showAiSummary() {
    syncAiSummary(true);
  }
  function initializeAiScanUI() {
    if (initialized) return;
    initialized = true;
    on("aiStateChanged", (snapshot) => {
      if (!applyingAiSummaryEdit && (aiDraftDirty.text || aiDraftDirty.regex)) resetAiDrafts();
      if (snapshot.active) showAiCounter(snapshot);
      else hideAiCounter();
      syncAiSummary(false);
    });
    on("ai-output-type-change", switchAiOutputType);
    on("ai-submit-pending", () => void handleSubmit());
    on("ai-retry-review", async () => {
      await retryReviewItems();
      syncAiSummary(false);
    });
    on("ai-review-remove", (candidateId) => {
      const result = removeAiReviewItem(candidateId);
      if (result.changed) syncAiSummary(false, { resetDrafts: true });
    });
    on("ai-review-return-to-editor", (candidateId) => {
      const result = restoreAiReviewItem(candidateId);
      if (!result.changed) return;
      setAiOutputType("text");
      syncAiSummary(false, { resetDrafts: true });
    });
    on("ai-clear", async () => {
      await clearAiData();
      syncAiSummary(false, { resetDrafts: true });
    });
    on("settingsSaved", () => {
      const aiSettings = mergeAiSettings(loadSettings().ai);
      if (!aiSettings.enabled && isAiScanActive()) {
        void stopAiScan().then(() => {
          resetAiFab();
          hideAiCounter();
        });
      }
      if (hasAiData()) syncAiSummary(false);
    });
    on("languageChanged", () => {
      if (hasAiData()) syncAiSummary(false, { resetDrafts: true });
    });
    on("aiBudgetBlocked", () => {
      showNotification(t("notifications.aiBudgetBlocked"), { type: "warning" });
    });
    on("aiRequestFailed", () => {
      showNotification(t("notifications.aiRequestFailed"), { type: "error" });
    });
  }
  // src/shared/ui/summaryHandler.js
  var preferAiSummary = false;
  subscribeScanMode(({ activeMode: activeMode2 }) => {
    if (activeMode2 === SCAN_MODES.AI) preferAiSummary = true;
    if (activeMode2 === SCAN_MODES.DYNAMIC || activeMode2 === SCAN_MODES.ELEMENT) preferAiSummary = false;
  });
  function handleSummaryClick() {
    log(t("tooltip.summary"));
    if (isElementScanActive()) {
      const stagedTexts2 = getStagedTexts();
      const { outputFormat, includeArrayBrackets } = loadSettings();
      const formattedText = formatTextsForTranslation(Array.from(stagedTexts2), outputFormat, {
        includeArrayBrackets
      });
      updateScanCount(stagedTexts2.size, "element-scan");
      if (stagedTexts2.size === 0) {
        updateModalContent(SHOW_PLACEHOLDER, true, "element-scan");
      } else {
        updateModalContent(formattedText, true, "element-scan");
      }
    } else if (isAiScanActive() || preferAiSummary && hasAiData()) {
      showAiSummary();
    } else {
      showSessionSummary();
    }
  }
  // src/shared/ui/entry.js
  function initUI() {
    const settings = loadSettings();
    initializeAiScanUI();
    createMainModal();
    createFab({
      callbacks: {
        onStaticExtract: handleQuickScanClick,
        onDynamicExtract: handleDynamicExtractClick,
        onSummary: handleSummaryClick,
        // Updated callback
        onElementScan: handleElementScanClick,
        onAiScan: handleAiScanClick
      },
      isVisible: settings.showFab
    });
  }
  // src/features/settings/index.js
  function handleOpenSettings() {
    const currentSettings = loadSettings();
    openSettingsPanel(currentSettings, (newSettings) => {
      const oldSettings = loadSettings();
      const savedSettings = saveSettings(newSettings);
      applySettings(savedSettings, oldSettings);
    });
  }
  function initialize() {
    initSettingsPanel(handleOpenSettings);
  }
  // src/features/export/exporter.js
  function getPageTitle() {
    return document.title.replace(/[\\/:*?"<>|]/g, "_").trim() || "Exported_Text";
  }
  function generateFilename(extension) {
    const title = getPageTitle();
    const now = /* @__PURE__ */ new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
    return `${title}_${timestamp}.${extension}`;
  }
  function downloadFile(filename, content, mimeType) {
    const blobContent = filename.endsWith(".csv") ? ["\uFEFF", content] : [content];
    const blob = new Blob(blobContent, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    log(t("log.exporter.fileExported", { filename }));
  }
  function exportToFile() {
    const currentMode3 = getCurrentMode();
    const settings = loadSettings();
    const outputFormat = settings.outputFormat || "array";
    const processAndDownload = (text, outputType = "text") => {
      if (!text || text.trim() === "" || text.trim() === "[]" || text.trim() === "{}" || text.trim() === "regexRules: []") {
        log(t("log.exporter.noContent"));
        return;
      }
      let filename, mimeType;
      if (currentMode3 === "ai-scan" && outputType === "regex") {
        filename = generateFilename("js");
        mimeType = "text/javascript;charset=utf-8;";
      } else
        switch (outputFormat) {
          case "array":
            filename = generateFilename("txt");
            mimeType = "text/plain;charset=utf-8;";
            break;
          case "object":
            filename = generateFilename("json");
            mimeType = "application/json;charset=utf-8;";
            break;
          case "csv":
            filename = generateFilename("csv");
            mimeType = "text/csv;charset=utf-8;";
            break;
          default:
            filename = generateFilename("txt");
            mimeType = "text/plain;charset=utf-8;";
        }
      downloadFile(filename, text, mimeType);
    };
    const currentUiContent = outputTextarea ? outputTextarea.value : null;
    const truncationWarning = t("scan.truncationWarning");
    const isTruncated = currentUiContent && currentUiContent.includes(truncationWarning);
    const aiOutputType2 = currentMode3 === "ai-scan" ? getAiOutputType() : "text";
    let contentToExport = null;
    let contentSource = "raw";
    if (currentUiContent && !isTruncated && currentUiContent.trim() !== "") {
      contentSource = "ui";
      contentToExport = currentUiContent;
    }
    if (contentSource === "ui" && contentToExport && contentToExport.length > 0) {
      log(t("log.exporter.exportingUserContent"));
      processAndDownload(contentToExport, aiOutputType2);
    } else if (currentMode3 === "ai-scan") {
      log(t("log.exporter.noContent"));
    } else {
      log(t("log.exporter.exportingRawData"));
      if (currentMode3 === "session-scan") {
        log(t("log.main.requestingSessionScanData"));
        requestSummary(processAndDownload);
      } else {
        log(t("log.main.exportingQuickScanData"));
        processAndDownload(fullQuickScanContent);
      }
    }
  }
  function initializeExporter() {
    on("exportToFile", exportToFile);
  }
  // src/main.js
  async function initialize2() {
    if (window.top !== window.self) {
      log(t("log.main.inIframe"));
      return;
    }
    const settings = loadSettings();
    initializeLanguage(settings);
    updateLoggerState(settings.enableDebugLogging);
    log(t("log.main.initializing"));
    log(t("log.main.initialSettingsLoaded"), settings);
    const styleElement = document.createElement("style");
    styleElement.textContent = `:host{box-sizing:border-box;font-family:Menlo,Monaco,Cascadia Code,PingFang SC,monospace,sans-serif;font-size:16px;line-height:1.5;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;--color-bg:#fff;--color-text:#333;--color-text-secondary:#666;--color-border:#e0e0e0;--color-overlay-bg:rgba(0,0,0,.5);--color-shadow:rgba(0,0,0,.2);--color-primary:#1a73e8;--color-primary-hover:#185abc;--color-primary-text:#fff;--color-toast-bg:#333;--color-toast-text:#fff;--color-textarea-bg:#fff;--color-textarea-border:#ccc;--color-tooltip-bg:#333;--color-tooltip-text:#fff;--color-line-number-text:#888;--color-line-number-active-text:#000;--dark-color-bg:#2d2d2d;--dark-color-text:#f0f0f0;--dark-color-text-secondary:#aaa;--dark-color-border:#555;--dark-color-overlay-bg:rgba(0,0,0,.7);--dark-color-shadow:rgba(0,0,0,.4);--dark-color-primary:#1e90ff;--dark-color-primary-hover:#1c86ee;--dark-color-primary-text:#fff;--dark-color-toast-bg:#eee;--dark-color-toast-text:#111;--dark-color-textarea-bg:#3a3a3a;--dark-color-textarea-border:#666;--dark-color-tooltip-bg:#e0e0e0;--dark-color-tooltip-text:#111;--dark-color-line-number-text:#777;--dark-color-line-number-active-text:#fff;--color-scrollbar-thumb:#c1c1c1;--color-scrollbar-thumb-hover:#a8a8a8;--color-scrollbar-border:#fff;--dark-color-scrollbar-thumb:#555;--dark-color-scrollbar-thumb-hover:#777;--dark-color-scrollbar-border:#2d2d2d}*,:after,:before{box-sizing:inherit}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;margin:0}:host([data-theme=light]){--main-bg:var(--color-bg);--main-text:var(--color-text);--main-text-secondary:var(--color-text-secondary);--tc-secondary-text-color:var(--color-text-secondary);--main-border:var(--color-border);--main-overlay-bg:var(--color-overlay-bg);--main-shadow:var(--color-shadow);--main-primary:var(--color-primary);--main-primary-hover:var(--color-primary-hover);--main-primary-text:var(--color-primary-text);--main-toast-bg:var(--color-toast-bg);--main-toast-text:var(--color-toast-text);--main-textarea-bg:var(--color-textarea-bg);--main-textarea-border:var(--color-textarea-border);--main-tooltip-bg:var(--color-tooltip-bg);--main-tooltip-text:var(--color-tooltip-text);--main-disabled:#ccc;--main-disabled-text:#666;--main-line-number-text:var(--color-line-number-text);--main-line-number-active-text:var(--color-line-number-active-text);--tc-scrollbar-thumb-color:var(--color-scrollbar-thumb);--tc-scrollbar-thumb-hover-color:var(--color-scrollbar-thumb-hover);--tc-scrollbar-border-color:var(--color-scrollbar-border);--main-bg-a:hsla(0,0%,100%,.6)}:host([data-theme=dark]){--main-bg:var(--dark-color-bg);--main-text:var(--dark-color-text);--main-text-secondary:var(--dark-color-text-secondary);--tc-secondary-text-color:var(--dark-color-text-secondary);--main-border:var(--dark-color-border);--main-overlay-bg:var(--dark-color-overlay-bg);--main-shadow:var(--dark-color-shadow);--main-primary:var(--dark-color-primary);--main-primary-hover:var(--dark-color-primary-hover);--main-primary-text:var(--dark-color-primary-text);--main-toast-bg:var(--dark-color-toast-bg);--main-toast-text:var(--dark-color-toast-text);--main-textarea-bg:var(--dark-color-textarea-bg);--main-textarea-border:var(--dark-color-textarea-border);--main-tooltip-bg:var(--dark-color-tooltip-bg);--main-tooltip-text:var(--dark-color-tooltip-text);--main-disabled:#444;--main-disabled-text:#888;--main-line-number-text:var(--dark-color-line-number-text);--main-line-number-active-text:var(--dark-color-line-number-active-text);--tc-scrollbar-thumb-color:var(--dark-color-scrollbar-thumb);--tc-scrollbar-thumb-hover-color:var(--dark-color-scrollbar-thumb-hover);--tc-scrollbar-border-color:var(--dark-color-scrollbar-border);--main-bg-a:rgba(45,45,45,.6)}.ai-summary-panel{align-items:center;background:color-mix(in srgb,var(--main-primary) 5%,var(--main-bg));border:1px solid var(--main-border);border-radius:10px;column-gap:18px;display:none;flex:0 0 auto;flex-wrap:wrap;margin-bottom:10px;min-width:0;padding:8px 12px;row-gap:4px}.ai-summary-panel.is-visible{display:flex}.ai-output-tabs{display:none;gap:6px;margin-bottom:8px}.ai-output-tabs.is-visible{display:flex}.ai-output-tab{background:var(--main-bg);border:1px solid var(--main-border);border-radius:7px;color:var(--main-text-secondary);cursor:pointer;font:inherit;font-size:12px;padding:5px 11px}.ai-output-tab.is-active,.ai-output-tab:hover{background:color-mix(in srgb,var(--main-primary) 10%,var(--main-bg));border-color:var(--main-primary);color:var(--main-text)}.ai-output-tab.is-active{font-weight:700}.ai-summary-status{align-items:center;color:var(--main-text);display:flex;flex:0 0 auto;font-size:13px;font-weight:700;gap:12px;line-height:20px;min-height:22px;white-space:nowrap}.ai-status-dot{background:var(--main-disabled-text);border-radius:50%;flex:0 0 8px;height:8px;width:8px}.ai-status-dot.is-active{background:#22a559;box-shadow:0 0 0 3px color-mix(in srgb,#22a559 18%,transparent)}.ai-status-dot.is-paused{background:#d18b16;box-shadow:0 0 0 3px color-mix(in srgb,#d18b16 18%,transparent)}.ai-summary-counts{align-items:center;color:var(--main-text-secondary);display:flex;flex:1 1 auto;flex-wrap:wrap;min-width:0}.ai-count-badge{align-items:baseline;border-left:1px solid color-mix(in srgb,var(--main-border) 80%,transparent);color:var(--main-text-secondary);display:inline-flex;font-size:13px;gap:5px;line-height:18px;min-height:20px;padding:2px 10px;white-space:nowrap}.ai-count-badge:first-child{border-left:0;padding-left:0}.ai-count-label{white-space:nowrap}.ai-count-value{color:var(--main-text-secondary);font-size:13px;font-variant-numeric:tabular-nums;font-weight:700}.ai-count-pending.is-nonzero .ai-count-value{color:color-mix(in srgb,var(--main-primary) 88%,var(--main-text))}.ai-count-translated.is-nonzero .ai-count-value{color:color-mix(in srgb,#238b57 88%,var(--main-text))}.ai-count-review.is-nonzero .ai-count-value{color:color-mix(in srgb,#b45309 88%,var(--main-text))}.ai-count-failed.is-nonzero .ai-count-value{color:color-mix(in srgb,#c2413a 88%,var(--main-text))}.ai-summary-notice{border-top:1px solid color-mix(in srgb,var(--main-border) 72%,transparent);color:var(--main-text-secondary);flex:1 0 100%;font-size:13px;line-height:18px;margin-top:2px;padding-top:5px}.ai-summary-notice.is-processing{border-top:0;flex:0 1 auto;margin:0 0 0 auto;max-width:min(34%,280px);min-width:0;overflow:hidden;padding:0 0 0 12px;text-align:right;text-overflow:ellipsis;white-space:nowrap}.ai-summary-notice.is-error{color:color-mix(in srgb,#c2413a 88%,var(--main-text))}.ai-review-list{border-top:1px solid var(--main-border);flex:1 0 100%;margin-top:2px;padding-top:6px}.ai-review-list summary{cursor:pointer;font-weight:600}.ai-review-item{align-items:start;border-bottom:1px solid var(--main-border);display:grid;font-size:12px;gap:12px;grid-template-columns:minmax(0,2fr) minmax(120px,1fr) auto;padding:8px 0}.ai-review-source{overflow-wrap:anywhere}.ai-review-reason{color:var(--main-text-secondary)}.ai-review-actions{align-items:flex-start;display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}.ai-review-action{background:transparent;border:1px solid var(--main-border);border-radius:6px;color:var(--main-text);cursor:pointer;font:inherit;line-height:20px;min-height:30px;padding:4px 9px;transition:background-color .2s,border-color .2s,color .2s}.ai-review-action:hover{background-color:color-mix(in srgb,var(--main-primary) 10%,transparent);border-color:var(--main-primary)}.ai-review-action:focus-visible{outline:2px solid color-mix(in srgb,var(--main-primary) 72%,transparent);outline-offset:2px}.ai-review-remove-action{color:color-mix(in srgb,#c2413a 88%,var(--main-text))}.ai-review-action:disabled{cursor:not-allowed;opacity:.5}.ai-retry-btn,.ai-submit-btn{display:none}.ai-retry-btn.is-visible,.ai-submit-btn.is-visible{display:inline-flex}.ai-settings-mount{--ai-content-gap:20px}.ai-settings-controls,.ai-settings-mount{display:flex;flex-direction:column;gap:28px}.ai-settings-controls{filter:grayscale(0);opacity:1;transition:opacity .2s ease,filter .2s ease}.ai-settings-controls.is-disabled{cursor:not-allowed;filter:grayscale(.45);opacity:.42;pointer-events:none;user-select:none}.ai-settings-controls.is-disabled *{cursor:not-allowed}.ai-beta-badge{align-items:center;background:color-mix(in srgb,var(--main-warning,#d97706) 16%,transparent);border-radius:999px;color:var(--main-warning,#d97706);display:inline-flex;font-size:11px;font-weight:700;line-height:18px;margin-left:8px;padding:1px 8px;vertical-align:middle}.ai-settings-mount .ai-beta-notice{margin:0}.ai-settings-section{border-bottom:1px solid var(--main-border);padding:0 0 28px}.ai-settings-section:last-child{border-bottom:0;padding-bottom:4px}.ai-section-header{color:var(--main-text);font-size:17px;margin:0 0 18px}.ai-section-header svg{fill:currentColor;height:22px;width:22px}.ai-section-header .tc-icon-title-icon{flex-basis:22px;height:22px;width:22px}.ai-section-header .icon-title-text{line-height:22px}.ai-section-body{display:flex;flex-direction:column;gap:var(--ai-content-gap)}.ai-form-grid{display:grid;gap:18px 20px;grid-template-columns:repeat(2,minmax(0,1fr))}.ai-budget-grid,.ai-general-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.ai-field-wide{grid-column:1/-1}.ai-settings-mount .ai-number-field{align-items:stretch;display:flex;flex-direction:column;gap:8px}.ai-number-field .numeric-input{font-variant-numeric:tabular-nums;min-height:42px;padding:9px 12px;width:100%}.ai-provider-toolbar{align-items:end;display:flex;gap:16px}.ai-provider-picker{flex:1 1 340px}.ai-compact-actions{display:flex;flex:0 0 auto;gap:10px}.ai-provider-key-row{align-items:end;display:grid;gap:12px;grid-template-columns:minmax(0,1fr) auto auto}.ai-provider-test-description,.ai-style-description{margin:0}.ai-action-footer{align-items:center;border-top:1px solid color-mix(in srgb,var(--main-border) 72%,transparent);display:flex;gap:16px;justify-content:space-between;min-height:42px;padding-top:16px}.ai-action-footer-end{justify-content:flex-end}.ai-provider-status{color:var(--main-text-secondary);font-size:13px;line-height:1.5;min-width:0}.ai-provider-status[data-state=success]{color:#36a269}.ai-provider-status[data-state=error]{color:#d95757}.ai-provider-footer[hidden]{display:none}.ai-style-advanced-form{grid-template-columns:repeat(2,minmax(0,1fr))}.tc-disclosure.ai-style-advanced{background-color:color-mix(in srgb,var(--main-textarea-bg) 64%,var(--main-bg));border-color:var(--main-border);border-radius:12px}.ai-style-advanced .tc-disclosure-trigger{font-size:14px;min-height:48px;padding:12px 14px}.ai-style-advanced .tc-disclosure-trigger>.tc-icon-title{min-height:20px}.ai-style-advanced .tc-disclosure-content{background-color:color-mix(in srgb,var(--main-bg) 76%,transparent);padding:18px}.ai-style-toolbar,.ai-style-workspace{display:flex;flex-direction:column;gap:20px}.ai-style-workspace{align-items:start}.ai-style-editor,.ai-style-library{background-color:color-mix(in srgb,var(--main-textarea-bg) 64%,var(--main-bg));border:1px solid var(--main-border);border-radius:12px;min-width:0;padding:18px;width:100%}.ai-subsection-title{color:var(--main-text);font-size:14px;font-weight:700;margin-bottom:14px}.ai-subsection-title svg{fill:currentColor;height:19px;width:19px}.ai-style-list{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:10px;max-height:340px;min-height:180px;overflow-y:auto}.ai-style-row{align-items:center;background:transparent;border:0;border-bottom:1px solid var(--main-border);color:var(--main-text);cursor:pointer;display:flex;gap:10px;justify-content:space-between;min-height:48px;padding:10px 12px;text-align:left;transition:background-color .2s,color .2s,transform .15s;width:100%}.ai-style-row:hover{background:color-mix(in srgb,var(--main-primary) 8%,transparent)}.ai-style-row:active{transform:scale(.98)}.ai-style-row:focus-visible{outline:2px solid color-mix(in srgb,var(--main-primary) 72%,transparent);outline-offset:-2px;position:relative;z-index:1}.ai-style-row.is-active{background-color:color-mix(in srgb,var(--main-primary) 12%,var(--main-bg));color:var(--main-primary)}.ai-style-row>div{min-width:0}.ai-style-row .icon-title-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ai-style-row svg{fill:currentColor;flex:0 0 auto;height:18px;width:18px}.ai-style-row-meta{color:var(--main-text-secondary);flex:0 0 auto;font-size:11px}.ai-style-empty{color:var(--main-text-secondary);display:grid;font-size:13px;min-height:180px;padding:20px;place-items:center;text-align:center}.ai-style-library-footer{display:flex;justify-content:flex-end;margin-top:14px}.ai-style-actions{flex-wrap:wrap;justify-content:flex-end}@media (max-width:1100px){.ai-budget-grid,.ai-general-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ai-style-list{max-height:220px}}@media (max-width:700px){.ai-summary-panel{row-gap:2px}.ai-summary-notice.is-processing{border-top:1px solid color-mix(in srgb,var(--main-border) 72%,transparent);flex-basis:100%;margin-left:0;max-width:none;padding:4px 0 0;text-align:left}.ai-settings-mount{gap:24px}.ai-budget-grid,.ai-form-grid,.ai-general-grid,.ai-review-item{grid-template-columns:1fr}.ai-review-actions{justify-content:flex-start}.ai-style-advanced-form{grid-template-columns:1fr}.ai-provider-toolbar{align-items:stretch;flex-direction:column}.ai-provider-key-row{grid-template-columns:1fr}.ai-provider-picker{flex-basis:auto}.ai-action-footer{align-items:stretch;flex-direction:column}.ai-compact-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.ai-action-footer-end,.ai-style-actions{align-items:flex-end}.ai-style-editor,.ai-style-library{padding:16px}.text-extractor-modal-footer{align-items:flex-start;flex-direction:column;gap:10px}}@media (max-width:450px){.ai-compact-actions{grid-template-columns:1fr}}@media (prefers-reduced-motion:reduce){.ai-style-row{transition:none}}.confirmation-modal-overlay{align-items:center;background-color:var(--main-overlay-bg);display:flex;height:100%;justify-content:center;left:0;opacity:0;pointer-events:none;position:fixed;top:0;transition:opacity .3s ease,visibility .3s ease;visibility:hidden;width:100%;z-index:2147483647}.confirmation-modal-overlay.is-visible{opacity:1;pointer-events:auto;visibility:visible}.confirmation-modal-content{background-color:var(--main-bg);border-radius:16px;box-shadow:0 10px 30px var(--main-shadow);color:var(--main-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;padding:30px;text-align:center;transform:scale(.95);transition:transform .3s ease;width:400px}.confirmation-modal-overlay.is-visible .confirmation-modal-content{transform:scale(1)}.confirmation-modal-icon{margin-bottom:20px}.confirmation-modal-icon svg{fill:var(--main-text);height:56px;width:56px}.confirmation-modal-text{font-size:16px;line-height:1.6;margin:0 0 25px}.confirmation-modal-buttons{display:flex;gap:15px;justify-content:center}.confirmation-modal-button{border:none;border-radius:9999px;cursor:pointer;font-size:14px;font-weight:700;padding:12px 24px;transition:background-color .2s ease,transform .2s ease}.confirmation-modal-button.confirm{background-color:var(--main-primary);color:var(--main-primary-text)}.confirmation-modal-button.confirm:hover{background-color:var(--main-primary-hover)}.confirmation-modal-button.cancel{background-color:transparent;border:1px solid var(--main-border);color:var(--main-text)}.confirmation-modal-button.cancel:hover{background-color:var(--main-shadow)}.counter-with-help-container{align-items:center;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background-color:var(--main-bg-a);border:1px solid var(--main-border);border-radius:24px;box-shadow:var(--main-shadow);box-sizing:border-box;display:flex;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;gap:12px;height:42px;left:50%;opacity:0;padding:8px 12px;pointer-events:all;position:fixed;top:20px;transform:translate(-50%,-150%);transition:transform .4s var(--easing-standard,cubic-bezier(.4,0,.2,1)),opacity .4s var(--easing-standard,cubic-bezier(.4,0,.2,1));z-index:2147483645}.counter-with-help-container.is-visible{opacity:1;transform:translate(-50%)}.counter-with-help-separator{background-color:var(--main-border);height:16px;width:1px}.counter-with-help-container .tc-icon-button,.counter-with-help-container .tc-top-center-counter{backdrop-filter:none;-webkit-backdrop-filter:none;background-color:transparent;border:none;box-shadow:none;margin:0;opacity:1;padding:0;position:static;transform:none;transition:none}.counter-with-help-container .tc-icon-button{align-items:center;border-radius:50%;color:var(--main-text-secondary);display:flex;height:32px;justify-content:center;position:relative;transition:color .2s,background-color .2s;width:32px}.counter-with-help-container .tc-icon-button:hover{background-color:var(--main-border);color:var(--main-text)}.counter-with-help-container .tc-icon-button svg{fill:currentColor;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:opacity .3s ease-in-out;width:20px}.counter-actions-container{align-items:center;display:flex;gap:4px}.counter-with-help-container .tc-top-center-counter{font-size:14px;font-weight:500;margin-left:9px}.counter-with-help-container .tc-top-center-counter span{color:var(--main-primary);font-size:16px;font-weight:700;margin-left:6px;margin-right:2px}.custom-select-container{position:relative;user-select:none;width:100%}.custom-select-trigger{align-items:center;background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:12px;box-sizing:border-box;color:var(--main-text);cursor:pointer;display:flex;font-size:15px;font-weight:500;gap:12px;justify-content:space-between;min-height:42px;padding:7px 10px;transition:border-color .2s,box-shadow .2s}.selected-option-content{align-items:center;display:flex;flex:1 1 auto;min-width:0}.custom-select-option>.tc-icon-title,.selected-option-content>.tc-icon-title{align-items:center;line-height:20px;min-height:20px}.selected-option-content>.tc-icon-title{width:100%}.custom-select-option .icon-title-text,.custom-select-trigger .icon-title-text{line-height:20px}.custom-select-trigger:focus-visible{outline:2px solid color-mix(in srgb,var(--main-primary) 72%,transparent);outline-offset:2px}.custom-select-trigger:hover{border-color:var(--main-primary);box-shadow:0 0 0 2px rgba(30,144,255,.1)}.custom-select-container.open .custom-select-trigger{border-color:var(--main-primary);box-shadow:0 0 0 2px rgba(30,144,255,.2)}.custom-select-arrow{align-items:center;display:flex;flex:0 0 20px;height:20px;justify-content:center;transform-origin:center;transition:transform .3s ease;width:20px}.custom-select-container.open .custom-select-arrow{transform:rotate(180deg)}.custom-select-options{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:12px;box-shadow:0 4px 12px var(--main-shadow);left:0;max-height:0;opacity:0;overflow:hidden;position:absolute;right:0;top:calc(100% + 4px);transition:max-height .2s ease-out,opacity .2s ease-out,visibility 0s .2s;visibility:hidden;z-index:2147483647}.custom-select-container.open .custom-select-options{max-height:200px;opacity:1;transition:max-height .2s ease-out,opacity .2s ease-out;visibility:visible}.custom-select-option{align-items:center;cursor:pointer;display:flex;gap:8px;min-height:40px;padding:8px 12px;transition:background-color .2s}.custom-select-option svg,.custom-select-trigger svg{display:block;fill:currentColor;height:20px;width:20px}.custom-select-arrow svg{height:18px;width:18px}.custom-select-option:hover{background-color:var(--main-border)}.custom-select-option.selected{color:var(--main-primary);font-weight:600}.custom-select-option .option-icon,.custom-slider-container{align-items:center;display:flex}.custom-slider-container{flex-direction:column;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;width:100%}.custom-slider-info-text{color:var(--main-text-secondary);font-size:15px;font-weight:500;margin:12px 0 0}.custom-slider-wrapper{align-items:center;display:flex;gap:8px;height:20px;margin:5px 0;width:100%}.custom-slider-label{color:var(--main-text-secondary);font-size:12px;user-select:none;white-space:nowrap}.custom-slider-track{background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:4px;cursor:pointer;flex-grow:1;height:8px;position:relative}.custom-slider-ticks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;left:0;padding:0 4px;pointer-events:none;position:absolute;right:0}.custom-slider-tick{background-color:var(--main-border);border-radius:50%;height:4px;width:4px}.custom-slider-thumb{background-color:var(--main-primary);border:2px solid var(--main-bg);border-radius:50%;box-shadow:0 2px 4px var(--main-shadow);cursor:grab;height:18px;position:absolute;top:50%;transform:translateY(-50%);transition:transform .1s ease-out,left .1s ease-out;width:18px;will-change:transform,left}.custom-slider-thumb:hover{transform:translateY(-50%) scale(1.1)}.custom-slider-thumb.is-dragging{cursor:grabbing;transform:translateY(-50%) scale(1.2)}.tc-dropdown-menu{animation:slide-up-fade-in .3s ease forwards;background-color:var(--color-bg);border:1px solid var(--color-border);border-radius:16px;bottom:calc(100% + 8px);box-shadow:0 5px 15px var(--main-shadow);display:none;min-width:100%;overflow:hidden;position:absolute;right:51%;width:max-content;z-index:2147483647}.tc-dropdown-menu.visible{display:block}.tc-dropdown-menu button{align-items:center;background-color:transparent;border:none;color:var(--main-text);cursor:pointer;display:flex;font-size:14px;gap:12px;padding:10px 16px;text-align:left;transition:background-color .2s ease;width:100%}.tc-dropdown-menu button:hover{background-color:#f0f0f0}:host([data-theme=dark]) .tc-dropdown-menu{background-color:var(--dark-color-bg);border-color:var(--dark-color-border)}:host([data-theme=dark]) .tc-dropdown-menu button:hover{background-color:hsla(0,0%,100%,.1)}.tc-export-btn-container{position:relative}@keyframes slide-up-fade-in{0%{opacity:0;transform:translateY(10px) translateX(50%)}to{opacity:1;transform:translateY(0) translateX(50%)}}@keyframes slide-down-fade-out{0%{opacity:1;transform:translateY(0) translateX(50%)}to{opacity:0;transform:translateY(10px) translateX(50%)}}.tc-dropdown-menu.is-hiding{animation:slide-down-fade-out .3s ease forwards}#element-scan-container{opacity:0;pointer-events:none;position:absolute;transition:all .2s cubic-bezier(.19,1,.22,1),opacity .2s ease-in-out,visibility 0s linear .2s;visibility:hidden;z-index:2147483644}#element-scan-highlight-border{background-color:rgba(52,152,219,.2);border:4px solid #3498db;border-radius:6px 6px 6px 0;box-sizing:border-box;height:100%;width:100%}#element-scan-tag-name{background-color:#3498db;border-radius:0 0 6px 6px;color:#fff;font-size:12px;left:0;padding:4px 8px;position:absolute;top:100%;transition:background-color .1s ease-out,opacity .2s ease-out;white-space:nowrap;z-index:1}#element-scan-tag-name,#element-scan-toolbar{font-family:Menlo,Monaco,Cascadia Code,PingFang SC;pointer-events:auto}#element-scan-toolbar{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:20px;box-shadow:0 4px 12px rgba(0,0,0,.15);cursor:move;display:flex;flex-direction:column;opacity:0;padding:16px;position:fixed;transform:scale(.95);transition:opacity .2s cubic-bezier(.19,1,.22,1),transform .2s cubic-bezier(.19,1,.22,1),visibility 0s linear .2s;visibility:hidden;width:fit-content;z-index:2147483645}#element-scan-container.is-visible,#element-scan-toolbar.is-visible{opacity:1;transform:scale(1);transition-delay:0s;visibility:visible}#element-scan-toolbar-tag,#element-scan-toolbar-title,.custom-slider-info-text{user-select:none}#element-scan-toolbar-title{font-size:20px;margin-bottom:16px}#element-scan-toolbar-tag,#element-scan-toolbar-title{color:var(--main-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-weight:700;text-align:center}#element-scan-toolbar-tag{border-radius:4px;font-size:14px;padding:0 8px;transition:opacity .1s ease-in-out}#element-scan-slider-container{min-width:380px}#element-scan-level-slider{width:100%}#element-scan-toolbar-actions{display:flex;gap:6px;justify-content:space-between;white-space:nowrap}#element-scan-toolbar-actions button{align-items:center;border:none;border-radius:20px;color:var(--main-primary-text);cursor:pointer;display:flex;flex-grow:1;font-size:15px;gap:6px;justify-content:center;margin:6px 0 0;padding:10px 16px;transition:background-color .1s ease-in-out,transform .1s ease-in-out}#element-scan-toolbar-actions button:active{transform:scale(.95)}#element-scan-toolbar-confirm:hover{background-color:#27ae60}#element-scan-toolbar-confirm{background-color:#2ecc71}#element-scan-toolbar-cancel:hover{background-color:#c0392b}#element-scan-toolbar-cancel{background-color:#e74c3c}#element-scan-toolbar-reselect{background-color:var(--main-primary)}#element-scan-toolbar-reselect:hover{background-color:var(--main-primary-hover)}#element-scan-toolbar-stage:hover{background-color:#7f8c8d}#element-scan-toolbar-stage{background-color:#95a5a6}.text-extractor-fab.is-recording{animation:tc-breathing 2s ease-in-out infinite;background-color:#f39c12}.text-extractor-fab.is-recording:hover{background-color:#e67e22}@keyframes scan-pulse{0%{box-shadow:0 0 0 0 rgba(243,156,18,.7)}50%{box-shadow:0 0 0 4px rgba(243,156,18,.5)}to{box-shadow:0 0 0 10px rgba(243,156,18,0)}}@keyframes scan-confirm-flash{0%{box-shadow:0 0 0 0 rgba(46,204,113,.7)}50%{box-shadow:0 0 0 4px rgba(46,204,113,.5)}to{box-shadow:0 0 0 10px rgba(46,204,113,0)}}#element-scan-container.is-locked #element-scan-highlight-border{animation:scan-pulse .5s cubic-bezier(.25,.8,.25,1);background-color:rgba(243,156,18,.1);border-color:#f39c12}#element-scan-container.is-confirmed #element-scan-highlight-border{animation:scan-confirm-flash .5s cubic-bezier(.25,.8,.25,1) forwards;background-color:rgba(46,204,113,.1);border-color:#2ecc71}#element-scan-container.is-confirmed #element-scan-tag-name{opacity:0;transition:opacity .2s ease-out}#element-scan-container.is-error #element-scan-highlight-border{animation:scan-error-pulse .5s cubic-bezier(.25,.8,.25,1)}@keyframes scan-error-pulse{0%{box-shadow:0 0 0 0 rgba(231,76,60,.7);transform:scale(1)}50%{box-shadow:0 0 0 4px rgba(231,76,60,.5);transform:scale(1.03)}to{box-shadow:0 0 0 10px rgba(231,76,60,0);transform:scale(1)}}#element-scan-container.is-error #element-scan-highlight-border{animation:scan-error-pulse .6s cubic-bezier(.25,.8,.25,1);background-color:rgba(231,76,60,.1);border-color:#e74c3c}#element-scan-container.is-locked #element-scan-tag-name{background-color:#f39c12}#element-scan-container.is-error #element-scan-tag-name{background-color:#e74c3c}#element-scan-container.is-confirmed #element-scan-tag-name{background-color:#2ecc71}.fab-position-top-right{transform:translate(-30px,30px)}.fab-position-bottom-right{transform:translate(-30px,calc(100vh - 100% - 30px))}.fab-position-top-left{transform:translate(calc(-100vw + 100% + 30px + var(--scrollbar-width)),30px)}.fab-position-bottom-left{transform:translate(calc(-100vw + 100% + 30px + var(--scrollbar-width)),calc(100vh - 100% - 30px))}.code-preview{align-items:center;display:flex;height:100%;justify-content:center;padding:10px;width:100%}.code-preview .wrapper-bracket,.code-preview .wrapper-indent{display:inline;opacity:1;transition:opacity .2s ease-in-out}.code-preview.hide-brackets .wrapper-bracket,.code-preview.hide-brackets .wrapper-indent{opacity:0}.code-text-preview{color:var(--main-text-secondary);font-family:Menlo,Monaco,Consolas,Courier New,monospace;font-size:14px;line-height:1.4;overflow:hidden;text-align:left;white-space:nowrap}.image-card-option.selected .code-text-preview{color:var(--main-text)}.code-text-preview .punct{color:var(--main-text-secondary);font-weight:700}.code-text-preview .str{color:var(--main-primary)}.image-card-option.selected .code-text-preview .punct{color:var(--main-text)}.tc-button{background-color:var(--main-primary);border:none;border-radius:999px;color:var(--main-primary-text);cursor:pointer;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:16px;font-weight:500;justify-content:center;line-height:1;min-height:42px;padding:10px 20px;touch-action:manipulation;transition:background-color .2s,transform .15s,box-shadow .2s}.tc-button,.tc-icon-title{align-items:center;display:inline-flex}.tc-icon-title{gap:8px;line-height:20px;min-width:0}.tc-icon-title-icon{align-items:center;display:inline-flex;flex:0 0 20px;height:20px;justify-content:center;width:20px}.tc-icon-title-icon svg{display:block;fill:currentColor;height:100%;width:100%}.icon-title-text{display:block;line-height:20px;min-width:0}.tc-button>.tc-icon-title{line-height:20px;min-height:20px;white-space:nowrap}.tc-button svg{display:block;fill:currentColor;flex:0 0 auto;height:20px;width:20px}.tc-icon-title-icon svg.is-icon-entering,.tc-icon-title-icon svg.is-icon-leaving{inset:0;position:absolute;transition:opacity .2s ease}.tc-icon-title-icon.is-changing{position:relative}.tc-button:focus-visible{outline:2px solid color-mix(in srgb,var(--main-primary) 72%,transparent);outline-offset:2px}.tc-button:hover{background-color:var(--main-primary-hover);box-shadow:0 2px 8px rgba(0,0,0,.15)}.tc-button:active{transform:scale(.97)}.tc-button:disabled{background-color:var(--main-disabled);box-shadow:none;color:var(--main-disabled-text);cursor:not-allowed}.tc-toggle-setting{align-items:center;background:var(--main-bg);border:1px solid var(--main-border);border-radius:12px;color:var(--main-text);cursor:pointer;display:grid;gap:20px;grid-template-columns:minmax(0,1fr) auto;min-height:72px;padding:14px 16px}.tc-toggle-copy{display:flex;flex-direction:column;gap:5px;min-width:0}.tc-toggle-title{font-size:15px;font-weight:700}.tc-toggle-description{color:var(--main-text-secondary);font-size:13px;line-height:1.5}.tc-toggle-input{height:1px;opacity:0;pointer-events:none;position:absolute;width:1px}.tc-toggle-control{background:var(--main-disabled);border-radius:999px;height:26px;position:relative;transition:background-color .2s,box-shadow .2s;width:48px}.tc-toggle-control:after{background:var(--main-primary-text);border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.28);content:"";height:20px;left:3px;position:absolute;top:3px;transition:transform .2s;width:20px}.tc-toggle-input:checked+.tc-toggle-control{background:var(--main-primary)}.tc-toggle-input:checked+.tc-toggle-control:after{transform:translateX(22px)}.tc-toggle-input:focus-visible+.tc-toggle-control{box-shadow:0 0 0 3px color-mix(in srgb,var(--main-primary) 25%,transparent)}.tc-disclosure{background:var(--main-bg);border:1px solid var(--main-border);border-radius:10px;overflow:hidden}.tc-disclosure-trigger{align-items:center;background:transparent;border:0;color:var(--main-text);cursor:pointer;display:flex;font-size:14px;font-weight:700;gap:16px;justify-content:space-between;min-height:44px;padding:10px 14px;text-align:left;width:100%}.tc-disclosure-trigger:hover{background:color-mix(in srgb,var(--main-primary) 7%,transparent)}.tc-disclosure-trigger:focus-visible{outline:2px solid color-mix(in srgb,var(--main-primary) 72%,transparent);outline-offset:-2px}.tc-disclosure-arrow{display:grid;flex:0 0 20px;height:20px;place-items:center;transition:transform .2s ease;width:20px}.tc-disclosure-arrow svg{display:block;fill:currentColor;height:20px;width:20px}.tc-disclosure-trigger[aria-expanded=true] .tc-disclosure-arrow{transform:rotate(180deg)}.tc-disclosure-content{border-top:1px solid var(--main-border);padding:16px}.tc-disclosure-content[hidden]{display:none}.tc-field-group{display:flex;flex-direction:column;gap:8px;min-width:0}.numeric-input-label,.tc-field-label{color:var(--main-text);font-size:14px;font-weight:600;line-height:1.4}.tc-text-input{background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:10px;color:var(--main-text);font-family:inherit;font-size:14px;line-height:1.45;min-height:42px;padding:9px 12px;transition:border-color .2s,box-shadow .2s;width:100%}.tc-text-input:hover{border-color:color-mix(in srgb,var(--main-primary) 60%,var(--main-textarea-border))}.tc-text-input:focus{border-color:var(--main-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--main-primary) 18%,transparent);outline:none}.tc-text-input-multiline{min-height:104px;resize:vertical}.tc-textarea{background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:8px;box-sizing:border-box;color:var(--main-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;height:100%;line-height:1.5;padding:12px 18px 12px 12px;resize:none;width:100%}.tc-textarea:focus{outline:none}.tc-textarea::-webkit-scrollbar-thumb{background-color:var(--main-border)}.tc-textarea::-webkit-scrollbar-thumb:hover{background-color:var(--main-primary)}.tc-textarea::-webkit-scrollbar-button{display:none}.tc-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--main-textarea-bg);background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath d='M8 11 2 5h12z'/%3E%3C/svg%3E");background-position:right 12px center;background-repeat:no-repeat;background-size:12px;border:1px solid var(--main-textarea-border);border-radius:8px;color:var(--main-text);cursor:pointer;display:block;font-size:14px;padding:10px 36px 10px 12px;transition:border-color .2s,box-shadow .2s;width:100%}.tc-select:hover{border-color:var(--main-primary);box-shadow:0 0 0 2px var(--main-primary-hover-bg,rgba(30,144,255,.1))}.info-tooltip-overlay{align-items:center;background-color:var(--main-overlay-bg);display:flex;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;height:100%;justify-content:center;left:0;opacity:0;outline:none;pointer-events:none;position:fixed;top:0;transition:opacity .3s ease,visibility .3s;visibility:hidden;width:100%;z-index:2147483647}.info-tooltip-overlay.is-visible{opacity:1;pointer-events:auto;visibility:visible}.info-tooltip-modal{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:16px;box-shadow:0 5px 15px var(--main-shadow);color:var(--main-text);display:flex;flex-direction:column;max-height:80vh;max-width:80vw;overflow:hidden;padding:0;position:relative;transform:scale(.95);transition:transform .3s ease;width:480px}.info-tooltip-overlay.is-visible .info-tooltip-modal{transform:scale(1)}.info-tooltip-header{align-items:center;border-bottom:1px solid var(--main-border);display:flex;justify-content:space-between;padding:20px}.info-tooltip-title-container{align-items:center;display:flex;gap:10px}.info-tooltip-title-icon{color:var(--secondary-text);height:20px;width:20px}.info-tooltip-title{font-size:18px;font-weight:700;margin:0}.info-tooltip-close{align-items:center;background-color:transparent;border-radius:50%;color:var(--main-text);cursor:pointer;display:flex;height:32px;justify-content:center;transition:background-color .2s,transform .15s;width:32px}.info-tooltip-close:hover{background-color:var(--main-border)}.info-tooltip-close:active{transform:scale(.9)}.info-tooltip-close svg{height:18px;width:18px}.info-tooltip-content{overflow-y:auto;padding:24px}.info-tooltip-content p{font-size:16px;line-height:1.7;margin:0 0 15px}.info-tooltip-content p:last-child{margin-bottom:0}.info-tooltip-content strong{color:var(--primary-accent);font-weight:600}.info-tooltip-image{animation:fadeIn .3s forwards;border-radius:8px;display:block;height:auto;margin-left:auto;margin-right:auto;margin-top:10px;max-width:100%;opacity:0}.info-icon{align-items:center;border-radius:50%;color:var(--secondary-text);cursor:pointer;display:inline-flex;height:20px;justify-content:center;margin-left:8px;transition:background-color .2s,color .2s;vertical-align:text-bottom;width:20px}.info-icon:hover{background-color:var(--main-border);color:var(--primary-accent)}.info-icon svg{height:16px;width:16px}kbd{background-color:var(--main-bg);border:solid var(--main-border);border-radius:4px;border-width:1px 1px 3px;box-shadow:0 1px 1px var(--main-shadow);color:var(--main-text);display:inline-block;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:.85em;font-weight:700;line-height:1;margin:0 5px;padding:3px 6px;position:relative;top:-3px;vertical-align:baseline;white-space:nowrap}.gm-loading-overlay{align-items:center;background-color:hsla(0,0%,50%,.2);display:flex;height:100%;justify-content:center;left:0;opacity:0;position:absolute;top:0;transition:opacity .2s,visibility .2s;visibility:hidden;width:100%;z-index:10}.gm-loading-overlay.is-visible{opacity:1;visibility:visible}.gm-loading-spinner svg{color:var(--color-icon);height:48px;width:48px}.text-extractor-fab-container{align-items:center;display:flex;flex-direction:column;gap:0;opacity:0;pointer-events:none;position:fixed;right:0;top:0;transform-origin:top right;transition:opacity .3s ease,visibility .3s,transform .3s ease-in-out;visibility:hidden;z-index:2147483645}.text-extractor-fab-container.fab-container-visible{opacity:1;visibility:visible}.text-extractor-fab{align-items:center;background-color:var(--main-primary);border:1px solid var(--main-border);border-radius:50%;box-shadow:0 4px 8px var(--main-shadow);box-sizing:border-box;color:var(--main-primary-text);cursor:pointer;display:flex;flex:0 0 auto;height:56px;justify-content:center;margin-top:12px;max-height:56px;overflow:hidden;pointer-events:auto;position:relative;transform-origin:center;transition:background-color .3s,height .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),max-height .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),margin-top .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),opacity .2s ease,transform .2s,box-shadow .3s,color .3s,visibility 0s;width:56px}.text-extractor-fab:first-child{margin-top:0}.text-extractor-fab:hover{background-color:var(--main-primary-hover);box-shadow:0 6px 12px var(--main-shadow);transform:scale(1.05)}.text-extractor-fab.fab-feature-hidden{border-width:0;height:0;margin-top:0;max-height:0;opacity:0;pointer-events:none;transform:scale(.72);transition:height .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),max-height .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),margin-top .3s var(--easing-standard,cubic-bezier(.4,0,.2,1)),opacity .18s ease,transform .2s ease,visibility 0s .3s;visibility:hidden}.text-extractor-fab:active{transform:scale(.95);transition-duration:.1s}.text-extractor-fab svg{fill:currentColor;height:26px;width:26px}.text-extractor-modal-overlay{align-items:center;background-color:var(--main-overlay-bg);display:flex;height:100%;justify-content:center;left:0;opacity:0;outline:none;pointer-events:none;position:fixed;top:0;transition:opacity .3s ease,visibility .3s;visibility:hidden;width:100%;z-index:2147483646}.text-extractor-modal-overlay.is-visible{opacity:1;pointer-events:auto;visibility:visible}.text-extractor-modal{background-color:var(--main-bg);border-radius:16px;box-shadow:0 5px 15px var(--main-shadow);color:var(--main-text);display:flex;flex-direction:column;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;height:min(760px,calc(100vh - 56px));max-height:90vh;max-width:960px;transform:scale(.95);transition:transform .3s ease;width:min(960px,calc(100vw - 40px))}.text-extractor-modal-overlay.is-visible .text-extractor-modal{transform:scale(1)}.text-extractor-modal-header{align-items:center;border-bottom:1px solid var(--main-border);color:var(--main-text);display:flex;font-size:18px;font-weight:700;justify-content:space-between;padding:18px}#main-modal-title-container{align-items:center;display:flex;min-height:32px;min-width:0}#main-modal-title-container>.tc-icon-title{gap:10px;min-height:32px}#main-modal-title-container .tc-icon-title-icon{flex-basis:24px;height:24px;width:24px}#main-modal-title-container>.tc-icon-title>.icon-title-text{line-height:24px}.tc-close-button{align-items:center;background-color:transparent;border:0;border-radius:50%;color:var(--main-text);cursor:pointer;display:flex;flex:0 0 32px;height:32px;justify-content:center;line-height:0;padding:0;transition:background-color .2s,transform .15s;width:32px}.tc-close-button svg{display:block;fill:currentColor;height:24px;width:24px}.tc-close-button:active,.tc-close-button:hover{background-color:var(--main-border)}.tc-close-button:active{transform:scale(.9)}.text-extractor-modal-content{display:flex;flex-direction:column;flex-grow:1;overflow-y:auto;padding:18px;position:relative}.tc-textarea-container{box-sizing:border-box;flex:1;height:100%;min-height:0;opacity:0;transition:opacity .2s ease-in-out,visibility .2s ease-in-out;visibility:hidden;width:100%}.tc-textarea-container.is-visible{opacity:1;visibility:visible}.text-extractor-modal-footer{align-items:center;border-top:1px solid var(--main-border);display:flex;justify-content:space-between;padding:18px}.tc-footer-buttons{align-items:center;display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}@keyframes tc-breathing{0%{box-shadow:0 4px 8px var(--main-shadow),0 0 0 0 rgba(243,156,18,.4)}70%{box-shadow:0 4px 12px var(--main-shadow),0 0 0 10px rgba(243,156,18,0)}to{box-shadow:0 4px 8px var(--main-shadow),0 0 0 0 rgba(243,156,18,0)}}#scan-count-display{align-items:center;color:var(--tc-secondary-text-color);display:flex;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;line-height:20px;margin-left:2px;min-height:20px;opacity:0;transition:opacity .3s ease-in-out}.header-right-controls{align-items:center;display:flex;min-height:32px}@media (prefers-reduced-motion:reduce){.text-extractor-fab,.text-extractor-fab-container,.text-extractor-fab.fab-feature-hidden{transition-duration:.01ms}}#scan-count-display.is-visible{opacity:1}.text-extractor-fab-container.fab-container-visible .text-extractor-fab.fab-disabled{background-color:var(--main-disabled);box-shadow:none;color:var(--main-disabled-text);cursor:not-allowed;transform:none}.tc-help-icon-button{align-items:center;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background-color:var(--main-bg-a);border:1px solid var(--main-border);border-radius:50%;box-shadow:var(--main-shadow);color:var(--main-text-secondary);cursor:pointer;display:flex;justify-content:center;padding:0;transition:color .2s,transform .2s,background-color .2s}.tc-help-icon-button:hover{background-color:var(--main-border);color:var(--main-text)}.tc-help-icon-button svg{height:20px;width:20px}.action-key{background-color:var(--main-bg);border:solid var(--main-border);border-radius:4px;border-width:1px 1px 3px;box-shadow:0 1px 1px var(--main-shadow);color:var(--main-text);display:inline-block;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:.85em;font-weight:700;line-height:1;margin:0 5px;padding:3px 6px;position:relative;top:-3px;vertical-align:baseline;white-space:nowrap}.tc-textarea-container{border:1px solid var(--main-textarea-border);border-radius:8px;display:flex;flex-grow:1;overflow:hidden;position:relative}.tc-line-numbers{background-color:var(--tc-secondary-bg-color);border-right:1px solid var(--tc-border-color);box-sizing:border-box;color:var(--main-line-number-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;line-height:1.5;margin-right:0;max-width:0;opacity:0;overflow:hidden;padding:10px 0 8px;text-align:right;transition:max-width .3s ease,opacity .3s ease,padding .3s ease,margin-right .3s ease;user-select:none;width:var(--line-number-width,40px)}.tc-line-numbers>div{box-sizing:border-box;padding:0 4px;transition:color .2s ease-in-out;white-space:nowrap}.tc-line-numbers>div.is-active{color:var(--main-line-number-active-text);font-weight:700}.tc-textarea-container .tc-textarea{border:none;border-radius:0;box-sizing:border-box;flex-grow:1;font-size:14px;line-height:1.5;padding:10px 10px 8px;resize:none;scrollbar-gutter:stable}.tc-textarea-container .tc-textarea:focus{box-shadow:none;outline:none}.tc-textarea.word-wrap-disabled{overflow-x:auto;white-space:pre}.tc-line-numbers.is-visible{margin-right:4px;max-width:var(--line-number-width,40px);opacity:1;padding:10px 4px}.tc-stats-container{align-items:center;color:var(--tc-secondary-text-color);display:flex;flex-grow:1;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;opacity:0;transition:opacity .3s ease,visibility .3s ease;visibility:hidden}.tc-stats-container.is-visible{opacity:1;visibility:visible}.tc-textarea::-webkit-scrollbar{height:6px;width:6px}.tc-textarea::-webkit-scrollbar-track{background:transparent}.tc-textarea::-webkit-scrollbar-thumb{background:var(--tc-scrollbar-thumb-color);border:1px solid var(--tc-scrollbar-border-color);border-radius:3px}.tc-textarea::-webkit-scrollbar-thumb:hover{background:var(--tc-scrollbar-thumb-hover-color)}@keyframes line-number-enter{0%{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}.line-number-enter-active{animation:line-number-enter .2s ease-out}.tc-notification-container{display:flex;flex-direction:column;gap:10px;pointer-events:none;position:fixed;right:20px;top:20px;z-index:2147483647}.tc-notification{align-items:center;background-color:var(--main-bg,#fff);border:1px solid var(--main-border,#eee);border-radius:16px;box-shadow:0 4px 12px var(--main-shadow,rgba(0,0,0,.15));color:var(--main-text,#333);display:flex;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;opacity:0;padding:12px 16px;pointer-events:auto;transform:translateX(100%);transition:opacity .5s ease,transform .5s ease,box-shadow .3s;width:320px}.tc-notification-visible{opacity:1;transform:translateX(0)}.tc-notification:hover{box-shadow:0 6px 16px var(--main-shadow,rgba(0,0,0,.2))}.tc-notification-icon{align-items:center;display:flex;margin-right:12px}.tc-notification-icon svg{height:20px;width:20px}.tc-notification-info .tc-notification-icon{color:#3498db}.tc-notification-success .tc-notification-icon{color:#2ecc71}.tc-notification-content{flex-grow:1;font-size:14px;line-height:1.4}.tc-notification-close{cursor:pointer;opacity:.6;padding:4px;transition:opacity .3s}.tc-notification-close:hover{opacity:1}.tc-notification-close svg{height:16px;stroke:var(--main-text,#333);width:16px}.tc-notification-fade-out{opacity:0;transform:translateX(100%)}#modal-placeholder{align-items:center;box-sizing:border-box;color:var(--text-color-secondary);display:flex;flex-direction:column;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;height:100%;justify-content:center;left:0;opacity:0;padding:20px;position:absolute;text-align:center;top:0;transition:opacity .2s ease-in-out,visibility .2s ease-in-out;visibility:hidden;width:100%}#modal-placeholder.is-visible{opacity:1;visibility:visible}.placeholder-icon{color:var(--text-color-secondary)}.placeholder-icon svg{height:48px;width:48px}#modal-placeholder p{font-size:14px;margin:4px 0}.placeholder-actions{align-items:center;color:var(--text-color-primary);display:flex;gap:6px}.placeholder-action-icon svg{fill:currentColor;height:18px;vertical-align:middle;width:18px}#modal-placeholder strong{font-weight:600}.settings-panel-overlay{align-items:center;background-color:var(--main-overlay-bg);display:flex;height:100%;justify-content:center;left:0;opacity:0;outline:none;pointer-events:none;position:fixed;top:0;transition:opacity .3s ease,visibility .3s;visibility:hidden;width:100%;z-index:2147483648}.settings-panel-overlay.is-visible{opacity:1;pointer-events:auto;visibility:visible}.settings-panel-modal{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:16px;box-shadow:0 5px 15px var(--main-shadow);color:var(--main-text);display:flex;flex-direction:column;font-family:Menlo,Monaco,Cascadia Code,PingFang SC;height:min(760px,calc(100vh - 56px));max-height:90vh;max-width:1040px;overflow:hidden;overscroll-behavior:contain;transform:scale(.95);transition:transform .3s ease;width:min(1040px,calc(100vw - 48px))}.settings-panel-content{flex-grow:1;overflow-y:auto;padding:20px}.settings-panel-overlay.is-visible .settings-panel-modal{transform:scale(1)}.settings-panel-header{align-items:center;border-bottom:1px solid var(--main-border);display:flex;flex-shrink:0;font-size:18px;font-weight:700;justify-content:space-between;padding:16px 20px}#contextual-settings-title-container,#settings-panel-title-container{align-items:center;display:flex;min-height:32px;min-width:0}#contextual-settings-title-container>.tc-icon-title,#settings-panel-title-container>.tc-icon-title{gap:10px;min-height:32px}#contextual-settings-title-container .tc-icon-title-icon,#settings-panel-title-container .tc-icon-title-icon{flex-basis:24px;height:24px;width:24px}#contextual-settings-title-container .icon-title-text,#settings-panel-title-container .icon-title-text{line-height:24px}.settings-panel-body{display:flex;flex:1;overflow:hidden}.settings-sidebar{background-color:color-mix(in srgb,var(--main-bg) 97%,var(--main-text));border-right:1px solid var(--main-border);box-sizing:border-box;display:flex;flex-direction:column;flex-shrink:0;position:relative;width:220px}.sidebar-highlight{background-color:color-mix(in srgb,var(--main-primary) 10%,transparent);border-left:3px solid var(--main-primary);box-sizing:border-box;left:0;pointer-events:none;position:absolute;top:0;transition:transform .2s cubic-bezier(.4,0,.2,1),height .2s ease;width:100%;z-index:0}.settings-sidebar-item{align-items:center;background:transparent;border-left:3px solid transparent;box-sizing:border-box;color:var(--main-text);cursor:pointer;display:flex;font-size:15px;font-weight:500;gap:10px;padding:12px 20px;position:relative;transition:color .2s,background-color .2s;z-index:1}.settings-sidebar-item:hover{background-color:color-mix(in srgb,var(--main-textarea-bg) 50%,transparent)}.settings-sidebar-item.active{border-left-color:transparent;color:var(--main-primary)}.settings-sidebar-item svg{display:block;fill:currentColor;flex:0 0 22px;height:22px;width:22px}.settings-sidebar-item>span{display:block;line-height:22px}.settings-content-area{background-color:var(--main-bg);display:flex;flex:1;flex-direction:column;overflow:hidden;position:relative}.settings-tab-content{display:none;flex:1;overflow-y:auto;padding:20px}.settings-tab-content.active{animation:fadeIn .2s ease;display:block}#tab-ai.settings-tab-content{padding:28px 32px}@keyframes fadeIn{0%{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}.setting-item{margin-bottom:12px}.setting-item>label{display:block;font-weight:500;margin-bottom:8px}.setting-title-container{align-items:center;display:flex;font-size:16px;font-weight:700;gap:8px;margin-bottom:12px}.settings-info-notice{align-items:center;background-color:color-mix(in srgb,var(--main-primary) 8%,var(--main-bg));border:1px solid color-mix(in srgb,var(--main-primary) 28%,var(--main-border));border-radius:10px;color:var(--main-text-secondary);display:flex;font-size:13px;gap:10px;line-height:1.5;margin:0 0 16px;padding:10px 12px}.settings-info-notice-icon{align-items:center;color:var(--main-primary);display:flex;flex:0 0 auto;justify-content:center}.settings-info-notice-icon svg{display:block;height:20px;width:20px}.settings-info-notice .icon-title-text{margin:0;min-width:0}.settings-tab-content::-webkit-scrollbar{width:6px}.settings-tab-content::-webkit-scrollbar-track{background:transparent}.settings-tab-content::-webkit-scrollbar-thumb{background-color:var(--main-border);border-radius:3px}.settings-tab-content::-webkit-scrollbar-thumb:hover{background-color:var(--main-primary)}.settings-tab-content::-webkit-scrollbar-button{display:none}.settings-panel-footer{background-color:var(--main-bg);border-top:1px solid var(--main-border);flex-shrink:0;padding:16px 20px;text-align:right}.checkbox-group{color:var(--main-text);cursor:pointer;display:block;height:20px;line-height:20px;margin-left:2px;margin-top:12px;padding-left:30px;position:relative;user-select:none}.checkbox-group input{cursor:pointer;height:0;opacity:0;position:absolute;width:0}.checkmark{background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:3px;height:18px;left:0;position:absolute;top:0;transition:all .2s;width:18px}.checkbox-group:hover input~.checkmark{border-color:var(--main-primary)}.checkbox-group input:checked~.checkmark{background-color:var(--main-primary);border-color:var(--main-primary)}.checkmark:after{content:"";display:none;position:absolute}.checkbox-group input:checked~.checkmark:after{display:block}.checkbox-group .checkmark:after{border:solid var(--main-bg);border-width:0 2px 2px 0;height:10px;left:6px;top:2px;transform:rotate(45deg);width:5px}.composite-setting-container{font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-weight:500;margin-left:0;margin-top:14px}.composite-setting-container .checkbox-group{margin-top:0}.linked-numeric-input{margin-left:32px;margin-top:8px}.numeric-input-group{align-items:center;display:flex;gap:8px}.numeric-input{background-color:var(--main-textarea-bg);border:1px solid var(--main-textarea-border);border-radius:8px;color:var(--main-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;padding:6px 8px;transition:border-color .2s,box-shadow .2s,background-color .2s,color .2s;width:100px}.numeric-input:focus{border-color:var(--main-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--main-primary) 20%,transparent);outline:none}.numeric-input:disabled{background-color:var(--main-disabled);border-color:var(--main-border);color:var(--main-disabled-text);cursor:not-allowed}.setting-item-select{align-items:center;display:flex;font-weight:500;justify-content:space-between;margin-left:32px}.image-card-select-container{display:flex;gap:16px;justify-content:space-between;width:100%}.image-card-option{background-color:var(--main-bg);border:1px solid var(--main-border);border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.05);cursor:pointer;display:flex;flex:1;flex-direction:column;overflow:hidden;padding:0;position:relative;transition:border-color .2s,box-shadow .2s}.image-card-option:hover{border-color:var(--main-primary);box-shadow:0 2px 8px rgba(0,0,0,.08);transform:none}.image-card-option.selected{background-color:color-mix(in srgb,var(--main-primary) 5%,var(--main-bg));border-color:var(--main-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--main-primary) 20%,transparent)}.image-card-preview{background-color:var(--main-textarea-bg);border-bottom:1px solid var(--main-border);height:110px;padding:16px;transition:background-color .2s,border-bottom-color .2s}.image-card-preview,.schematic-container{align-items:center;display:flex;justify-content:center}.schematic-container{height:100%;width:100%}.schematic-card{align-items:center;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1);display:flex;gap:8px;height:60px;padding:8px;transition:background-color .2s;width:100px}.schematic-icon-box{border-radius:6px;flex-shrink:0;height:24px;width:24px}.schematic-lines{display:flex;flex:1;flex-direction:column;gap:6px}.schematic-line{border-radius:3px;height:6px;width:100%}.schematic-line.secondary{width:60%}.image-card-option[data-value=light] .image-card-preview{background-color:#f1f5f9}.image-card-option[data-value=light] .schematic-card{background-color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.05)}.image-card-option[data-value=light] .schematic-icon-box{background-color:#e2e8f0}.image-card-option[data-value=light] .schematic-line{background-color:#cbd5e1}.image-card-option[data-value=dark] .image-card-preview{background-color:#0f172a}.image-card-option[data-value=dark] .schematic-card{background-color:#1e293b;box-shadow:0 2px 8px rgba(0,0,0,.2)}.image-card-option[data-value=dark] .schematic-icon-box{background-color:#334155}.image-card-option[data-value=dark] .schematic-line{background-color:#475569}.image-card-option[data-value=system] .image-card-preview{background-color:#1e293b}.image-card-option[data-value=system] .schematic-card{background-color:#334155;border:1px solid #475569}.image-card-option[data-value=system] .schematic-icon-box{background-color:#475569}.image-card-option[data-value=system] .schematic-line{background-color:#64748b}.image-card-label{align-items:center;display:flex;font-size:14px;font-weight:500;justify-content:flex-start;padding:12px}.image-card-radio{align-items:center;background-color:transparent;border:1px solid var(--main-border);border-radius:50%;display:flex;flex-shrink:0;height:16px;justify-content:center;margin-right:8px;transition:all .2s;width:16px}.radio-dot{background-color:var(--main-primary);border-radius:50%;height:8px;opacity:0;transform:scale(0);transition:all .2s cubic-bezier(.4,0,.2,1);width:8px}.image-card-option.selected .image-card-radio{border-color:var(--main-primary)}.image-card-option.selected .radio-dot{opacity:1;transform:scale(1)}.image-card-label-icon{align-items:center;color:var(--main-text-secondary);display:flex;margin-left:4px}.image-card-option.selected .image-card-label-icon{color:var(--main-primary)}.image-card-label-icon svg{fill:currentColor;height:18px;width:18px}@media (prefers-color-scheme:light){.image-card-option[data-value=system] .image-card-preview{background-color:#f1f5f9}.image-card-option[data-value=system] .schematic-card{background-color:#fff;border:none;box-shadow:0 2px 8px rgba(0,0,0,.05)}.image-card-option[data-value=system] .schematic-icon-box{background-color:#e2e8f0}.image-card-option[data-value=system] .schematic-line{background-color:#cbd5e1}}@media (prefers-color-scheme:dark){.image-card-option[data-value=system] .image-card-preview{background-color:#0f172a}.image-card-option[data-value=system] .schematic-card{background-color:#1e293b;border:none;box-shadow:0 2px 8px rgba(0,0,0,.2)}.image-card-option[data-value=system] .schematic-icon-box{background-color:#334155}.image-card-option[data-value=system] .schematic-line{background-color:#475569}}.about-tab-container{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;padding-bottom:40px;text-align:center}.about-logo{color:var(--main-primary);height:100px;margin-bottom:18px;width:100px}.about-logo svg{fill:currentColor;height:100%;width:100%}.about-title{color:var(--main-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:24px;font-weight:700;margin:0 0 6px}.about-description{color:var(--main-text-secondary);font-size:14px;line-height:1.5;margin:0 0 24px;max-width:400px}.about-version{color:var(--main-text-secondary);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:16px;margin:0 0 16px}.about-actions{display:flex;gap:16px}#about-github-btn svg{height:20px;width:20px}@media (max-width:900px){.settings-panel-modal{height:calc(100vh - 28px);max-height:none;width:calc(100vw - 28px)}.settings-sidebar{width:180px}.settings-sidebar-item{padding-inline:14px}#tab-ai.settings-tab-content{padding:24px}}@media (max-width:700px){.settings-panel-modal{border-radius:12px;height:calc(100vh - 16px);width:calc(100vw - 16px)}.settings-panel-header{padding:14px 16px}.settings-panel-body{flex-direction:column}.settings-sidebar{border-bottom:1px solid var(--main-border);border-right:0;flex-direction:row;overflow-x:auto;width:100%}.sidebar-highlight{display:none}.settings-sidebar-item{border-left:0;flex:0 0 auto;min-height:44px;padding:10px 12px}.settings-sidebar-item.active{background-color:color-mix(in srgb,var(--main-primary) 10%,transparent)}.settings-sidebar-item svg{height:20px;width:20px}#tab-ai.settings-tab-content,.settings-tab-content{padding:18px}.settings-panel-footer{padding:12px 16px}}.text-extractor-tooltip{background-color:var(--main-tooltip-bg);border:1px solid var(--main-border);border-radius:16px;box-shadow:0 2px 5px var(--main-shadow);color:var(--main-tooltip-text);font-family:Menlo,Monaco,Cascadia Code,PingFang SC;font-size:14px;font-weight:700;opacity:0;padding:8px 12px;pointer-events:none;position:fixed;transition:opacity .2s ease,visibility .2s;visibility:hidden;white-space:nowrap;z-index:2147483647}.text-extractor-tooltip.is-visible{opacity:1;visibility:visible}`;
    uiContainer.appendChild(styleElement);
    initTheme();
    initialize();
    initUI();
    initializeExporter();
    try {
      await loadAndResumeSession();
    } catch (e) {
      log(t("log.main.resumeFailed"), e);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize2);
  } else {
    initialize2();
  }
  return __toCommonJS(main_exports);
})();