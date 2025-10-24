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
// @grant        GM_unregisterMenuCommand
// ==/UserScript==


(() => {
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;
  var dynamicIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-766v572q-17-17-32-36t-28-39v-422q13-20 28-39t32-36Zm160-96v764q-21-7-41-15.5T280-133v-694q19-11 39-19.5t41-15.5Zm280 749v-734q106 47 173 145t67 222q0 124-67 222T640-113ZM480-80q-10 0-20-.5T440-82v-796q10-1 20-1.5t20-.5q20 0 40 2t40 6v784q-20 4-40 6t-40 2Z"/></svg>`;
  var summaryIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
  function createUIContainer() {
    const container = document.createElement("div");
    container.id = "text-extractor-container";
    document.body.appendChild(container);
    const shadowRoot = container.attachShadow({ mode: "open" });
    return shadowRoot;
  }
  var uiContainer = createUIContainer();
  var currentTooltip = null;
  var hideTimeout = null;
  function removeAllTooltips() {
    uiContainer.querySelectorAll(".text-extractor-tooltip").forEach((tip) => tip.remove());
    currentTooltip = null;
  }
  function showTooltip(targetElement, text) {
    clearTimeout(hideTimeout);
    removeAllTooltips();
    const tooltip = document.createElement("div");
    tooltip.className = "text-extractor-tooltip";
    tooltip.textContent = text;
    uiContainer.appendChild(tooltip);
    currentTooltip = tooltip;
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
    const left = targetRect.left - tooltipRect.width - 12;
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    requestAnimationFrame(() => {
      if (tooltip === currentTooltip) {
        tooltip.classList.add("is-visible");
      }
    });
  }
  function hideTooltip() {
    if (!currentTooltip) return;
    const tooltipToHide = currentTooltip;
    currentTooltip = null;
    tooltipToHide.classList.remove("is-visible");
    hideTimeout = setTimeout(() => {
      tooltipToHide.remove();
    }, 200);
  }
  var themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
  var languageIcon_default = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>`;
  var en_default = {
    common: {
      scan: "Scan",
      stop: "Stop",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      discovered: "Discovered: ",
      confirm: "Confirm",
      cancel: "Cancel"
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      filters: {
        numbers: "Filter numbers/currency",
        chinese: "Filter pure Chinese",
        contains_chinese: "Filter text containing Chinese",
        emoji_only: "Filter emoji-only text",
        symbols: "Filter symbol-only text",
        term: "Filter specific terms",
        single_letter: "Filter single English letters",
        repeating_chars: "Filter single repeating characters"
      },
      display: {
        show_fab: "Show floating button",
        show_line_numbers: "Show line numbers",
        show_statistics: "Show statistics"
      },
      advanced: {
        enable_debug_logging: "Enable debug logging"
      },
      panel: {
        title: "Settings Panel"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Session Scan",
      startSession: "Start dynamic scan session",
      stopSession: "Stop dynamic scan session",
      finished: "Scan finished, {count} texts found",
      quickFinished: "Quick scan finished, {count} texts found",
      sessionStarted: "Session scan started"
    },
    results: {
      title: "Extracted Text",
      totalCharacters: "Total characters",
      totalLines: "Total lines",
      noSummary: "No summary text available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy",
      contentCleared: "Content cleared",
      noTextSelected: "No text selected"
    },
    placeholders: {
      click: "Click the ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " button to start a new scanning session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " button for a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone."
    },
    tooltip: {
      summary: "View Summary",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan"
    }
  };
  var zh_CN_default = {
    common: {
      scan: "\u626B\u63CF",
      stop: "\u505C\u6B62",
      resume: "\u7EE7\u7EED",
      clear: "\u6E05\u7A7A",
      copy: "\u590D\u5236",
      save: "\u4FDD\u5B58",
      discovered: "\u5DF2\u53D1\u73B0\uFF1A",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88"
    },
    settings: {
      title: "\u8BBE\u7F6E",
      theme: "\u754C\u9762\u4E3B\u9898",
      language: "\u8BED\u8A00\u8BBE\u7F6E",
      relatedSettings: "\u76F8\u5173\u8BBE\u7F6E",
      filterRules: "\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219",
      filters: {
        numbers: "\u8FC7\u6EE4\u7EAF\u6570\u5B57/\u8D27\u5E01",
        chinese: "\u8FC7\u6EE4\u7EAF\u4E2D\u6587",
        contains_chinese: "\u8FC7\u6EE4\u5305\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7",
        symbols: "\u8FC7\u6EE4\u7EAF\u7B26\u53F7",
        term: "\u8FC7\u6EE4\u7279\u5B9A\u672F\u8BED",
        single_letter: "\u8FC7\u6EE4\u7EAF\u5355\u4E2A\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u8FC7\u6EE4\u5355\u4E00\u91CD\u590D\u5B57\u7B26"
      },
      display: {
        show_fab: "\u663E\u793A\u60AC\u6D6E\u6309\u94AE",
        show_line_numbers: "\u663E\u793A\u884C\u53F7",
        show_statistics: "\u663E\u793A\u7EDF\u8BA1\u4FE1\u606F"
      },
      advanced: {
        enable_debug_logging: "\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7"
      },
      panel: {
        title: "\u8BBE\u7F6E\u9762\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "\u6D45\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u968F\u7CFB\u7EDF"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u626B\u63CF",
      session: "\u4F1A\u8BDD\u626B\u63CF",
      startSession: "\u5F00\u59CB\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      stopSession: "\u505C\u6B62\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      finished: "\u626B\u63CF\u7ED3\u675F\uFF0C\u5171\u53D1\u73B0 {count} \u6761\u6587\u672C",
      quickFinished: "\u5FEB\u6377\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {count} \u6761\u6587\u672C",
      sessionStarted: "\u4F1A\u8BDD\u626B\u63CF\u5DF2\u5F00\u59CB"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      totalCharacters: "\u603B\u5B57\u6570",
      totalLines: "\u603B\u884C\u6570",
      noSummary: "\u5F53\u524D\u6CA1\u6709\u603B\u7ED3\u6587\u672C",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u7B26\u6570"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F!",
      settingsSaved: "\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01",
      modalInitError: "\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6C92\u6709\u5167\u5BB9\u53EF\u8907\u88FD",
      contentCleared: "\u5185\u5BB9\u5DF2\u6E05\u7A7A",
      noTextSelected: "\u672A\u9009\u62E9\u6587\u672C"
    },
    placeholders: {
      click: "\u70B9\u51FB ",
      dynamicScan: "[\u52A8\u6001\u626B\u63CF]",
      startNewScanSession: " \u6309\u94AE\u5F00\u59CB\u4E00\u4E2A\u65B0\u7684\u626B\u63CF\u4F1A\u8BDD",
      staticScan: "[\u9759\u6001\u626B\u63CF]",
      performOneTimeScan: " \u6309\u94AE\u53EF\u8FDB\u884C\u4E00\u6B21\u6027\u7684\u5FEB\u6377\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u4F60\u786E\u8BA4\u8981\u6E05\u7A7A\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002"
    },
    tooltip: {
      summary: "\u67E5\u770B\u603B\u7ED3",
      dynamic_scan: "\u52A8\u6001\u626B\u63CF",
      static_scan: "\u9759\u6001\u626B\u63CF"
    }
  };
  var zh_TW_default = {
    common: {
      scan: "\u6383\u63CF",
      stop: "\u505C\u6B62",
      resume: "\u7E7C\u7E8C",
      clear: "\u6E05\u7A7A",
      copy: "\u8907\u88FD",
      save: "\u5132\u5B58",
      discovered: "\u5DF2\u767C\u73FE\uFF1A",
      confirm: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88"
    },
    settings: {
      title: "\u8A2D\u5B9A",
      theme: "\u4ECB\u9762\u4E3B\u984C",
      language: "\u8A9E\u8A00\u8A2D\u5B9A",
      relatedSettings: "\u76F8\u95DC\u8A2D\u5B9A",
      filterRules: "\u5167\u5BB9\u904E\u6FFE\u898F\u5247",
      filters: {
        numbers: "\u904E\u6FFE\u7D14\u6578\u5B57/\u8CA8\u5E63",
        chinese: "\u904E\u6FFE\u7D14\u4E2D\u6587",
        contains_chinese: "\u904E\u6FFE\u5305\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u904E\u6FFE\u7D14\u8868\u60C5\u7B26\u865F",
        symbols: "\u904E\u6FFE\u7D14\u7B26\u865F",
        term: "\u904E\u6FFE\u7279\u5B9A\u8853\u8A9E",
        single_letter: "\u904E\u6FFE\u7D14\u55AE\u500B\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u904E\u6FFE\u55AE\u4E00\u91CD\u8907\u5B57\u7B26"
      },
      display: {
        show_fab: "\u986F\u793A\u61F8\u6D6E\u6309\u9215",
        show_line_numbers: "\u986F\u793A\u884C\u865F",
        show_statistics: "\u986F\u793A\u7D71\u8A08\u8CC7\u8A0A"
      },
      advanced: {
        enable_debug_logging: "\u555F\u7528\u5075\u932F\u65E5\u8A8C"
      },
      panel: {
        title: "\u8A2D\u5B9A\u9762\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "\u6DFA\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u96A8\u7CFB\u7D71"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u6383\u63CF",
      session: "\u6703\u8A71\u6383\u63CF",
      startSession: "\u958B\u59CB\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      stopSession: "\u505C\u6B62\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      finished: "\u6383\u63CF\u7D50\u675F\uFF0C\u5171\u767C\u73FE {count} \u689D\u6587\u672C",
      quickFinished: "\u5FEB\u6377\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {count} \u689D\u6587\u672C",
      sessionStarted: "\u6703\u8A71\u6383\u63CF\u5DF2\u958B\u59CB"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      totalCharacters: "\u7E3D\u5B57\u6578",
      totalLines: "\u7E3D\u884C\u6578",
      noSummary: "\u7576\u524D\u6C92\u6709\u7E3D\u7D50\u6587\u672C",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u7B26\u6578"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F\uFF01",
      settingsSaved: "\u8A2D\u5B9A\u5DF2\u5132\u5B58\uFF01",
      modalInitError: "\u6A21\u614B\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6C92\u6709\u5167\u5BB9\u53EF\u8907\u88FD",
      contentCleared: "\u5167\u5BB9\u5DF2\u6E05\u7A7A",
      noTextSelected: "\u672A\u9078\u64C7\u6587\u672C"
    },
    placeholders: {
      click: "\u9EDE\u64CA ",
      dynamicScan: "[\u52D5\u614B\u6383\u63CF]",
      startNewScanSession: " \u6309\u9215\u958B\u59CB\u4E00\u500B\u65B0\u7684\u6383\u63CF\u6703\u8A71",
      staticScan: "[\u975C\u614B\u6383\u63CF]",
      performOneTimeScan: " \u6309\u9215\u53EF\u9032\u884C\u4E00\u6B21\u6027\u7684\u5FEB\u6377\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u4F60\u78BA\u8A8D\u8981\u6E05\u7A7A\u55CE\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u92B7\u3002"
    },
    tooltip: {
      summary: "\u67E5\u770B\u7E3D\u7D50",
      dynamic_scan: "\u52D5\u614B\u6383\u63CF",
      static_scan: "\u975C\u614B\u6383\u63CF"
    }
  };
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
          console.error(`\u5728 '${eventName}' \u4E8B\u4EF6\u7684\u56DE\u8C03\u4E2D\u53D1\u751F\u9519\u8BEF:`, error);
        }
      });
    }
  }
  var LOG_PREFIX = "[\u6587\u672C\u63D0\u53D6\u811A\u672C-Debug]";
  var isDebugEnabled = false;
  function updateLoggerState(isEnabled) {
    isDebugEnabled = isEnabled;
  }
  function log(...args) {
    if (isDebugEnabled) {
      console.log(LOG_PREFIX, ...args);
    }
  }
  var supportedLanguages = [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "\u7B80\u4F53\u4E2D\u6587" },
    { code: "zh-TW", name: "\u7E41\u9AD4\u4E2D\u6587" }
  ];
  var translationModules = {
    en: en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
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
      log(`\u8BED\u8A00\u5DF2\u5207\u6362\u81F3: ${lang}`);
      fire("languageChanged", lang);
    } else {
      log(`\u8BED\u8A00 '${lang}' \u4E0D\u5B58\u5728\uFF0C\u56DE\u9000\u5230 'en'\u3002`, "warn");
      currentLanguage = "en";
      currentTranslations = translations.en;
    }
  }
  function t(key) {
    const value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    return value !== void 0 ? value : key;
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light" },
        { value: "dark", label: "settings.themes.dark" },
        { value: "system", label: "settings.themes.system" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      options: getAvailableLanguages()
    }
  ];
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "settings.filters.numbers" },
    { id: "filter-chinese", key: "chinese", label: "settings.filters.chinese" },
    { id: "filter-contains-chinese", key: "containsChinese", label: "settings.filters.contains_chinese" },
    { id: "filter-emoji-only", key: "emojiOnly", label: "settings.filters.emoji_only" },
    { id: "filter-symbols", key: "symbols", label: "settings.filters.symbols" },
    { id: "filter-term", key: "termFilter", label: "settings.filters.term" },
    { id: "filter-single-letter", key: "singleLetter", label: "settings.filters.single_letter" },
    { id: "filter-repeating-chars", key: "repeatingChars", label: "settings.filters.repeating_chars" }
  ];
  var relatedSettingsDefinitions = [
    { id: "show-fab", key: "showFab", label: "settings.display.show_fab" },
    { id: "show-line-numbers", key: "showLineNumbers", label: "settings.display.show_line_numbers" },
    { id: "show-statistics", key: "showStatistics", label: "settings.display.show_statistics" },
    { id: "enable-debug-logging", key: "enableDebugLogging", label: "settings.advanced.enable_debug_logging" }
  ];
  var appConfig = {
    ui: {
      fabAnimationDelay: 50,
      tooltips: {
        summary: "\u67E5\u770B\u603B\u7ED3\u6587\u672C",
        dynamicScan: "\u52A8\u6001\u626B\u63CF",
        staticScan: "\u9759\u6001\u626B\u63CF"
      },
      liveCounterPrefix: "\u5DF2\u53D1\u73B0\uFF1A",
      modalContentHeight: "400px",
      notificationDuration: 3e3
    },
    scanner: {
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
      attributesToExtract: ["placeholder", "alt", "title", "aria-label"],
      ignoredSelectors: [
        "script",
        "style",
        "noscript",
        "code",
        "pre",
        "kbd",
        ".no-translate"
      ]
    }
  };
  var trustedTypePolicy = null;
  var policyCreated = false;
  function createTrustedTypePolicy() {
    if (policyCreated) {
      return trustedTypePolicy;
    }
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
      try {
        trustedTypePolicy = window.trustedTypes.createPolicy("script-svg-policy", {
          createHTML: (input) => {
            return input;
          }
        });
      } catch (e) {
        if (e.message.includes("already exists")) {
          trustedTypePolicy = window.trustedTypes.policies.get("script-svg-policy");
        } else {
          console.error("\u521B\u5EFA Trusted Type \u7B56\u7565\u5931\u8D25:", e);
        }
      }
    }
    policyCreated = true;
    return trustedTypePolicy;
  }
  function createSVGFromString(svgString) {
    if (!svgString || typeof svgString !== "string") return null;
    const policy = createTrustedTypePolicy();
    let sanitizedSVG = svgString.trim();
    if (policy) {
      sanitizedSVG = policy.createHTML(sanitizedSVG);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedSVG, "image/svg+xml");
    const svgNode = doc.documentElement;
    if (!svgNode || svgNode.nodeName.toLowerCase() !== "svg" || svgNode.querySelector("parsererror")) {
      console.error("\u65E0\u6548\u6216\u89E3\u6790\u5931\u8D25\u7684 SVG \u5B57\u7B26\u4E32:", svgString);
      return null;
    }
    return document.importNode(svgNode, true);
  }
  var summaryFab;
  var dynamicFab;
  var staticFab;
  function createSingleFab(className, iconSVGString, titleKey, onClick) {
    const fab = document.createElement("div");
    fab.className = `text-extractor-fab ${className}`;
    const svgIcon = createSVGFromString(iconSVGString);
    if (svgIcon) {
      fab.appendChild(svgIcon);
    }
    fab.dataset.tooltipKey = titleKey;
    fab.addEventListener("click", onClick);
    fab.addEventListener("mouseenter", () => {
      showTooltip(fab, t(titleKey));
    });
    fab.addEventListener("mouseleave", () => {
      hideTooltip();
    });
    return fab;
  }
  function updateFabTooltips() {
    if (summaryFab) {
      summaryFab.addEventListener("mouseenter", () => showTooltip(summaryFab, t(summaryFab.dataset.tooltipKey)));
    }
    if (dynamicFab) {
      dynamicFab.addEventListener("mouseenter", () => showTooltip(dynamicFab, t(dynamicFab.dataset.tooltipKey)));
    }
    if (staticFab) {
      staticFab.addEventListener("mouseenter", () => showTooltip(staticFab, t(staticFab.dataset.tooltipKey)));
    }
  }
  function createFab({ callbacks, isVisible }) {
    const { onStaticExtract, onDynamicExtract, onSummary } = callbacks;
    const fabContainer = document.createElement("div");
    fabContainer.className = "text-extractor-fab-container";
    summaryFab = createSingleFab(
      "fab-summary",
      summaryIcon,
      "tooltip.summary",
      onSummary
    );
    dynamicFab = createSingleFab(
      "fab-dynamic",
      dynamicIcon,
      "tooltip.dynamic_scan",
      () => onDynamicExtract(dynamicFab)
    );
    staticFab = createSingleFab(
      "fab-static",
      translateIcon,
      "tooltip.static_scan",
      onStaticExtract
    );
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    uiContainer.appendChild(fabContainer);
    if (isVisible) {
      setTimeout(() => {
        fabContainer.classList.add("fab-container-visible");
      }, appConfig.ui.fabAnimationDelay);
    }
    on("languageChanged", updateFabTooltips);
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
  var defaultSettings = {
    language: "auto",
    theme: "system",
    showFab: true,
    showLineNumbers: true,
    showStatistics: true,
    enableDebugLogging: false,
    filterRules: {
      numbers: true,
      chinese: true,
      containsChinese: false,
      emojiOnly: true,
      symbols: true,
      termFilter: true,
      singleLetter: false,
      repeatingChars: true
    }
  };
  function loadSettings() {
    const savedSettings = getValue("script_settings", null);
    if (savedSettings) {
      try {
        const loadedSettings = {
          ...defaultSettings,
          ...JSON.parse(savedSettings)
        };
        return loadedSettings;
      } catch (error) {
        console.error("\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519:", error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(newSettings) {
    if (typeof newSettings !== "object" || newSettings === null) {
      console.error("\u5C1D\u8BD5\u4FDD\u5B58\u7684\u8BBE\u7F6E\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u5BF9\u8C61:", newSettings);
      return;
    }
    const oldSettings = loadSettings();
    Object.keys(newSettings).forEach((key) => {
      if (key !== "filterRules") {
        if (oldSettings[key] !== newSettings[key]) {
          log(`\u8BBE\u7F6E '${key}' \u5DF2\u4ECE '${oldSettings[key]}' \u66F4\u6539\u4E3A '${newSettings[key]}'`);
        }
      }
    });
    const oldRules = oldSettings.filterRules || {};
    const newRules = newSettings.filterRules || {};
    Object.keys(newRules).forEach((key) => {
      if (oldRules[key] !== newRules[key]) {
        const status = newRules[key] ? "\u542F\u7528" : "\u7981\u7528";
        log(`\u8FC7\u6EE4\u89C4\u5219 '${key}' \u5DF2\u88AB${status}`);
      }
    });
    setValue("script_settings", JSON.stringify(newSettings));
  }
  var IGNORED_TERMS = [
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
    "AI"
  ];
  var ignoredTerms_default = IGNORED_TERMS;
  var filterConfigMap = new Map(filterDefinitions.map((def) => [def.key, def.label]));
  var ruleChecks =  new Map([
    ["numbers", {
      regex: /^[$\€\£\¥\d,.\s]+$/,
      label: filterConfigMap.get("numbers")
    }],
    ["chinese", {
      regex: /^[\u4e00-\u9fa5\s]+$/u,
      label: filterConfigMap.get("chinese")
    }],
    ["containsChinese", {
      regex: /[\u4e00-\u9fa5]/u,
      label: filterConfigMap.get("containsChinese")
    }],
    ["emojiOnly", {
      regex: /^[\p{Emoji}\s]+$/u,
      label: filterConfigMap.get("emojiOnly")
    }],
    ["symbols", {
      test: (text) => !/[\p{L}\p{N}]/u.test(text),
      label: filterConfigMap.get("symbols")
    }],
    ["termFilter", {
      test: (text) => ignoredTerms_default.includes(text),
      label: filterConfigMap.get("termFilter")
    }],
    ["singleLetter", {
      regex: /^[a-zA-Z]$/,
      label: filterConfigMap.get("singleLetter")
    }],
    ["repeatingChars", {
      regex: /^\s*(.)\1+\s*$/,
      label: filterConfigMap.get("repeatingChars")
    }]
  ]);
  function shouldFilter(text, filterRules) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return rule.label;
        }
      }
    }
    return null;
  }
  var extractAndProcessText = () => {
    const settings = loadSettings();
    const { filterRules } = settings;
    const uniqueTexts =  new Set();
    const processAndAddText2 = (rawText) => {
      if (!rawText) return;
      const normalizedText = rawText.normalize("NFC");
      let text = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n");
      if (text.trim() === "") {
        return;
      }
      const trimmedText = text.trim();
      const filterReason = shouldFilter(trimmedText, filterRules);
      if (filterReason) {
        log(`\u6587\u672C\u5DF2\u8FC7\u6EE4: "${trimmedText}" (\u539F\u56E0: ${filterReason})`);
        return;
      }
      uniqueTexts.add(text);
    };
    processAndAddText2(document.title);
    const targetElements = document.querySelectorAll(appConfig.scanner.targetSelectors.join(", "));
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
    targetElements.forEach((element) => {
      if (element.closest(ignoredSelectorString)) {
        return;
      }
      const attributesToExtract = appConfig.scanner.attributesToExtract;
      if (element.tagName === "INPUT" && ["button", "submit", "reset"].includes(element.type)) {
        const dynamicAttributes = [...attributesToExtract, "value"];
        dynamicAttributes.forEach((attr) => {
          const attrValue = element.getAttribute(attr);
          if (attrValue) {
            processAndAddText2(attrValue);
          }
        });
      } else {
        attributesToExtract.forEach((attr) => {
          const attrValue = element.getAttribute(attr);
          if (attrValue) {
            processAndAddText2(attrValue);
          }
        });
      }
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE" || parent.closest(ignoredSelectorString))) {
          continue;
        }
        if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay")) {
          continue;
        }
        processAndAddText2(node.nodeValue);
      }
    });
    return Array.from(uniqueTexts);
  };
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
    );
    return `[
${result.join(",\n")}
]`;
  };
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  var successIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>';
  var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  var notificationContainer = null;
  function getNotificationContainer() {
    if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "tc-notification-container";
      uiContainer.appendChild(notificationContainer);
    }
    return notificationContainer;
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
      notification.classList.add("tc-notification-fade-out");
      notification.addEventListener("animationend", () => {
        notification.remove();
        if (notificationContainer && notificationContainer.childElementCount === 0) {
          notificationContainer.remove();
          notificationContainer = null;
        }
      });
    });
    return notification;
  }
  function showNotification(message, { type = "info", duration = appConfig.ui.notificationDuration } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);
    container.appendChild(notification);
    const timer = setTimeout(() => {
      const closeButton2 = notification.querySelector(".tc-notification-close");
      if (closeButton2) {
        closeButton2.click();
      }
    }, duration);
    const closeButton = notification.querySelector(".tc-notification-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        clearTimeout(timer);
      });
    }
  }
  var simpleTemplate = (template, values) => {
    if (!template) return "";
    return template.replace(/{(\w+)}/g, (match, key) => {
      return values.hasOwnProperty(key) ? values[key] : match;
    });
  };
  // src/shared/ui/mainModal/modalState.js
  var modalOverlay = null;
  var outputTextarea = null;
  var lineNumbersDiv = null;
  var statsContainer = null;
  var placeholder = null;
  var loadingContainer = null;
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
  function setCanvasContext(context) {
    canvasContext = context;
  }
  function setCurrentLineMap(map) {
    currentLineMap = map;
  }
  function setCurrentMode(mode) {
    currentMode = mode;
  }
  var isRecording = false;
  var sessionTexts =  new Set();
  var observer = null;
  var onTextAddedCallback = null;
  function processAndAddText(rawText, textSet, filterRules) {
    if (!rawText || typeof rawText !== "string") return false;
    const normalizedText = rawText.normalize("NFC");
    let textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n").trim();
    if (textForFiltering === "") return false;
    const filterReason = shouldFilter(textForFiltering, filterRules);
    if (filterReason) {
      log(`\u6587\u672C\u5DF2\u8FC7\u6EE4: "${textForFiltering}" (\u539F\u56E0: ${filterReason})`);
      return false;
    }
    const originalSize = textSet.size;
    textSet.add(normalizedText.replace(/(\r\n|\n|\r)+/g, "\n"));
    return textSet.size > originalSize;
  }
  var handleMutations = (mutations) => {
    const { filterRules } = loadSettings();
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.closest(ignoredSelectorString)) return;
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const textNode = walker.currentNode;
          if (processAndAddText(textNode.nodeValue, sessionTexts, filterRules)) {
            const newCount = sessionTexts.size;
            log(`[\u4F1A\u8BDD\u626B\u63CF] \u65B0\u589E: "${textNode.nodeValue.trim()}" (\u5F53\u524D\u603B\u6570: ${newCount})`);
            if (onTextAddedCallback) {
              onTextAddedCallback(newCount);
            }
          }
        }
      });
    });
  };
  var start = (onUpdate) => {
    if (isRecording) return;
    log("\u4F1A\u8BDD\u626B\u63CF\uFF1A\u521D\u59CB\u626B\u63CF\u5F00\u59CB...");
    isRecording = true;
    sessionTexts.clear();
    onTextAddedCallback = onUpdate || null;
    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();
    initialTexts.forEach((text) => {
      if (processAndAddText(text, sessionTexts, filterRules)) {
        const newCount = sessionTexts.size;
        log(`[\u4F1A\u8BDD\u626B\u63CF] \u65B0\u589E: "${text.trim()}" (\u5F53\u524D\u603B\u6570: ${newCount})`);
        if (onTextAddedCallback) {
          onTextAddedCallback(newCount);
        }
      }
    });
    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
  };
  var stop = () => {
    if (!isRecording) return [];
    log("[\u4F1A\u8BDD\u626B\u63CF] \u5DF2\u505C\u6B62\u3002");
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    isRecording = false;
    onTextAddedCallback = null;
    return getSessionTexts();
  };
  var isSessionRecording = () => isRecording;
  var getSessionTexts = () => Array.from(sessionTexts);
  function clearSessionTexts() {
    sessionTexts.clear();
    log("[\u4F1A\u8BDD\u626B\u63CF] \u4F1A\u8BDD\u6570\u636E\u5DF2\u6E05\u7A7A\u3002");
  }
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
  function createIconTitle(iconSVG, text) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    if (iconSVG) {
      const iconWrapper = document.createElement("span");
      iconWrapper.style.display = "flex";
      iconWrapper.style.alignItems = "center";
      const svgElement = createSVGFromString(iconSVG);
      if (svgElement) {
        iconWrapper.appendChild(svgElement);
        container.appendChild(iconWrapper);
      }
    }
    const textNode = document.createElement("span");
    textNode.textContent = text;
    container.appendChild(textNode);
    return container;
  }
  var titleContainer;
  function rerenderHeaderTexts() {
    if (!titleContainer) return;
    titleContainer.replaceChildren();
    const newTitleElement = createIconTitle(summaryIcon, t("results.title"));
    titleContainer.appendChild(newTitleElement);
  }
  function populateModalHeader(modalHeader, closeCallback) {
    titleContainer = document.createElement("div");
    titleContainer.id = "main-modal-title-container";
    const closeBtn = document.createElement("span");
    closeBtn.className = "tc-close-button text-extractor-modal-close";
    closeBtn.appendChild(createSVGFromString(closeIcon));
    rerenderHeaderTexts();
    modalHeader.appendChild(titleContainer);
    modalHeader.appendChild(closeBtn);
    closeBtn.addEventListener("click", closeCallback);
    on("languageChanged", rerenderHeaderTexts);
  }
  var loadingSpinner = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite"/>
    </path>
  </svg>
`;
  var placeholder2;
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
    modalContent.appendChild(textareaContainer);
    modalContent.appendChild(loadingContainer2);
    on("languageChanged", rerenderPlaceholder);
  }
  function showLoading() {
    if (loadingContainer) loadingContainer.classList.add("is-visible");
    if (outputTextarea) outputTextarea.disabled = true;
  }
  function hideLoading() {
    if (loadingContainer) loadingContainer.classList.remove("is-visible");
    if (outputTextarea) outputTextarea.disabled = false;
  }
  var copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg>`;
  var clearIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-40v-280q0-83 58.5-141.5T320-520h40v-320q0-33 23.5-56.5T440-920h80q33 0 56.5 23.5T600-840v320h40q83 0 141.5 58.5T840-320v280H120Zm80-80h80v-120q0-17 11.5-28.5T320-280q17 0 28.5 11.5T360-240v120h80v-120q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240v120h80v-120q0-17 11.5-28.5T640-280q17 0 28.5 11.5T680-240v120h80v-200q0-50-35-85t-85-35H320q-50 0-85 35t-35 85v200Zm320-400v-320h-80v320h80Zm0 0h-80 80Z"/></svg>`;
  var clearIcon_default = clearIcon;
  var modalContainer = null;
  var resolvePromise = null;
  function showConfirmationModal(text, iconSVG) {
    return new Promise((resolve) => {
      resolvePromise = resolve;
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
        const confirmButton = document.createElement("button");
        confirmButton.className = "confirmation-modal-button confirm";
        confirmButton.textContent = t("common.confirm");
        const cancelButton = document.createElement("button");
        cancelButton.className = "confirmation-modal-button cancel";
        cancelButton.textContent = t("common.cancel");
        buttonContainer.append(cancelButton, confirmButton);
        modalContent.append(iconContainer, textContainer, buttonContainer);
        modalContainer.append(modalContent);
        uiContainer.append(modalContainer);
        confirmButton.addEventListener("click", () => handleConfirmation(true));
        cancelButton.addEventListener("click", () => handleConfirmation(false));
        modalContainer.addEventListener("click", (e) => {
          if (e.target === modalContainer) {
            handleConfirmation(false);
          }
        });
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
        modalContainer.remove();
        modalContainer = null;
        if (resolvePromise) {
          resolvePromise(confirmed);
          resolvePromise = null;
        }
      }, 300);
    }
  }
  var warningIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>`;
  var warningIcon_default = warningIcon;
  var clearBtn;
  var copyBtn;
  function rerenderFooterTexts() {
    if (copyBtn) {
      copyBtn.replaceChildren();
      copyBtn.appendChild(createIconTitle(copyIcon, t("common.copy")));
    }
    if (clearBtn) {
      clearBtn.replaceChildren();
      clearBtn.appendChild(createIconTitle(clearIcon_default, t("common.clear")));
    }
    updateStatistics();
  }
  function populateModalFooter(modalFooter, updateContentCallback, clearSessionCallback) {
    const statsContainer2 = document.createElement("div");
    statsContainer2.className = "tc-stats-container";
    setStatsContainer(statsContainer2);
    const footerButtonContainer = document.createElement("div");
    footerButtonContainer.className = "tc-footer-buttons";
    clearBtn = document.createElement("button");
    clearBtn.className = "text-extractor-clear-btn tc-button";
    clearBtn.disabled = true;
    copyBtn = document.createElement("button");
    copyBtn.className = "text-extractor-copy-btn tc-button";
    copyBtn.disabled = true;
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);
    modalFooter.appendChild(statsContainer2);
    modalFooter.appendChild(footerButtonContainer);
    rerenderFooterTexts();
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      if (textToCopy && !copyBtn.disabled) {
        log(`\u590D\u5236\u6309\u94AE\u88AB\u70B9\u51FB\uFF0C\u590D\u5236\u4E86 ${textToCopy.length} \u4E2A\u5B57\u7B26\u3002`);
        setClipboard(textToCopy);
        showNotification(t("notifications.copiedToClipboard"), { type: "success" });
      } else {
        log("\u590D\u5236\u6309\u94AE\u88AB\u70B9\u51FB\uFF0C\u4F46\u6CA1\u6709\u5185\u5BB9\u53EF\u590D\u5236\u6216\u6309\u94AE\u88AB\u7981\u7528\u3002");
        showNotification(t("notifications.nothingToCopy"), { type: "info" });
      }
    });
    clearBtn.addEventListener("click", async () => {
      if (clearBtn.disabled) return;
      const confirmed = await showConfirmationModal(
        t("confirmation.clear"),
        warningIcon_default
      );
      if (confirmed) {
        if (currentMode === "session-scan" && clearSessionCallback) {
          log("\u7528\u6237\u786E\u8BA4\u6E05\u7A7A\u4F1A\u8BDD\u626B\u63CF\u6587\u672C\uFF0C\u6B63\u5728\u8C03\u7528\u56DE\u8C03...");
          clearSessionCallback();
          updateContentCallback(SHOW_PLACEHOLDER, true, "session-scan");
        } else {
          log("\u7528\u6237\u786E\u8BA4\u6E05\u7A7A\u5FEB\u901F\u626B\u63CF\u6587\u672C\u3002");
          updateContentCallback(SHOW_PLACEHOLDER, false, "quick-scan");
        }
        showNotification(t("notifications.contentCleared"), { type: "success" });
      } else {
        log("\u7528\u6237\u53D6\u6D88\u4E86\u6E05\u7A7A\u64CD\u4F5C\u3002");
      }
    });
    on("languageChanged", rerenderFooterTexts);
  }
  function updateStatistics() {
    if (!statsContainer || !outputTextarea) return;
    const text = outputTextarea.value;
    const lineCount = text.split("\n").length;
    const charCount = text.length;
    statsContainer.textContent = `${t("results.stats.lines")}: ${lineCount} | ${t("results.stats.chars")}: ${charCount}`;
  }
  function calcStringLines(sentence, width) {
    if (!width || !canvasContext) return 1;
    const words = sentence.split("");
    let lineCount = 0;
    let currentLine = "";
    for (let i = 0; i < words.length; i++) {
      const wordWidth = canvasContext.measureText(words[i]).width;
      const lineWidth = canvasContext.measureText(currentLine).width;
      if (lineWidth + wordWidth > width) {
        lineCount++;
        currentLine = words[i];
      } else {
        currentLine += words[i];
      }
    }
    if (currentLine.trim() !== "" || sentence === "") {
      lineCount++;
    }
    return lineCount;
  }
  function calcLines() {
    const lines = outputTextarea.value.split("\n");
    const textareaStyles = window.getComputedStyle(outputTextarea);
    const paddingLeft = parseFloat(textareaStyles.paddingLeft);
    const paddingRight = parseFloat(textareaStyles.paddingRight);
    const textareaContentWidth = outputTextarea.clientWidth - paddingLeft - paddingRight;
    let lineNumbers = [];
    let lineMap = [];
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
    return { lineNumbers, lineMap };
  }
  function updateActiveLine() {
    if (!lineNumbersDiv || !lineNumbersDiv.classList.contains("is-visible") || !outputTextarea) return;
    const textarea = outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;
    const textBeforeCursor = text.substring(0, selectionEnd);
    const cursorRealLineIndex = textBeforeCursor.split("\n").length - 1;
    const realLines = text.split("\n");
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
    if (firstVisualIndexOfRealLine === -1) return;
    const finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;
    const lineDivs = lineNumbersDiv.children;
    for (let i = 0; i < lineDivs.length; i++) {
      lineDivs[i].classList.remove("is-active");
    }
    if (lineDivs[finalVisualLineIndex]) {
      lineDivs[finalVisualLineIndex].classList.add("is-active");
    }
  }
  function updateLineNumbers() {
    if (!lineNumbersDiv || !outputTextarea) return;
    const { lineNumbers, lineMap } = calcLines();
    setCurrentLineMap(lineMap);
    const lineElements = lineNumbers.map((line) => {
      const div = document.createElement("div");
      div.textContent = line === "" ? "\xA0" : line;
      return div;
    });
    lineNumbersDiv.replaceChildren(...lineElements);
    updateActiveLine();
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
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  function createMainModal({ clearSessionCallback }) {
    if (modalOverlay) return;
    const { modalHeader, modalContent, modalFooter } = createModalLayout();
    populateModalHeader(modalHeader, closeModal);
    populateModalContent(modalContent);
    populateModalFooter(modalFooter, updateModalContent, clearSessionCallback);
    initializeLineNumbers();
    const handleTextareaUpdate = () => {
      updateLineNumbers();
      updateStatistics();
    };
    outputTextarea.addEventListener("input", handleTextareaUpdate);
    outputTextarea.addEventListener("click", updateActiveLine);
    outputTextarea.addEventListener("keyup", updateActiveLine);
    outputTextarea.addEventListener("scroll", () => {
      lineNumbersDiv.scrollTop = outputTextarea.scrollTop;
    });
    updateModalAddonsVisibility();
  }
  function openModal() {
    if (!modalOverlay) {
      console.error(t("notifications.modalInitError"));
      return;
    }
    log("\u6B63\u5728\u6253\u5F00\u4E3B\u6A21\u6001\u6846...");
    updateModalContent(SHOW_LOADING, true, "quick-scan");
    setTimeout(() => {
      const extractedTexts = extractAndProcessText();
      const formattedText = formatTextsForTranslation(extractedTexts);
      updateModalContent(formattedText, false, "quick-scan");
      const copyBtn2 = modalOverlay.querySelector(".text-extractor-copy-btn");
      if (copyBtn2) {
        copyBtn2.disabled = !formattedText;
      }
      const notificationText = simpleTemplate(t("scan.quickFinished"), { count: extractedTexts.length });
      showNotification(notificationText, { type: "success" });
    }, 50);
  }
  function closeModal() {
    if (modalOverlay && modalOverlay.classList.contains("is-visible")) {
      log("\u6B63\u5728\u5173\u95ED\u4E3B\u6A21\u6001\u6846...");
      modalOverlay.classList.remove("is-visible");
      modalOverlay.removeEventListener("keydown", handleKeyDown);
    }
  }
  function updateModalContent(content, shouldOpen = false, mode = "quick-scan") {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    setCurrentMode(mode);
    const copyBtn2 = modalOverlay.querySelector(".text-extractor-copy-btn");
    const clearBtn2 = modalOverlay.querySelector(".text-extractor-clear-btn");
    const textareaContainer = outputTextarea.parentElement;
    const setButtonsDisabled = (disabled) => {
      if (copyBtn2) copyBtn2.disabled = disabled;
      if (clearBtn2) {
        clearBtn2.disabled = isSessionRecording() || disabled;
      }
    };
    if (content === SHOW_LOADING) {
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      outputTextarea.value = "";
      showLoading();
      setButtonsDisabled(true);
    } else if (content === SHOW_PLACEHOLDER) {
      hideLoading();
      textareaContainer.classList.remove("is-visible");
      placeholder.classList.add("is-visible");
      setButtonsDisabled(true);
    } else {
      hideLoading();
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      const isData = content && content.trim().length > 0;
      outputTextarea.value = content;
      setButtonsDisabled(!isData);
      outputTextarea.readOnly = !isData;
      outputTextarea.dispatchEvent(new Event("input"));
      setTimeout(updateActiveLine, 0);
    }
    updateModalAddonsVisibility();
    if (shouldOpen) {
      modalOverlay.classList.add("is-visible");
      modalOverlay.addEventListener("keydown", handleKeyDown);
      modalOverlay.focus();
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
  }
  function handleQuickScanClick() {
    openModal();
  }
  var counterElement = null;
  function createCounterElement() {
    if (counterElement) return;
    counterElement = document.createElement("div");
    counterElement.className = "tc-live-counter";
    uiContainer.appendChild(counterElement);
  }
  function showLiveCounter() {
    createCounterElement();
    requestAnimationFrame(() => {
      counterElement.classList.add("tc-live-counter-visible");
    });
    updateLiveCounter(0);
  }
  function hideLiveCounter() {
    if (!counterElement) return;
    counterElement.classList.remove("tc-live-counter-visible");
  }
  function updateLiveCounter(count) {
    if (!counterElement) return;
    while (counterElement.firstChild) {
      counterElement.removeChild(counterElement.firstChild);
    }
    const textNode = document.createTextNode(t("common.discovered"));
    const countSpan = document.createElement("span");
    countSpan.textContent = count;
    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
  }
  var stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-280v-400h400v400H280Z"/></svg>`;
  function handleSummaryClick() {
    const results = getSessionTexts();
    if (results.length === 0) {
      updateModalContent(SHOW_PLACEHOLDER, true, "session-scan");
    } else {
      const formattedText = formatTextsForTranslation(results);
      updateModalContent(formattedText, true, "session-scan");
    }
  }
  function handleDynamicExtractClick(dynamicFab2) {
    if (isSessionRecording()) {
      const results = stop();
      setFabIcon(dynamicFab2, dynamicIcon);
      dynamicFab2.classList.remove("is-recording");
      dynamicFab2.title = t("scan.startSession");
      hideLiveCounter();
      const notificationText = simpleTemplate(t("scan.finished"), { count: results.length });
      showNotification(notificationText, { type: "success" });
    } else {
      setFabIcon(dynamicFab2, stopIcon);
      dynamicFab2.classList.add("is-recording");
      dynamicFab2.title = t("scan.stopSession");
      showNotification(t("scan.sessionStarted"), { type: "info" });
      showLiveCounter();
      setTimeout(() => {
        start(updateLiveCounter);
      }, 50);
    }
  }
  function initUI() {
    const settings = loadSettings();
    createMainModal({
      clearSessionCallback: clearSessionTexts
    });
    createFab({
      callbacks: {
        onStaticExtract: handleQuickScanClick,
        onDynamicExtract: handleDynamicExtractClick,
        onSummary: handleSummaryClick
      },
      isVisible: settings.showFab
    });
  }
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
  var arrowDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
  var CustomSelect = class {
        constructor(parentElement, options, initialValue) {
      this.parentElement = parentElement;
      this.options = options;
      this.currentValue = initialValue;
      this.isOpen = false;
      this.render();
      this.bindEvents();
    }
        render() {
      this.container = document.createElement("div");
      this.container.className = "custom-select-container";
      this.trigger = document.createElement("div");
      this.trigger.className = "custom-select-trigger";
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
        updateSelectedContent(option) {
      while (this.selectedContent.firstChild) {
        this.selectedContent.removeChild(this.selectedContent.firstChild);
      }
      const content = createIconTitle(option.icon, option.label);
      this.selectedContent.appendChild(content);
    }
        bindEvents() {
      this.trigger.addEventListener("click", () => this.toggle());
      this.optionsContainer.addEventListener("click", (e) => {
        const optionEl = e.target.closest(".custom-select-option");
        if (optionEl) {
          this.select(optionEl.dataset.value);
        }
      });
    }
        handleDocumentClick = (e) => {
      const path = e.composedPath();
      if (!path.includes(this.container)) {
        this.close();
      }
    };
        toggle() {
      this.isOpen = !this.isOpen;
      this.container.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        document.addEventListener("click", this.handleDocumentClick, true);
      } else {
        document.removeEventListener("click", this.handleDocumentClick, true);
      }
    }
        close() {
      if (this.isOpen) {
        this.isOpen = false;
        this.container.classList.remove("open");
        document.removeEventListener("click", this.handleDocumentClick, true);
      }
    }
        select(value) {
      if (value === this.currentValue) {
        this.close();
        return;
      }
      this.currentValue = value;
      const selectedOption = this.options.find((opt) => opt.value === value);
      this.updateSelectedContent(selectedOption);
      this.optionsContainer.querySelector(".custom-select-option.selected")?.classList.remove("selected");
      const newSelectedOptionEl = this.optionsContainer.querySelector(`[data-value="${value}"]`);
      if (newSelectedOptionEl) {
        newSelectedOptionEl.classList.add("selected");
      }
      this.close();
    }
        getValue() {
      return this.currentValue;
    }
        updateOptions(newOptions) {
      this.options = newOptions;
      while (this.optionsContainer.firstChild) {
        this.optionsContainer.removeChild(this.optionsContainer.firstChild);
      }
      this.populateOptions();
      const currentSelectedOption = this.options.find((opt) => opt.value === this.currentValue);
      if (currentSelectedOption) {
        this.updateSelectedContent(currentSelectedOption);
      }
    }
  };
  var systemThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
  var lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
  var darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
  function createCheckbox(id, labelText, isChecked) {
    const label = document.createElement("label");
    label.className = "checkbox-group";
    label.htmlFor = id;
    label.appendChild(document.createTextNode(labelText));
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
  function buildPanelDOM(settings) {
    const modal = document.createElement("div");
    modal.className = "settings-panel-modal";
    const header = document.createElement("div");
    header.className = "settings-panel-header";
    const titleContainer2 = document.createElement("div");
    titleContainer2.id = "settings-panel-title-container";
    const closeBtn = document.createElement("span");
    closeBtn.className = "tc-close-button settings-panel-close";
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer2);
    header.appendChild(closeBtn);
    const content = document.createElement("div");
    content.className = "settings-panel-content";
    selectSettingsDefinitions.forEach((definition) => {
      const selectItem = document.createElement("div");
      selectItem.className = "setting-item";
      const titleContainer3 = document.createElement("div");
      titleContainer3.id = `${definition.id}-title-container`;
      titleContainer3.className = "setting-title-container";
      const selectWrapper = document.createElement("div");
      selectWrapper.id = `${definition.id}-wrapper`;
      selectItem.appendChild(titleContainer3);
      selectItem.appendChild(selectWrapper);
      content.appendChild(selectItem);
    });
    const relatedItem = document.createElement("div");
    relatedItem.className = "setting-item";
    const relatedTitleContainer = document.createElement("div");
    relatedTitleContainer.id = "related-setting-title-container";
    relatedTitleContainer.className = "setting-title-container";
    relatedItem.appendChild(relatedTitleContainer);
    relatedSettingsDefinitions.forEach((setting) => {
      const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key]);
      relatedItem.appendChild(checkboxElement);
    });
    const filterItem = document.createElement("div");
    filterItem.className = "setting-item";
    const filterTitleContainer = document.createElement("div");
    filterTitleContainer.id = "filter-setting-title-container";
    filterTitleContainer.className = "setting-title-container";
    filterItem.appendChild(filterTitleContainer);
    filterDefinitions.forEach((filter) => {
      const checkboxElement = createCheckbox(filter.id, t(filter.label), settings.filterRules[filter.key]);
      filterItem.appendChild(checkboxElement);
    });
    content.appendChild(relatedItem);
    content.appendChild(filterItem);
    const footer = document.createElement("div");
    footer.className = "settings-panel-footer";
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-settings-btn";
    saveBtn.className = "tc-button";
    footer.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);
    return modal;
  }
  var settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>`;
  var filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>`;
  var saveIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;
  var relatedSettingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-280h320v-400H320v400Zm80-80v-240h160v240H400Zm40-120h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
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
    const savedLang = settings.language;
    if (savedLang && savedLang !== "auto") {
      if (isLanguageSupported(savedLang)) {
        langToSet = savedLang;
      }
    } else {
      const browserLang = navigator.language;
      if (isLanguageSupported(browserLang)) {
        langToSet = browserLang;
      }
    }
    setLanguage(langToSet);
  }
  function switchLanguage(langCode) {
    if (isLanguageSupported(langCode)) {
      setLanguage(langCode);
      const settings = loadSettings();
      settings.language = langCode;
      saveSettings(settings);
    }
  }
  var settingsPanel = null;
  var selectComponents = {};
  var handleKeyDown2 = (event) => {
    if (event.key === "Escape") {
      hideSettingsPanel();
    }
  };
  function showSettingsPanel() {
    log("\u6B63\u5728\u6253\u5F00\u8BBE\u7F6E\u9762\u677F...");
    if (settingsPanel) {
      setTimeout(() => settingsPanel.classList.add("is-visible"), 10);
      return;
    }
    const currentSettings = loadSettings();
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.tabIndex = -1;
    const panelModal = buildPanelDOM(currentSettings);
    settingsPanel.appendChild(panelModal);
    uiContainer.appendChild(settingsPanel);
    setTimeout(() => {
      if (settingsPanel) settingsPanel.classList.add("is-visible");
    }, 10);
    const titleContainer2 = settingsPanel.querySelector("#settings-panel-title-container");
    titleContainer2.appendChild(createIconTitle(settingsIcon, t("settings.title")));
    selectComponents = {};
    selectSettingsDefinitions.forEach((definition) => {
      const titleContainer3 = settingsPanel.querySelector(`#${definition.id}-title-container`);
      titleContainer3.appendChild(createIconTitle(definition.icon, t(definition.label)));
      const selectWrapper = settingsPanel.querySelector(`#${definition.id}-wrapper`);
      const options = definition.options.map((opt) => ({
        ...opt,
        label: t(opt.label),
        ...definition.key === "theme" && {
          "system": systemThemeIcon,
          "light": lightThemeIcon,
          "dark": darkThemeIcon
        }[opt.value]
      }));
      selectComponents[definition.key] = new CustomSelect(selectWrapper, options, currentSettings[definition.key]);
    });
    const relatedTitleContainer = settingsPanel.querySelector("#related-setting-title-container");
    relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t("settings.relatedSettings")));
    const filterTitleContainer = settingsPanel.querySelector("#filter-setting-title-container");
    filterTitleContainer.appendChild(createIconTitle(filterIcon, t("settings.filterRules")));
    const saveBtn = settingsPanel.querySelector("#save-settings-btn");
    saveBtn.appendChild(createIconTitle(saveIcon, t("common.save")));
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    saveBtn.addEventListener("click", handleSave);
    settingsPanel.addEventListener("keydown", handleKeyDown2);
    settingsPanel.focus();
  }
  function hideSettingsPanel() {
    if (settingsPanel && settingsPanel.classList.contains("is-visible")) {
      log("\u6B63\u5728\u5173\u95ED\u8BBE\u7F6E\u9762\u677F...");
      settingsPanel.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.classList.remove("is-visible");
      setTimeout(() => {
        if (settingsPanel) {
          settingsPanel.remove();
          settingsPanel = null;
          selectComponents = {};
        }
      }, 300);
    }
  }
  function handleSave() {
    log("\u6B63\u5728\u4FDD\u5B58\u8BBE\u7F6E...");
    const newSettings = {};
    for (const key in selectComponents) {
      newSettings[key] = selectComponents[key].getValue();
    }
    const newFilterRules = {};
    filterDefinitions.forEach((filter) => {
      const checkbox = settingsPanel.querySelector(`#${filter.id}`);
      if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });
    const newRelatedSettings = {};
    relatedSettingsDefinitions.forEach((setting) => {
      const checkbox = settingsPanel.querySelector(`#${setting.id}`);
      if (checkbox) newRelatedSettings[setting.key] = checkbox.checked;
    });
    Object.assign(newSettings, newRelatedSettings, { filterRules: newFilterRules });
    const oldSettings = loadSettings();
    const languageChanged = oldSettings.language !== newSettings.language;
    updateLoggerState(newSettings.enableDebugLogging);
    saveSettings(newSettings);
    applyTheme(newSettings.theme);
    if (languageChanged) {
      switchLanguage(newSettings.language);
    }
    const fabContainer = uiContainer.querySelector(".text-extractor-fab-container");
    if (fabContainer) {
      fabContainer.classList.toggle("fab-container-visible", newSettings.showFab);
    }
    updateModalAddonsVisibility();
    showNotification(t("notifications.settingsSaved"), { type: "success" });
    hideSettingsPanel();
  }
  function initSettingsPanel() {
    if (window.top === window.self) {
      (async () => {
        await updateSettingsMenu(showSettingsPanel);
      })();
      on("languageChanged", async () => {
        await updateSettingsMenu(showSettingsPanel);
      });
    }
  }
  function initialize() {
    initSettingsPanel();
  }
  function main() {
    const settings = loadSettings();
    initializeLanguage(settings);
    updateLoggerState(settings.enableDebugLogging);
    log("\u811A\u672C\u5F00\u59CB\u521D\u59CB\u5316...");
    log("\u521D\u59CB\u8BBE\u7F6E\u5DF2\u52A0\u8F7D:", settings);
    const styleElement = document.createElement("style");
    styleElement.textContent = `/* src/assets/themes.css */
/* \u8FD9\u4E2A\u6587\u4EF6\u53EA\u5B9A\u4E49\u989C\u8272\u53D8\u91CF\u548C\u4E3B\u9898\u5207\u6362\u903B\u8F91 */
:host {
  /* \u6D45\u8272\u6A21\u5F0F\u989C\u8272\u53D8\u91CF */
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
  --color-tooltip-bg: #333333; /* \u63D0\u793A\u80CC\u666F */
  --color-tooltip-text: #ffffff; /* \u63D0\u793A\u6587\u672C */
  --color-line-number-text: #888888; /* \u884C\u53F7\u6587\u672C */
  --color-line-number-active-text: #000000; /* \u6FC0\u6D3B\u884C\u53F7\u6587\u672C */
  /* \u6DF1\u8272\u6A21\u5F0F\u989C\u8272\u53D8\u91CF */
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
  --dark-color-tooltip-bg: #e0e0e0; /* \u63D0\u793A\u80CC\u666F */
  --dark-color-tooltip-text: #111111; /* \u63D0\u793A\u6587\u672C */
  --dark-color-line-number-text: #777777; /* \u884C\u53F7\u6587\u672C */
  --dark-color-line-number-active-text: #ffffff; /* \u6FC0\u6D3B\u884C\u53F7\u6587\u672C */
}
/* \u6839\u636E data-theme \u5C5E\u6027\u5E94\u7528\u6D45\u8272\u4E3B\u9898 */
:host([data-theme='light']) {
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
  --main-tooltip-bg: var(--color-tooltip-bg);
  --main-tooltip-text: var(--color-tooltip-text);
  --main-disabled: #cccccc;
  --main-disabled-text: #666666;
  --main-line-number-text: var(--color-line-number-text);
  --main-line-number-active-text: var(--color-line-number-active-text);
}
/* \u6839\u636E data-theme \u5C5E\u6027\u5E94\u7528\u6DF1\u8272\u4E3B\u9898 */
:host([data-theme='dark']) {
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
  --main-tooltip-bg: var(--dark-color-tooltip-bg);
  --main-tooltip-text: var(--dark-color-tooltip-text);
  --main-disabled: #444444;
  --main-disabled-text: #888888;
  --main-line-number-text: var(--dark-color-line-number-text);
  --main-line-number-active-text: var(--dark-color-line-number-active-text);
}
/* --- From confirmationModal.css --- */
/* src/assets/styles/confirmationModal.css */
/*
  \u6B64\u6587\u4EF6\u7684\u6837\u5F0F\u73B0\u5728\u5C06\u901A\u8FC7JS\u76F4\u63A5\u6CE8\u5165\u5230\u7EC4\u4EF6\u4E2D\uFF0C
  \u4E0D\u518D\u4F9D\u8D56\u4E8E\u5916\u90E8CSS\u53D8\u91CF\uFF0C\u4EE5\u786E\u4FDD\u7EDD\u5BF9\u7684\u6837\u5F0F\u5C01\u88C5\u3002
*/
.confirmation-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--main-overlay-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.confirmation-modal-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}
.confirmation-modal-content {
  background-color: var(--main-bg);
  color: var(--main-text);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 320px;
  box-shadow: 0 10px 30px var(--main-shadow);
  transform: scale(0.95);
  transition: transform 0.3s ease;
}
.confirmation-modal-overlay.is-visible .confirmation-modal-content {
    transform: scale(1);
}
.confirmation-modal-icon {
  margin-bottom: 20px;
}
.confirmation-modal-icon svg {
  width: 56px;
  height: 56px;
  fill: var(--main-text);
}
.confirmation-modal-text {
  font-size: 16px;
  margin: 0 0 25px;
  line-height: 1.6;
}
.confirmation-modal-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.confirmation-modal-button {
  border: none;
  padding: 12px 24px;
  border-radius: 9999px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.confirmation-modal-button:hover {
    /* \u79FB\u9664\u5411\u4E0A\u79FB\u52A8\u7684\u6548\u679C */
}
.confirmation-modal-button.confirm {
  background-color: var(--main-primary);
  color: var(--main-primary-text);
}
.confirmation-modal-button.confirm:hover {
  background-color: var(--main-primary-hover);
}
.confirmation-modal-button.cancel {
  background-color: transparent;
  color: var(--main-text);
  border: 1px solid var(--main-border);
}
.confirmation-modal-button.cancel:hover {
  background-color: var(--main-shadow);
}
/* --- From custom-select.css --- */
/* src/assets/styles/custom-select.css */
.custom-select-container {
  position: relative;
  width: 100%;
  user-select: none;
}
.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--main-textarea-border);
  border-radius: 8px;
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.custom-select-trigger:hover {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.1);
}
.custom-select-container.open .custom-select-trigger {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
}
.custom-select-arrow {
  transition: transform 0.3s ease;
  transform-origin: center;
}
.custom-select-container.open .custom-select-arrow {
  transform: rotate(180deg);
}
.custom-select-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--main-bg);
  border: 1px solid var(--main-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--main-shadow);
  z-index: 10003; /* \u6BD4\u8BBE\u7F6E\u9762\u677F\u9AD8\u4E00\u7EA7 */
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
  visibility: hidden;
}
.custom-select-container.open .custom-select-options {
  visibility: visible;
  opacity: 1;
  max-height: 200px; /* \u6216\u8005\u4E00\u4E2A\u8DB3\u591F\u5927\u7684\u503C */
}
.custom-select-option {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 8px;
}
.custom-select-option:hover {
  background-color: var(--main-border);
}
.custom-select-option.selected {
  font-weight: 600;
  color: var(--main-primary);
}
.custom-select-option .option-icon {
    display: flex;
    align-items: center;
}
/* --- From forms.css --- */
/* src/assets/styles/forms.css */
/* --- \u53EF\u590D\u7528\u7684\u6309\u94AE\u6837\u5F0F --- */
.tc-button {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 999px; /* \u5B8C\u5168\u5706\u89D2\uFF0C\u80F6\u56CA\u5F62\u72B6 */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.tc-button:hover {
  background-color: var(--main-primary-hover);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.tc-button:active {
  transform: scale(0.97);
}
.tc-button:disabled {
  background-color: var(--main-disabled);
  color: var(--main-disabled-text);
  cursor: not-allowed;
  box-shadow: none;
}
/* --- \u53EF\u590D\u7528\u7684\u6587\u672C\u6846\u6837\u5F0F --- */
.tc-textarea {
  width: 100%;
  height: 100%;
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  border-radius: 8px;
  padding: 12px;
  padding-right: 18px; /* \u4E3A\u6EDA\u52A8\u6761\u8F68\u9053\u7559\u51FA\u7A7A\u95F4 */
  font-family: Menlo, Monaco,'Cascadia Code','PingFang SC';
  font-size: 14px;
  resize: none; /* \u7981\u7528\u62D6\u62FD\u8C03\u6574\u5927\u5C0F */
  box-sizing: border-box;
  line-height: 1.5;
}
.tc-textarea:focus {
  outline: none;
}
/* \u81EA\u5B9A\u4E49\u6EDA\u52A8\u6761\u6837\u5F0F */
.tc-textarea::-webkit-scrollbar {
  width: 6px; /* \u66F4\u7EC6\u7684\u6EDA\u52A8\u6761 */
}
.tc-textarea::-webkit-scrollbar-track {
  background: transparent; /* \u8F68\u9053\u900F\u660E */
}
.tc-textarea::-webkit-scrollbar-thumb {
  background-color: var(--main-border);
  border-radius: 3px;
}
.tc-textarea::-webkit-scrollbar-thumb:hover {
  background-color: var(--main-primary);
}
.tc-textarea::-webkit-scrollbar-button {
  display: none; /* \u9690\u85CF\u4E0A\u4E0B\u4E24\u7AEF\u7684\u7BAD\u5934\u6309\u94AE */
}
/* --- \u53EF\u590D\u7528\u7684\u4E0B\u62C9\u83DC\u5355\u6837\u5F0F --- */
.tc-select {
  /* Box model and appearance */
  display: block;
  width: 100%;
  padding: 10px 36px 10px 12px; /* \u53F3\u4FA7\u7559\u51FA\u66F4\u591A\u7A7A\u95F4\u7ED9\u7BAD\u5934 */
  border: 1px solid var(--main-textarea-border);
  border-radius: 8px;
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  font-size: 14px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* Custom arrow icon */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M8 11L2 5h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px; /* \u7A0D\u5FAE\u589E\u5927\u7BAD\u5934\u5C3A\u5BF8 */
  /* Transitions */
  transition: border-color 0.2s, box-shadow 0.2s;
}
.tc-select:hover {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px var(--main-primary-hover-bg, rgba(30, 144, 255, 0.1));
}
/* --- From live-counter.css --- */
/* src/assets/styles/live-counter.css */
.tc-live-counter {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translate(-50%, -150%); /* \u521D\u59CB\u4F4D\u7F6E\u5728\u5C4F\u5E55\u5916\u4E0A\u65B9 */
    z-index: 2147483646; /* \u6BD4\u901A\u77E5\u4F4E\u4E00\u7EA7 */
    display: flex; /* \u4FDD\u6301flex\u5E03\u5C40 */
    align-items: center;
    padding: 8px 16px;
    border-radius: 20px; /* \u5706\u89D2 */
    background-color: rgba(0, 0, 0, 0.7); /* \u534A\u900F\u660E\u80CC\u666F */
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 8px var(--main-shadow, rgba(0, 0, 0, 0.2));
    border: 1px solid var(--main-border, rgba(255, 255, 255, 0.2));
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    opacity: 0; /* \u9ED8\u8BA4\u4E0D\u53EF\u89C1 */
    pointer-events: none; /* \u9ED8\u8BA4\u4E0D\u53EF\u4EA4\u4E92 */
}
.tc-live-counter.tc-live-counter-visible {
    transform: translate(-50%, 0); /* \u52A8\u753B\u7ED3\u675F\u4F4D\u7F6E */
    opacity: 1; /* \u53D8\u5F97\u53EF\u89C1 */
    pointer-events: auto; /* \u53D8\u5F97\u53EF\u4EA4\u4E92 */
}
.tc-live-counter span {
    min-width: 20px;
    text-align: center;
    margin-left: 8px;
    padding: 2px 6px;
    background-color: var(--main-overlay-bg, rgba(255, 255, 255, 0.2));
    border-radius: 10px;
}
/* --- From loading.css --- */
.gm-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}
.gm-loading-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}
.gm-loading-spinner svg {
  width: 48px;
  height: 48px;
  color: var(--color-icon);
}
/* --- From main-ui.css --- */
/* src/assets/styles/main-ui.css */
/* --- \u60AC\u6D6E\u64CD\u4F5C\u6309\u94AE\u5BB9\u5668 --- */
.text-extractor-fab-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column; /* \u5782\u76F4\u6392\u5217 */
    align-items: center;
    gap: 12px; /* \u6309\u94AE\u4E4B\u95F4\u7684\u95F4\u8DDD */
    z-index: 9999;
    opacity: 0; /* \u521D\u59CB\u900F\u660E */
    visibility: hidden; /* \u521D\u59CB\u9690\u85CF */
    transition: opacity 0.3s ease, visibility 0.3s;
}
.text-extractor-fab-container.fab-container-visible {
    opacity: 1; /* \u6700\u7EC8\u4E0D\u900F\u660E */
    visibility: visible; /* \u6700\u7EC8\u53EF\u89C1 */
}
/* --- \u5355\u4E2A\u60AC\u6D6E\u64CD\u4F5C\u6309\u94AE (FAB) --- */
.text-extractor-fab {
    position: relative; /* \u4E3ASVG\u5B9A\u4F4D\u63D0\u4F9B\u57FA\u51C6 */
    width: 56px;
    height: 56px;
    background-color: var(--main-primary);
    border-radius: 50%;
    box-shadow: 0 4px 8px var(--main-shadow);
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
    color: var(--main-primary-text); /* SVG \u56FE\u6807\u5C06\u7EE7\u627F\u8FD9\u4E2A\u989C\u8272 */
    border: 1px solid var(--main-border); /* \u6DFB\u52A0\u63CF\u8FB9 */
}
.text-extractor-fab:hover {
    background-color: var(--main-primary-hover);
    transform: scale(1.05);
    box-shadow: 0 6px 12px var(--main-shadow);
}
.text-extractor-fab:active {
    transform: scale(0.95); /* \u70B9\u51FB\u65F6\u7F29\u5C0F */
    transition-duration: 0.1s;
}
.text-extractor-fab svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 26px;
    fill: currentColor; /* \u5173\u952E\uFF1A\u8BA9 SVG \u7684 fill \u989C\u8272\u7EE7\u627F\u81EA\u7236\u5143\u7D20\u7684 color \u5C5E\u6027 */
}
/* --- \u6587\u672C\u63D0\u53D6\u6A21\u6001\u6846 --- */
.text-extractor-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  /* --- \u65B0\u589E\uFF1A\u52A8\u753B\u76F8\u5173\u5C5E\u6027 --- */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
  pointer-events: none; /* \u65B0\u589E\uFF1A\u9ED8\u8BA4\u4E0D\u62E6\u622A\u9F20\u6807\u4E8B\u4EF6 */
}
/* \u65B0\u589E\uFF1A\u53EF\u89C1\u72B6\u6001 */
.text-extractor-modal-overlay.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto; /* \u65B0\u589E\uFF1A\u53EF\u89C1\u65F6\u6062\u590D\u4E8B\u4EF6\u62E6\u622A */
}
.text-extractor-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  width: 80%; max-width: 700px; max-height: 80vh;
  border-radius: 16px; /* \u589E\u5927\u4E86\u5706\u89D2 */
  box-shadow: 0 5px 15px var(--main-shadow);
  display: flex;
  flex-direction: column;
  /* --- \u65B0\u589E\uFF1A\u52A8\u753B\u76F8\u5173\u5C5E\u6027 --- */
  transform: scale(0.95);
  transition: transform 0.3s ease;
}
/* \u65B0\u589E\uFF1A\u53EF\u89C1\u72B6\u6001\u4E0B\u7684\u6A21\u6001\u6846\u6837\u5F0F */
.text-extractor-modal-overlay.is-visible .text-extractor-modal {
    transform: scale(1);
}
.text-extractor-modal-header {
  padding: 18px;
  border-bottom: 1px solid var(--main-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--main-text);
}
/* --- \u53EF\u590D\u7528\u7684\u5173\u95ED\u6309\u94AE --- */
.tc-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--main-text);
  background-color: transparent;
  transition: background-color 0.2s, transform 0.15s;
}
.tc-close-button:hover {
  background-color: var(--main-border);
}
.tc-close-button:active {
  transform: scale(0.9);
  background-color: var(--main-border);
}
.text-extractor-modal-content {
  padding: 18px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex; /* \u65B0\u589E\uFF1A\u542F\u7528flexbox\u5E03\u5C40 */
  position: relative; /* \u65B0\u589E\uFF1A\u4E3A\u5B50\u5143\u7D20\u7684\u7EDD\u5BF9\u5B9A\u4F4D\u63D0\u4F9B\u57FA\u51C6 */
}
/* \u65B0\u589E\uFF1A\u6587\u672C\u533A\u57DF\u5BB9\u5668\u7684\u52A8\u753B\u6837\u5F0F */
.tc-textarea-container {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    width: 100%; /* \u786E\u4FDD\u5B83\u586B\u6EE1\u7236\u5BB9\u5668 */
    height: 100%;
    display: flex; /* \u4FDD\u6301\u5176flex\u5E03\u5C40 */
    box-sizing: border-box; /* \u65B0\u589E\uFF1A\u4FEE\u6B63\u5C3A\u5BF8\u8BA1\u7B97 */
}
.tc-textarea-container.is-visible {
    opacity: 1;
    visibility: visible;
}
.text-extractor-modal-footer {
  padding: 18px;
  border-top: 1px solid var(--main-border);
  display: flex;
  justify-content: space-between; /* \u4FEE\u6539\uFF1A\u8BA9\u5185\u5BB9\u4E24\u7AEF\u5BF9\u9F50 */
  align-items: center;
}
/* --- \u9875\u811A\u6309\u94AE\u5BB9\u5668 --- */
.tc-footer-buttons {
    display: flex;
    align-items: center;
    gap: 10px; /* \u65B0\u589E\uFF1A\u6309\u94AE\u4E4B\u95F4\u7684\u95F4\u8DDD */
}
/* --- \u52A8\u6001\u626B\u63CF\u6309\u94AE\u7684\u6FC0\u6D3B\u72B6\u6001 --- */
.text-extractor-fab.fab-dynamic.is-recording {
    background-color: #f39c12; /* \u6A59\u8272 */
    animation: tc-breathing 2s ease-in-out infinite;
}
.text-extractor-fab.fab-dynamic.is-recording:hover {
    background-color: #e67e22; /* \u6DF1\u4E00\u70B9\u7684\u6A59\u8272 */
}
@keyframes tc-breathing {
    0% {
        box-shadow: 0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0.4);
    }
    70% {
        box-shadow: 0 4px 12px var(--main-shadow), 0 0 0 10px rgba(243, 156, 18, 0);
    }
    100% {
        box-shadow: 0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0);
    }
}
/* --- From modal-addons.css --- */
/* src/assets/styles/modal-addons.css */
/* --- \u6587\u672C\u533A\u57DF\u5BB9\u5668 --- */
.tc-textarea-container {
    display: flex;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--main-textarea-border);
    border-radius: 8px;
}
/* --- \u884C\u53F7\u533A\u57DF --- */
.tc-line-numbers {
    width: 40px;
    padding: 10px 0; /* \u79FB\u9664\u5DE6\u53F3padding\uFF0C\u7531max-width\u63A7\u5236 */
    text-align: right;
    max-width: 0;
    opacity: 0;
    margin-right: 0;
    transition: max-width 0.3s ease, opacity 0.3s ease, padding 0.3s ease, margin-right 0.3s ease;
    color: var(--main-line-number-text);
    background-color: var(--tc-secondary-bg-color);
    overflow: hidden; /* \u9690\u85CF\u81EA\u8EAB\u7684\u6EDA\u52A8\u6761 */
    user-select: none; /* \u9632\u6B62\u7528\u6237\u9009\u4E2D\u884C\u53F7 */
    font-family: Menlo, Monaco,'Cascadia Code','PingFang SC';
    font-size: 14px; /* \u4E0E\u6587\u672C\u6846\u5B57\u4F53\u5927\u5C0F\u4E00\u81F4 */
    line-height: 1.5; /* \u4E0E\u6587\u672C\u6846\u884C\u9AD8\u4E00\u81F4 */
    border-right: 1px solid var(--tc-border-color);
    box-sizing: border-box;
}
.tc-line-numbers > div {
    white-space: nowrap;
    padding: 0 4px;
    box-sizing: border-box;
}
.tc-line-numbers > div.is-active {
    font-weight: bold;
    color: var(--main-line-number-active-text);
}
/* --- \u8C03\u6574\u539F\u59CB\u6587\u672C\u6846\u6837\u5F0F --- */
.tc-textarea-container .tc-textarea {
    border: none;
    border-radius: 0;
    flex-grow: 1;
    resize: none;
    line-height: 1.5;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
}
.tc-textarea-container .tc-textarea:focus {
    outline: none; /* \u79FB\u9664\u9ED8\u8BA4\u7684\u805A\u7126\u8F6E\u5ED3 */
    box-shadow: none;
}
.tc-line-numbers.is-visible {
    max-width: 40px;
    opacity: 1;
    padding: 10px 4px;
    margin-right: 4px; /* \u6DFB\u52A0\u4E00\u4E9B\u95F4\u8DDD */
}
/* --- \u7EDF\u8BA1\u4FE1\u606F\u5BB9\u5668 --- */
.tc-stats-container {
    font-size: 14px;
    font-family: Menlo, Monaco,'Cascadia Code','PingFang SC';
    color: var(--tc-secondary-text-color);
    display: flex;
    align-items: center;
    flex-grow: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.tc-stats-container.is-visible {
    opacity: 1;
    visibility: visible;
}
/* --- From notification.css --- */
/* src/assets/notification.css */
.tc-notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.tc-notification {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: var(--main-bg, #fff);
    color: var(--main-text, #333);
    box-shadow: 0 4px 12px var(--main-shadow, rgba(0, 0, 0, 0.15));
    border: 1px solid var(--main-border, #eee);
    width: 320px;
    opacity: 0;
    transform: translateX(100%);
    animation: tc-notification-fade-in 0.5s forwards;
    transition: box-shadow 0.3s;
}
.tc-notification:hover {
    box-shadow: 0 6px 16px var(--main-shadow, rgba(0, 0, 0, 0.2));
}
.tc-notification-icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
}
.tc-notification-icon svg {
    width: 20px;
    height: 20px;
}
.tc-notification-info .tc-notification-icon {
    color: #3498db;
}
.tc-notification-success .tc-notification-icon {
    color: #2ecc71;
}
.tc-notification-content {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.4;
}
.tc-notification-close {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
    padding: 4px;
}
.tc-notification-close:hover {
    opacity: 1;
}
.tc-notification-close svg {
    width: 16px;
    height: 16px;
    stroke: var(--main-text, #333);
}
@keyframes tc-notification-fade-in {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
.tc-notification-fade-out {
    animation: tc-notification-fade-out 0.5s forwards;
}
@keyframes tc-notification-fade-out {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
/* --- From placeholder.css --- */
/* src/assets/styles/placeholder.css */
#modal-placeholder {
    display: flex; /* \u6539\u4E3Aflex\u4EE5\u4FBF\u5E94\u7528flex\u5C5E\u6027 */
    opacity: 0; /* \u521D\u59CB\u900F\u660E */
    visibility: hidden; /* \u521D\u59CB\u9690\u85CF */
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out; /* \u8FC7\u6E21\u6548\u679C */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--text-color-secondary);
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute; /* \u8BA9\u5B83\u548C\u6587\u672C\u533A\u57DF\u91CD\u53E0 */
    top: 0;
    left: 0;
}
#modal-placeholder.is-visible {
    opacity: 1; /* \u53EF\u89C1\u72B6\u6001 */
    visibility: visible;
}
.placeholder-icon {
    color: var(--text-color-secondary); /* \u5C06\u989C\u8272\u8BBE\u7F6E\u79FB\u5230\u8FD9\u91CC */
}
.placeholder-icon svg {
    width: 48px;
    height: 48px;
    /* fill \u5C5E\u6027\u73B0\u5728\u7531 "currentColor" \u5728SVG\u4EE3\u7801\u4E2D\u63A7\u5236\uFF0C\u4F1A\u81EA\u52A8\u7EE7\u627F\u7236\u5143\u7D20\u7684color */
}
#modal-placeholder p {
    margin: 4px 0;
    font-size: 14px;
}
.placeholder-actions {
    display: flex;
    align-items: center;
    gap: 6px; /* \u56FE\u6807\u548C\u6587\u5B57\u4E4B\u95F4\u7684\u95F4\u8DDD */
    color: var(--text-color-primary);
}
.placeholder-action-icon svg {
    width: 18px;
    height: 18px;
    fill: currentColor; /* \u7EE7\u627F\u7236\u5143\u7D20\u989C\u8272 */
    vertical-align: middle;
}
#modal-placeholder strong {
    font-weight: 600;
}
/* --- From settings-panel.css --- */
/* src/assets/styles/settings-panel.css */
.settings-panel-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10002;
  display: flex;
  justify-content: center;
  align-items: center;
  /* --- \u65B0\u589E\uFF1A\u52A8\u753B\u76F8\u5173\u5C5E\u6027 --- */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
}
/* \u65B0\u589E\uFF1A\u53EF\u89C1\u72B6\u6001 */
.settings-panel-overlay.is-visible {
    opacity: 1;
    visibility: visible;
}
.settings-panel-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  border: 1px solid var(--main-border);
  border-radius: 16px; /* \u589E\u5927\u5706\u89D2 */
  box-shadow: 0 5px 15px var(--main-shadow);
  width: 90%;
  max-width: 400px;
  max-height: 85vh; /* \u4E0E\u4E3B\u6A21\u6001\u6846\u4FDD\u6301\u4E00\u81F4 */
  display: flex; /* \u542F\u7528flexbox\u4EE5\u63A7\u5236\u5185\u90E8\u5E03\u5C40 */
  flex-direction: column; /* \u5782\u76F4\u5E03\u5C40 */
  /* --- \u65B0\u589E\uFF1A\u52A8\u753B\u76F8\u5173\u5C5E\u6027 --- */
  transform: scale(0.95);
  transition: transform 0.3s ease;
}
/* \u65B0\u589E\uFF1A\u53EF\u89C1\u72B6\u6001\u4E0B\u7684\u6A21\u6001\u6846\u6837\u5F0F */
.settings-panel-overlay.is-visible .settings-panel-modal {
    transform: scale(1);
}
.settings-panel-header, .settings-panel-content, .settings-panel-footer {
  padding: 20px;
}
.settings-panel-content {
    /* \u5BF9\u5185\u5BB9\u533A\u57DF\u7684padding\u505A\u5FAE\u8C03\uFF0C\u4EE5\u9002\u5E94\u6EDA\u52A8\u6761\uFF0C\u5E76\u786E\u4FDD\u89C6\u89C9\u4E0A\u4E0E\u5176\u4ED6\u90E8\u5206\u5BF9\u9F50 */
    padding-right: 18px;
    overflow-y: auto; /* \u5F53\u5185\u5BB9\u6EA2\u51FA\u65F6\u663E\u793A\u6EDA\u52A8\u6761 */
    flex-grow: 1; /* \u5360\u636E\u6240\u6709\u53EF\u7528\u5782\u76F4\u7A7A\u95F4 */
}
.settings-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--main-border);
  font-weight: bold;
  font-size: 18px;
}
/* \u5173\u95ED\u6309\u94AE\u7684\u65E7\u6837\u5F0F\u5DF2\u88AB .tc-close-button \u66FF\u4EE3\uFF0C\u6B64\u5904\u53EF\u5220\u9664\u6216\u7559\u7A7A */
.settings-panel-close {}
.setting-item { margin-bottom: 16px; }
.setting-item > label { display: block; margin-bottom: 8px; font-weight: 500; }
/* -- \u8BBE\u7F6E\u5206\u7EC4\u6807\u9898\u7684\u7EDF\u4E00\u65B0\u6837\u5F0F -- */
.setting-title-container {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}
/* -- \u5168\u65B0\u91CD\u6784\u7684\u81EA\u5B9A\u4E49\u590D\u9009\u6846\u6837\u5F0F -- */
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
/* \u5F7B\u5E95\u9690\u85CF\u539F\u751F\u7684\u590D\u9009\u6846 */
.checkbox-group input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* \u521B\u5EFA\u4E00\u4E2A\u5047\u7684\u590D\u9009\u6846\u5BB9\u5668 */
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
/* \u5F53\u9F20\u6807\u60AC\u505C\u65F6\uFF0C\u7ED9\u4E00\u4E2A\u53CD\u9988 */
.checkbox-group:hover input ~ .checkmark {
  border-color: var(--main-primary);
}
/* \u5F53\u590D\u9009\u6846\u88AB\u9009\u4E2D\u65F6\uFF0C\u6539\u53D8\u80CC\u666F\u548C\u8FB9\u6846\u989C\u8272 */
.checkbox-group input:checked ~ .checkmark {
  background-color: var(--main-primary);
  border-color: var(--main-primary);
}
/* \u521B\u5EFA\u52FE\u9009\u6807\u8BB0 (\u2713)\uFF0C\u9ED8\u8BA4\u9690\u85CF */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* \u5F53\u590D\u9009\u6846\u88AB\u9009\u4E2D\u65F6\uFF0C\u663E\u793A\u52FE\u9009\u6807\u8BB0 */
.checkbox-group input:checked ~ .checkmark:after {
  display: block;
}
/* \u52FE\u9009\u6807\u8BB0\u7684\u6837\u5F0F */
.checkbox-group .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--main-bg);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
/* -- \u7ED3\u675F\u81EA\u5B9A\u4E49\u590D\u9009\u6846\u6837\u5F0F -- */
.settings-panel-footer {
  border-top: 1px solid var(--main-border);
  text-align: right;
}
/* -- \u4E3A\u8BBE\u7F6E\u9762\u677F\u5185\u5BB9\u533A\u57DF\u5E94\u7528\u81EA\u5B9A\u4E49\u6EDA\u52A8\u6761 -- */
.settings-panel-content::-webkit-scrollbar {
  width: 6px;
}
.settings-panel-content::-webkit-scrollbar-track {
  background: transparent;
}
.settings-panel-content::-webkit-scrollbar-thumb {
  background-color: var(--main-border);
  border-radius: 3px;
}
.settings-panel-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--main-primary);
}
.settings-panel-content::-webkit-scrollbar-button {
  display: none;
}
/* --- From tooltip.css --- */
/* src/assets/styles/tooltip.css */
.text-extractor-tooltip {
    position: fixed;
    z-index: 10001; /* \u6BD4\u60AC\u6D6E\u6309\u94AE\u66F4\u9AD8 */
    background-color: var(--main-tooltip-bg);
    color: var(--main-tooltip-text);
    padding: 8px 12px;
    border-radius: 16px;
    border: 1px solid var(--main-border);
    font-size: 14px;
    font-weight: bold;
    pointer-events: none; /* \u786E\u4FDD\u63D0\u793A\u672C\u8EAB\u4E0D\u4F1A\u5E72\u6270\u9F20\u6807\u4E8B\u4EF6 */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s;
    box-shadow: 0 2px 5px var(--main-shadow);
    white-space: nowrap; /* \u9632\u6B62\u6587\u672C\u6362\u884C */
}
.text-extractor-tooltip.is-visible {
    opacity: 1;
    visibility: visible;
}
`;
    uiContainer.appendChild(styleElement);
    "use strict";
    initTheme();
    initialize();
    initUI();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();