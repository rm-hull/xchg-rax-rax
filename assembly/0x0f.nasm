.loop:
    xor      byte [rsi],al
    lodsb
    loop     .loop