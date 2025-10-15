// ==UserScript==
// @name         网页文本提取工具
// @name:en-US   Web Text Extraction Tool
// @namespace    https://github.com/Qing90bing/Qing_PageScanner
// @namespace    http://tampermonkey.net/
// @version      1.0.0
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
// @grant        GM_registerMenuCommand
// ==/UserScript==



// --- CSS 注入 ---
(function() {
    'use strict';
    const css = `
/* src/assets/themes.css */
/* 这个文件只定义颜色变量和主题切换逻辑 */

:root {
  /* 浅色模式颜色变量 */
  --color-bg: #ffffff;
  --color-text: #333333;
  --color-border: #e0e0e0;
  --color-overlay-bg: rgba(0,0,0,0.5);
  --color-shadow: rgba(0,0,0,0.2);
  --color-primary: #1a73e8;
  --color-primary-hover: #185abc;
  --color-primary-text: #ffffff;
  --color-toast-bg: #333333;
  --color-toast-text: #ffffff;
  --color-textarea-bg: #ffffff;
  --color-textarea-border: #cccccc;

  /* 深色模式颜色变量 */
  --dark-color-bg: #2d2d2d;
  --dark-color-text: #f0f0f0;
  --dark-color-border: #555555;
  --dark-color-overlay-bg: rgba(0,0,0,0.7);
  --dark-color-shadow: rgba(0,0,0,0.4);
  --dark-color-primary: #1e90ff;
  --dark-color-primary-hover: #1c86ee;
  --dark-color-primary-text: #ffffff;
  --dark-color-toast-bg: #eeeeee;
  --dark-color-toast-text: #111111;
  --dark-color-textarea-bg: #3a3a3a;
  --dark-color-textarea-border: #666666;
}

/* 根据 data-theme 属性应用浅色主题 */
body[data-theme='light'] {
  --main-bg: var(--color-bg);
  --main-text: var(--color-text);
  --main-border: var(--color-border);
  --main-overlay-bg: var(--color-overlay-bg);
  --main-shadow: var(--color-shadow);
  --main-primary: var(--color-primary);
  --main-primary-hover: var(--color-primary-hover);
  --main-primary-text: var(--color-primary-text);
  --main-toast-bg: var(--color-toast-bg);
  --main-toast-text: var(--color-toast-text);
  --main-textarea-bg: var(--color-textarea-bg);
  --main-textarea-border: var(--color-textarea-border);
}

/* 根据 data-theme 属性应用深色主题 */
body[data-theme='dark'] {
  --main-bg: var(--dark-color-bg);
  --main-text: var(--dark-color-text);
  --main-border: var(--dark-color-border);
  --main-overlay-bg: var(--dark-color-overlay-bg);
  --main-shadow: var(--dark-color-shadow);
  --main-primary: var(--dark-color-primary);
  --main-primary-hover: var(--dark-color-primary-hover);
  --main-primary-text: var(--dark-color-primary-text);
  --main-toast-bg: var(--dark-color-toast-bg);
  --main-toast-text: var(--dark-color-toast-text);
  --main-textarea-bg: var(--dark-color-textarea-bg);
  --main-textarea-border: var(--dark-color-textarea-border);
}


/* --- From main-ui.css --- */
/* src/assets/styles/main-ui.css */

/* --- 悬浮操作按钮 (FAB) --- */
.text-extractor-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  background-color: var(--main-primary);
  border-radius: 50%;
  box-shadow: 0 4px 8px var(--main-shadow);
  cursor: pointer;
  z-index: 9999;
  transition: background-color 0.3s;
  /* position: relative; 作为 SVG 绝对定位的基准 (父元素 fixed 已经可以作为基准) */
}
.text-extractor-fab:hover { background-color: var(--main-primary-hover); }
.text-extractor-fab svg {
  /* 采用绝对定位方案实现完美居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 26px; /* 保持图标尺寸 */
  height: 26px;
}

/* --- 文本提取模态框 --- */
.text-extractor-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10000;
  display: none;
  justify-content: center;
  align-items: center;
}

.text-extractor-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  width: 80%; max-width: 700px; max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--main-shadow);
  display: flex;
  flex-direction: column;
}

.text-extractor-modal-header {
  padding: 16px;
  border-bottom: 1px solid var(--main-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  font-weight: 500;
  color: var(--main-text);
}

.text-extractor-modal-close {
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: var(--main-text);
}

.text-extractor-modal-content {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
}

.text-extractor-modal-content textarea {
  width: 100%;
  height: 300px;
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  resize: vertical;
}

.text-extractor-modal-footer {
  padding: 16px;
  border-top: 1px solid var(--main-border);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text-extractor-copy-btn {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.text-extractor-copy-btn:hover { background-color: var(--main-primary-hover); }

/* --- “已复制”提示消息 (Toast) --- */
.text-extractor-toast {
  position: fixed; bottom: 100px; right: 30px;
  background-color: var(--main-toast-bg);
  color: var(--main-toast-text);
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10001;
  opacity: 0;
  transition: opacity 0.5s;
}


/* --- From settings-panel.css --- */
/* src/assets/styles/settings-panel.css */

.settings-panel-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10002;
  display: flex; justify-content: center; align-items: center;
}
.settings-panel-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  border: 1px solid var(--main-border);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--main-shadow);
  width: 90%;
  max-width: 400px;
}
.settings-panel-header, .settings-panel-content, .settings-panel-footer {
  padding: 16px;
}
.settings-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--main-border);
}
.settings-panel-header h2 { margin: 0; font-size: 1.1em; }
.settings-panel-close { cursor: pointer; font-size: 24px; }

.setting-item { margin-bottom: 16px; }
.setting-item > label { display: block; margin-bottom: 8px; font-weight: 500; }
.setting-item select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
}

/* -- 全新重构的自定义复选框样式 -- */
.checkbox-group {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-top: 12px;
  cursor: pointer;
  user-select: none;
  height: 20px;
  line-height: 20px;
  color: var(--main-text);
}

/* 彻底隐藏原生的复选框 */
.checkbox-group input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 创建一个假的复选框容器 */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: var(--main-textarea-bg);
  border: 1px solid var(--main-textarea-border);
  border-radius: 3px;
  transition: all 0.2s;
}

/* 当鼠标悬停时，给一个反馈 */
.checkbox-group:hover input ~ .checkmark {
  border-color: var(--main-primary);
}

/* 当复选框被选中时，改变背景和边框颜色 */
.checkbox-group input:checked ~ .checkmark {
  background-color: var(--main-primary);
  border-color: var(--main-primary);
}

/* 创建勾选标记 (✓)，默认隐藏 */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* 当复选框被选中时，显示勾选标记 */
.checkbox-group input:checked ~ .checkmark:after {
  display: block;
}

/* 勾选标记的样式 */
.checkbox-group .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--main-bg);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
/* -- 结束自定义复选框样式 -- */

.settings-panel-footer {
  border-top: 1px solid var(--main-border);
  text-align: right;
}
#save-settings-btn {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#save-settings-btn:hover { background-color: var(--main-primary-hover); }

    `;
    GM_addStyle(css);
})();


