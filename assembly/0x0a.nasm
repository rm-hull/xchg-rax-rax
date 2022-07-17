    add      byte [rdi],1
.loop:
    inc      rdi
    adc      byte [rdi],0
    loop     .loop