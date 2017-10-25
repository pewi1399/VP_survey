library(dplyr)
library(jsonlite)

data  <- openxlsx::read.xlsx("data/VP_svar.xlsx")



data$id <- data$namn

lakedata <- 
  data %>% 
    mutate(value = volym) %>% 
  select(id, value)

writeLines(paste0("var lakedata = ", toJSON(lakedata)), "data/lakedata.js")

wardata <- 
  data %>% 
  mutate(value = hundra) %>% 
  select(id, value)

writeLines(paste0("var wardata = ", toJSON(wardata)), "data/wardata.js")

data  <- openxlsx::read.xlsx("data/bitcoin.xlsx")
names(data) <- c("Date", "ClosePrice", "Name")
head(data)
data$Date <- gsub("'", "", data$Date)

writeLines(paste0("var coinguess = ", toJSON(data)), "data/coinguessdata.js")