(() => {
  // src/assets/icon.js
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;

  // src/ui/components/fab.js
  function createFab(onClick) {
    const fab = document.createElement("div");
    fab.className = "text-extractor-fab";
    fab.innerHTML = translateIcon;
    fab.addEventListener("click", onClick);
    document.body.appendChild(fab);
    return fab;
  }

  // src/core/settings.js
  var defaultSettings = {
    // 主题设置, 可选值: 'light', 'dark', 'system'
    theme: "system",
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
      symbols: true
    }
  };
  function loadSettings() {
    const savedSettings = GM_getValue("script_settings", null);
    if (savedSettings) {
      try {
        return {
          ...defaultSettings,
          ...JSON.parse(savedSettings)
        };
      } catch (error) {
        console.error("\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519:", error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(settings) {
    if (typeof settings !== "object" || settings === null) {
      console.error("\u5C1D\u8BD5\u4FDD\u5B58\u7684\u8BBE\u7F6E\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u5BF9\u8C61:", settings);
      return;
    }
    GM_setValue("script_settings", JSON.stringify(settings));
  }

  // src/config.js
  var config = {
    /**
     * 定义了文本提取的目标CSS选择器。
     * 默认情况下，脚本会尝试从以下标签和类名中提取文本。
     * 你可以根据需要添加、修改或删除这些选择器，以适应特定的网站或需求。
     * @example
     * // 只提取文章段落和标题
     * selectors: ['article p', 'h1', 'h2']
     * // 针对特定网站的定制
     * selectors: ['.main-content', '.comment-text']
     */
    selectors: [
      "p",
      // 段落
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      // 标题
      "li",
      // 列表项
      "td",
      // 表格单元格
      "pre",
      // 预格式化文本
      "span",
      // 常用于包裹零散文本
      "article",
      // 文章内容
      "div"
      // 通用容器，作为最后的选择
    ]
  };
  var config_default = config;

  // src/core/processor.js
  var numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
  var pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
  var containsChineseRegex = /[\u4e00-\u9fa5]/u;
  var emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
  var containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;
  var extractAndProcessText = () => {
    const settings = loadSettings();
    const { filterRules } = settings;
    const { selectors } = config_default;
    const uniqueTexts = /* @__PURE__ */ new Set();
    const targetElements = document.querySelectorAll(selectors.join(", "));
    targetElements.forEach((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
          continue;
        }
        if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay")) {
          continue;
        }
        let text = node.nodeValue || "";
        text = text.replace(/(\r\n|\n|\r)+/g, "\n");
        if (text.trim() === "") {
          continue;
        }
        const trimmedText = text.trim();
        if (filterRules.numbers && numberAndCurrencyRegex.test(trimmedText)) {
          continue;
        }
        if (filterRules.chinese && pureChineseRegex.test(trimmedText)) {
          continue;
        }
        if (filterRules.containsChinese && containsChineseRegex.test(trimmedText)) {
          continue;
        }
        if (filterRules.emojiOnly && emojiOnlyRegex.test(trimmedText)) {
          continue;
        }
        if (filterRules.symbols && !containsLetterOrNumberRegex.test(trimmedText)) {
          continue;
        }
        uniqueTexts.add(text);
      }
    });
    return Array.from(uniqueTexts);
  };
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => (
        // 2. 对每个字符串进行处理：
        //    - 将字符串中的双引号 " 转义为 \"
        //    - 将字符串中的换行符 \n 转义为 \\n
        //    - 然后按照 `["...", ""]` 的格式包裹起来
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
      )
    );
    return `[
${result.join(",\n")}
]`;
  };

  // src/ui/components/mainModal.js
  var modalOverlay = null;
  var outputTextarea = null;
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  function showToast() {
    const toast = document.createElement("div");
    toast.className = "text-extractor-toast";
    toast.textContent = "\u5DF2\u590D\u5236!";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 10);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 2e3);
  }
  function createMainModal() {
    if (modalOverlay) return;
    modalOverlay = document.createElement("div");
    modalOverlay.className = "text-extractor-modal-overlay";
    modalOverlay.innerHTML = `
    <div class="text-extractor-modal">
      <div class="text-extractor-modal-header">
        <span>\u63D0\u53D6\u7684\u6587\u672C</span>
        <span class="text-extractor-modal-close">&times;</span>
      </div>
      <div class="text-extractor-modal-content">
        <textarea id="text-extractor-output"></textarea>
      </div>
      <div class="text-extractor-modal-footer">
        <button class="text-extractor-copy-btn">\u4E00\u952E\u590D\u5236</button>
      </div>
    </div>
  `;
    document.body.appendChild(modalOverlay);
    outputTextarea = document.getElementById("text-extractor-output");
    const closeBtn = modalOverlay.querySelector(".text-extractor-modal-close");
    const copyBtn = modalOverlay.querySelector(".text-extractor-copy-btn");
    closeBtn.addEventListener("click", closeModal);
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      GM_setClipboard(textToCopy, "text");
      showToast();
    });
  }
  function openModal() {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    outputTextarea.value = "\u6587\u672C\u63D0\u53D6\u4E2D...";
    modalOverlay.style.display = "flex";
    document.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      const extractedTexts = extractAndProcessText();
      const formattedText = formatTextsForTranslation(extractedTexts);
      outputTextarea.value = formattedText;
    }, 50);
  }
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.style.display = "none";
      document.removeEventListener("keydown", handleKeyDown);
    }
  }

  // src/ui/index.js
  function initUI() {
    createMainModal();
    createFab(openModal);
  }

  // src/ui/theme.js
  function initTheme() {
    const { theme } = loadSettings();
    applyTheme(theme);
  }
  function applyTheme(theme) {
    let finalTheme = theme;
    if (theme === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.body.setAttribute("data-theme", finalTheme);
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const { theme } = loadSettings();
    if (theme === "system") {
      applyTheme("system");
    }
  });

  // src/ui/components.js
  function createCheckbox(id, label, isChecked) {
    return `
    <label class="checkbox-group" for="${id}">${label}
      <input type="checkbox" id="${id}" ${isChecked ? "checked" : ""}>
      <span class="checkmark"></span>
    </label>
  `;
  }

  // src/ui/settingsPanel.js
  var settingsPanel = null;
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "\u8FC7\u6EE4\u7EAF\u6570\u5B57/\u8D27\u5E01" },
    { id: "filter-chinese", key: "chinese", label: "\u8FC7\u6EE4\u7EAF\u4E2D\u6587" },
    { id: "filter-contains-chinese", key: "containsChinese", label: "\u8FC7\u6EE4\u5305\u542B\u4E2D\u6587\u7684\u6587\u672C" },
    { id: "filter-emoji-only", key: "emojiOnly", label: "\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7" },
    { id: "filter-symbols", key: "symbols", label: "\u8FC7\u6EE4\u7EAF\u7B26\u53F7" }
  ];
  function getPanelHTML(settings) {
    const filterCheckboxesHTML = filterDefinitions.map((filter) => createCheckbox(filter.id, filter.label, settings.filterRules[filter.key])).join("");
    return `
    <div class="settings-panel-modal">
      <div class="settings-panel-header">
        <h2>\u811A\u672C\u8BBE\u7F6E</h2>
        <span class="settings-panel-close">&times;</span>
      </div>
      <div class="settings-panel-content">
        <div class="setting-item">
          <label for="theme-select">\u754C\u9762\u4E3B\u9898</label>
          <select id="theme-select">
            <option value="system" ${settings.theme === "system" ? "selected" : ""}>\u8DDF\u968F\u7CFB\u7EDF</option>
            <option value="light" ${settings.theme === "light" ? "selected" : ""}>\u6D45\u8272\u6A21\u5F0F</option>
            <option value="dark" ${settings.theme === "dark" ? "selected" : ""}>\u6DF1\u8272\u6A21\u5F0F</option>
          </select>
        </div>
        <div class="setting-item">
          <label>\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219</label>
          ${filterCheckboxesHTML}
        </div>
      </div>
      <div class="settings-panel-footer">
        <button id="save-settings-btn">\u4FDD\u5B58\u5E76\u5E94\u7528</button>
      </div>
    </div>
  `;
  }
  var handleKeyDown2 = (event) => {
    if (event.key === "Escape") {
      hideSettingsPanel();
    }
  };
  function showSettingsPanel() {
    if (settingsPanel) {
      settingsPanel.style.display = "flex";
      return;
    }
    const currentSettings = loadSettings();
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.innerHTML = getPanelHTML(currentSettings);
    document.body.appendChild(settingsPanel);
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    settingsPanel.querySelector("#save-settings-btn").addEventListener("click", handleSave);
    document.addEventListener("keydown", handleKeyDown2);
  }
  function hideSettingsPanel() {
    if (settingsPanel) {
      document.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.remove();
      settingsPanel = null;
    }
  }
  function handleSave() {
    const newTheme = document.getElementById("theme-select").value;
    const newFilterRules = {};
    filterDefinitions.forEach((filter) => {
      const checkbox = document.getElementById(filter.id);
      if (checkbox) {
        newFilterRules[filter.key] = checkbox.checked;
      }
    });
    const newSettings = {
      theme: newTheme,
      filterRules: newFilterRules
    };
    saveSettings(newSettings);
    applyTheme(newSettings.theme);
    alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01");
    hideSettingsPanel();
  }
  function initSettingsPanel() {
    GM_registerMenuCommand("\u6253\u5F00\u8BBE\u7F6E", showSettingsPanel);
  }

  // src/main.js
  (function() {
    "use strict";
    initTheme();
    initUI();
    initSettingsPanel();
  })();
})();
