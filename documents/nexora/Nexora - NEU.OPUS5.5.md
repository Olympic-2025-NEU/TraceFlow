# Nexora

**Nền tảng ERP nguồn mở tích hợp truy xuất nguồn gốc và liên thông chuỗi cung ứng theo kiến trúc phân tán**

# LỜI NÓI ĐẦU

Trong bối cảnh cuộc Cách mạng công nghiệp lần thứ tư và quá trình chuyển đổi số đang diễn ra mạnh mẽ, việc ứng dụng công nghệ thông tin vào hoạt động quản trị, sản xuất và kinh doanh ngày càng trở thành một yêu cầu quan trọng đối với sự phát triển của doanh nghiệp. Các hệ thống quản trị nguồn lực doanh nghiệp (Enterprise Resource Planning – ERP), phần mềm quản lý bán hàng (Point of Sale – POS) và những nền tảng quản lý chuỗi cung ứng đã góp phần nâng cao hiệu quả vận hành, tối ưu hóa nguồn lực và hỗ trợ doanh nghiệp từng bước chuẩn hóa các quy trình nghiệp vụ.

Tuy nhiên, cùng với sự phát triển của các giải pháp quản trị doanh nghiệp, những thách thức liên quan đến tính liên thông dữ liệu, khả năng kiểm soát chất lượng và truy xuất nguồn gốc sản phẩm vẫn đang đặt ra nhiều vấn đề cần được giải quyết. Trong thực tế, một sản phẩm trước khi đến tay người tiêu dùng thường phải trải qua nhiều công đoạn, từ cung ứng nguyên liệu, sản xuất, kiểm định, lưu kho, vận chuyển, phân phối đến bán lẻ. Các công đoạn này có thể được thực hiện bởi nhiều doanh nghiệp độc lập, sử dụng những hệ thống quản lý và phương thức tổ chức dữ liệu khác nhau. Điều đó khiến thông tin về nguồn gốc, quá trình lưu chuyển và trạng thái chất lượng sản phẩm có nguy cơ bị phân tán, thiếu sự liên kết và khó xác minh một cách xuyên suốt.

Bên cạnh đó, nhiều giải pháp phần mềm quản trị hiện nay được cung cấp theo mô hình Software as a Service (SaaS), trong đó đơn vị cung cấp phần mềm chịu trách nhiệm vận hành nền tảng và doanh nghiệp sử dụng dịch vụ thông qua Internet. Mô hình này mang lại nhiều lợi ích về khả năng triển khai nhanh và giảm gánh nặng quản trị hạ tầng. Tuy nhiên, đối với những doanh nghiệp có nhu cầu chủ động kiểm soát dữ liệu, tùy biến nghiệp vụ hoặc tích hợp sâu với hệ thống nội bộ, việc phụ thuộc vào kiến trúc, chính sách và khả năng mở rộng của nhà cung cấp có thể tạo ra những hạn chế nhất định.

Trong khi đó, các giải pháp phần mềm nguồn mở tạo điều kiện để doanh nghiệp tiếp cận mã nguồn, chủ động triển khai, nghiên cứu, điều chỉnh và phát triển hệ thống theo nhu cầu thực tế. Việc áp dụng mô hình triển khai độc lập theo từng doanh nghiệp còn cho phép tổ chức tự quản lý hạ tầng, cơ sở dữ liệu và các chính sách vận hành, đồng thời giảm sự phụ thuộc vào một nền tảng dịch vụ tập trung.

Xuất phát từ những vấn đề trên, nhóm lựa chọn nghiên cứu và phát triển đề tài **“Nexora – Nền tảng ERP nguồn mở tích hợp truy xuất nguồn gốc và liên thông chuỗi cung ứng theo kiến trúc phân tán”**.

Nexora được định hướng xây dựng như một hệ thống quản trị doanh nghiệp tích hợp, cung cấp các nghiệp vụ cốt lõi như quản lý sản phẩm, mua hàng, bán hàng, quản lý kho, quản lý khách hàng và quy trình phê duyệt. Trên nền tảng đó, hệ thống phát triển các chức năng chuyên sâu về quản lý lô sản phẩm, kiểm soát chất lượng, ghi nhận sự kiện truy xuất và theo dõi quá trình lưu chuyển hàng hóa xuyên suốt các công đoạn trong chuỗi cung ứng.

Khác với mô hình SaaS được vận hành tập trung, Nexora hướng tới phương thức phân phối dưới dạng phần mềm nguồn mở, cho phép mỗi doanh nghiệp chủ động triển khai một phiên bản hệ thống độc lập trên hạ tầng của mình. Mỗi bản triển khai có cơ sở dữ liệu, người dùng, cấu hình và phạm vi quản trị riêng, đồng thời có khả năng quản lý nhiều chi nhánh, kho hàng và bộ phận trực thuộc cùng một tổ chức.

Một trong những định hướng trọng tâm của dự án là phát triển khả năng liên thông dữ liệu truy xuất giữa các doanh nghiệp mà không yêu cầu các bên phải sử dụng chung một nền tảng vận hành tập trung. Thông qua các giao diện lập trình ứng dụng (API), cơ chế trao đổi sự kiện nghiệp vụ và chính sách chia sẻ dữ liệu có kiểm soát, các hệ thống Nexora độc lập có thể thiết lập quan hệ với nhau để liên kết thông tin về nguồn gốc, quá trình sản xuất, phân phối và tiêu thụ sản phẩm.

Theo mô hình này, khi một sản phẩm được bán tại cửa hàng thông qua hệ thống POS, dữ liệu giao dịch có thể được liên kết với thông tin lô hàng và lịch sử truy xuất từ các đơn vị tham gia chuỗi cung ứng. Người tiêu dùng có thể sử dụng mã QR hoặc đường dẫn truy xuất để tiếp cận những thông tin nguồn gốc được phép công bố. Đồng thời, khi phát sinh vấn đề về chất lượng, doanh nghiệp có thể sử dụng các dữ liệu và quan hệ đã ghi nhận để xác định phạm vi ảnh hưởng, hỗ trợ tổ chức kiểm tra, cách ly hoặc thu hồi sản phẩm theo quy trình phù hợp.

Bên cạnh chức năng quản lý và truy xuất, Nexora chú trọng vai trò của con người và quy trình nghiệp vụ trong hoạt động kiểm soát dữ liệu. Các nghiệp vụ như tiếp nhận hàng hóa, kiểm định chất lượng, phê duyệt nhập kho, xác nhận bàn giao và xử lý sự cố được định hướng quản lý theo những quy trình có trạng thái, điều kiện thực hiện và trách nhiệm rõ ràng. Mỗi hoạt động quan trọng có thể được liên kết với người thực hiện, thời gian, tài liệu và bằng chứng tương ứng, góp phần nâng cao khả năng truy vết và kiểm soát hoạt động doanh nghiệp.

Dự án đồng thời nghiên cứu ứng dụng trí tuệ nhân tạo (Artificial Intelligence – AI) để hỗ trợ trích xuất và đối chiếu chứng từ, phát hiện dấu hiệu bất thường trong dữ liệu chuỗi cung ứng, phân tích rủi ro và cung cấp thông tin phục vụ quá trình điều tra sự cố. AI được xác định là thành phần hỗ trợ phân tích và ra quyết định, trong khi các hoạt động xác minh dữ liệu, kiểm soát giao dịch và phê duyệt nghiệp vụ vẫn phải tuân theo những quy tắc hệ thống và trách nhiệm của con người.

Về phương diện công nghệ, Nexora được định hướng phát triển trên nền tảng các công nghệ nguồn mở, tuân theo nguyên tắc thiết kế mô-đun, khả năng tích hợp thông qua API và kiến trúc DX-OS Open-Core. Các thành phần cốt lõi được tổ chức theo hướng có thể tái sử dụng, mở rộng và triển khai độc lập, tạo điều kiện để cộng đồng lập trình viên, doanh nghiệp và các tổ chức nghiên cứu tham gia đóng góp, cải tiến và phát triển hệ thống.

Thông qua dự án Nexora, nhóm mong muốn vận dụng kiến thức về phân tích và thiết kế hệ thống, phát triển phần mềm, quản trị cơ sở dữ liệu, kiến trúc hệ thống phân tán và trí tuệ nhân tạo để xây dựng một sản phẩm có tính ứng dụng thực tiễn. Đồng thời, dự án hướng tới việc nghiên cứu một mô hình ERP nguồn mở không chỉ hỗ trợ quản lý hoạt động nội bộ mà còn có khả năng kết nối các doanh nghiệp độc lập, góp phần nâng cao tính minh bạch, khả năng kiểm soát chất lượng và hiệu quả phối hợp trong chuỗi cung ứng.

Đề tài được thực hiện trong khuôn khổ định hướng tham gia **Olympic Tin học Sinh viên Việt Nam 2026 – Nội dung Phần mềm nguồn mở**, đồng thời được xem là tiền đề cho việc tiếp tục nghiên cứu, hoàn thiện và phát triển Nexora thành một nền tảng quản trị doanh nghiệp nguồn mở có khả năng mở rộng và ứng dụng trong thực tế.

# CHƯƠNG 1. BỐI CẢNH VÀ LÝ DO LỰA CHỌN ĐỀ TÀI

## 1.1. Bối cảnh chuyển đổi số trong hoạt động quản trị doanh nghiệp

Trong bối cảnh nền kinh tế số ngày càng phát triển, việc ứng dụng công nghệ thông tin vào hoạt động quản trị, sản xuất và kinh doanh đã trở thành một trong những yếu tố quan trọng giúp doanh nghiệp nâng cao hiệu quả vận hành, tăng cường năng lực cạnh tranh và thích ứng với sự thay đổi của thị trường.

Quá trình chuyển đổi số không chỉ được thể hiện thông qua việc thay thế các phương pháp quản lý thủ công bằng phần mềm, mà còn bao gồm việc chuẩn hóa quy trình nghiệp vụ, tổ chức dữ liệu tập trung, tăng cường khả năng phối hợp giữa các bộ phận và ứng dụng công nghệ để hỗ trợ hoạt động ra quyết định.

Trong đó, hệ thống quản trị nguồn lực doanh nghiệp (Enterprise Resource Planning – ERP) đóng vai trò quan trọng trong việc tích hợp các hoạt động quản lý lên một nền tảng thống nhất. Thông qua ERP, doanh nghiệp có thể quản lý nhiều nghiệp vụ như mua hàng, bán hàng, hàng hóa, tồn kho, nhà cung cấp, khách hàng, nhân sự và các hoạt động vận hành liên quan.

Bên cạnh ERP, các hệ thống quản lý bán hàng (Point of Sale – POS), quản lý kho (Warehouse Management System – WMS) và quản lý chuỗi cung ứng (Supply Chain Management – SCM) cũng được ứng dụng nhằm đáp ứng những nhu cầu chuyên biệt của từng loại hình kinh doanh.

Sự phát triển của các nền tảng này đã góp phần hình thành môi trường quản trị dựa trên dữ liệu, trong đó những giao dịch và hoạt động nghiệp vụ được ghi nhận, xử lý và tổng hợp để phục vụ công tác điều hành.

Tuy nhiên, trong thực tế, nhiều doanh nghiệp vẫn gặp khó khăn trong việc xây dựng một hệ thống quản trị phù hợp với đặc thù hoạt động, khả năng tài chính và hạ tầng công nghệ hiện có. Đặc biệt, khi doanh nghiệp mở rộng quy mô, phát triển nhiều chi nhánh hoặc tham gia vào các chuỗi cung ứng có nhiều đối tác độc lập, nhu cầu kết nối và chia sẻ dữ liệu trở nên phức tạp hơn.

Điều này đặt ra yêu cầu đối với các hệ thống quản trị doanh nghiệp thế hệ mới: không chỉ hỗ trợ số hóa hoạt động nội bộ, mà còn phải có khả năng tùy biến, tích hợp, mở rộng và trao đổi thông tin với những hệ thống bên ngoài.

## 1.2. Thực trạng triển khai các hệ thống ERP và những thách thức đặt ra

Hiện nay, doanh nghiệp có thể tiếp cận nhiều mô hình cung cấp và triển khai phần mềm quản trị khác nhau, từ phần mềm thương mại, giải pháp SaaS đến các nền tảng ERP nguồn mở.

Mỗi mô hình đều có những ưu điểm và hạn chế riêng, phù hợp với từng quy mô và nhu cầu sử dụng.

### 1.2.1. Sự phổ biến của mô hình SaaS trong quản trị doanh nghiệp

Software as a Service (SaaS) là mô hình cung cấp phần mềm dưới dạng dịch vụ, trong đó đơn vị cung cấp chịu trách nhiệm triển khai, vận hành và duy trì hệ thống. Doanh nghiệp sử dụng phần mềm thông qua Internet mà không cần trực tiếp quản lý toàn bộ hạ tầng kỹ thuật.

Mô hình SaaS mang lại nhiều lợi ích như giảm chi phí đầu tư hạ tầng ban đầu, rút ngắn thời gian triển khai, đơn giản hóa hoạt động bảo trì và tạo điều kiện để doanh nghiệp tiếp cận các giải pháp quản trị hiện đại.

Tuy nhiên, mô hình này cũng có thể tồn tại một số hạn chế đối với những doanh nghiệp có yêu cầu đặc thù.

Thứ nhất, khả năng tùy biến nghiệp vụ thường phụ thuộc vào phạm vi cấu hình và các chức năng mà nhà cung cấp cho phép. Những doanh nghiệp có quy trình quản lý riêng có thể gặp khó khăn khi cần thay đổi sâu cách thức vận hành của hệ thống.

Thứ hai, việc tích hợp với các ứng dụng nội bộ hoặc hệ thống của đối tác có thể phụ thuộc vào khả năng cung cấp API, chính sách truy cập dữ liệu và điều kiện kỹ thuật của nhà cung cấp.

Thứ ba, đối với các tổ chức có yêu cầu cao về quyền kiểm soát hạ tầng, chính sách lưu trữ dữ liệu hoặc khả năng triển khai trong mạng nội bộ, mô hình SaaS tập trung có thể không phải phương án phù hợp nhất.

Những hạn chế trên không đồng nghĩa SaaS là mô hình kém hiệu quả. Trên thực tế, SaaS vẫn là lựa chọn phù hợp đối với nhiều doanh nghiệp. Tuy nhiên, sự đa dạng về nhu cầu quản trị cho thấy cần có thêm những phương án triển khai linh hoạt để doanh nghiệp chủ động lựa chọn.

### 1.2.2. Nhu cầu chủ động triển khai và tùy biến hệ thống ERP

Đối với một số doanh nghiệp, khả năng chủ động kiểm soát hệ thống phần mềm là yếu tố quan trọng trong chiến lược phát triển hạ tầng công nghệ thông tin.

Doanh nghiệp có thể mong muốn tự lựa chọn môi trường triển khai, cấu hình cơ sở dữ liệu, điều chỉnh các chức năng nghiệp vụ hoặc phát triển thêm module phù hợp với hoạt động thực tế.

Đặc biệt, trong những lĩnh vực có quy trình quản lý phức tạp như sản xuất, phân phối, quản lý kho và kiểm soát chất lượng, hệ thống ERP cần có khả năng thích ứng với các quy tắc nghiệp vụ khác nhau.

Một doanh nghiệp có thể yêu cầu phiếu kiểm kho phải trải qua hai cấp phê duyệt, trong khi doanh nghiệp khác chỉ yêu cầu xác nhận của trưởng bộ phận. Tương tự, quy trình tiếp nhận nguyên liệu có thể cần bổ sung bước kiểm định chất lượng trước khi cho phép nhập kho hoặc sử dụng trong sản xuất.

Những yêu cầu này cho thấy nhu cầu phát triển các nền tảng ERP không chỉ cung cấp chức năng quản lý cơ bản, mà còn có khả năng cấu hình quy trình và mở rộng nghiệp vụ theo đặc điểm vận hành của từng tổ chức.

### 1.2.3. Tiềm năng của mô hình ERP nguồn mở và triển khai độc lập

Phần mềm nguồn mở (Open-Source Software) cho phép người sử dụng tiếp cận mã nguồn và thực hiện các quyền sử dụng, nghiên cứu, sửa đổi hoặc phân phối phần mềm theo điều kiện của giấy phép tương ứng.

Đối với doanh nghiệp, mô hình này tạo điều kiện để chủ động nghiên cứu kiến trúc hệ thống, triển khai trên hạ tầng phù hợp và phát triển thêm các chức năng chuyên biệt.

Khi kết hợp với mô hình Self-hosted Deployment, mỗi doanh nghiệp có thể vận hành một bản triển khai ERP độc lập với cơ sở dữ liệu, người dùng, cấu hình và chính sách quản trị riêng.

Phương thức triển khai này giúp giảm sự phụ thuộc vào một nền tảng SaaS vận hành tập trung, đồng thời tạo điều kiện để doanh nghiệp chủ động lựa chọn phương án bảo mật, sao lưu, bảo trì và nâng cấp hệ thống.

Tuy nhiên, việc tự triển khai phần mềm cũng đặt ra các yêu cầu về năng lực kỹ thuật, quản trị hạ tầng và trách nhiệm vận hành. Do đó, một giải pháp ERP nguồn mở cần được thiết kế với khả năng cài đặt thuận tiện, cấu hình rõ ràng, tài liệu đầy đủ và cơ chế cập nhật có kiểm soát.

Từ góc độ phát triển sản phẩm, đây là cơ sở để nghiên cứu một nền tảng ERP nguồn mở có khả năng triển khai độc lập, đồng thời vẫn duy trì tính thống nhất về kiến trúc và giao thức trao đổi dữ liệu.

## 1.3. Những hạn chế trong quản lý chuỗi cung ứng và truy xuất nguồn gốc sản phẩm

Bên cạnh các vấn đề về triển khai ERP, hoạt động quản lý chuỗi cung ứng và truy xuất nguồn gốc sản phẩm cũng đặt ra những thách thức đáng chú ý.

Trong thực tế, một sản phẩm có thể trải qua nhiều công đoạn và nhiều đơn vị khác nhau trước khi đến tay người tiêu dùng. Mỗi đơn vị chịu trách nhiệm đối với một phần hoạt động và thường sử dụng hệ thống quản lý riêng.

### 1.3.1. Dữ liệu sản phẩm phân tán giữa các doanh nghiệp

Chuỗi cung ứng thường bao gồm nhiều chủ thể như nhà cung cấp nguyên liệu, nhà sản xuất, đơn vị vận chuyển, nhà phân phối và doanh nghiệp bán lẻ.

Mỗi chủ thể có thể quản lý sản phẩm theo hệ thống mã định danh, cấu trúc dữ liệu và phương thức lưu trữ riêng.

Chẳng hạn, nhà sản xuất quản lý sản phẩm theo lô sản xuất, nhà phân phối quản lý theo phiếu nhập xuất kho, trong khi cửa hàng bán lẻ chủ yếu ghi nhận giao dịch dựa trên mã sản phẩm hoặc mã vạch.

Nếu thiếu cơ chế liên kết những thông tin này, việc truy xuất một sản phẩm qua nhiều tổ chức có thể phải thực hiện bằng phương pháp đối chiếu thủ công.

Điều này làm giảm hiệu quả khai thác dữ liệu, gây khó khăn trong việc xác định lịch sử lưu chuyển và tăng thời gian xử lý khi phát sinh sự cố.

### 1.3.2. Truy xuất nguồn gốc chưa được tích hợp đồng bộ với hoạt động ERP

Một số hệ thống quản trị doanh nghiệp đã hỗ trợ quản lý số lô, số serial và lịch sử nhập xuất kho. Tuy nhiên, khả năng truy xuất xuyên doanh nghiệp phụ thuộc vào việc các bên có cùng ghi nhận, duy trì và chia sẻ được những thông tin liên quan hay không.

Trong khi đó, một số giải pháp truy xuất nguồn gốc hoạt động như hệ thống độc lập, tập trung vào việc quản lý hồ sơ sản phẩm và cung cấp thông tin thông qua mã QR.

Khi dữ liệu truy xuất không được liên kết chặt chẽ với những giao dịch nghiệp vụ thực tế, doanh nghiệp có thể phải cập nhật thông tin ở nhiều hệ thống khác nhau.

Ví dụ, một sản phẩm đã được nhập kho và bán tại POS nhưng hệ thống truy xuất độc lập chưa được cập nhật sự kiện tương ứng. Khi đó, lịch sử truy xuất có thể không phản ánh đầy đủ tình trạng lưu chuyển của sản phẩm.

Vì vậy, việc tích hợp truy xuất nguồn gốc trực tiếp vào các nghiệp vụ ERP là một hướng tiếp cận có ý nghĩa thực tiễn, giúp hình thành dữ liệu truy xuất ngay tại thời điểm phát sinh giao dịch.

### 1.3.3. Khó khăn trong kiểm soát quy trình và trách nhiệm nghiệp vụ

Các hoạt động như tiếp nhận nguyên liệu, kiểm định chất lượng, kiểm kho, điều chuyển hàng hóa và xử lý hàng không đạt yêu cầu thường có sự tham gia của nhiều nhân viên hoặc bộ phận.

Trong những quy trình này, việc xác định người thực hiện, người kiểm tra, người phê duyệt và điều kiện hoàn tất từng bước có vai trò quan trọng.

Nếu quy trình thiếu sự kiểm soát thống nhất, có thể phát sinh những tình huống như hàng hóa được đưa vào sử dụng trước khi hoàn thành kiểm định, phiếu điều chỉnh tồn kho được thực hiện khi chưa được phê duyệt hoặc thông tin bàn giao giữa các bộ phận không đầy đủ.

Do đó, hệ thống ERP cần có khả năng quản lý vòng đời của các đối tượng nghiệp vụ, đồng thời liên kết các trạng thái xử lý với quyền hạn, trách nhiệm và bằng chứng thực hiện.

### 1.3.4. Hạn chế trong xử lý sự cố và thu hồi sản phẩm

Khi phát hiện một lô nguyên liệu hoặc thành phẩm có vấn đề về chất lượng, doanh nghiệp cần xác định lô đó đã được sử dụng trong quá trình sản xuất nào, được phân phối đến những địa điểm nào và đã phát sinh giao dịch bán hàng hay chưa.

Đối với các chuỗi cung ứng có nhiều đơn vị độc lập, việc xác định phạm vi ảnh hưởng có thể trở nên phức tạp do dữ liệu được phân tán ở nhiều hệ thống.

Nếu thiếu khả năng liên kết sự kiện và quan hệ giữa các lô hàng, quá trình thu thập thông tin có thể phải thực hiện thủ công, làm kéo dài thời gian xác minh và triển khai biện pháp xử lý.

Vấn đề đặt ra không chỉ là khả năng truy ngược nguồn gốc, mà còn là khả năng truy xuôi để xác định các đối tượng chịu ảnh hưởng và theo dõi toàn bộ quy trình xử lý sự cố.

### 1.3.5. Nhu cầu minh bạch thông tin đối với người tiêu dùng

Người tiêu dùng ngày càng có thêm các phương thức tiếp cận thông tin sản phẩm thông qua website, ứng dụng di động, mã vạch và mã QR.

Tuy nhiên, thông tin được công bố cần có nguồn dữ liệu rõ ràng và phải phân biệt giữa nội dung do doanh nghiệp tự khai báo với nội dung đã được xác minh bởi những bên có thẩm quyền hoặc tổ chức độc lập.

Một hệ thống truy xuất có giá trị không chỉ cần cung cấp thông tin dễ tiếp cận, mà còn cần thể hiện được nguồn gốc dữ liệu, lịch sử cập nhật và mức độ xác minh tương ứng.

Đây là cơ sở để phát triển cơ chế truy xuất gắn với các sự kiện nghiệp vụ, hồ sơ chất lượng và xác nhận giữa những chủ thể trong chuỗi cung ứng.

## 1.4. Lý do lựa chọn đề tài Nexora

Xuất phát từ nhu cầu hoàn thiện hệ thống quản trị doanh nghiệp và những hạn chế trong khả năng liên thông dữ liệu chuỗi cung ứng, nhóm lựa chọn nghiên cứu và phát triển đề tài:

**“Nexora – Nền tảng ERP nguồn mở tích hợp truy xuất nguồn gốc và liên thông chuỗi cung ứng theo kiến trúc phân tán.”**

Việc lựa chọn đề tài dựa trên năm cơ sở chính.

### 1.4.1. Giải quyết nhu cầu quản trị doanh nghiệp theo hướng tích hợp

Nexora được định hướng xây dựng thành một nền tảng ERP cung cấp các nghiệp vụ quản lý cốt lõi như sản phẩm, mua hàng, bán hàng, tồn kho, khách hàng và quy trình quản trị.

Thay vì phát triển một hệ thống truy xuất hoạt động hoàn toàn độc lập, Nexora tích hợp dữ liệu nguồn gốc và lịch sử lưu chuyển sản phẩm trực tiếp vào những hoạt động nghiệp vụ.

Qua đó, dữ liệu truy xuất có thể được hình thành trong quá trình vận hành thông thường của doanh nghiệp, hạn chế yêu cầu nhập liệu trùng lặp giữa ERP và hệ thống truy xuất.

### 1.4.2. Tăng quyền chủ động trong triển khai và phát triển phần mềm

Nexora được phát triển theo định hướng nguồn mở và triển khai độc lập theo từng doanh nghiệp.

Mỗi tổ chức có thể tự triển khai hệ thống trên hạ tầng phù hợp, quản lý cơ sở dữ liệu riêng và điều chỉnh các thành phần phần mềm theo điều kiện giấy phép.

Cách tiếp cận này tạo điều kiện để doanh nghiệp chủ động kiểm soát hệ thống và giảm sự phụ thuộc vào một đơn vị vận hành SaaS tập trung.

### 1.4.3. Nghiên cứu khả năng liên thông dữ liệu giữa các hệ thống độc lập

Một trong những vấn đề đáng nghiên cứu là khả năng kết nối các doanh nghiệp sử dụng những bản triển khai ERP độc lập.

Nexora hướng tới phát triển cơ chế trao đổi dữ liệu truy xuất theo kiến trúc liên thông phân tán (Federated Architecture), trong đó các tổ chức không cần sử dụng chung một cơ sở dữ liệu hoặc phụ thuộc vào một hệ thống ERP vận hành tập trung.

Các sự kiện liên quan đến sản xuất, xuất hàng, tiếp nhận và phân phối có thể được trao đổi thông qua những giao diện và cấu trúc dữ liệu được thống nhất, với cơ chế xác thực và phân quyền phù hợp.

### 1.4.4. Kết hợp truy xuất nguồn gốc với quản lý quy trình và chất lượng

Nexora không chỉ hướng tới việc theo dõi sản phẩm qua các công đoạn, mà còn chú trọng những quy trình kiểm tra, xác minh và phê duyệt liên quan.

Các nghiệp vụ quan trọng cần được quản lý theo trạng thái và điều kiện chuyển bước, đồng thời ghi nhận người thực hiện, người phê duyệt và tài liệu làm căn cứ.

Điều này tạo cơ sở để liên kết dữ liệu truy xuất với trách nhiệm của các bên tham gia và hỗ trợ tổ chức xử lý khi phát sinh vấn đề chất lượng.

### 1.4.5. Phù hợp định hướng nghiên cứu và phát triển phần mềm nguồn mở

Đề tài đặt ra nhiều bài toán kỹ thuật như quản trị dữ liệu doanh nghiệp, kiến trúc mô-đun, giao tiếp giữa các hệ thống độc lập, quản lý định danh, kiểm soát quy trình, xử lý sự kiện và ứng dụng trí tuệ nhân tạo.

Việc triển khai Nexora tạo điều kiện để nghiên cứu, kết hợp và ứng dụng các công nghệ nguồn mở trong một hệ thống có tính tích hợp cao.

Đồng thời, dự án phù hợp với định hướng DX-OS Open-Core thông qua việc xây dựng các dịch vụ lõi có khả năng tái sử dụng và cung cấp cho những module nghiệp vụ thông qua các giao diện tích hợp.

## 1.5. Điểm khác biệt và giá trị cốt lõi của Nexora (USP)

Nexora được định vị là một hệ thống ERP nguồn mở, tích hợp khả năng truy xuất nguồn gốc sản phẩm và liên thông dữ liệu chuỗi cung ứng giữa những doanh nghiệp vận hành độc lập.

Giá trị khác biệt của Nexora không chỉ nằm ở việc cung cấp thêm chức năng truy xuất nguồn gốc, mà còn ở cách tổ chức hệ thống để các sự kiện nghiệp vụ, quy trình kiểm soát và thông tin sản phẩm được liên kết xuyên suốt.

### 1.5.1. Open-Source & Self-hosted ERP

Nexora cho phép doanh nghiệp tiếp cận mã nguồn và chủ động triển khai một bản hệ thống ERP riêng trên hạ tầng do mình lựa chọn.

Mỗi bản triển khai hoạt động độc lập, có cơ sở dữ liệu, người dùng và chính sách quản trị riêng.

Doanh nghiệp có thể phát triển thêm module hoặc điều chỉnh nghiệp vụ mà không phải phụ thuộc hoàn toàn vào một nền tảng SaaS tập trung.

### 1.5.2. Traceability-native ERP

Khả năng truy xuất nguồn gốc được thiết kế như một năng lực xuyên suốt các nghiệp vụ quản trị hàng hóa.

Những giao dịch liên quan đến sản xuất, mua hàng, nhập xuất kho, điều chuyển, phân phối và bán hàng có thể được liên kết với thông tin sản phẩm, mã lô và các sự kiện truy xuất tương ứng.

Cách tiếp cận này giúp dữ liệu truy xuất được hình thành trực tiếp từ hoạt động kinh doanh thay vì phải quản lý hoàn toàn trong một hệ thống riêng biệt.

### 1.5.3. Federated Supply Chain Traceability

Các doanh nghiệp sử dụng Nexora có thể thiết lập quan hệ và trao đổi thông tin truy xuất thông qua API và các cơ chế giao tiếp được chuẩn hóa.

Mỗi doanh nghiệp duy trì quyền quản lý đối với dữ liệu thuộc phạm vi của mình, trong khi những thông tin được phép chia sẻ có thể được kết nối để hình thành lịch sử sản phẩm xuyên qua nhiều tổ chức.

Đây là định hướng giúp Nexora mở rộng khả năng truy xuất ra ngoài phạm vi một hệ thống ERP nội bộ.

### 1.5.4. Process-driven Quality Management

Các hoạt động kiểm tra chất lượng, xác minh chứng từ, phê duyệt nhập kho và xử lý sự cố được tổ chức thành những quy trình nghiệp vụ có trạng thái, điều kiện và trách nhiệm rõ ràng.

Việc kết hợp quy trình với dữ liệu truy xuất cho phép doanh nghiệp theo dõi không chỉ một sản phẩm đã đi qua những đâu, mà còn xác định các hoạt động kiểm soát liên quan đã được ghi nhận và phê duyệt như thế nào.

### 1.5.5. Intelligent Risk Monitoring

Nexora định hướng ứng dụng AI trong việc hỗ trợ phân tích chứng từ, phát hiện những dấu hiệu bất thường trong dữ liệu chuỗi cung ứng và tổng hợp thông tin phục vụ xử lý sự cố.

AI đóng vai trò hỗ trợ, trong khi các giao dịch nghiệp vụ và quyết định quan trọng vẫn được kiểm soát bởi quy tắc hệ thống và người có thẩm quyền.

### 1.5.6. End-to-end Product Transparency

Nexora hướng tới việc kết nối thông tin sản phẩm từ công đoạn hình thành, sản xuất và phân phối đến giao dịch bán hàng cuối cùng.

Khi được cung cấp dữ liệu đầy đủ và có quyền truy cập phù hợp, người tiêu dùng có thể sử dụng mã QR hoặc đường dẫn truy xuất để xem thông tin nguồn gốc và hành trình của sản phẩm.

Giá trị của chức năng này nằm ở khả năng liên kết thông tin với các sự kiện nghiệp vụ đã ghi nhận, đồng thời phân biệt rõ nguồn dữ liệu và mức độ xác minh.

Như vậy, USP tổng thể của Nexora được xác định là:

**Một nền tảng ERP nguồn mở có khả năng vận hành độc lập tại từng doanh nghiệp, tích hợp truy xuất nguồn gốc vào các nghiệp vụ quản trị và hỗ trợ liên thông chuỗi cung ứng giữa các hệ thống phân tán, kết hợp quản lý chất lượng, quy trình và phân tích thông minh.**

Định hướng khác biệt hóa này cần tiếp tục được đánh giá thông qua nghiên cứu các giải pháp hiện có, thử nghiệm kỹ thuật và phản hồi từ người dùng thực tế.

## 1.6. Kết luận chương

Chương 1 đã trình bày bối cảnh chuyển đổi số trong hoạt động quản trị doanh nghiệp, các mô hình triển khai ERP phổ biến và những thách thức liên quan đến khả năng kiểm soát dữ liệu, tùy biến nghiệp vụ và truy xuất nguồn gốc trong chuỗi cung ứng.

Trên cơ sở đó, chương đã làm rõ nhu cầu nghiên cứu một nền tảng ERP nguồn mở có thể triển khai độc lập, đồng thời hỗ trợ kết nối dữ liệu truy xuất giữa các doanh nghiệp mà không yêu cầu sử dụng chung một hệ thống quản trị tập trung.

Từ những vấn đề được xác định, nhóm đề xuất Nexora với định hướng kết hợp các nghiệp vụ ERP cốt lõi, quản lý chất lượng, truy xuất nguồn gốc, điều phối quy trình và ứng dụng trí tuệ nhân tạo.

Những nội dung trên là cơ sở để tiếp tục xác định tầm nhìn, mục tiêu, phạm vi, đối tượng sử dụng và mô hình hoạt động tổng thể của hệ thống trong chương tiếp theo.

# CHƯƠNG 2. TỔNG QUAN VỀ ĐỀ TÀI Nexora

## 2.1. Giới thiệu tổng quan về Nexora

**Nexora (Open-Source Enterprise ERP with Federated Supply Chain Traceability)** là nền tảng phần mềm quản trị doanh nghiệp nguồn mở, được nghiên cứu và phát triển nhằm hỗ trợ các tổ chức quản lý hoạt động sản xuất, kinh doanh, hàng hóa và chuỗi cung ứng trên một hệ thống thống nhất, đồng thời tích hợp khả năng truy xuất nguồn gốc sản phẩm xuyên suốt từ quá trình hình thành đến khi được phân phối và tiêu thụ.

Nexora được xây dựng trên cơ sở kết hợp các chức năng cốt lõi của hệ thống quản trị nguồn lực doanh nghiệp (Enterprise Resource Planning – ERP) với các năng lực chuyên sâu về truy xuất nguồn gốc (Traceability), quản lý chất lượng (Quality Management), điều phối quy trình nghiệp vụ (Business Process Management) và hỗ trợ phân tích thông minh (Artificial Intelligence).

Trong đó, ERP đóng vai trò là nền tảng quản lý các hoạt động nghiệp vụ hằng ngày của doanh nghiệp, bao gồm quản lý sản phẩm, mua hàng, bán hàng, kho hàng, khách hàng, nhà cung cấp và các giao dịch liên quan. Những dữ liệu phát sinh từ các hoạt động này đồng thời được sử dụng để xây dựng lịch sử truy xuất và theo dõi quá trình lưu chuyển của sản phẩm.

Điểm định hướng quan trọng của Nexora là khả năng truy xuất nguồn gốc không được thiết kế như một chức năng độc lập, mà được tích hợp trực tiếp vào vòng đời nghiệp vụ của hệ thống. Khi một sản phẩm được sản xuất, kiểm định, nhập kho, xuất kho, bàn giao hoặc bán cho người tiêu dùng, các sự kiện tương ứng có thể được ghi nhận và liên kết với mã định danh sản phẩm, lô hàng và những chủ thể có liên quan.

Về phương thức phân phối, Nexora được phát triển theo mô hình phần mềm nguồn mở (Open-Source Software), cho phép các doanh nghiệp tiếp cận mã nguồn, chủ động triển khai và tùy biến hệ thống theo các điều kiện của giấy phép sử dụng.

Khác với mô hình Software as a Service (SaaS) được vận hành tập trung bởi một nhà cung cấp, Nexora định hướng áp dụng mô hình triển khai độc lập theo từng doanh nghiệp (Self-hosted, Single-tenant Deployment). Mỗi tổ chức có thể vận hành một bản cài đặt riêng với cơ sở dữ liệu, người dùng, cấu hình và phạm vi quản trị độc lập.

Bên cạnh khả năng vận hành nội bộ, Nexora hướng tới hỗ trợ kết nối giữa những doanh nghiệp sử dụng các bản triển khai khác nhau thông qua giao diện tích hợp và cơ chế trao đổi dữ liệu được chuẩn hóa. Mô hình này được định hướng theo kiến trúc liên thông phân tán (Federated Architecture), cho phép các chủ thể trong chuỗi cung ứng trao đổi thông tin truy xuất mà không cần sử dụng chung một cơ sở dữ liệu hoặc phụ thuộc vào một nền tảng ERP vận hành tập trung.

Thông qua định hướng trên, Nexora hướng tới trở thành một nền tảng ERP nguồn mở có khả năng phục vụ hoạt động quản trị nội bộ, đồng thời tạo cơ sở kết nối thông tin về sản phẩm giữa nhà sản xuất, nhà phân phối, đơn vị bán lẻ và người tiêu dùng.

## 2.2. Tầm nhìn và sứ mệnh của dự án

### 2.2.1. Tầm nhìn (Vision)

Nexora hướng tới trở thành một nền tảng ERP nguồn mở có tính linh hoạt, khả năng mở rộng và tính liên thông cao, cho phép các doanh nghiệp chủ động quản lý hoạt động kinh doanh, kiểm soát dữ liệu và kết nối thông tin chuỗi cung ứng trên cơ sở những tiêu chuẩn và giao thức mở.

Về lâu dài, dự án hướng tới hình thành một hệ sinh thái gồm nhiều bản triển khai Nexora độc lập, trong đó các doanh nghiệp có thể thiết lập quan hệ hợp tác và trao đổi dữ liệu truy xuất theo những phạm vi được cho phép.

Thông qua việc tích hợp truy xuất nguồn gốc vào các nghiệp vụ ERP, nền tảng hướng tới khả năng theo dõi hành trình sản phẩm từ nguồn nguyên liệu, sản xuất, lưu kho, phân phối đến bán hàng, đồng thời hỗ trợ xác định trách nhiệm và xử lý những vấn đề liên quan đến chất lượng sản phẩm.

Bên cạnh đó, Nexora được định hướng phát triển theo nguyên tắc mở, tạo điều kiện để cộng đồng lập trình viên, doanh nghiệp và tổ chức nghiên cứu có thể tiếp cận, đóng góp và tiếp tục cải tiến hệ thống.

### 2.2.2. Sứ mệnh (Mission)

Sứ mệnh của Nexora là cung cấp một nền tảng quản trị doanh nghiệp nguồn mở có khả năng kết nối hoạt động kinh doanh với dữ liệu truy xuất nguồn gốc, góp phần nâng cao hiệu quả vận hành, tính minh bạch và khả năng phối hợp giữa các chủ thể trong chuỗi cung ứng.

Để thực hiện sứ mệnh này, dự án tập trung vào những định hướng sau:

- Xây dựng hệ thống ERP có khả năng hỗ trợ các nghiệp vụ quản trị doanh nghiệp cốt lõi.

- Cho phép doanh nghiệp chủ động triển khai, quản lý và tùy biến hệ thống trên hạ tầng của mình.

- Tích hợp khả năng truy xuất nguồn gốc vào những nghiệp vụ liên quan đến vòng đời sản phẩm.

- Hỗ trợ trao đổi dữ liệu truy xuất giữa các doanh nghiệp độc lập thông qua cơ chế tích hợp mở.

- Chuẩn hóa quy trình kiểm tra, xác minh, phê duyệt và quản lý chất lượng sản phẩm.

- Hỗ trợ phát hiện, phân tích và xử lý các sự cố trong quá trình sản xuất, phân phối và tiêu thụ.

- Nghiên cứu ứng dụng trí tuệ nhân tạo để hỗ trợ phân tích thông tin và nâng cao hiệu quả ra quyết định.

- Thúc đẩy việc ứng dụng và phát triển các công nghệ nguồn mở trong hoạt động quản trị doanh nghiệp.

## 2.3. Mục tiêu của dự án

### 2.3.1. Mục tiêu tổng quát

Nghiên cứu, phân tích, thiết kế và phát triển Nexora thành một nền tảng ERP nguồn mở tích hợp truy xuất nguồn gốc và quản lý quy trình chất lượng, có khả năng triển khai độc lập tại từng doanh nghiệp và hỗ trợ liên thông dữ liệu chuỗi cung ứng giữa các hệ thống phân tán.

Dự án hướng tới xây dựng một kiến trúc có khả năng tổ chức và quản lý thống nhất các nghiệp vụ kinh doanh cốt lõi, đồng thời ghi nhận các sự kiện liên quan đến quá trình sản xuất, kiểm định, nhập xuất kho, phân phối và bán hàng nhằm hình thành lịch sử truy xuất sản phẩm.

Trong phạm vi sản phẩm dự thi, mục tiêu trọng tâm là xây dựng một hệ thống có khả năng vận hành và trình diễn được quy trình nghiệp vụ xuyên suốt giữa nhiều doanh nghiệp, qua đó chứng minh tính khả thi của kiến trúc DX-OS Open-Core, mô hình triển khai độc lập và khả năng trao đổi dữ liệu truy xuất.

### 2.3.2. Mục tiêu cụ thể

#### a. Xây dựng hệ thống ERP phục vụ quản trị doanh nghiệp

Phát triển các module quản lý cốt lõi bao gồm tổ chức, người dùng, sản phẩm, nhà cung cấp, mua hàng, bán hàng, khách hàng và tồn kho.

Các module được tổ chức theo hướng có khả năng phối hợp với nhau, bảo đảm dữ liệu nghiệp vụ được ghi nhận thống nhất và hạn chế sự trùng lặp trong quá trình xử lý.

#### b. Xây dựng mô hình triển khai nguồn mở và độc lập

Thiết kế hệ thống theo phương thức Self-hosted, cho phép mỗi doanh nghiệp triển khai một bản cài đặt Nexora riêng biệt.

Mỗi bản triển khai có cơ sở dữ liệu, cấu hình, người dùng và chính sách vận hành riêng, đồng thời có thể quản lý nhiều chi nhánh, kho hàng và bộ phận thuộc cùng một tổ chức.

#### c. Tích hợp khả năng quản lý sản phẩm và truy xuất theo lô

Cho phép quản lý thông tin sản phẩm, nguyên liệu, mã định danh, lô sản xuất, nguồn gốc và các hồ sơ liên quan.

Các giao dịch liên quan đến sản phẩm có thể được liên kết với thông tin lô hàng nhằm phục vụ việc truy xuất và xác định lịch sử lưu chuyển.

#### d. Xây dựng cơ chế trao đổi dữ liệu giữa các doanh nghiệp

Nghiên cứu và phát triển cơ chế liên thông giữa các bản triển khai Nexora độc lập thông qua API và các sự kiện nghiệp vụ.

Mục tiêu là cho phép các doanh nghiệp trao đổi thông tin truy xuất theo phạm vi được cấp quyền mà không phải chia sẻ trực tiếp cơ sở dữ liệu nội bộ.

#### e. Xây dựng hệ thống quản lý chất lượng và quy trình phê duyệt

Phát triển các quy trình liên quan đến tiếp nhận hàng hóa, kiểm tra chất lượng, xác minh chứng từ, phê duyệt nhập kho và xử lý những trường hợp không đạt yêu cầu.

Mỗi quy trình cần xác định rõ trạng thái, các bước xử lý, người thực hiện, người phê duyệt và điều kiện chuyển đổi trạng thái.

#### f. Tích hợp truy xuất nguồn gốc vào hoạt động bán hàng

Khi một giao dịch bán hàng được thực hiện tại POS, hệ thống cần hỗ trợ liên kết sản phẩm được bán với mã lô hoặc định danh phù hợp.

Từ đó, khách hàng có thể truy cập thông tin nguồn gốc được phép công bố thông qua mã QR hoặc đường dẫn truy xuất.

#### g. Xây dựng cơ chế quản lý sự cố và thu hồi sản phẩm

Hỗ trợ ghi nhận vấn đề chất lượng, xác định các lô hàng và chủ thể có khả năng bị ảnh hưởng, tạo quy trình xử lý và theo dõi tiến độ thực hiện.

#### h. Ứng dụng trí tuệ nhân tạo trong phân tích và giám sát

Nghiên cứu ứng dụng AI để hỗ trợ trích xuất thông tin từ tài liệu, đối chiếu chứng từ, phát hiện dấu hiệu bất thường trong dữ liệu truy xuất và tổng hợp thông tin phục vụ xử lý sự cố.

#### i. Bảo đảm khả năng mở rộng và phát triển cộng đồng nguồn mở

Tổ chức mã nguồn, tài liệu, quy trình xây dựng, kiểm thử và triển khai theo những nguyên tắc phát triển phần mềm nguồn mở.

Các thành phần hệ thống được thiết kế theo hướng mô-đun, có khả năng mở rộng và tích hợp với những ứng dụng hoặc dịch vụ khác.

## 2.4. Đối tượng sử dụng và các bên liên quan

Nexora được định hướng phục vụ nhiều nhóm đối tượng tham gia vào hoạt động quản trị doanh nghiệp và chuỗi cung ứng.

### 2.4.1. Doanh nghiệp sản xuất

Doanh nghiệp sản xuất là tổ chức thực hiện hoạt động tạo ra sản phẩm, gia công, chế biến hoặc đóng gói.

Nexora hỗ trợ nhóm đối tượng này trong việc quản lý nguyên liệu, lô sản xuất, tồn kho, kết quả kiểm định, hồ sơ chất lượng và các giao dịch xuất hàng.

Thông qua việc liên kết nguyên liệu đầu vào với lô thành phẩm, doanh nghiệp có thể tổ chức dữ liệu phục vụ hoạt động truy xuất và kiểm soát sản phẩm.

### 2.4.2. Nhà cung cấp và doanh nghiệp phân phối

Nhà cung cấp và doanh nghiệp phân phối thực hiện các hoạt động tiếp nhận, lưu trữ, vận chuyển và bàn giao hàng hóa giữa các tổ chức.

Hệ thống hỗ trợ quản lý giao dịch mua bán, nhập xuất kho, thông tin lô hàng và các chứng từ liên quan.

Khi các bên sử dụng những bản triển khai Nexora tương thích, thông tin truy xuất có thể được trao đổi thông qua cơ chế kết nối và xác nhận giữa các hệ thống.

### 2.4.3. Doanh nghiệp bán lẻ

Doanh nghiệp bán lẻ là nhóm đối tượng thực hiện các hoạt động quản lý hàng hóa, tồn kho, bán hàng và chăm sóc khách hàng.

Nexora cung cấp các chức năng ERP/POS phục vụ hoạt động kinh doanh, đồng thời hỗ trợ liên kết dữ liệu bán hàng với thông tin lô sản phẩm.

Qua đó, doanh nghiệp có thể cung cấp thông tin truy xuất cho người tiêu dùng và hỗ trợ xác định các giao dịch liên quan khi phát sinh sự cố chất lượng.

### 2.4.4. Người quản lý và bộ phận điều hành

Nhóm đối tượng này có trách nhiệm giám sát hoạt động, quản lý nhân sự, đánh giá các giao dịch và đưa ra quyết định theo quyền hạn được phân công.

Nexora hỗ trợ theo dõi các hoạt động nghiệp vụ, trạng thái phiếu, yêu cầu phê duyệt, báo cáo và những vấn đề phát sinh.

### 2.4.5. Bộ phận kiểm soát chất lượng

Bộ phận kiểm soát chất lượng thực hiện hoặc quản lý các công việc liên quan đến kiểm định, xác minh hồ sơ, đánh giá chất lượng và xử lý những vấn đề liên quan đến sản phẩm.

Hệ thống hỗ trợ tạo phiếu kiểm tra, quản lý kết quả, lưu trữ bằng chứng và thực hiện các quy trình phê duyệt tương ứng.

### 2.4.6. Nhân viên nghiệp vụ

Nhân viên nghiệp vụ bao gồm nhân viên kho, nhân viên mua hàng, nhân viên bán hàng, nhân viên sản xuất và các vị trí vận hành khác.

Tùy theo vai trò và quyền truy cập, mỗi nhân viên sử dụng các chức năng phù hợp với nhiệm vụ được phân công.

Các thao tác quan trọng được ghi nhận nhằm hỗ trợ truy vết lịch sử và xác định trách nhiệm trong quá trình vận hành.

### 2.4.7. Người tiêu dùng

Người tiêu dùng là đối tượng có thể tiếp cận những thông tin truy xuất được doanh nghiệp công bố.

Thông qua mã QR hoặc đường dẫn tra cứu, người tiêu dùng có thể xem thông tin về sản phẩm, lô hàng, nguồn gốc và lịch sử lưu chuyển theo phạm vi dữ liệu được phép cung cấp.

### 2.4.8. Quản trị viên hệ thống

Quản trị viên là người hoặc bộ phận chịu trách nhiệm quản lý hoạt động kỹ thuật của một bản triển khai Nexora.

Nhóm đối tượng này thực hiện việc cấu hình hệ thống, quản lý người dùng, phân quyền, sao lưu, cập nhật và giám sát hoạt động.

Do Nexora vận hành theo mô hình triển khai độc lập, mỗi doanh nghiệp tự tổ chức quyền quản trị đối với hệ thống của mình.

### 2.4.9. Cộng đồng phát triển phần mềm nguồn mở

Bên cạnh người sử dụng nghiệp vụ, Nexora hướng tới sự tham gia của lập trình viên, tổ chức nghiên cứu và những đơn vị phát triển giải pháp phần mềm.

Cộng đồng có thể nghiên cứu mã nguồn, đề xuất cải tiến, phát triển module mở rộng và đóng góp vào quá trình hoàn thiện hệ thống theo điều kiện của giấy phép nguồn mở.

## 2.5. Phạm vi dự án

> **Ghi chú thống nhất phạm vi MVP:** Danh mục chức năng và module được triển khai trong phiên bản MVP lấy **Chương 6** làm nguồn chân lý (M01, M02, M03, M04, AI01). Các mô tả ERP rộng hơn trong Chương 2 và các chương trước Chương 6 thể hiện **tầm nhìn dài hạn**, không mở rộng phạm vi MVP. Tech stack triển khai lấy theo **Chương 7 §7.12** (Next.js Modular Monolith).

### 2.5.1. Phạm vi nghiệp vụ

Nexora được định hướng phát triển thành một hệ thống ERP có khả năng hỗ trợ các nghiệp vụ cốt lõi trong hoạt động sản xuất, phân phối và bán lẻ.

Các nhóm nghiệp vụ chính bao gồm:

**Quản trị tổ chức:** Quản lý thông tin doanh nghiệp, chi nhánh, phòng ban, người dùng và phân quyền.

**Quản lý sản phẩm:** Danh mục sản phẩm, nguyên liệu, đơn vị tính, mã định danh và thông tin lô hàng.

**Quản lý mua hàng:** Nhà cung cấp, đơn mua, tiếp nhận hàng hóa và các chứng từ liên quan.

**Quản lý kho:** Kho hàng, tồn kho, nhập xuất, kiểm kê, điều chuyển và quản lý tồn theo lô.

**Quản lý bán hàng:** Đơn hàng, giao dịch POS, khách hàng, trả hàng và lịch sử bán hàng.

**Quản lý chất lượng:** Phiếu kiểm tra, tiêu chí đánh giá, hồ sơ kiểm định và quy trình phê duyệt.

**Truy xuất nguồn gốc:** Ghi nhận sự kiện, liên kết các lô hàng, truy xuất ngược và truy xuất xuôi.

**Liên thông chuỗi cung ứng:** Quản lý quan hệ đối tác và trao đổi các sự kiện truy xuất giữa những bản triển khai độc lập.

**Quản lý sự cố:** Cảnh báo, cách ly, truy vết phạm vi ảnh hưởng và theo dõi thu hồi.

**Phân tích thông minh:** Hỗ trợ phân tích chứng từ, phát hiện bất thường và cung cấp thông tin phục vụ ra quyết định.

### 2.5.2. Phạm vi triển khai hệ thống

Nexora được định hướng triển khai theo mô hình Self-hosted, Single-tenant Deployment.

Theo đó, mỗi doanh nghiệp sở hữu một bản triển khai ứng dụng độc lập, có cơ sở dữ liệu và các thành phần hệ thống riêng.

Trong phạm vi một bản triển khai, hệ thống có thể quản lý nhiều chi nhánh, kho hàng, phòng ban và người dùng thuộc cùng doanh nghiệp.

Khi có nhu cầu chia sẻ dữ liệu truy xuất với đối tác, các bản triển khai thực hiện trao đổi thông tin thông qua cơ chế giao tiếp được xác định rõ ràng, không truy cập trực tiếp vào cơ sở dữ liệu của nhau.

### 2.5.3. Phạm vi sản phẩm dự thi

Do giới hạn về thời gian và nguồn lực phát triển, sản phẩm dự thi tập trung triển khai một tập hợp chức năng đại diện nhằm chứng minh khả năng vận hành của hệ thống.

Các chức năng được ưu tiên gồm (khớp Chương 6):

1. M01 — Quản lý tổ chức, người dùng, đối tác và kết nối instance.

2. M02 — Quản lý sản phẩm, định danh, lô hàng, kho và tồn kho.

3. M03 — Phiếu nhập, xuất, chuyển giao đối tác, xác nhận nhận hàng, kiểm kê và ghi nhận bán/phân phối theo lô (không POS đầy đủ).

4. M04 — Sự kiện truy xuất, QR / Product Passport và liên thông federation giữa các instance.

5. AI01 — Trợ lý tra cứu lô/truy xuất, tạo chứng từ dự thảo và cảnh báo theo quy tắc.

6. Một quy trình phê duyệt mẫu qua Workflow (Flowable) và các dịch vụ lõi DX-OS kèm tài liệu triển khai nguồn mở.

Kiểm định chất lượng nhiều bước, thu hồi đa cấp và POS đầy đủ không thuộc MVP (xem §6.9).

### 2.5.4. Những nội dung chưa triển khai trong giai đoạn đầu

Trong giai đoạn đầu, dự án chưa đặt mục tiêu phát triển đầy đủ các chức năng kế toán tài chính, tiền lương, quản trị nhân sự chuyên sâu, hoạch định nhu cầu nguyên vật liệu, tối ưu hóa vận tải và toàn bộ các quy trình sản xuất phức tạp.

Các module theo ngành như FnB, Spa, Hotel và những nghiệp vụ chuyên biệt khác được xem là định hướng mở rộng sau khi nền tảng cốt lõi đã được hoàn thiện.

Tương tự, blockchain, IoT và các mô hình AI dự báo chuyên sâu không phải thành phần bắt buộc của phiên bản dự thi.

## 2.6. Mô hình hoạt động tổng thể của Nexora

Mô hình hoạt động của Nexora được tổ chức theo hai phạm vi: hoạt động quản trị nội bộ doanh nghiệp và hoạt động liên thông dữ liệu chuỗi cung ứng.

### 2.6.1. Hoạt động quản trị nội bộ doanh nghiệp

Trong một bản triển khai Nexora, doanh nghiệp sử dụng các module ERP để quản lý hoạt động kinh doanh thường ngày.

Các giao dịch mua hàng, nhập kho, sản xuất, điều chuyển và bán hàng được thực hiện theo quy trình nghiệp vụ tương ứng.

Đối với những sản phẩm yêu cầu truy xuất nguồn gốc, các giao dịch có thể được gắn với thông tin định danh sản phẩm và lô hàng, tạo thành dữ liệu đầu vào cho hệ thống truy xuất.

### 2.6.2. Hoạt động liên thông giữa các doanh nghiệp

Khi một doanh nghiệp xuất hàng cho đối tác, hệ thống có thể tạo sự kiện chuyển giao kèm thông tin lô hàng và các dữ liệu được phép chia sẻ.

Doanh nghiệp tiếp nhận sử dụng bản triển khai Nexora độc lập để xác minh thông tin, xác nhận giao nhận và ghi nhận sự kiện tiếp nhận.

Các sự kiện có liên quan được liên kết với nhau thông qua những mã định danh và tham chiếu được thống nhất.

Cơ chế này tạo điều kiện hình thành lịch sử lưu chuyển sản phẩm xuyên qua nhiều tổ chức mà không yêu cầu các doanh nghiệp phải sử dụng chung một cơ sở dữ liệu.

### 2.6.3. Hoạt động truy xuất tại điểm bán

Khi một sản phẩm được bán thông qua POS, giao dịch được ghi nhận trong hệ thống ERP của doanh nghiệp bán lẻ.

Nếu giao dịch có đủ thông tin lô hoặc định danh sản phẩm, Nexora có thể liên kết dữ liệu bán hàng với những sự kiện trước đó trong chuỗi cung ứng.

Người tiêu dùng có thể truy cập thông tin nguồn gốc được công bố thông qua mã QR hoặc đường dẫn truy xuất tương ứng.

### 2.6.4. Hoạt động xử lý sự cố và thu hồi

Khi một doanh nghiệp phát hiện vấn đề liên quan đến chất lượng sản phẩm, hệ thống hỗ trợ tạo hồ sơ sự cố và xác định các đối tượng liên quan dựa trên lịch sử đã ghi nhận.

Thông qua dữ liệu truy xuất nội bộ và các thông tin được chia sẻ giữa đối tác, doanh nghiệp có thể xác định những lô hàng, địa điểm hoặc đơn vị nhận hàng có khả năng bị ảnh hưởng.

Trên cơ sở đó, hệ thống hỗ trợ tổ chức các quy trình kiểm tra, cách ly, thông báo và thu hồi theo phạm vi trách nhiệm của từng bên.

## 2.7. Giá trị dự kiến mang lại

### 2.7.1. Đối với doanh nghiệp sử dụng Nexora

Nexora hướng tới mang lại các giá trị:

- Tích hợp nhiều nghiệp vụ quản trị trên một hệ thống thống nhất.

- Chủ động kiểm soát hạ tầng, cơ sở dữ liệu và khả năng tùy biến phần mềm.

- Hạn chế việc duy trì nhiều hệ thống riêng biệt cho quản trị hàng hóa và truy xuất nguồn gốc.

- Tăng khả năng truy vết lịch sử sản phẩm và trách nhiệm nghiệp vụ.

- Hỗ trợ chuẩn hóa các quy trình kiểm tra, phê duyệt và quản lý chất lượng.

- Tăng hiệu quả xác định phạm vi ảnh hưởng và phối hợp xử lý sự cố.

- Tạo điều kiện kết nối thông tin với các đối tác trong chuỗi cung ứng.

### 2.7.2. Đối với doanh nghiệp đối tác

Các doanh nghiệp đối tác có thể trao đổi thông tin truy xuất theo những cấu trúc dữ liệu và cơ chế giao tiếp được thống nhất.

Việc triển khai các bản hệ thống độc lập cho phép mỗi doanh nghiệp tiếp tục quản lý dữ liệu nội bộ của mình, đồng thời chia sẻ những thông tin cần thiết cho hoạt động truy xuất và xác minh.

### 2.7.3. Đối với người tiêu dùng

Nexora hỗ trợ người tiêu dùng tiếp cận thông tin về nguồn gốc, lô sản phẩm và hành trình hàng hóa được phép công bố.

Các thông tin truy xuất cần thể hiện rõ nguồn dữ liệu và trạng thái xác minh, qua đó hỗ trợ người tiêu dùng đánh giá thông tin một cách có căn cứ.

### 2.7.4. Đối với cộng đồng phần mềm nguồn mở

Việc công khai mã nguồn và tài liệu kỹ thuật tạo điều kiện để cộng đồng nghiên cứu, triển khai, đóng góp và phát triển các chức năng mới.

Các thành phần lõi được thiết kế theo hướng tái sử dụng có thể hỗ trợ việc xây dựng thêm những ứng dụng quản trị và truy xuất phục vụ các lĩnh vực khác nhau.

## 2.8. Định hướng phát triển của Nexora

### 2.8.1. Hoàn thiện các chức năng ERP

Trong các phiên bản tiếp theo, Nexora hướng tới phát triển đầy đủ hơn những nghiệp vụ quản trị doanh nghiệp, bao gồm quản lý tài chính, kế toán, nhân sự, sản xuất, phân phối và các báo cáo quản trị chuyên sâu.

### 2.8.2. Mở rộng khả năng liên thông chuỗi cung ứng

Nghiên cứu và phát triển các giao thức trao đổi dữ liệu nhằm tăng khả năng kết nối giữa những bản triển khai Nexora và các hệ thống ERP bên ngoài.

Các cơ chế quản lý định danh, xác minh nguồn dữ liệu và phân quyền chia sẻ sẽ tiếp tục được hoàn thiện để hỗ trợ những mô hình kết nối phức tạp hơn.

### 2.8.3. Phát triển những module chuyên ngành

Từ nền tảng ERP cốt lõi, dự án có thể tiếp tục phát triển các module dành cho những lĩnh vực có nhu cầu đặc thù như bán lẻ, thực phẩm và đồ uống, sản xuất hoặc dịch vụ.

Mỗi module chuyên ngành được định hướng kế thừa những thành phần dùng chung, đồng thời bổ sung quy trình và chức năng phù hợp với lĩnh vực ứng dụng.

### 2.8.4. Tăng cường năng lực phân tích thông minh

Khi dữ liệu nghiệp vụ và truy xuất được tích lũy đầy đủ, Nexora có thể phát triển thêm các chức năng phân tích xu hướng chất lượng, đánh giá rủi ro nhà cung cấp, phát hiện bất thường và hỗ trợ điều tra sự cố.

Các chức năng AI tiếp tục được thiết kế theo nguyên tắc hỗ trợ người dùng và không thay thế các cơ chế kiểm soát nghiệp vụ có tính xác định.

### 2.8.5. Phát triển hệ sinh thái nguồn mở

Nexora hướng tới hình thành cộng đồng phát triển, xây dựng quy trình đóng góp mã nguồn, quản lý phiên bản, phát hành và phát triển các module mở rộng.

Đồng thời, dự án chú trọng việc hoàn thiện tài liệu cài đặt, cấu hình, vận hành và tích hợp nhằm tạo điều kiện cho doanh nghiệp hoặc đơn vị triển khai tiếp cận hệ thống.

## 2.9. Kết luận chương

Chương 2 đã trình bày tổng quan về Nexora, bao gồm định hướng sản phẩm, tầm nhìn, sứ mệnh, mục tiêu phát triển, đối tượng sử dụng, phạm vi dự án và mô hình hoạt động tổng thể.

Trên cơ sở đó, Nexora được xác định là một nền tảng ERP nguồn mở theo mô hình triển khai độc lập, có khả năng tích hợp truy xuất nguồn gốc vào các nghiệp vụ quản trị và hỗ trợ trao đổi thông tin giữa những doanh nghiệp tham gia chuỗi cung ứng.

Khả năng kết hợp quản trị doanh nghiệp, quy trình kiểm soát chất lượng, dữ liệu truy xuất và kiến trúc liên thông phân tán là những định hướng quan trọng tạo nên giá trị của dự án.

Các nội dung trên đồng thời là cơ sở để tiếp tục nghiên cứu các hệ thống tương tự, phân tích yêu cầu nghiệp vụ và thiết kế kiến trúc kỹ thuật phù hợp trong những chương tiếp theo.

# CHƯƠNG 3. KHẢO SÁT VÀ PHÂN TÍCH CÁC GIẢI PHÁP HIỆN CÓ

## 3.1. Mục đích và phạm vi khảo sát

### 3.1.1. Mục đích khảo sát

Việc khảo sát các giải pháp phần mềm hiện có là một bước quan trọng trong quá trình nghiên cứu, phân tích và đề xuất phát triển hệ thống Nexora. Hoạt động này nhằm tìm hiểu cách thức các nền tảng quản trị doanh nghiệp và truy xuất nguồn gốc đang giải quyết những vấn đề liên quan đến quản lý hoạt động kinh doanh, kiểm soát sản phẩm và liên kết dữ liệu chuỗi cung ứng.

Thông qua việc nghiên cứu các sản phẩm và công nghệ liên quan, nhóm có thể nhận diện những chức năng đã được triển khai phổ biến, đánh giá các phương thức tiếp cận khác nhau và xác định những yêu cầu cần ưu tiên khi xây dựng Nexora.

Mục tiêu của quá trình khảo sát không phải chứng minh các hệ thống hiện có không đáp ứng được nhu cầu doanh nghiệp, mà là xác định một hướng phát triển phù hợp về kiến trúc, mô hình triển khai và khả năng tích hợp nghiệp vụ.

Các mục tiêu cụ thể bao gồm:

- Nghiên cứu những hệ thống ERP nguồn mở có chức năng quản lý mua hàng, bán hàng, sản xuất, tồn kho và truy xuất theo lô.
- Tìm hiểu các giải pháp chuyên về truy xuất nguồn gốc, quản lý chất lượng và xử lý sự cố trong chuỗi cung ứng.
- Đánh giá sự khác biệt giữa mô hình phần mềm vận hành tập trung và mô hình triển khai độc lập.
- Nghiên cứu các tiêu chuẩn trao đổi dữ liệu và sự kiện truy xuất giữa các tổ chức.
- Xác định những năng lực có thể kế thừa về mặt thiết kế và những vấn đề Nexora cần giải quyết theo cách tiếp cận riêng.
- Làm cơ sở cho việc xác định yêu cầu chức năng, phạm vi MVP và kiến trúc tổng thể của dự án.

### 3.1.2. Phạm vi khảo sát

Trong khuôn khổ đề tài, nhóm tập trung nghiên cứu những giải pháp đại diện cho ba hướng sản phẩm và một nhóm tiêu chuẩn kỹ thuật.

**Nhóm thứ nhất – Hệ thống ERP nguồn mở:** Đại diện là Odoo và ERPNext. Đây là những giải pháp có khả năng quản lý nhiều nghiệp vụ doanh nghiệp và cung cấp các chức năng liên quan đến quản lý lô, số serial, sản xuất và truy xuất hàng hóa.

**Nhóm thứ hai – Hệ thống truy xuất nguồn gốc chuyên dụng:** Đại diện là iCheck TRACE, một giải pháp truy xuất nguồn gốc tại Việt Nam. Nhóm giải pháp này tập trung vào việc số hóa thông tin nguồn gốc, quản lý quá trình hình thành sản phẩm và cung cấp dữ liệu truy xuất cho các bên liên quan.

**Nhóm thứ ba – Nền tảng quản lý chất lượng và truy xuất chuỗi cung ứng:** Đại diện là Trustwell FoodLogiQ, tập trung vào quản lý thông tin nhà cung cấp, hồ sơ chất lượng, truy xuất và hỗ trợ xử lý thu hồi.

**Nhóm thứ tư – Tiêu chuẩn dữ liệu và khả năng liên thông:** Tập trung nghiên cứu GS1 EPCIS 2.0 và các quy định, nguyên tắc quản lý truy xuất nguồn gốc tại Việt Nam.

Việc lựa chọn các đối tượng trên giúp khảo sát cả hai góc độ: hệ thống ERP có chức năng truy xuất và hệ thống truy xuất có chức năng hỗ trợ hoạt động chuỗi cung ứng.

### 3.1.3. Phương pháp khảo sát và đánh giá

Quá trình khảo sát được thực hiện chủ yếu thông qua nghiên cứu tài liệu thứ cấp, bao gồm tài liệu chức năng, tài liệu kỹ thuật, hướng dẫn sử dụng và thông tin do các đơn vị phát triển công bố.

Các tiêu chí đối chiếu bao gồm:

1. Phạm vi nghiệp vụ ERP được hỗ trợ.
2. Khả năng quản lý sản phẩm theo lô và số serial.
3. Khả năng truy xuất ngược và truy xuất xuôi.
4. Khả năng quản lý chất lượng và quy trình phê duyệt.
5. Khả năng tích hợp với hệ thống bên ngoài.
6. Mô hình triển khai và quyền kiểm soát mã nguồn.
7. Khả năng trao đổi dữ liệu giữa nhiều tổ chức độc lập.
8. Khả năng hỗ trợ xử lý sự cố và thu hồi sản phẩm.
9. Khả năng mở rộng và ứng dụng công nghệ thông minh.

Phạm vi khảo sát ở giai đoạn này chưa bao gồm việc triển khai thực nghiệm và kiểm thử đầy đủ tất cả các giải pháp. Vì vậy, những nhận định được phân biệt giữa khả năng đã được tài liệu công bố và các vấn đề cần xác minh thông qua thử nghiệm tiếp theo.

## 3.2. Khảo sát các hệ thống ERP nguồn mở

### 3.2.1. Hệ thống Odoo

#### a. Giới thiệu tổng quan

Odoo là một hệ thống quản trị doanh nghiệp tích hợp, cung cấp nhiều nhóm ứng dụng phục vụ hoạt động kinh doanh như bán hàng, mua hàng, quản lý kho, sản xuất, kế toán và quản lý khách hàng.

Nền tảng được phát triển theo hướng mô-đun, cho phép tổ chức lựa chọn và triển khai những ứng dụng phù hợp với yêu cầu quản trị.

Odoo có các phiên bản và hình thức phân phối khác nhau, bao gồm thành phần nguồn mở và những thành phần thương mại. Phạm vi chức năng cũng như quyền sử dụng phụ thuộc vào phiên bản và giấy phép tương ứng.

#### b. Các chức năng liên quan đến Nexora

Trong lĩnh vực quản lý hàng hóa và sản xuất, Odoo hỗ trợ định danh sản phẩm theo lô (Lot) và số serial.

Mã lô được sử dụng để theo dõi một nhóm sản phẩm có chung đặc điểm, trong khi số serial cho phép phân biệt từng đơn vị sản phẩm riêng biệt.

Các thông tin này có thể được gắn với nghiệp vụ nhập kho, xuất kho và sản xuất nhằm hình thành lịch sử di chuyển hàng hóa.

Odoo cũng cung cấp báo cáo truy xuất, cho phép người sử dụng xem những giao dịch và hoạt động kho liên quan đến một lô hoặc số serial cụ thể.

Đây là những chức năng quan trọng đối với hoạt động quản lý hàng hóa và là cơ sở tham khảo khi xây dựng mô hình dữ liệu truy xuất của Nexora.

#### c. Ưu điểm

Odoo có lợi thế về phạm vi nghiệp vụ ERP rộng, khả năng kết nối giữa các module và mô hình phát triển ứng dụng có tính mở rộng.

Đặc biệt, việc kết hợp quản lý sản phẩm, kho và sản xuất cho phép dữ liệu truy xuất được hình thành từ các giao dịch nghiệp vụ có cấu trúc, thay vì phải nhập hoàn toàn thủ công trong một hệ thống riêng biệt.

Ngoài ra, khả năng quản lý lô và serial cho thấy truy xuất nguồn gốc không nhất thiết phải được triển khai như một ứng dụng tách rời ERP.

#### d. Những vấn đề Nexora có thể nghiên cứu bổ sung

Odoo là một giải pháp ERP trưởng thành, vì vậy Nexora không nên đặt mục tiêu cạnh tranh trực tiếp về số lượng chức năng.

Thay vào đó, dự án tập trung nghiên cứu mô hình liên thông truy xuất giữa các bản triển khai ERP thuộc những doanh nghiệp độc lập.

Bài toán cần giải quyết là làm thế nào để một sự kiện xuất hàng được ghi nhận tại doanh nghiệp A có thể được liên kết với sự kiện tiếp nhận tại doanh nghiệp B, sau đó tiếp tục gắn với giao dịch bán hàng tại doanh nghiệp C, mà không yêu cầu cả ba doanh nghiệp dùng chung cơ sở dữ liệu.

Đây là một bài toán tích hợp và thiết kế giao thức dữ liệu cần được kiểm chứng bằng triển khai thực tế, không phải kết luận rằng Odoo không thể thực hiện thông qua các module mở rộng hoặc giải pháp tích hợp.

### 3.2.2. Hệ thống ERPNext

#### a. Giới thiệu tổng quan

ERPNext là nền tảng ERP nguồn mở được phát triển trên Frappe Framework, cung cấp các chức năng quản trị doanh nghiệp như bán hàng, mua hàng, kho, sản xuất, kế toán và quản lý vận hành.

Mã nguồn ERPNext được công bố theo giấy phép GNU General Public License phiên bản 3 (GPLv3), cho phép cộng đồng sử dụng, nghiên cứu và phát triển hệ thống theo các điều kiện của giấy phép.

Đây là một giải pháp phù hợp để tham khảo về tổ chức hệ thống ERP nguồn mở và mô hình triển khai độc lập.

#### b. Các chức năng liên quan đến Nexora

ERPNext hỗ trợ quản lý số serial và lô hàng trong các nghiệp vụ tồn kho, mua hàng, bán hàng và sản xuất.

Đặc biệt, hệ thống có báo cáo truy xuất theo hai chiều:

- **Backward Traceability:** Truy ngược từ lô thành phẩm hoặc sản phẩm đến các nguyên liệu, thành phần và quá trình liên quan.
- **Forward Traceability:** Truy xuôi từ một lô nguyên liệu hoặc sản phẩm đến những lô thành phẩm, giao dịch và đối tượng nhận hàng có liên quan.

ERPNext cũng hỗ trợ liên kết nguyên liệu với thành phẩm thông qua những nghiệp vụ sản xuất hoặc đóng gói lại.

Các năng lực trên có nhiều điểm tương đồng với yêu cầu truy xuất theo lô của Nexora.

#### c. Ưu điểm

ERPNext có lợi thế là hệ thống ERP nguồn mở với khả năng triển khai và phát triển theo nhu cầu của từng tổ chức.

Việc hỗ trợ truy xuất hai chiều và liên kết nguyên liệu với thành phẩm thể hiện sự kết hợp tương đối chặt chẽ giữa quản lý hàng hóa và truy xuất nguồn gốc trong phạm vi dữ liệu ERP.

Do đó, ERPNext là một đối tượng tham khảo quan trọng khi nghiên cứu việc thiết kế các quan hệ giữa sản phẩm, lô hàng, nguyên liệu và giao dịch.

#### d. Những vấn đề Nexora có thể nghiên cứu bổ sung

Nexora cần tập trung vào bài toán kết nối các sự kiện truy xuất giữa những bản triển khai độc lập, đặc biệt khi dữ liệu nằm ở các doanh nghiệp thuộc nhiều công đoạn của chuỗi cung ứng.

Ngoài các chức năng ERP, dự án cũng chú trọng việc xây dựng cơ chế xác nhận giao nhận giữa hai tổ chức, quản lý quyền chia sẻ dữ liệu và hỗ trợ truy xuất theo chuỗi sự kiện liên doanh nghiệp.

Khả năng thực hiện các chức năng tương tự bằng ERPNext thông qua API hoặc ứng dụng mở rộng là điều cần được đánh giá trong quá trình nghiên cứu và kiểm thử đối chứng.

Như vậy, giá trị nghiên cứu của Nexora không phải việc tạo lại một chức năng truy xuất hai chiều đã có, mà là xây dựng và kiểm chứng mô hình trao đổi sự kiện giữa nhiều hệ thống ERP độc lập.

## 3.3. Khảo sát các giải pháp truy xuất nguồn gốc chuyên dụng

### 3.3.1. Giải pháp iCheck TRACE

#### a. Giới thiệu tổng quan

iCheck TRACE là giải pháp hỗ trợ doanh nghiệp thực hiện truy xuất nguồn gốc sản phẩm, hướng tới việc quản lý và công bố thông tin về các công đoạn trong quá trình sản xuất, chế biến và phân phối.

Theo thông tin công bố, giải pháp được xây dựng có tham chiếu các tiêu chuẩn truy xuất nguồn gốc tại Việt Nam và hệ thống tiêu chuẩn GS1.

Các chức năng được giới thiệu bao gồm quản lý nhật ký điện tử, ghi nhận thông tin các công đoạn sản xuất và hỗ trợ người sử dụng tiếp cận dữ liệu thông qua công cụ truy xuất.

#### b. Ưu điểm

Một trong những ưu điểm đáng chú ý của iCheck TRACE là việc tập trung vào bài toán truy xuất nguồn gốc tại thị trường Việt Nam.

Giải pháp có tính chuyên biệt về thông tin sản phẩm, dữ liệu sản xuất và cơ chế công bố nguồn gốc cho những đối tượng có nhu cầu tra cứu.

Việc tham chiếu tiêu chuẩn quốc gia và GS1 là yếu tố quan trọng đối với các hệ thống có mục tiêu quản lý và chia sẻ thông tin truy xuất.

#### c. Khả năng tham khảo cho Nexora

Nexora có thể nghiên cứu cách tổ chức thông tin sản phẩm, nhật ký truy xuất và trải nghiệm của người tiêu dùng khi tra cứu.

Tuy nhiên, định hướng của Nexora khác ở phạm vi sản phẩm: thay vì tập trung chủ yếu vào giải pháp truy xuất, dự án xây dựng ERP như nền tảng nghiệp vụ, từ đó tạo và liên kết các sự kiện truy xuất trực tiếp trong quá trình mua hàng, nhập kho, sản xuất, phân phối và bán hàng.

Đối với mô hình triển khai, Nexora hướng tới việc công khai mã nguồn và cho phép doanh nghiệp vận hành hệ thống độc lập.

Do chưa có kết quả kiểm thử toàn bộ sản phẩm iCheck TRACE, báo cáo không kết luận giải pháp này thiếu những chức năng tích hợp ERP hoặc liên thông dữ liệu cụ thể. Đây là những tiêu chí cần được xác minh ở bước nghiên cứu chuyên sâu.

### 3.3.2. Giải pháp Trustwell FoodLogiQ

#### a. Giới thiệu tổng quan

FoodLogiQ là nhóm giải pháp thuộc Trustwell, tập trung vào quản lý chuỗi cung ứng và an toàn thực phẩm.

Theo thông tin sản phẩm được công bố, nền tảng cung cấp những năng lực liên quan đến quản lý nhà cung cấp, hồ sơ tuân thủ, quy trình chất lượng, truy xuất nguồn gốc và hỗ trợ xử lý thu hồi.

Đây là một đối tượng khảo sát đáng chú ý vì hệ thống không chỉ thực hiện tra cứu thông tin sản phẩm mà còn liên kết hoạt động truy xuất với quản lý chất lượng và xử lý sự cố.

#### b. Các chức năng nổi bật

FoodLogiQ hỗ trợ theo dõi sản phẩm và nguyên liệu ở cấp độ lô, với khả năng truy xuất ngược và truy xuất xuôi.

Hệ thống có các công cụ hỗ trợ điều tra sự kiện truy xuất, xác định dữ liệu còn thiếu và theo dõi các quan hệ liên quan đến quá trình lưu chuyển sản phẩm.

Đối với hoạt động thu hồi, giải pháp hỗ trợ thông báo có mục tiêu và theo dõi phản hồi từ những bên liên quan.

Ngoài ra, các chức năng quản lý hồ sơ và quy trình chất lượng giúp hệ thống phục vụ nhu cầu kiểm soát chuỗi cung ứng thay vì chỉ cung cấp dữ liệu tra cứu.

#### c. Ưu điểm

FoodLogiQ cho thấy một xu hướng quan trọng trong phát triển phần mềm truy xuất: kết hợp dữ liệu nguồn gốc với quản lý chất lượng và quy trình xử lý sự cố.

Đây cũng là cơ sở khẳng định rằng các chức năng như truy xuất hai chiều, điều tra lô hàng, thu hồi và quản lý bằng chứng không còn là những tính năng hoàn toàn mới trên thị trường.

#### d. Định hướng khác biệt của Nexora

Nexora cần tập trung vào sự kết hợp giữa một hệ thống ERP nguồn mở có thể tự triển khai và cơ chế trao đổi sự kiện truy xuất phân tán.

Trong mô hình này, mỗi doanh nghiệp vận hành hệ thống quản trị nghiệp vụ riêng, tự kiểm soát cơ sở dữ liệu và chủ động xác định phạm vi thông tin trao đổi với các đối tác.

Đây là định hướng sản phẩm cần được triển khai và thử nghiệm, không phải nhận định rằng những giải pháp chuyên dụng như FoodLogiQ không thể tích hợp hoặc trao đổi dữ liệu với các hệ thống bên ngoài.

## 3.4. Khảo sát các tiêu chuẩn và cơ sở liên thông dữ liệu truy xuất

### 3.4.1. Tiêu chuẩn GS1 EPCIS 2.0

GS1 EPCIS (Electronic Product Code Information Services) là tiêu chuẩn phục vụ việc ghi nhận và chia sẻ dữ liệu về các sự kiện liên quan đến đối tượng trong chuỗi cung ứng.

Thay vì chỉ mô tả thông tin tĩnh của sản phẩm, EPCIS tập trung vào dữ liệu về những sự kiện đã diễn ra trong quá trình vận hành.

Một sự kiện truy xuất có thể cung cấp các thông tin cơ bản:

- **What:** Đối tượng hoặc sản phẩm nào tham gia sự kiện?
- **When:** Sự kiện diễn ra vào thời điểm nào?
- **Where:** Sự kiện diễn ra ở địa điểm nào?
- **Why:** Sự kiện thuộc bước nghiệp vụ và trạng thái nào?
- **How:** Những điều kiện hoặc thông tin bổ sung nào liên quan đến sự kiện?

EPCIS 2.0 hỗ trợ biểu diễn dữ liệu theo JSON/JSON-LD và cung cấp các định nghĩa giao diện REST phục vụ hoạt động ghi nhận, truy vấn và trao đổi sự kiện.

Đối với Nexora, EPCIS là cơ sở tham khảo quan trọng khi xây dựng mô hình dữ liệu liên thông giữa các doanh nghiệp.

Tuy nhiên, việc áp dụng mô hình sự kiện tương thích không đồng nghĩa hệ thống tự động được chứng nhận phù hợp toàn bộ tiêu chuẩn EPCIS. Mức độ tuân thủ cần được xác minh dựa trên phạm vi triển khai và những bài kiểm thử tương ứng.

### 3.4.2. Quy định về truy xuất nguồn gốc tại Việt Nam

Tại Việt Nam, Thông tư số 02/2024/TT-BKHCN của Bộ Khoa học và Công nghệ quy định về quản lý truy xuất nguồn gốc sản phẩm, hàng hóa, có hiệu lực từ ngày 01/06/2024.

Trong đó, nguyên tắc truy xuất “một bước trước – một bước sau” là cơ sở quan trọng đối với việc nhận diện các công đoạn liền kề trong chuỗi sản xuất và kinh doanh.

Các nội dung về mã truy vết, dữ liệu truy xuất, địa điểm, thời gian và sự kiện nghiệp vụ là những yếu tố cần được xem xét khi thiết kế hệ thống.

Nexora được định hướng nghiên cứu và tham chiếu các quy định, tiêu chuẩn có liên quan nhằm tăng khả năng kết nối và chia sẻ thông tin.

Tuy nhiên, các yêu cầu cụ thể về tuân thủ cần được xác định theo loại sản phẩm, lĩnh vực kinh doanh và phạm vi áp dụng thực tế. Dự án không mặc định việc phát triển hệ thống là đủ để đáp ứng mọi nghĩa vụ pháp lý.

### 3.4.3. Ý nghĩa đối với kiến trúc phân tán của Nexora

Việc sử dụng mô hình sự kiện có cấu trúc thống nhất tạo điều kiện để các bản triển khai ERP độc lập có thể trao đổi thông tin mà không cần chia sẻ trực tiếp cơ sở dữ liệu.

Ví dụ, một doanh nghiệp sản xuất có thể phát hành sự kiện xuất hàng, trong khi doanh nghiệp phân phối ghi nhận sự kiện tiếp nhận tương ứng.

Hai sự kiện được liên kết thông qua các mã định danh và tham chiếu giao dịch phù hợp.

Trên cơ sở đó, hệ thống có thể tiếp tục liên kết những sự kiện phát sinh trong các công đoạn phân phối và bán lẻ.

Để thực hiện mô hình này, ngoài dữ liệu tương thích, Nexora còn phải giải quyết các vấn đề về xác thực bên gửi, quyền chia sẻ, sự kiện trùng lặp, tính toàn vẹn dữ liệu và cơ chế đối chiếu giữa các bên.

Như vậy, tiêu chuẩn trao đổi dữ liệu là một phần cần thiết nhưng chưa đủ để hình thành mạng lưới truy xuất đáng tin cậy.

## 3.5. So sánh và đánh giá các giải pháp hiện có

### 3.5.1. Bảng so sánh tổng hợp

Trên cơ sở các nội dung khảo sát, nhóm tiến hành đối chiếu những giải pháp đại diện với định hướng phát triển Nexora.

| Tiêu chí | Odoo | ERPNext | iCheck TRACE | FoodLogiQ | Nexora (định hướng) |
| --- | --- | --- | --- | --- | --- |
| Quản trị ERP tích hợp | Có | Có | Không phải trọng tâm khảo sát | Không phải ERP tổng quát | Có |
| Quản lý Lot/Serial | Có | Có | Có dữ liệu truy xuất theo sản phẩm/công đoạn | Có | Có |
| Truy xuất hai chiều | Có | Có | Cần khảo sát phạm vi cụ thể | Có | Có |
| Quản lý chất lượng | Có các ứng dụng liên quan | Có các chức năng liên quan | Tập trung dữ liệu nguồn gốc | Có | Có |
| Quản lý sự cố và thu hồi | Có thể hỗ trợ qua nghiệp vụ/module | Có thể hỗ trợ qua nghiệp vụ/module | Cần khảo sát thêm | Có | Có |
| Nguồn mở | Community và các thành phần liên quan | GPLv3 | Chưa xác minh là nguồn mở | Chưa xác minh là nguồn mở | Mục tiêu bắt buộc |
| Self-hosted | Có phương án triển khai | Có | Cần xác minh | Cần xác minh | Mặc định |
| Liên thông giữa instance độc lập | Có thể phát triển qua tích hợp | Có thể phát triển qua tích hợp | Cần xác minh | Có năng lực liên kết đối tác | Mục tiêu thiết kế cốt lõi |
| POS gắn dữ liệu truy xuất | Có thể kết hợp nghiệp vụ và module | Có thể kết hợp nghiệp vụ và module | Cần xác minh | Không phải trọng tâm khảo sát | Mục tiêu MVP |
| AI phân tích bất thường | Tùy ứng dụng/tích hợp | Tùy ứng dụng/tích hợp | Cần xác minh | Có AI hỗ trợ một số nghiệp vụ | Định hướng phát triển |

Bảng so sánh trên phản ánh phạm vi thông tin đã khảo sát, không phải kết quả kiểm thử đầy đủ các sản phẩm. Đối với những chức năng phụ thuộc phiên bản, giấy phép hoặc module mở rộng, cần tiếp tục xác minh trong quá trình nghiên cứu thực nghiệm.

Các chức năng của Nexora trong cột cuối là mục tiêu phát triển, chưa phải năng lực đã hoàn thiện.

### 3.5.2. Nhận xét chung

Qua khảo sát có thể nhận thấy ba đặc điểm đáng chú ý.

**Thứ nhất, các hệ thống ERP nguồn mở đã có năng lực quản lý lô và truy xuất hàng hóa tương đối phát triển.**

Odoo và ERPNext đều cung cấp cơ chế quản lý lô, serial và các giao dịch liên quan. Do đó, chức năng truy xuất theo lô không thể được xem là yếu tố độc đáo nếu chỉ triển khai trong phạm vi dữ liệu nội bộ.

**Thứ hai, các giải pháp truy xuất nguồn gốc chuyên dụng đã mở rộng sang quản lý chất lượng và xử lý sự cố.**

Những nền tảng như FoodLogiQ cho thấy việc kết hợp truy xuất, quản lý hồ sơ, quy trình chất lượng và hỗ trợ thu hồi đã được ứng dụng trên thị trường.

Vì vậy, Nexora cần xây dựng giá trị khác biệt ở cấp độ kiến trúc và mô hình vận hành, thay vì chỉ bổ sung các chức năng tương tự vào danh sách module.

**Thứ ba, khả năng liên thông dữ liệu là một bài toán đa thành phần.**

Mặc dù các tiêu chuẩn như GS1 EPCIS cung cấp cơ sở trao đổi sự kiện, việc kết nối giữa các doanh nghiệp vẫn cần giải quyết vấn đề định danh, quyền chia sẻ, xác thực, xác nhận giao nhận và tính nhất quán của dữ liệu.

Đây là lĩnh vực phù hợp để Nexora tập trung nghiên cứu, phát triển và kiểm chứng bằng sản phẩm thực tế.

## 3.6. Xác định khoảng trống và cơ hội phát triển Nexora

### 3.6.1. Khoảng trống về mô hình kết hợp ERP và truy xuất nguồn gốc

Qua các giải pháp được khảo sát, có thể phân biệt hai hướng sản phẩm phổ biến.

Hướng thứ nhất là hệ thống ERP, trong đó quản lý hàng hóa, kho và các giao dịch kinh doanh đóng vai trò trung tâm. Những năng lực truy xuất được xây dựng dựa trên dữ liệu phát sinh trong quá trình vận hành.

Hướng thứ hai là giải pháp chuyên biệt về truy xuất và quản lý chất lượng, tập trung vào việc thu thập, liên kết và khai thác thông tin sản phẩm qua các công đoạn chuỗi cung ứng.

Nexora lựa chọn kết hợp hai hướng này trong cùng một kiến trúc sản phẩm, đồng thời đặt mục tiêu triển khai nguồn mở và độc lập cho từng doanh nghiệp.

Đây là cơ hội định vị sản phẩm, chưa phải bằng chứng về một khoảng trống thị trường chưa có đối thủ đáp ứng.

### 3.6.2. Cơ hội phát triển kiến trúc Federated ERP Traceability

Một trong những hướng nghiên cứu trọng tâm của Nexora là liên kết thông tin truy xuất giữa nhiều bản triển khai ERP độc lập.

Theo mô hình này, mỗi doanh nghiệp có quyền kiểm soát dữ liệu và hạ tầng của mình, nhưng vẫn có thể trao đổi những sự kiện nghiệp vụ cần thiết với đối tác.

Để bảo đảm khả năng liên thông, Nexora cần xây dựng một giao thức trao đổi nhất quán, bao gồm:

- Cơ chế định danh doanh nghiệp và đối tác.
- Cơ chế xác thực các hệ thống tham gia.
- Cấu trúc sự kiện truy xuất có thể trao đổi.
- Quy tắc liên kết lô hàng và giao dịch giữa các tổ chức.
- Chính sách chia sẻ và công bố dữ liệu.
- Cơ chế xác nhận giao nhận và đối chiếu thông tin.
- Cơ chế xử lý sự kiện lỗi, trùng lặp hoặc đến không đúng thứ tự.
- Phương thức truy vấn hành trình sản phẩm qua các hệ thống.

Điểm cần chứng minh là các bản triển khai có thể duy trì hoạt động nghiệp vụ độc lập và trao đổi dữ liệu khi được kết nối, không phụ thuộc vào một cơ sở dữ liệu ERP tập trung.

### 3.6.3. Cơ hội tích hợp quy trình chất lượng vào giao dịch ERP

Nexora hướng tới việc đưa các quy trình kiểm tra và phê duyệt trở thành một phần của vòng đời nghiệp vụ.

Ví dụ, trong quá trình nhập kho, hệ thống có thể yêu cầu hoàn thành bước kiểm định trước khi cho phép lô hàng chuyển sang trạng thái được sử dụng hoặc phân phối.

Tương tự, khi phiếu kiểm kho phát sinh chênh lệch, người thực hiện phải gửi yêu cầu xác minh hoặc phê duyệt trước khi hệ thống ghi nhận điều chỉnh tồn.

Việc liên kết quy trình với trạng thái dữ liệu giúp bảo đảm các quyết định nghiệp vụ được phản ánh nhất quán giữa các module.

### 3.6.4. Cơ hội hỗ trợ xử lý sự cố xuyên doanh nghiệp

Khả năng xác định phạm vi ảnh hưởng của một lô hàng có vấn đề phụ thuộc vào sự đầy đủ của dữ liệu và mức độ phối hợp giữa các tổ chức.

Nexora hướng tới việc kết nối dữ liệu truy xuất với quy trình xử lý sự cố.

Khi phát sinh cảnh báo, hệ thống cần hỗ trợ:

1. Xác định các lô sản phẩm và giao dịch có liên quan.
2. Phân tích những địa điểm và đối tác có thể chịu ảnh hưởng.
3. Tạo hồ sơ sự cố và phân công người chịu trách nhiệm.
4. Gửi thông tin xử lý đến các đối tác theo quyền và cơ chế đã thiết lập.
5. Theo dõi kết quả xác minh, cách ly hoặc thu hồi.
6. Tổng hợp lịch sử xử lý và những trường hợp chưa hoàn tất.

Giá trị của chức năng này nằm ở khả năng kết nối thông tin giữa các hệ thống và theo dõi toàn bộ quá trình xử lý, thay vì chỉ cung cấp một báo cáo truy xuất.

### 3.6.5. Cơ hội ứng dụng AI trên dữ liệu nghiệp vụ có cấu trúc

Các hệ thống ERP và truy xuất có thể tạo ra lượng dữ liệu lớn về sản phẩm, lô hàng, chứng từ, giao dịch và lịch sử chất lượng.

Nexora định hướng khai thác dữ liệu này để phát triển những chức năng AI hỗ trợ người sử dụng.

Các chức năng có tiềm năng bao gồm trích xuất thông tin từ chứng từ, hỗ trợ phát hiện các điểm bất thường, đối chiếu hồ sơ và tổng hợp dữ liệu phục vụ điều tra.

Tuy nhiên, việc truy xuất quan hệ lô, tính toán tồn kho và kiểm soát quy trình phê duyệt phải dựa trên những quy tắc và dữ liệu xác định.

AI không được tự tạo ra sự kiện nguồn gốc hoặc tự xác nhận tính chính hãng của sản phẩm khi thiếu căn cứ.

## 3.7. Định hướng khác biệt hóa của Nexora

Từ kết quả khảo sát, nhóm xác định năm định hướng phát triển sản phẩm.

### 3.7.1. Open-Source & Self-hosted by Design

Nexora được phát triển với mục tiêu công khai mã nguồn và cung cấp khả năng triển khai độc lập cho từng doanh nghiệp.

Mỗi tổ chức có thể chủ động quản lý cơ sở dữ liệu, cấu hình và hạ tầng hệ thống, đồng thời phát triển thêm các module phù hợp theo điều kiện giấy phép.

### 3.7.2. Traceability-native ERP

Truy xuất nguồn gốc được tích hợp vào các giao dịch nghiệp vụ ERP từ giai đoạn thiết kế.

Thông tin về lô sản phẩm, nguồn gốc, giao dịch và sự kiện được liên kết ngay trong hoạt động mua hàng, sản xuất, nhập xuất kho và bán hàng.

### 3.7.3. Federated Supply Chain Connectivity

Các bản triển khai Nexora độc lập có thể trao đổi sự kiện truy xuất thông qua API và giao thức được chuẩn hóa.

Hệ thống hướng tới khả năng hoạt động mà không cần một cơ sở dữ liệu nghiệp vụ tập trung cho toàn bộ chuỗi cung ứng.

### 3.7.4. Process-driven Quality Governance

Các nghiệp vụ kiểm tra chất lượng, xác nhận và phê duyệt được quản lý thông qua những quy trình có trạng thái và trách nhiệm rõ ràng.

Các điều kiện nghiệp vụ được kiểm soát trước khi cho phép thực hiện những giao dịch có ảnh hưởng đến hàng hóa và dữ liệu truy xuất.

### 3.7.5. Evidence-based Intelligence

Nexora hướng tới việc sử dụng AI để hỗ trợ phân tích những thông tin và bằng chứng đã được ghi nhận.

Các kết quả phân tích cần có khả năng truy vết về nguồn dữ liệu, đồng thời phân biệt giữa sự kiện đã được xác minh và nhận định do hệ thống đưa ra.

Như vậy, USP của Nexora được xác định ở cấp độ tổng thể:

**Nền tảng ERP nguồn mở có khả năng triển khai độc lập tại mỗi doanh nghiệp, tích hợp dữ liệu truy xuất vào các nghiệp vụ kinh doanh và hỗ trợ kết nối chuỗi cung ứng phân tán bằng cơ chế trao đổi sự kiện có kiểm soát.**

Những năng lực này là định hướng phát triển cần được chứng minh thông qua việc hoàn thiện hệ thống và thực hiện các kịch bản kiểm thử.

## 3.8. Các vấn đề và thách thức cần giải quyết

Bên cạnh những cơ hội được xác định, Nexora cũng phải đối mặt với một số thách thức kỹ thuật và nghiệp vụ.

**Thứ nhất, khả năng định danh và liên kết dữ liệu giữa các doanh nghiệp.**

Mỗi doanh nghiệp có thể sử dụng mã sản phẩm và mã lô nội bộ khác nhau. Hệ thống cần có cơ chế ánh xạ các định danh và quản lý những tham chiếu liên doanh nghiệp để tránh nhầm lẫn trong quá trình truy xuất.

**Thứ hai, bảo đảm tính chính xác của dữ liệu truy xuất.**

Dữ liệu có thể bị khai báo sai, thiếu hoặc không được cập nhật kịp thời. Vì vậy, hệ thống cần cơ chế xác minh, đối chiếu và ghi nhận nguồn cung cấp dữ liệu.

**Thứ ba, xử lý các vấn đề về bảo mật và quyền chia sẻ thông tin.**

Các doanh nghiệp có thể cần chia sẻ lịch sử lô hàng nhưng không muốn công khai giá mua, danh sách khách hàng hoặc những thông tin kinh doanh nhạy cảm.

Nexora cần có cơ chế phân quyền ở cấp dữ liệu và sự kiện, không mặc định các đối tác được truy cập toàn bộ thông tin của nhau.

**Thứ tư, bảo đảm tính nhất quán của giao dịch và sự kiện.**

Khi các bản triển khai trao đổi dữ liệu qua mạng, có thể xuất hiện tình huống mất kết nối, gửi trùng, gửi chậm hoặc xác nhận không đồng nhất.

Hệ thống cần hỗ trợ xử lý lỗi, đối chiếu và phục hồi quá trình đồng bộ mà không làm sai lệch dữ liệu nghiệp vụ.

**Thứ năm, cân bằng giữa tính năng ERP và phạm vi phát triển.**

Một hệ thống ERP hoàn chỉnh bao gồm nhiều nghiệp vụ có độ phức tạp cao. Trong phạm vi dự thi, cần giới hạn các chức năng vào một chuỗi nghiệp vụ đại diện nhưng vẫn chứng minh được khả năng tích hợp và liên thông.

**Thứ sáu, khả năng triển khai và duy trì phần mềm nguồn mở.**

Mô hình Self-hosted yêu cầu hệ thống có tài liệu cài đặt, cấu hình, cập nhật, sao lưu và vận hành rõ ràng.

Đây là yếu tố quan trọng để bảo đảm Nexora không chỉ hoạt động trên môi trường phát triển của nhóm mà còn có khả năng được triển khai lại bởi những người sử dụng khác.

## 3.9. Kết luận chương

Chương 3 đã thực hiện khảo sát một số giải pháp ERP nguồn mở và nền tảng truy xuất nguồn gốc tiêu biểu, đồng thời nghiên cứu các tiêu chuẩn liên quan đến việc ghi nhận và trao đổi dữ liệu truy xuất.

Qua quá trình khảo sát, có thể thấy nhiều chức năng như quản lý lô hàng, truy xuất hai chiều, kiểm soát chất lượng và hỗ trợ thu hồi đã được các hệ thống hiện có triển khai.

Điều này cho thấy Nexora cần tập trung vào những giá trị khác biệt ở cấp độ kiến trúc và mô hình vận hành, thay vì chỉ tái hiện các chức năng đã phổ biến.

Trên cơ sở đó, nhóm lựa chọn hướng phát triển một nền tảng ERP nguồn mở, có khả năng triển khai độc lập theo từng doanh nghiệp, tích hợp truy xuất nguồn gốc vào các nghiệp vụ quản trị và hỗ trợ trao đổi sự kiện giữa những hệ thống phân tán.

Kết quả nghiên cứu là cơ sở để xác định các nhóm chức năng ưu tiên, mô hình dữ liệu, cơ chế liên thông, yêu cầu bảo mật và những quy trình nghiệp vụ cần được triển khai trong các giai đoạn tiếp theo.

Chương tiếp theo sẽ tập trung xác định các bên liên quan, nhóm người dùng, phạm vi trách nhiệm và yêu cầu nghiệp vụ tổng quát của Nexora, làm cơ sở cho quá trình phân tích và thiết kế hệ thống.

# CHƯƠNG 4. PHÂN TÍCH CÁC BÊN LIÊN QUAN VÀ ĐỐI TƯỢNG SỬ DỤNG HỆ THỐNG

## 4.1. Mục đích phân tích các bên liên quan

Trong quá trình phát triển hệ thống phần mềm, việc xác định các bên liên quan (Stakeholders) là một bước quan trọng nhằm bảo đảm những yêu cầu được thu thập, phân tích và triển khai phù hợp với nhu cầu thực tế.

Đối với Nexora, quá trình phân tích các bên liên quan có ý nghĩa đặc biệt do hệ thống không chỉ phục vụ hoạt động quản trị nội bộ của một doanh nghiệp mà còn hỗ trợ trao đổi dữ liệu giữa nhiều tổ chức độc lập trong chuỗi cung ứng.

Mỗi tổ chức tham gia có thể đảm nhận những vai trò khác nhau như nhà cung cấp nguyên liệu, nhà sản xuất, nhà phân phối hoặc đơn vị bán lẻ. Đồng thời, trong phạm vi mỗi doanh nghiệp lại tồn tại nhiều nhóm người dùng với chức năng, trách nhiệm và quyền hạn riêng.

Việc xác định các bên liên quan giúp nhóm phát triển làm rõ nhu cầu của từng đối tượng, xác lập phạm vi trách nhiệm và hạn chế những xung đột có thể phát sinh trong quá trình thiết kế và vận hành hệ thống.

Các mục tiêu chính của hoạt động phân tích bao gồm:

- Xác định những tổ chức, cá nhân và hệ thống có ảnh hưởng hoặc chịu ảnh hưởng bởi Nexora.
- Phân loại các nhóm người dùng theo vai trò nghiệp vụ và trách nhiệm quản trị.
- Làm rõ nhu cầu, kỳ vọng và những vấn đề mỗi nhóm đối tượng cần giải quyết.
- Xác định ranh giới giữa hoạt động quản trị nội bộ và hoạt động trao đổi thông tin liên doanh nghiệp.
- Xây dựng cơ sở cho việc thiết kế cơ chế xác thực, phân quyền và phê duyệt.
- Xác định những mối quan hệ và quy trình phối hợp giữa các nhóm đối tượng.
- Làm cơ sở xây dựng Use Case Diagram, Business Process Model và đặc tả yêu cầu hệ thống trong các chương tiếp theo.

## 4.2. Xác định các bên liên quan (Stakeholder Identification)

Stakeholder được hiểu là cá nhân, nhóm người hoặc tổ chức có lợi ích, trách nhiệm, quyền quyết định hoặc chịu tác động từ việc triển khai và vận hành hệ thống.

Đối với Nexora, các bên liên quan được phân chia thành ba nhóm chính: bên liên quan nội bộ doanh nghiệp, bên liên quan bên ngoài doanh nghiệp và bên liên quan đến hoạt động phát triển, triển khai hệ thống.

### 4.2.1. Nhóm bên liên quan nội bộ doanh nghiệp

Đây là những cá nhân hoặc bộ phận trực tiếp tham gia vào hoạt động quản trị, vận hành và kiểm soát các nghiệp vụ trong phạm vi một doanh nghiệp sử dụng Nexora.

| Stakeholder | Vai trò | Nhu cầu và mối quan tâm chính |
| --- | --- | --- |
| Chủ doanh nghiệp / Ban lãnh đạo | Định hướng và giám sát hoạt động | Kiểm soát vận hành, bảo mật dữ liệu, báo cáo và hiệu quả sử dụng |
| Quản lý chi nhánh | Điều hành đơn vị trực thuộc | Theo dõi doanh số, tồn kho, nhân viên, các yêu cầu phê duyệt |
| Quản lý kho | Điều phối hoạt động kho | Kiểm soát nhập xuất, tồn kho, lô hàng, kiểm kê và điều chuyển |
| Nhân viên kho | Thực hiện nghiệp vụ kho | Tiếp nhận, nhập hàng, xuất hàng, kiểm đếm và xác nhận giao nhận |
| Bộ phận mua hàng | Quản lý hoạt động mua sắm | Nhà cung cấp, đơn mua hàng, chứng từ, tiến độ tiếp nhận |
| Bộ phận bán hàng | Xử lý đơn hàng và giao dịch | Lập đơn, bán hàng POS, tra cứu sản phẩm, trả hàng |
| Bộ phận sản xuất | Quản lý quá trình sản xuất | Nguyên liệu, lệnh sản xuất, lô thành phẩm và tiêu hao |
| Bộ phận kiểm soát chất lượng (QC) | Đánh giá chất lượng sản phẩm | Hồ sơ kiểm định, tiêu chí đánh giá, bằng chứng và kết quả kiểm tra |
| Người có thẩm quyền phê duyệt | Kiểm soát các quyết định nghiệp vụ | Xem xét và phê duyệt yêu cầu theo quyền hạn |
| Bộ phận chăm sóc khách hàng | Tiếp nhận phản hồi và hỗ trợ khách hàng | Lịch sử mua hàng, phản ánh chất lượng, thông báo sản phẩm |
| Quản trị viên hệ thống | Vận hành bản triển khai | Tài khoản, phân quyền, cấu hình, tích hợp, sao lưu và bảo mật |

Một cá nhân có thể đảm nhận nhiều vai trò tùy theo quy mô và cơ cấu tổ chức của doanh nghiệp. Vì vậy, Nexora cần thiết kế cơ chế phân quyền linh hoạt, không ràng buộc cứng mỗi tài khoản với duy nhất một nhóm chức năng.

### 4.2.2. Nhóm bên liên quan bên ngoài doanh nghiệp

Đây là những chủ thể có quan hệ giao dịch hoặc trao đổi thông tin với doanh nghiệp sử dụng Nexora.

**a. Nhà cung cấp nguyên liệu và hàng hóa**

Nhà cung cấp chịu trách nhiệm cung cấp nguyên liệu, sản phẩm hoặc các nguồn lực đầu vào cho hoạt động sản xuất và kinh doanh.

Nhóm đối tượng này có thể cung cấp thông tin lô hàng, nguồn gốc, chứng từ và các hồ sơ chất lượng liên quan.

Khi sử dụng Nexora, nhà cung cấp có thể trao đổi các sự kiện xuất hàng hoặc xác nhận giao dịch với doanh nghiệp tiếp nhận thông qua cơ chế liên thông.

**b. Nhà sản xuất**

Nhà sản xuất thực hiện những hoạt động biến đổi nguyên liệu thành thành phẩm, gia công, chế biến hoặc đóng gói.

Doanh nghiệp sản xuất cần quản lý quan hệ giữa nguyên liệu đầu vào, quá trình sản xuất và các lô thành phẩm được tạo ra.

Thông tin này đóng vai trò quan trọng đối với hoạt động truy xuất ngược nguồn gốc và phân tích phạm vi ảnh hưởng khi nguyên liệu có vấn đề.

**c. Nhà phân phối**

Nhà phân phối thực hiện các hoạt động mua, lưu kho, phân phối và chuyển giao hàng hóa giữa nhà sản xuất với những đơn vị tiếp theo trong chuỗi cung ứng.

Nhóm đối tượng này có nhu cầu quản lý giao dịch tiếp nhận, xuất hàng, tồn kho và những thông tin truy xuất được nhà cung cấp chia sẻ.

**d. Doanh nghiệp bán lẻ**

Doanh nghiệp bán lẻ là đơn vị thực hiện hoạt động bán hàng trực tiếp tới người tiêu dùng.

Trong phạm vi bản triển khai của mình, doanh nghiệp có thể sử dụng các module quản lý sản phẩm, kho, bán hàng, POS và truy xuất nguồn gốc.

**e. Đơn vị vận chuyển và logistics**

Đơn vị vận chuyển có thể tham gia quá trình bàn giao hàng hóa giữa các doanh nghiệp.

Tùy theo phạm vi tích hợp, hệ thống có thể ghi nhận thông tin vận chuyển, xác nhận bàn giao và những sự kiện liên quan đến quá trình lưu chuyển sản phẩm.

**f. Người tiêu dùng**

Người tiêu dùng là đối tượng tiếp nhận sản phẩm và sử dụng các công cụ tra cứu thông tin nguồn gốc được công bố.

Thông qua mã QR hoặc đường dẫn truy xuất, người tiêu dùng có thể xem những thông tin liên quan đến sản phẩm và lô hàng theo phạm vi được cho phép.

**g. Tổ chức kiểm định hoặc chứng nhận độc lập**

Đây là những đơn vị thực hiện hoạt động kiểm nghiệm, đánh giá hoặc chứng nhận theo phạm vi chuyên môn và thẩm quyền tương ứng.

Nexora có thể lưu trữ hồ sơ hoặc kết quả do các tổ chức này cung cấp, đồng thời phân biệt giữa tài liệu được doanh nghiệp tải lên và thông tin đã được tổ chức phát hành xác nhận.

### 4.2.3. Nhóm bên liên quan đến phát triển và triển khai hệ thống

Ngoài các nhóm đối tượng sử dụng nghiệp vụ, Nexora còn liên quan đến những chủ thể tham gia xây dựng và duy trì phần mềm.

| Stakeholder | Trách nhiệm |
| --- | --- |
| Nhóm phát triển Nexora | Phân tích, thiết kế, phát triển và kiểm thử mã nguồn |
| Maintainer / Core Contributors | Quản lý phiên bản, đánh giá đóng góp và định hướng kỹ thuật |
| Cộng đồng nguồn mở | Phản hồi lỗi, đề xuất chức năng và đóng góp mã nguồn |
| Đơn vị triển khai | Cài đặt, cấu hình, tùy biến và hỗ trợ doanh nghiệp |
| Quản trị hạ tầng (DevOps/System Administrator) | Vận hành máy chủ, database, bảo mật, sao lưu và cập nhật |
| Đơn vị tích hợp ERP/POS | Phát triển và duy trì các giao diện tích hợp |
| Đơn vị cung cấp dịch vụ AI | Cung cấp hoặc vận hành mô hình AI tùy theo cấu hình của doanh nghiệp |

Vì Nexora được phát triển theo định hướng nguồn mở, nhóm phát triển không mặc định đóng vai trò là đơn vị vận hành hệ thống hoặc quản lý dữ liệu cho mọi doanh nghiệp sử dụng.

Mỗi doanh nghiệp có thể tự triển khai hoặc lựa chọn một đơn vị cung cấp dịch vụ triển khai phù hợp.

## 4.3. Phân tích nhu cầu và kỳ vọng của các bên liên quan

Mặc dù cùng sử dụng Nexora, mỗi nhóm Stakeholder có những mục tiêu và mối quan tâm riêng.

Việc phân tích nhu cầu giúp xác định ưu tiên và tránh thiết kế hệ thống chỉ dựa trên góc nhìn của một nhóm người dùng.

### 4.3.1. Nhu cầu của chủ doanh nghiệp và ban quản lý

Chủ doanh nghiệp và ban quản lý quan tâm tới hiệu quả hoạt động kinh doanh, mức độ kiểm soát dữ liệu, sự minh bạch trong các quy trình và khả năng mở rộng của hệ thống.

Các nhu cầu quan trọng bao gồm:

- Theo dõi tình hình kinh doanh và hoạt động tồn kho.
- Kiểm soát quyền hạn và trách nhiệm của nhân viên.
- Phê duyệt những giao dịch hoặc quyết định quan trọng.
- Quản lý dữ liệu độc lập và chủ động lựa chọn phương án triển khai.
- Kiểm tra lịch sử hoạt động khi phát sinh sai lệch hoặc sự cố.
- Hỗ trợ xác định ảnh hưởng của những vấn đề liên quan đến chất lượng sản phẩm.

### 4.3.2. Nhu cầu của nhân viên nghiệp vụ

Nhân viên nghiệp vụ là nhóm người sử dụng hệ thống thường xuyên để thực hiện những công việc hằng ngày.

Các nhu cầu chủ yếu bao gồm:

- Giao diện dễ hiểu và phù hợp với quy trình làm việc.
- Thao tác nhập liệu, tra cứu và xử lý giao dịch thuận tiện.
- Hạn chế nhập lại thông tin ở nhiều module.
- Được thông báo khi có công việc hoặc yêu cầu cần xử lý.
- Có thể tra cứu lịch sử và trạng thái nghiệp vụ.
- Nhận được thông báo rõ ràng khi giao dịch không đáp ứng điều kiện thực hiện.

### 4.3.3. Nhu cầu của bộ phận kiểm soát chất lượng

Bộ phận QC có nhu cầu tổ chức các bước kiểm định theo những tiêu chí cụ thể, lưu trữ bằng chứng và theo dõi trạng thái xử lý.

Hệ thống cần hỗ trợ quản lý phiếu kiểm tra, kết quả đánh giá, tài liệu liên quan và lịch sử phê duyệt.

Đặc biệt, bộ phận QC cần có khả năng xác định những lô hàng chưa hoàn tất kiểm tra hoặc không đáp ứng các tiêu chí đã được thiết lập.

### 4.3.4. Nhu cầu của các doanh nghiệp đối tác

Các đối tác trong chuỗi cung ứng cần trao đổi thông tin phục vụ giao dịch và truy xuất nhưng vẫn phải bảo đảm quyền kiểm soát dữ liệu nội bộ.

Các nhu cầu quan trọng bao gồm:

- Xác định và xác thực bên giao dịch.
- Trao đổi thông tin sản phẩm và lô hàng theo cấu trúc thống nhất.
- Xác nhận sự kiện giao nhận giữa hai bên.
- Truy xuất thông tin được đối tác cho phép chia sẻ.
- Nhận thông báo khi lô hàng liên quan phát sinh sự cố.
- Hạn chế việc chia sẻ những dữ liệu kinh doanh không cần thiết.

### 4.3.5. Nhu cầu của người tiêu dùng

Người tiêu dùng quan tâm đến khả năng tiếp cận thông tin sản phẩm một cách thuận tiện, dễ hiểu và có nguồn gốc rõ ràng.

Hệ thống cần cung cấp giao diện tra cứu phù hợp, hiển thị những thông tin được phép công bố và thể hiện trạng thái xác minh phù hợp với nguồn dữ liệu.

## 4.4. Xác định các tác nhân của hệ thống (Actor Identification)

Trong phân tích và thiết kế hệ thống, Actor được hiểu là một vai trò hoặc thực thể bên ngoài tương tác với hệ thống để thực hiện một mục tiêu nhất định.

Actor không nhất thiết tương ứng với một cá nhân cụ thể. Một người dùng có thể đảm nhận nhiều Actor tùy theo quyền hạn, trong khi một Actor có thể được thực hiện bởi nhiều người dùng khác nhau.

Đối với Nexora, Actor được phân chia thành các nhóm sau.

### 4.4.1. Nhóm Actor quản trị hệ thống

| Actor | Mô tả trách nhiệm |
| --- | --- |
| System Administrator | Quản lý cấu hình, người dùng, phân quyền và hoạt động hệ thống |
| Organization Administrator | Quản lý thông tin doanh nghiệp, chi nhánh và đơn vị trực thuộc |
| Branch Manager | Quản lý hoạt động và nhân sự trong phạm vi chi nhánh |
| Approver | Phê duyệt hoặc từ chối những yêu cầu theo thẩm quyền |

Các Actor trong nhóm này có thể được gán cho cùng một cá nhân trong những doanh nghiệp có quy mô nhỏ.

### 4.4.2. Nhóm Actor thực hiện nghiệp vụ ERP

| Actor | Mô tả trách nhiệm |
| --- | --- |
| Purchasing Staff | Quản lý đơn mua hàng và giao dịch với nhà cung cấp |
| Warehouse Staff | Nhập xuất, kiểm kho, điều chuyển và quản lý hàng hóa |
| Warehouse Manager | Giám sát tồn kho, xác nhận các giao dịch kho |
| Production Staff | Ghi nhận hoạt động sản xuất và sử dụng nguyên liệu |
| Production Manager | Điều phối và giám sát hoạt động sản xuất |
| Sales Staff | Quản lý đơn bán hàng |
| POS Cashier | Thực hiện giao dịch bán hàng tại quầy |
| Customer Service Staff | Tiếp nhận phản hồi và hỗ trợ khách hàng |

### 4.4.3. Nhóm Actor quản lý chất lượng và truy xuất

| Actor | Mô tả trách nhiệm |
| --- | --- |
| Quality Inspector | Thực hiện kiểm tra và ghi nhận kết quả |
| Quality Manager | Đánh giá, phê duyệt và quản lý vấn đề chất lượng |
| Traceability Officer | Quản lý hồ sơ, sự kiện và thông tin truy xuất |
| Incident Manager | Điều phối việc điều tra và xử lý sự cố |
| Recall Coordinator | Theo dõi các công việc cách ly và thu hồi |

Những vai trò trên có thể được gộp hoặc tách tùy theo mô hình tổ chức. Việc phân chia Actor nhằm hỗ trợ phân tích trách nhiệm, không bắt buộc doanh nghiệp phải có đầy đủ những chức danh tương ứng.

### 4.4.4. Nhóm Actor bên ngoài

**Trading Partner System:** Hệ thống Nexora hoặc hệ thống tương thích do một doanh nghiệp đối tác vận hành, thực hiện trao đổi sự kiện truy xuất.

**External ERP/POS System:** Hệ thống quản trị doanh nghiệp hoặc bán hàng bên ngoài có khả năng tích hợp với Nexora thông qua API.

**Consumer:** Người tiêu dùng thực hiện tra cứu nguồn gốc sản phẩm.

**External Verification Service:** Dịch vụ hoặc hệ thống hỗ trợ xác minh thông tin, tài liệu hoặc danh tính theo phạm vi được tích hợp.

**AI Service:** Dịch vụ hỗ trợ trích xuất, phân tích và tổng hợp thông tin.

Các Actor dạng hệ thống được phân biệt với Actor là con người để thuận tiện khi thiết kế Use Case và các giao diện tích hợp.

## 4.5. Phân tích vai trò và quyền hạn trong hệ thống

### 4.5.1. Nguyên tắc phân quyền

Nexora được định hướng xây dựng cơ chế phân quyền dựa trên vai trò (Role-Based Access Control – RBAC), kết hợp các điều kiện truy cập theo phạm vi dữ liệu và trạng thái nghiệp vụ.

Một quyền truy cập không chỉ được xác định bởi tên chức năng mà còn cần xét đến phạm vi tổ chức, chi nhánh, kho hàng hoặc đối tượng nghiệp vụ liên quan.

Ví dụ, nhân viên kho tại chi nhánh A có thể được phép tạo phiếu nhập kho cho kho A nhưng không có quyền điều chỉnh tồn kho tại kho B.

Tương tự, người có quyền kiểm tra chất lượng không mặc định có quyền phê duyệt kết quả kiểm tra do chính mình thực hiện.

### 4.5.2. Phạm vi quyền truy cập

Hệ thống cần hỗ trợ ít nhất các phạm vi sau:

**System Scope:** Quyền cấu hình và quản trị hệ thống của doanh nghiệp.

**Organization Scope:** Quyền quản lý dữ liệu trên phạm vi toàn doanh nghiệp.

**Branch Scope:** Quyền quản lý dữ liệu của một hoặc nhiều chi nhánh được phân công.

**Warehouse Scope:** Quyền thực hiện nghiệp vụ tại những kho được cấp quyền.

**Document Scope:** Quyền xem, tạo, sửa, xác nhận hoặc phê duyệt đối tượng nghiệp vụ cụ thể.

**Partner Sharing Scope:** Quyền truy cập dữ liệu được chia sẻ giữa các doanh nghiệp đối tác.

Việc cấp quyền truy cập cho đối tác cần được xử lý thông qua chính sách chia sẻ và giao thức liên thông, không dựa trên việc cấp tài khoản quản trị trực tiếp trong hệ thống nội bộ của doanh nghiệp.

### 4.5.3. Phân tách trách nhiệm trong quy trình phê duyệt

Đối với những nghiệp vụ quan trọng, Nexora cần hỗ trợ nguyên tắc phân tách trách nhiệm (Separation of Duties).

Ví dụ, trong quy trình kiểm định và phê duyệt lô hàng:

- Nhân viên kho thực hiện tiếp nhận hàng hóa.
- Nhân viên QC thực hiện kiểm tra.
- Người quản lý có thẩm quyền đánh giá và phê duyệt.
- Hệ thống kiểm tra điều kiện trước khi cho phép sử dụng hoặc phân phối lô hàng.

Trong những trường hợp đặc biệt, doanh nghiệp có thể cấu hình quy trình khác theo chính sách nội bộ. Tuy nhiên, những ngoại lệ cần được kiểm soát và lưu lại lịch sử thực hiện.

## 4.6. Phân tích quan hệ giữa các bên trong chuỗi cung ứng

### 4.6.1. Mối quan hệ giữa nhà sản xuất và nhà phân phối

Nhà sản xuất có trách nhiệm cung cấp thông tin hàng hóa, lô sản phẩm và những hồ sơ liên quan theo thỏa thuận với bên tiếp nhận.

Nhà phân phối thực hiện xác nhận tiếp nhận, đối chiếu thông tin và ghi nhận sự kiện nhập hàng trong hệ thống nội bộ.

Hai doanh nghiệp có thể trao đổi thông tin thông qua những bản triển khai Nexora độc lập.

### 4.6.2. Mối quan hệ giữa nhà phân phối và nhà bán lẻ

Nhà phân phối thực hiện giao dịch xuất hàng, trong khi nhà bán lẻ ghi nhận hoạt động nhập kho và quản lý tồn kho theo thông tin tiếp nhận.

Thông tin lô hàng được liên kết với các giao dịch tương ứng, tạo cơ sở để truy xuất quá trình phân phối.

### 4.6.3. Mối quan hệ giữa nhà bán lẻ và người tiêu dùng

Nhà bán lẻ thực hiện giao dịch bán hàng thông qua POS hoặc các kênh bán hàng phù hợp.

Khi sản phẩm được xác định theo lô, thông tin giao dịch có thể được liên kết với lịch sử truy xuất.

Người tiêu dùng truy cập thông tin nguồn gốc được doanh nghiệp công bố thông qua các công cụ tra cứu.

### 4.6.4. Mối quan hệ giữa các doanh nghiệp khi phát sinh sự cố

Khi phát hiện vấn đề về chất lượng, doanh nghiệp có trách nhiệm xử lý theo phạm vi nghiệp vụ và các nghĩa vụ áp dụng.

Nếu sự cố liên quan đến những đối tác đã tham gia giao dịch, hệ thống có thể hỗ trợ trao đổi thông báo, yêu cầu xác minh hoặc thông tin xử lý theo cơ chế đã thiết lập.

Mỗi doanh nghiệp tiếp tục quản lý các công việc và quyết định trong phạm vi hệ thống của mình, đồng thời có thể phản hồi kết quả cho những đối tác liên quan.

## 4.7. Ranh giới hệ thống và phạm vi trách nhiệm

### 4.7.1. Ranh giới của một bản triển khai Nexora

Mỗi bản triển khai Nexora được quản lý như một hệ thống độc lập, phục vụ hoạt động của một doanh nghiệp.

Trong phạm vi bản triển khai, hệ thống chịu trách nhiệm xử lý các nghiệp vụ ERP, quản lý người dùng, lưu trữ dữ liệu và thực hiện những quy trình đã được cấu hình.

Doanh nghiệp có thể tổ chức nhiều chi nhánh, kho hàng và đơn vị trực thuộc trong cùng một bản triển khai mà không cần tạo thêm hệ thống ERP độc lập.

### 4.7.2. Ranh giới giữa các doanh nghiệp

Các doanh nghiệp tham gia chuỗi cung ứng được xem là những tổ chức độc lập.

Một doanh nghiệp không có quyền truy cập trực tiếp vào cơ sở dữ liệu nội bộ của doanh nghiệp khác.

Việc trao đổi thông tin được thực hiện thông qua những giao diện và cơ chế xác thực được xác định rõ ràng.

Thông tin được trao đổi cần giới hạn trong phạm vi nghiệp vụ và quyền chia sẻ mà các bên cho phép.

### 4.7.3. Ranh giới giữa dữ liệu nội bộ và dữ liệu công khai

Dữ liệu của Nexora được phân loại thành những nhóm chính:

**Dữ liệu nội bộ:** Thông tin quản trị, nhân viên, giá vốn, giao dịch và các hồ sơ không được phép công khai.

**Dữ liệu chia sẻ với đối tác:** Những thông tin về sản phẩm, lô hàng, giao nhận hoặc hồ sơ liên quan được cung cấp cho đối tác theo thỏa thuận và chính sách truy cập.

**Dữ liệu công khai:** Những thông tin về nguồn gốc, sản phẩm hoặc trạng thái truy xuất được doanh nghiệp cho phép người tiêu dùng tra cứu.

Một thông tin thuộc nhóm dữ liệu công khai không mặc định đồng nghĩa thông tin đó đã được xác minh độc lập.

### 4.7.4. Ranh giới trách nhiệm của Nexora đối với dữ liệu nguồn gốc

Nexora có trách nhiệm hỗ trợ ghi nhận, tổ chức, truy vấn và liên kết dữ liệu truy xuất.

Tuy nhiên, hệ thống không tự bảo đảm tính chính xác của toàn bộ thông tin được các tổ chức cung cấp.

Việc xác minh nguồn gốc và chất lượng sản phẩm còn phụ thuộc vào bằng chứng, quy trình kiểm tra, thẩm quyền xác nhận và mức độ tin cậy của các chủ thể tham gia.

Do đó, Nexora cần phân biệt rõ dữ liệu khai báo, dữ liệu đã được đối tác xác nhận, dữ liệu có bằng chứng và dữ liệu đã được tổ chức có thẩm quyền hoặc bên độc lập xác minh.

## 4.8. Các yêu cầu nghiệp vụ tổng quát

Từ việc phân tích Stakeholders, Actors và phạm vi trách nhiệm, nhóm xác định các yêu cầu nghiệp vụ tổng quát làm cơ sở cho việc phát triển hệ thống.

### BR-01. Quản trị doanh nghiệp độc lập

Hệ thống phải cho phép mỗi doanh nghiệp triển khai, cấu hình và quản lý một bản Nexora riêng biệt.

### BR-02. Quản lý cơ cấu tổ chức

Hệ thống phải hỗ trợ quản lý chi nhánh, kho hàng, phòng ban và người dùng trong phạm vi một doanh nghiệp.

### BR-03. Quản lý các nghiệp vụ ERP cốt lõi

Hệ thống phải hỗ trợ các nghiệp vụ quản lý sản phẩm, mua hàng, bán hàng, tồn kho và những giao dịch liên quan.

### BR-04. Quản lý định danh sản phẩm và lô hàng

Hệ thống phải hỗ trợ quản lý sản phẩm theo mã định danh và thông tin lô hoặc số serial khi nghiệp vụ yêu cầu.

### BR-05. Ghi nhận sự kiện truy xuất

Hệ thống phải có khả năng ghi nhận các sự kiện liên quan đến quá trình hình thành, lưu chuyển và tiêu thụ sản phẩm.

### BR-06. Quản lý quy trình chất lượng và phê duyệt

Hệ thống phải hỗ trợ xác định, thực hiện và theo dõi các bước kiểm tra, xác minh và phê duyệt theo quyền hạn.

### BR-07. Trao đổi dữ liệu giữa các doanh nghiệp độc lập

Hệ thống phải cung cấp cơ chế trao đổi dữ liệu truy xuất với các hệ thống đối tác tương thích thông qua giao diện tích hợp có kiểm soát.

### BR-08. Truy xuất nguồn gốc hai chiều

Hệ thống phải hỗ trợ truy xuất ngược và truy xuất xuôi dựa trên các sự kiện và quan hệ dữ liệu đã được ghi nhận.

### BR-09. Liên kết giao dịch bán hàng với dữ liệu truy xuất

Hệ thống phải hỗ trợ liên kết giao dịch bán hàng với mã lô hoặc định danh sản phẩm phù hợp.

### BR-10. Quản lý sự cố và thu hồi

Hệ thống phải hỗ trợ ghi nhận sự cố, xác định các đối tượng liên quan và theo dõi các hoạt động xử lý.

### BR-11. Phân quyền và kiểm soát chia sẻ dữ liệu

Hệ thống phải thực hiện kiểm soát truy cập đối với dữ liệu nội bộ, dữ liệu chia sẻ với đối tác và dữ liệu công khai.

### BR-12. Lưu trữ bằng chứng và lịch sử nghiệp vụ

Hệ thống phải hỗ trợ lưu trữ tài liệu, bằng chứng và lịch sử thao tác phục vụ hoạt động kiểm tra, đối chiếu và truy vết.

### BR-13. Hỗ trợ phân tích bằng trí tuệ nhân tạo

Hệ thống được định hướng hỗ trợ phân tích chứng từ, phát hiện bất thường và tổng hợp thông tin phục vụ xử lý nghiệp vụ, với cơ chế kiểm soát phù hợp.

### BR-14. Khả năng triển khai và phát triển nguồn mở

Hệ thống phải có mã nguồn, tài liệu, cấu hình và quy trình triển khai phù hợp để các tổ chức có thể cài đặt và vận hành độc lập theo điều kiện giấy phép.

Những yêu cầu trên là yêu cầu nghiệp vụ ở cấp độ tổng quát. Các tiêu chí kỹ thuật, điều kiện xử lý, dữ liệu đầu vào, đầu ra và kịch bản kiểm thử sẽ được cụ thể hóa trong giai đoạn đặc tả yêu cầu hệ thống.

## 4.9. Kết luận chương

Chương 4 đã thực hiện phân tích các bên liên quan, đối tượng sử dụng, vai trò và phạm vi trách nhiệm của hệ thống Nexora.

Kết quả phân tích cho thấy Nexora cần đáp ứng đồng thời hai nhóm nhu cầu: quản trị hoạt động nội bộ của doanh nghiệp và trao đổi thông tin truy xuất với những tổ chức độc lập trong chuỗi cung ứng.

Đối với hoạt động nội bộ, hệ thống cần cung cấp cơ chế quản lý tổ chức, phân quyền người dùng, xử lý nghiệp vụ ERP và kiểm soát quy trình.

Đối với hoạt động liên doanh nghiệp, hệ thống cần bảo đảm khả năng trao đổi dữ liệu theo giao thức thống nhất, xác thực các chủ thể tham gia và kiểm soát phạm vi chia sẻ thông tin.

Việc xác định các Actor và yêu cầu nghiệp vụ tổng quát tạo cơ sở cho quá trình phân tích Use Case, xây dựng quy trình nghiệp vụ và thiết kế các module chức năng trong những chương tiếp theo.

# CHƯƠNG 5. PHÂN TÍCH QUY TRÌNH NGHIỆP VỤ CỦA HỆ THỐNG

## 5.1. Mục đích phân tích quy trình nghiệp vụ

Phân tích quy trình nghiệp vụ (Business Process Analysis) là hoạt động nghiên cứu, xác định và mô tả trình tự thực hiện các công việc trong một tổ chức nhằm làm rõ cách thức các đối tượng tham gia phối hợp, xử lý thông tin và đạt được mục tiêu kinh doanh.

Đối với Nexora, phân tích quy trình nghiệp vụ đóng vai trò quan trọng trong việc chuyển đổi những yêu cầu quản trị doanh nghiệp và truy xuất nguồn gốc thành các quy trình có thể triển khai trên hệ thống phần mềm.

Khác với những hệ thống ERP chỉ tập trung xử lý các giao dịch quản trị nội bộ, Nexora được định hướng tích hợp khả năng ghi nhận và trao đổi các sự kiện truy xuất xuyên suốt chuỗi cung ứng. Do đó, quy trình nghiệp vụ không chỉ diễn ra giữa những phòng ban trong một doanh nghiệp, mà còn có thể liên quan đến nhiều tổ chức độc lập sử dụng các bản triển khai Nexora khác nhau.

Hoạt động phân tích hướng tới những mục tiêu chính:

- Xác định trình tự thực hiện các nghiệp vụ cốt lõi của hệ thống.
- Làm rõ vai trò và trách nhiệm của các đối tượng tham gia từng quy trình.
- Xác định dữ liệu đầu vào, kết quả đầu ra và các điều kiện xử lý.
- Phân biệt các giao dịch quản trị ERP với các sự kiện phục vụ truy xuất nguồn gốc.
- Xác định những bước cần kiểm tra, xác minh hoặc phê duyệt.
- Làm rõ cơ chế phối hợp giữa các doanh nghiệp độc lập trong chuỗi cung ứng.
- Xác định những tình huống ngoại lệ có thể phát sinh và phương án xử lý.
- Làm cơ sở xây dựng Use Case, Activity Diagram, BPMN, đặc tả chức năng và thiết kế cơ sở dữ liệu.

## 5.2. Mô hình nghiệp vụ tổng quan của Nexora

### 5.2.1. Nguyên tắc tổ chức quy trình

Nexora được định hướng xây dựng như một hệ thống ERP nguồn mở, tích hợp quản lý truy xuất nguồn gốc và quy trình chất lượng.

Toàn bộ hoạt động nghiệp vụ được tổ chức theo hai phạm vi chính.

**Phạm vi thứ nhất – Quy trình quản trị nội bộ doanh nghiệp (Internal Business Processes).**

Bao gồm các nghiệp vụ được thực hiện trong một bản triển khai Nexora như quản lý sản phẩm, mua hàng, nhập xuất kho, kiểm định chất lượng, sản xuất, bán hàng và xử lý sự cố.

Các quy trình này sử dụng dữ liệu, người dùng và quyền hạn thuộc phạm vi quản lý của doanh nghiệp.

**Phạm vi thứ hai – Quy trình liên thông chuỗi cung ứng (Inter-enterprise Business Processes).**

Bao gồm các hoạt động trao đổi thông tin và xác nhận sự kiện giữa hai hoặc nhiều doanh nghiệp độc lập.

Mỗi doanh nghiệp có thể sử dụng một bản triển khai Nexora riêng với cơ sở dữ liệu và chính sách quản trị độc lập. Việc trao đổi thông tin được thực hiện thông qua các giao diện API và giao thức sự kiện được thống nhất.

Hai phạm vi trên có mối quan hệ chặt chẽ. Một giao dịch nội bộ, chẳng hạn như xuất hàng cho đối tác, có thể làm phát sinh một sự kiện truy xuất được chia sẻ sang hệ thống của doanh nghiệp tiếp nhận.

### 5.2.2. Chuỗi nghiệp vụ tổng thể

Quy trình nghiệp vụ tổng thể của Nexora được mô tả thông qua các giai đoạn:

**Giai đoạn 1 – Quản lý sản phẩm và nguồn cung**

Doanh nghiệp thiết lập danh mục sản phẩm, nguyên liệu, nhà cung cấp và các thông tin phục vụ hoạt động mua hàng, sản xuất và quản lý tồn kho.

**Giai đoạn 2 – Mua hàng và tiếp nhận**

Bộ phận mua hàng tạo đơn mua, tiếp nhận hàng hóa và đối chiếu các thông tin liên quan đến số lượng, chứng từ, lô hàng và nguồn cung.

**Giai đoạn 3 – Kiểm soát chất lượng**

Đối với các nhóm hàng cần kiểm định, hàng hóa được chuyển vào quy trình kiểm tra. Kết quả kiểm tra và phê duyệt quyết định những hành động nghiệp vụ tiếp theo.

**Giai đoạn 4 – Sản xuất và hình thành sản phẩm**

Doanh nghiệp sản xuất sử dụng nguyên liệu đầu vào để tạo ra thành phẩm. Quan hệ giữa các lô nguyên liệu và lô thành phẩm được ghi nhận để phục vụ hoạt động truy xuất.

**Giai đoạn 5 – Lưu kho và phân phối**

Hàng hóa được quản lý trong kho, thực hiện các giao dịch điều chuyển, xuất hàng và bàn giao cho những đơn vị tiếp theo trong chuỗi cung ứng.

**Giai đoạn 6 – Bán hàng và tiêu thụ**

Doanh nghiệp bán lẻ thực hiện giao dịch thông qua hệ thống POS hoặc đơn hàng. Các giao dịch có thể được liên kết với thông tin lô sản phẩm.

**Giai đoạn 7 – Truy xuất nguồn gốc**

Hệ thống sử dụng những sự kiện đã ghi nhận để truy xuất ngược hoặc truy xuất xuôi hành trình sản phẩm, đồng thời cung cấp thông tin phù hợp cho từng đối tượng được phép truy cập.

**Giai đoạn 8 – Giám sát và xử lý sự cố**

Khi phát hiện vấn đề chất lượng, doanh nghiệp sử dụng lịch sử truy xuất để xác định các đối tượng có thể bị ảnh hưởng, tổ chức kiểm tra, cách ly, thông báo và thu hồi theo quy trình phù hợp.

Các giai đoạn này tạo thành một chu trình nghiệp vụ liên tục. Trong đó, dữ liệu phát sinh từ hoạt động ERP đồng thời đóng vai trò là cơ sở cho hoạt động truy xuất nguồn gốc và quản lý chất lượng.

## 5.3. Quy trình quản lý sản phẩm và lô hàng

### 5.3.1. Mục tiêu quy trình

Quy trình quản lý sản phẩm và lô hàng nhằm thiết lập thông tin định danh thống nhất cho những đối tượng được quản lý trong Nexora.

Đây là quy trình nền tảng, bởi khả năng truy xuất phụ thuộc trực tiếp vào việc hệ thống có thể xác định chính xác sản phẩm, lô hàng và những quan hệ liên quan.

### 5.3.2. Đối tượng tham gia

- Product Manager hoặc nhân viên quản lý danh mục.
- Warehouse Manager.
- Production Manager.
- Traceability Officer.
- System Administrator.

### 5.3.3. Điều kiện đầu vào

Doanh nghiệp đã được thiết lập trên hệ thống và người thực hiện có quyền quản lý danh mục sản phẩm.

Các dữ liệu cần thiết có thể bao gồm mã sản phẩm, tên sản phẩm, đơn vị tính, nhóm hàng, thông tin nhà cung cấp hoặc thông tin sản xuất.

### 5.3.4. Luồng nghiệp vụ chính

**Bước 1:** Nhân viên có thẩm quyền khởi tạo sản phẩm hoặc nguyên liệu trong danh mục.

**Bước 2:** Hệ thống kiểm tra tính hợp lệ và tính duy nhất của mã sản phẩm trong phạm vi doanh nghiệp.

**Bước 3:** Người dùng khai báo các thuộc tính cần thiết, bao gồm đơn vị tính, nhóm sản phẩm và cơ chế quản lý định danh.

**Bước 4:** Doanh nghiệp xác định phương thức quản lý sản phẩm, chẳng hạn quản lý theo số lượng thông thường, theo lô hoặc theo số serial.

**Bước 5:** Khi có hoạt động sản xuất hoặc tiếp nhận hàng, người dùng tạo hoặc liên kết thông tin lô hàng tương ứng.

**Bước 6:** Hệ thống ghi nhận thông tin lô, nguồn phát sinh, thời gian và những thuộc tính cần thiết.

**Bước 7:** Thông tin sản phẩm và lô hàng được sử dụng trong những quy trình mua hàng, sản xuất, kho và bán hàng tiếp theo.

### 5.3.5. Các quy tắc nghiệp vụ

- Mỗi sản phẩm phải có một định danh nội bộ không trùng lặp trong phạm vi doanh nghiệp.
- Mã lô cần được xác định trong một phạm vi định danh rõ ràng; không mặc định mã lô do hai doanh nghiệp khác nhau đặt là duy nhất trên toàn hệ thống.
- Sản phẩm được cấu hình bắt buộc quản lý theo lô phải có thông tin lô hợp lệ khi phát sinh các giao dịch yêu cầu truy xuất.
- Một sản phẩm có thể có nhiều lô, nhưng mỗi lô phải được liên kết với sản phẩm tương ứng.
- Các thông tin đã được sử dụng trong giao dịch cần được kiểm soát khi chỉnh sửa để tránh làm sai lệch lịch sử nghiệp vụ.
- Các định danh trao đổi giữa doanh nghiệp phải có cơ chế phân biệt tổ chức phát hành hoặc sử dụng chuẩn định danh phù hợp.

### 5.3.6. Kết quả đầu ra

Danh mục sản phẩm và thông tin lô hàng được chuẩn hóa, tạo cơ sở để ghi nhận các giao dịch ERP và liên kết sự kiện truy xuất.

## 5.4. Quy trình mua hàng và nhập kho

### 5.4.1. Mục tiêu quy trình

Quy trình mua hàng và nhập kho nhằm quản lý hoạt động đặt mua, tiếp nhận và ghi nhận hàng hóa từ nhà cung cấp.

Bên cạnh các nghiệp vụ ERP thông thường, Nexora cần liên kết thông tin lô hàng và nguồn cung với giao dịch tiếp nhận để phục vụ hoạt động truy xuất.

### 5.4.2. Đối tượng tham gia

- Purchasing Staff.
- Warehouse Staff.
- Warehouse Manager.
- Quality Inspector.
- Approver.
- Supplier hoặc Trading Partner System.

### 5.4.3. Điều kiện đầu vào

- Nhà cung cấp đã được khai báo.
- Sản phẩm cần mua đã tồn tại trong danh mục hoặc được tạo theo quy trình cho phép.
- Người dùng có quyền tạo đơn mua.
- Kho tiếp nhận đã được thiết lập.

### 5.4.4. Luồng nghiệp vụ chính

**Bước 1 – Tạo đơn mua hàng**

Nhân viên mua hàng lựa chọn nhà cung cấp, sản phẩm, số lượng, đơn giá dự kiến và các điều kiện mua hàng.

**Bước 2 – Kiểm tra và phê duyệt**

Nếu doanh nghiệp cấu hình quy trình phê duyệt đơn mua, hệ thống chuyển đơn đến người có thẩm quyền trước khi xác nhận.

**Bước 3 – Tiếp nhận hàng hóa**

Khi nhà cung cấp giao hàng, nhân viên kho thực hiện kiểm đếm, đối chiếu với đơn mua và chứng từ giao hàng.

**Bước 4 – Xác định thông tin lô hàng**

Đối với sản phẩm được quản lý theo lô, người tiếp nhận phải ghi nhận hoặc xác nhận mã lô, số lượng và những thông tin cần thiết.

**Bước 5 – Đánh giá yêu cầu kiểm định**

Hệ thống xác định hàng hóa có cần thực hiện quy trình kiểm tra chất lượng hay không dựa trên cấu hình sản phẩm, nhà cung cấp hoặc quy tắc nghiệp vụ.

**Bước 6 – Ghi nhận hàng chờ kiểm định**

Nếu cần kiểm định, hàng được ghi nhận ở trạng thái chờ kiểm tra hoặc khu vực cách ly phù hợp, không tự động chuyển thành tồn kho khả dụng.

**Bước 7 – Hoàn tất tiếp nhận**

Khi các điều kiện nghiệp vụ được đáp ứng, hệ thống hoàn tất phiếu nhập và ghi nhận các thay đổi tồn kho tương ứng.

**Bước 8 – Tạo sự kiện truy xuất**

Hệ thống ghi nhận sự kiện tiếp nhận hàng hóa, liên kết với lô sản phẩm, nhà cung cấp, địa điểm, thời gian và chứng từ liên quan.

### 5.4.5. Luồng ngoại lệ

**Trường hợp giao thiếu hàng:** Hệ thống cho phép ghi nhận số lượng thực nhận và duy trì phần đơn mua chưa được tiếp nhận theo chính sách nghiệp vụ.

**Trường hợp giao thừa hàng:** Phần chênh lệch phải được ghi nhận để kiểm tra hoặc phê duyệt trước khi xử lý theo quy định của doanh nghiệp.

**Trường hợp sai mã lô:** Người tiếp nhận phải đối chiếu chứng từ và thông tin từ nhà cung cấp trước khi xác nhận lô hàng.

**Trường hợp hàng không đạt chất lượng:** Hàng được giữ ở trạng thái không khả dụng, chuyển sang quy trình xử lý hàng không phù hợp.

**Trường hợp đối tác không sử dụng Nexora:** Doanh nghiệp vẫn có thể nhập hàng bằng phương pháp thông thường, nhưng dữ liệu truy xuất từ đối tác cần được phân biệt với những sự kiện đã được xác nhận qua hệ thống liên thông.

### 5.4.6. Kết quả đầu ra

- Đơn mua hàng được cập nhật trạng thái.
- Phiếu tiếp nhận hoặc phiếu nhập kho được ghi nhận.
- Tồn kho được cập nhật theo kết quả xử lý.
- Thông tin lô hàng được liên kết với nguồn cung.
- Sự kiện tiếp nhận phục vụ truy xuất được tạo.
- Các sai lệch hoặc yêu cầu kiểm tra được lưu trữ.

## 5.5. Quy trình kiểm tra và phê duyệt chất lượng

### 5.5.1. Mục tiêu quy trình

Quy trình kiểm tra chất lượng nhằm đánh giá mức độ đáp ứng của hàng hóa hoặc lô sản phẩm đối với những tiêu chí được doanh nghiệp thiết lập.

Quy trình này đóng vai trò kiểm soát trước khi sản phẩm được cho phép sử dụng trong sản xuất, xuất kho hoặc phân phối.

### 5.5.2. Đối tượng tham gia

- Warehouse Staff.
- Quality Inspector.
- Quality Manager.
- Approver.
- Production Manager.

### 5.5.3. Điều kiện kích hoạt

Quy trình có thể được khởi tạo khi:

- Tiếp nhận nguyên liệu hoặc hàng hóa yêu cầu kiểm định.
- Hoàn thành một lô sản xuất.
- Phát sinh sự cố hoặc phản ánh chất lượng.
- Doanh nghiệp yêu cầu tái kiểm tra một lô hàng.
- Kết quả kiểm tra trước đó hết hiệu lực theo quy tắc được áp dụng.

### 5.5.4. Luồng nghiệp vụ chính

**Bước 1:** Hệ thống hoặc người có thẩm quyền tạo yêu cầu kiểm tra chất lượng.

**Bước 2:** Yêu cầu được liên kết với sản phẩm, lô hàng, địa điểm và nghiệp vụ phát sinh.

**Bước 3:** Người quản lý phân công nhân viên kiểm tra.

**Bước 4:** Nhân viên QC thực hiện kiểm tra theo các tiêu chí và phương pháp được quy định.

**Bước 5:** Kết quả kiểm tra được ghi nhận, có thể kèm tài liệu, hình ảnh hoặc các bằng chứng phù hợp.

**Bước 6:** Hệ thống kiểm tra tính đầy đủ của hồ sơ và đánh giá những điều kiện có thể xác định bằng quy tắc.

**Bước 7:** Người có thẩm quyền xem xét kết quả và thực hiện phê duyệt, từ chối hoặc yêu cầu kiểm tra bổ sung.

**Bước 8:** Trạng thái chất lượng của lô được cập nhật theo quyết định hợp lệ.

**Bước 9:** Những nghiệp vụ liên quan như xuất hàng hoặc đưa nguyên liệu vào sản xuất được cho phép hoặc hạn chế theo trạng thái chất lượng và chính sách áp dụng.

### 5.5.5. Trạng thái nghiệp vụ

Một quy trình kiểm tra chất lượng có thể sử dụng các trạng thái:

- Draft: Phiếu mới được khởi tạo.
- Pending Inspection: Chờ thực hiện kiểm tra.
- In Inspection: Đang kiểm tra.
- Pending Approval: Chờ phê duyệt.
- Approved: Được phê duyệt.
- Rejected: Không được chấp thuận.
- Reinspection Required: Yêu cầu kiểm tra lại.
- Cancelled: Đã hủy theo quy định.

Trạng thái phiếu kiểm tra cần được phân biệt với trạng thái khả dụng của hàng hóa. Một phiếu kiểm tra được phê duyệt không tự động đồng nghĩa lô hàng có thể được xuất bán nếu còn tồn tại các điều kiện hạn chế khác.

### 5.5.6. Quy tắc nghiệp vụ

- Người dùng không được thực hiện các bước ngoài quyền hạn được cấp.
- Không cho phép hoàn tất kiểm định khi thiếu thông tin bắt buộc.
- Lịch sử kiểm tra và phê duyệt phải được lưu lại.
- Những lô chưa đạt yêu cầu không được tự động chuyển thành hàng khả dụng.
- Việc kiểm tra lại phải duy trì được liên kết với kết quả kiểm tra trước đó.
- Các trường hợp phê duyệt ngoại lệ phải có căn cứ và được ghi nhận.

### 5.5.7. Kết quả đầu ra

Hệ thống tạo hồ sơ kiểm tra chất lượng, ghi nhận quyết định phê duyệt và cập nhật điều kiện nghiệp vụ áp dụng đối với lô hàng.

## 5.6. Quy trình sản xuất và truy xuất nguyên liệu – thành phẩm

### 5.6.1. Mục tiêu quy trình

Quy trình sản xuất nhằm quản lý việc sử dụng nguyên liệu để tạo ra thành phẩm, đồng thời ghi nhận quan hệ giữa các lô nguyên liệu đầu vào và lô sản phẩm đầu ra.

Đây là một trong những quy trình trọng tâm của Nexora, bởi dữ liệu truy xuất không chỉ phản ánh hoạt động di chuyển hàng hóa mà còn cần thể hiện quá trình biến đổi nguyên liệu thành sản phẩm mới.

### 5.6.2. Đối tượng tham gia

- Production Manager.
- Production Staff.
- Warehouse Staff.
- Quality Inspector.
- Approver.

### 5.6.3. Điều kiện đầu vào

- Sản phẩm thành phẩm đã được khai báo.
- Nguyên liệu đã có thông tin quản lý phù hợp.
- Tồn kho nguyên liệu đáp ứng điều kiện sử dụng.
- Lệnh sản xuất hoặc yêu cầu sản xuất đã được tạo.
- Người thực hiện có quyền truy cập nghiệp vụ tương ứng.

### 5.6.4. Luồng nghiệp vụ chính

**Bước 1 – Khởi tạo lệnh sản xuất**

Người quản lý sản xuất tạo lệnh sản xuất, xác định thành phẩm, số lượng dự kiến và các nguyên liệu cần sử dụng.

**Bước 2 – Lựa chọn nguyên liệu**

Nhân viên sản xuất hoặc kho xác định những lô nguyên liệu thực tế được sử dụng.

**Bước 3 – Kiểm tra điều kiện sử dụng**

Hệ thống kiểm tra tồn kho khả dụng và trạng thái chất lượng của các lô nguyên liệu theo quy tắc nghiệp vụ.

**Bước 4 – Xuất hoặc cấp phát nguyên liệu**

Các giao dịch sử dụng nguyên liệu được ghi nhận, kèm thông tin số lượng và lô tương ứng.

**Bước 5 – Thực hiện sản xuất**

Bộ phận sản xuất tiến hành công việc và cập nhật trạng thái lệnh sản xuất.

**Bước 6 – Ghi nhận kết quả**

Khi hoàn thành, người thực hiện khai báo số lượng thành phẩm, hao hụt và các kết quả liên quan.

**Bước 7 – Tạo lô thành phẩm**

Hệ thống tạo hoặc xác nhận định danh lô thành phẩm.

**Bước 8 – Liên kết dữ liệu truy xuất**

Các lô nguyên liệu đã sử dụng được liên kết với lô thành phẩm thông qua sự kiện biến đổi hoặc quan hệ sản xuất tương ứng.

**Bước 9 – Kiểm định thành phẩm**

Nếu thành phẩm yêu cầu kiểm tra chất lượng, hệ thống khởi tạo quy trình kiểm định trước khi cho phép phân phối.

**Bước 10 – Hoàn tất**

Lệnh sản xuất được hoàn tất, tồn kho và lịch sử truy xuất được cập nhật theo kết quả đã được xác nhận.

### 5.6.5. Các trường hợp nghiệp vụ đặc biệt

**Một lô nguyên liệu tạo thành nhiều lô thành phẩm:** Hệ thống cần ghi nhận quan hệ giữa lô đầu vào và từng lô đầu ra thực tế.

**Nhiều lô nguyên liệu tạo thành một lô thành phẩm:** Hệ thống phải liên kết tất cả những lô nguyên liệu đã sử dụng với thành phẩm.

**Sản xuất có hao hụt:** Số lượng hao hụt cần được ghi nhận và đối chiếu theo quy tắc sản xuất.

**Thành phẩm không đạt chất lượng:** Lô thành phẩm phải được xử lý theo trạng thái chất lượng tương ứng.

**Sản xuất lại hoặc đóng gói lại:** Hệ thống cần duy trì lịch sử liên kết giữa lô ban đầu và lô mới được tạo.

### 5.6.6. Quy tắc nghiệp vụ

- Không sử dụng nguyên liệu bị hạn chế khi chưa có quyết định xử lý hợp lệ.
- Quan hệ giữa nguyên liệu và thành phẩm phải phản ánh các lô thực tế được sử dụng.
- Thông tin sản xuất đã hoàn tất cần được kiểm soát khi điều chỉnh.
- Các thay đổi sau khi hoàn tất phải duy trì lịch sử và căn cứ thực hiện.
- Không được suy luận quan hệ nguyên liệu – thành phẩm chỉ dựa trên việc các lô xuất hiện cùng thời điểm.
- Các sự kiện truy xuất phải tham chiếu đến giao dịch sản xuất có nguồn dữ liệu xác định.

### 5.6.7. Kết quả đầu ra

- Lệnh sản xuất hoàn tất.
- Tồn kho nguyên liệu và thành phẩm được cập nhật.
- Lô thành phẩm được hình thành.
- Quan hệ nguyên liệu – thành phẩm được ghi nhận.
- Sự kiện sản xuất phục vụ truy xuất được tạo.
- Hồ sơ kiểm định được liên kết khi cần thiết.

## 5.7. Quy trình xuất hàng và chuyển giao giữa các doanh nghiệp

### 5.7.1. Mục tiêu quy trình

Quy trình chuyển giao liên doanh nghiệp nhằm hỗ trợ trao đổi thông tin lô hàng và xác nhận hoạt động bàn giao giữa hai tổ chức sử dụng các bản triển khai Nexora độc lập.

Đây là một quy trình tạo nên giá trị khác biệt quan trọng của hệ thống.

### 5.7.2. Đối tượng tham gia

- Sales Staff hoặc Warehouse Staff của bên giao.
- Warehouse Staff của bên nhận.
- Trading Partner System của mỗi bên.
- Approver của các doanh nghiệp tương ứng.

### 5.7.3. Điều kiện đầu vào

- Hai doanh nghiệp có quan hệ giao dịch hợp lệ.
- Sản phẩm và lô hàng đã được xác định.
- Bên giao có quyền xuất hàng.
- Hàng hóa đáp ứng các điều kiện xuất kho.
- Hai hệ thống đã thiết lập cơ chế kết nối và xác thực phù hợp nếu sử dụng chức năng liên thông.

### 5.7.4. Luồng nghiệp vụ chính

**Bước 1 – Tạo giao dịch xuất hàng**

Doanh nghiệp A tạo phiếu xuất hoặc giao dịch bán hàng cho doanh nghiệp B.

**Bước 2 – Lựa chọn lô**

Người thực hiện xác định các lô hàng và số lượng được xuất.

**Bước 3 – Xác nhận giao dịch**

Hệ thống kiểm tra số lượng khả dụng, trạng thái lô và các điều kiện phê duyệt.

**Bước 4 – Ghi nhận nghiệp vụ xuất kho**

Sau khi giao dịch đáp ứng điều kiện, hệ thống A ghi nhận kết quả xuất hàng và phát sinh sự kiện liên quan.

**Bước 5 – Chuẩn bị dữ liệu trao đổi**

Hệ thống tạo thông điệp chuyển giao có định danh sự kiện, thông tin đối tác, sản phẩm, lô hàng, số lượng và những tham chiếu cần thiết.

**Bước 6 – Gửi thông tin đến đối tác**

Thông điệp được gửi tới hệ thống của doanh nghiệp B thông qua giao diện liên thông đã thiết lập.

**Bước 7 – Tiếp nhận và xác thực**

Hệ thống B xác thực nguồn gửi, kiểm tra cấu trúc thông điệp, tính hợp lệ và khả năng trùng lặp.

**Bước 8 – Đối chiếu hàng hóa thực nhận**

Nhân viên doanh nghiệp B kiểm tra hàng hóa, đối chiếu thông tin chuyển giao và ghi nhận số lượng thực tế.

**Bước 9 – Xác nhận tiếp nhận**

Doanh nghiệp B hoàn tất nghiệp vụ tiếp nhận theo quy trình nội bộ, đồng thời tạo sự kiện nhận hàng có tham chiếu đến giao dịch chuyển giao từ A.

**Bước 10 – Phản hồi kết quả**

Hệ thống B gửi trạng thái xác nhận hoặc thông tin sai lệch cho hệ thống A.

**Bước 11 – Liên kết lịch sử truy xuất**

Các sự kiện xuất hàng và tiếp nhận được liên kết bằng các định danh, tham chiếu và bằng chứng phù hợp.

### 5.7.5. Các trường hợp ngoại lệ

**Mất kết nối giữa hai hệ thống:** Thông điệp được lưu ở trạng thái chờ và có thể gửi lại theo cơ chế kiểm soát.

**Thông điệp bị gửi trùng:** Hệ thống tiếp nhận nhận diện sự kiện trùng để tránh ghi nhận giao dịch hai lần.

**Số lượng thực nhận khác số lượng đã xuất:** Hai bên ghi nhận chênh lệch và thực hiện quy trình đối chiếu.

**Thông tin lô không khớp:** Giao dịch cần được xác minh trước khi xác nhận liên kết truy xuất.

**Bên nhận từ chối giao dịch:** Hệ thống ghi nhận kết quả từ chối và thông báo cho bên giao để xử lý.

**Hai bên có mã sản phẩm nội bộ khác nhau:** Hệ thống sử dụng cơ chế ánh xạ định danh hoặc tham chiếu đối tác để liên kết đúng sản phẩm.

### 5.7.6. Nguyên tắc nhất quán dữ liệu

Mỗi doanh nghiệp chịu trách nhiệm đối với các giao dịch ERP trong hệ thống của mình.

Việc gửi sự kiện sang đối tác không đồng nghĩa giao dịch ERP tại hai doanh nghiệp được thực hiện trong cùng một giao dịch cơ sở dữ liệu.

Hệ thống cần hỗ trợ cơ chế ghi nhận, xác nhận, xử lý lỗi và đối chiếu để đạt được sự nhất quán phù hợp giữa các bên.

Các sự kiện đã được phát hành không nên bị sửa trực tiếp làm mất dấu vết. Những điều chỉnh cần được ghi nhận bằng sự kiện hoặc bản ghi hiệu chỉnh có tham chiếu phù hợp.

### 5.7.7. Kết quả đầu ra

- Doanh nghiệp A có giao dịch xuất hàng.
- Doanh nghiệp B có giao dịch tiếp nhận.
- Hai hệ thống ghi nhận các sự kiện có liên kết.
- Các sai lệch được quản lý.
- Lịch sử truy xuất được mở rộng qua ranh giới doanh nghiệp.

## 5.8. Quy trình bán hàng POS gắn với truy xuất nguồn gốc

### 5.8.1. Mục tiêu quy trình

Quy trình bán hàng POS nhằm hỗ trợ doanh nghiệp bán lẻ thực hiện giao dịch bán hàng, đồng thời ghi nhận quan hệ giữa sản phẩm được bán với thông tin lô tương ứng.

### 5.8.2. Đối tượng tham gia

- POS Cashier.
- Sales Staff.
- Customer.
- Warehouse/Inventory System.
- Traceability Module.

### 5.8.3. Luồng nghiệp vụ chính

**Bước 1:** Nhân viên bán hàng mở phiên giao dịch POS.

**Bước 2:** Nhân viên quét mã vạch hoặc lựa chọn sản phẩm.

**Bước 3:** Hệ thống xác định thông tin sản phẩm, giá bán và tình trạng hàng hóa.

**Bước 4:** Đối với sản phẩm bắt buộc quản lý theo lô, hệ thống yêu cầu xác định lô thực tế được bán hoặc thực hiện lựa chọn theo quy tắc xuất kho đã được cấu hình.

**Bước 5:** Nhân viên xác nhận số lượng và các thông tin bán hàng.

**Bước 6:** Hệ thống kiểm tra các điều kiện liên quan đến tồn kho, trạng thái chất lượng và quyền bán.

**Bước 7:** Khách hàng thực hiện thanh toán.

**Bước 8:** Hệ thống hoàn tất giao dịch bán hàng và cập nhật tồn kho tương ứng.

**Bước 9:** Dữ liệu giao dịch được liên kết với lô sản phẩm đã bán.

**Bước 10:** Hệ thống cung cấp mã QR hoặc đường dẫn truy xuất phù hợp với sản phẩm và thông tin có thể công bố.

### 5.8.4. Quy tắc nghiệp vụ

- Giao dịch bán hàng phải được ghi nhận theo số lượng và sản phẩm thực tế.
- Đối với sản phẩm yêu cầu truy xuất theo lô, thông tin lô bán ra phải được xác định đủ chính xác.
- Mã vạch chung của sản phẩm không mặc định xác định được lô sản xuất.
- Hệ thống phải kiểm tra những trạng thái hạn chế bán hàng được áp dụng.
- Giao dịch trả hàng cần được liên kết với giao dịch bán và thông tin lô có liên quan.
- Thông tin được cung cấp qua QR phải tuân theo chính sách công bố dữ liệu.

### 5.8.5. Kết quả đầu ra

- Giao dịch bán hàng hoàn tất.
- Tồn kho được cập nhật.
- Thông tin lô bán ra được ghi nhận.
- Lịch sử truy xuất được liên kết với hoạt động tiêu thụ.
- Khách hàng có thể tiếp cận thông tin nguồn gốc được công bố.

## 5.9. Quy trình truy xuất nguồn gốc sản phẩm

### 5.9.1. Mục tiêu quy trình

Quy trình truy xuất nguồn gốc cho phép người có quyền xác định lịch sử sản phẩm dựa trên các quan hệ và sự kiện đã được ghi nhận.

Nexora hỗ trợ hai hướng truy xuất chính: truy xuất ngược và truy xuất xuôi.

### 5.9.2. Truy xuất ngược (Backward Traceability)

Truy xuất ngược nhằm xác định nguồn gốc của sản phẩm hoặc lô hàng.

Ví dụ, từ một lô thành phẩm, hệ thống có thể xác định các lô nguyên liệu đã sử dụng, nhà cung cấp tương ứng và những sự kiện giao nhận trước đó.

Luồng nghiệp vụ:

1. Người dùng lựa chọn sản phẩm hoặc lô cần truy xuất.
2. Hệ thống xác định đối tượng truy xuất tương ứng.
3. Hệ thống tìm các quan hệ sản xuất, chuyển giao và tiếp nhận có liên quan.
4. Trường hợp dữ liệu được phân tán tại các doanh nghiệp khác, hệ thống sử dụng những thông tin đã tiếp nhận hoặc truy vấn đối tác theo quyền truy cập.
5. Các sự kiện được liên kết thành lịch sử truy xuất.
6. Kết quả được hiển thị kèm thông tin nguồn dữ liệu và trạng thái xác minh.

### 5.9.3. Truy xuất xuôi (Forward Traceability)

Truy xuất xuôi nhằm xác định những sản phẩm, địa điểm hoặc giao dịch chịu ảnh hưởng từ một lô ban đầu.

Ví dụ, khi một lô nguyên liệu được phát hiện có vấn đề, hệ thống có thể xác định những lô thành phẩm đã sử dụng nguyên liệu này, sau đó truy tìm các đơn vị tiếp nhận và giao dịch phân phối liên quan.

Luồng nghiệp vụ:

1. Người dùng lựa chọn lô ban đầu.
2. Hệ thống xác định các sự kiện và quan hệ phát sinh từ lô.
3. Hệ thống tìm những lô đầu ra, giao dịch và đơn vị tiếp nhận có liên quan.
4. Dữ liệu được mở rộng qua các quan hệ truy xuất được phép sử dụng.
5. Hệ thống tổng hợp danh sách những đối tượng có khả năng chịu ảnh hưởng.
6. Người dùng xem xét kết quả để phục vụ hoạt động kiểm tra hoặc xử lý.

### 5.9.4. Truy xuất công khai dành cho người tiêu dùng

Người tiêu dùng sử dụng mã QR hoặc đường dẫn để tra cứu thông tin sản phẩm.

Hệ thống xác định đối tượng truy xuất và tạo nội dung hiển thị theo chính sách công bố của doanh nghiệp.

Các thông tin có thể bao gồm tên sản phẩm, mã lô, đơn vị sản xuất, những công đoạn được ghi nhận và hồ sơ được phép công bố.

Thông tin nội bộ như giá vốn, dữ liệu khách hàng và các giao dịch không được phép chia sẻ phải được loại trừ.

### 5.9.5. Quy tắc nghiệp vụ

- Kết quả truy xuất phải dựa trên các sự kiện và quan hệ dữ liệu có căn cứ.
- Hệ thống phải phân biệt dữ liệu chưa được xác minh với dữ liệu đã được xác nhận.
- Không được suy luận rằng sản phẩm là hàng chính hãng chỉ vì có lịch sử truy xuất.
- Không được tự tạo những công đoạn còn thiếu trong chuỗi dữ liệu.
- Khi dữ liệu không đầy đủ, hệ thống cần thể hiện giới hạn của kết quả truy xuất.
- Các truy vấn liên doanh nghiệp phải tuân thủ quyền và phạm vi chia sẻ.

## 5.10. Quy trình quản lý sự cố và thu hồi sản phẩm

### 5.10.1. Mục tiêu quy trình

Quy trình quản lý sự cố và thu hồi nhằm hỗ trợ doanh nghiệp ghi nhận vấn đề chất lượng, xác định phạm vi ảnh hưởng và tổ chức các công việc kiểm tra, cách ly, thông báo hoặc thu hồi.

### 5.10.2. Đối tượng tham gia

- Quality Inspector.
- Quality Manager.
- Incident Manager.
- Recall Coordinator.
- Warehouse Manager.
- Trading Partner System.
- Customer Service Staff.

### 5.10.3. Điều kiện kích hoạt

Quy trình có thể được kích hoạt khi:

- Phát hiện lô nguyên liệu hoặc thành phẩm không đạt yêu cầu.
- Nhận được thông báo chất lượng từ nhà cung cấp.
- Nhận phản ánh liên quan đến sản phẩm đã bán.
- Hệ thống phát hiện dấu hiệu bất thường cần được kiểm tra.
- Người có thẩm quyền yêu cầu điều tra một lô hàng.

### 5.10.4. Luồng nghiệp vụ chính

**Bước 1 – Tạo hồ sơ sự cố**

Người có thẩm quyền tạo hồ sơ sự cố, xác định sản phẩm, lô liên quan, mô tả vấn đề và thông tin làm căn cứ.

**Bước 2 – Đánh giá ban đầu**

Bộ phận phụ trách kiểm tra thông tin và xác định mức độ cần xử lý.

**Bước 3 – Áp dụng biện pháp kiểm soát**

Nếu phù hợp với chính sách nghiệp vụ, hệ thống hỗ trợ hạn chế sử dụng, xuất kho hoặc bán những lô đang được điều tra.

**Bước 4 – Truy xuất phạm vi ảnh hưởng**

Hệ thống thực hiện truy xuất xuôi để xác định các lô, kho, chi nhánh, đơn vị nhận hàng và giao dịch liên quan dựa trên dữ liệu đã ghi nhận.

**Bước 5 – Xác minh kết quả**

Bộ phận phụ trách xem xét dữ liệu, xác định những trường hợp cần điều tra bổ sung và phạm vi ảnh hưởng được xác nhận.

**Bước 6 – Lập kế hoạch xử lý**

Người có thẩm quyền quyết định các biện pháp như tiếp tục kiểm tra, cách ly, thông báo hoặc thu hồi theo chính sách và nghĩa vụ áp dụng.

**Bước 7 – Phân công nhiệm vụ**

Hệ thống tạo các công việc xử lý và phân công cho những bộ phận có liên quan.

**Bước 8 – Thông báo đối tác**

Đối với các đối tác có quan hệ giao dịch và thuộc phạm vi cần thông báo, hệ thống hỗ trợ truyền tải thông tin sự cố qua cơ chế liên thông.

**Bước 9 – Theo dõi tiến độ**

Các bên cập nhật tình trạng kiểm tra, cách ly, xử lý hoặc thu hồi.

**Bước 10 – Xác nhận hoàn tất**

Người có thẩm quyền đánh giá kết quả và quyết định đóng hồ sơ khi các điều kiện hoàn tất được đáp ứng.

### 5.10.5. Quy tắc nghiệp vụ

- Mỗi sự cố phải có định danh và hồ sơ quản lý riêng.
- Những quyết định quan trọng phải do người có thẩm quyền thực hiện.
- Danh sách lô có liên quan cần phân biệt giữa khả năng bị ảnh hưởng và ảnh hưởng đã được xác minh.
- Lịch sử xử lý phải được ghi nhận.
- Thông tin gửi cho đối tác phải tuân thủ chính sách chia sẻ dữ liệu.
- AI không được tự ý quyết định thu hồi hoặc thay đổi trạng thái chất lượng.
- Việc đóng sự cố phải có căn cứ và thỏa mãn các điều kiện nghiệp vụ.

### 5.10.6. Kết quả đầu ra

- Hồ sơ sự cố có lịch sử xử lý.
- Danh sách những đối tượng liên quan.
- Các yêu cầu kiểm tra hoặc cách ly.
- Các nhiệm vụ xử lý và thông báo đối tác.
- Báo cáo kết quả và trạng thái hoàn tất.

## 5.11. Quy trình hỗ trợ phân tích bằng trí tuệ nhân tạo

### 5.11.1. Mục tiêu quy trình

Nexora định hướng ứng dụng AI để hỗ trợ người dùng xử lý thông tin và phát hiện những dấu hiệu cần kiểm tra.

AI không thay thế các bước xác minh, phê duyệt hoặc ghi nhận giao dịch nghiệp vụ.

### 5.11.2. Phân tích chứng từ

Khi người dùng tải lên chứng từ, hệ thống có thể chuyển tài liệu tới dịch vụ phân tích để trích xuất những trường thông tin như mã lô, sản phẩm, số lượng hoặc ngày liên quan.

Kết quả được trình bày để người dùng đối chiếu và xác nhận trước khi sử dụng trong nghiệp vụ.

### 5.11.3. Phát hiện bất thường

Hệ thống có thể phân tích dữ liệu đã ghi nhận để phát hiện những trường hợp cần kiểm tra như số lượng giao nhận chênh lệch, quan hệ lô không nhất quán hoặc dữ liệu truy xuất thiếu các sự kiện quan trọng.

Các kiểm tra có tính xác định cần được thực hiện bằng quy tắc nghiệp vụ. AI được sử dụng để hỗ trợ nhận diện mẫu bất thường và giải thích kết quả.

### 5.11.4. Hỗ trợ điều tra sự cố

Khi có sự cố, hệ thống truy xuất xác định những đối tượng có liên quan dựa trên dữ liệu và quan hệ đã ghi nhận.

AI có thể hỗ trợ tóm tắt thông tin, giải thích mối liên hệ và đề xuất những vấn đề người phụ trách cần kiểm tra tiếp.

Các số lượng, danh sách giao dịch và phạm vi ảnh hưởng phải được lấy từ dữ liệu truy xuất, không tự tạo bằng mô hình AI.

## 5.12. Các quy tắc nghiệp vụ chung

Các quy trình trên phải tuân thủ những nguyên tắc chung nhằm bảo đảm dữ liệu được xử lý nhất quán.

**BRU-01 – Quản lý theo quyền hạn:** Người dùng chỉ được thực hiện các nghiệp vụ thuộc phạm vi quyền đã được cấp.

**BRU-02 – Kiểm soát trạng thái:** Giao dịch phải đáp ứng điều kiện chuyển trạng thái tương ứng.

**BRU-03 – Liên kết giao dịch và sự kiện:** Sự kiện truy xuất phát sinh từ ERP phải có tham chiếu phù hợp tới dữ liệu nghiệp vụ làm căn cứ.

**BRU-04 – Kiểm soát lô hàng:** Những sản phẩm yêu cầu quản lý theo lô phải duy trì thông tin lô trong các giao dịch bắt buộc.

**BRU-05 – Quản lý chất lượng:** Không được tự động sử dụng hoặc phân phối hàng hóa đang bị hạn chế khi chưa đáp ứng điều kiện cho phép.

**BRU-06 – Lưu trữ lịch sử:** Những thay đổi quan trọng phải có khả năng truy vết.

**BRU-07 – Độc lập dữ liệu:** Mỗi bản triển khai Nexora quản lý dữ liệu và giao dịch nghiệp vụ của doanh nghiệp tương ứng.

**BRU-08 – Chia sẻ có kiểm soát:** Dữ liệu liên doanh nghiệp chỉ được trao đổi trong phạm vi được xác thực và cho phép.

**BRU-09 – Chống trùng sự kiện:** Hệ thống phải có cơ chế ngăn việc ghi nhận trùng các sự kiện được gửi lại.

**BRU-10 – Xử lý lỗi liên thông:** Việc mất kết nối với đối tác không được làm mất dữ liệu nghiệp vụ đã được xác nhận hợp lệ tại hệ thống nội bộ.

**BRU-11 – Phân biệt mức độ xác minh:** Dữ liệu khai báo và dữ liệu được xác nhận phải được phân biệt rõ ràng.

**BRU-12 – Kiểm soát AI:** Kết quả AI chỉ đóng vai trò hỗ trợ, không tự động thay thế quyết định nghiệp vụ có thẩm quyền.

**BRU-13 – Truy xuất có căn cứ:** Hệ thống không được tạo hoặc suy đoán các sự kiện nguồn gốc khi không có dữ liệu phù hợp.

**BRU-14 – Bảo vệ dữ liệu công khai:** Thông tin truy xuất cho người tiêu dùng phải được giới hạn theo chính sách công bố.

## 5.13. Các tình huống nghiệp vụ tổng hợp

Để đánh giá tính liên kết giữa các module, nhóm xác định ba tình huống nghiệp vụ tổng hợp phục vụ việc phân tích và triển khai hệ thống.

### 5.13.1. Tình huống 1 – Truy xuất sản phẩm từ nhà sản xuất đến người tiêu dùng

Doanh nghiệp A sản xuất một lô thành phẩm từ các nguyên liệu đã được tiếp nhận và kiểm định.

Sau khi hoàn thành sản xuất, doanh nghiệp A phân phối lô hàng cho doanh nghiệp B.

Doanh nghiệp B tiếp nhận và phân phối một phần hàng hóa cho doanh nghiệp C.

Doanh nghiệp C thực hiện nhập kho và bán hàng thông qua POS.

Khi khách hàng truy xuất thông tin sản phẩm, hệ thống sử dụng những sự kiện được ghi nhận và chia sẻ để hiển thị lịch sử phù hợp.

Tình huống này nhằm kiểm chứng khả năng liên kết dữ liệu ERP với lịch sử truy xuất qua nhiều tổ chức độc lập.

### 5.13.2. Tình huống 2 – Phát hiện nguyên liệu không đạt yêu cầu

Một lô nguyên liệu đã được sử dụng trong quá trình sản xuất sau đó bị phát hiện có vấn đề chất lượng.

Bộ phận phụ trách tạo hồ sơ sự cố và thực hiện truy xuất xuôi để xác định các lô thành phẩm đã sử dụng nguyên liệu đó.

Hệ thống tiếp tục liên kết những sự kiện phân phối và bán hàng liên quan.

Doanh nghiệp có thể lập kế hoạch kiểm tra hoặc xử lý, đồng thời gửi thông tin đến các đối tác thuộc phạm vi ảnh hưởng.

Tình huống này kiểm chứng khả năng phân tích quan hệ nguyên liệu – thành phẩm, truy xuất xuôi và hỗ trợ quản lý sự cố.

### 5.13.3. Tình huống 3 – Sai lệch giao nhận giữa hai doanh nghiệp

Doanh nghiệp A xuất một lô hàng với số lượng được xác nhận trong giao dịch.

Doanh nghiệp B tiếp nhận hàng nhưng phát hiện số lượng thực tế khác với thông tin đã nhận qua hệ thống liên thông.

Nexora ghi nhận chênh lệch, yêu cầu xác minh và duy trì lịch sử trao đổi giữa hai bên.

Sau khi xử lý, giao dịch được xác nhận hoặc điều chỉnh thông qua các bước hợp lệ.

Tình huống này nhằm kiểm chứng khả năng liên thông dữ liệu, quản lý ngoại lệ và bảo đảm tính nhất quán giữa những hệ thống độc lập.

## 5.14. Kết luận chương

Chương 5 đã phân tích các quy trình nghiệp vụ cốt lõi của Nexora, từ hoạt động quản trị sản phẩm, mua hàng, kiểm định, sản xuất, lưu kho và bán hàng đến truy xuất nguồn gốc và xử lý sự cố chất lượng.

Đặc biệt, chương đã làm rõ sự khác biệt giữa quy trình nghiệp vụ nội bộ của một doanh nghiệp và quy trình trao đổi dữ liệu giữa nhiều bản triển khai độc lập.

Trong mô hình được đề xuất, các giao dịch ERP đóng vai trò là nguồn phát sinh dữ liệu nghiệp vụ, trong khi các sự kiện truy xuất tạo điều kiện liên kết thông tin giữa những công đoạn và tổ chức tham gia chuỗi cung ứng.

Hoạt động quản lý chất lượng, phê duyệt và xử lý sự cố được tích hợp với vòng đời sản phẩm nhằm tăng khả năng kiểm soát và truy vết trách nhiệm.

Các quy trình và quy tắc nghiệp vụ được xác định trong chương này là cơ sở để tiếp tục phân rã hệ thống thành các module chức năng, xây dựng danh sách Use Case và đặc tả yêu cầu chi tiết trong những chương tiếp theo.

# CHƯƠNG 6. PHÂN RÃ CHỨC NĂNG VÀ XÁC ĐỊNH PHẠM VI MVP CỦA NEXORA

## 6.1. Định hướng phát triển

Nexora được định hướng xây dựng thành nền tảng quản lý hàng hóa và truy xuất nguồn gốc sản phẩm theo mô hình nguồn mở, cho phép các doanh nghiệp triển khai hệ thống độc lập và trao đổi thông tin trong chuỗi cung ứng.

Trong giai đoạn MVP, Nexora không đặt mục tiêu phát triển một hệ thống ERP đầy đủ với tất cả nghiệp vụ quản trị doanh nghiệp. Thay vào đó, dự án tập trung vào những chức năng trực tiếp phục vụ việc định danh, quản lý, lưu chuyển và truy xuất sản phẩm.

Hệ thống cần chứng minh được quá trình một lô hàng được tạo ra, tiếp nhận, chuyển giao giữa các doanh nghiệp và bán đến người tiêu dùng. Mỗi giai đoạn phải được ghi nhận bằng dữ liệu có tham chiếu rõ ràng để phục vụ truy xuất ngược, truy xuất xuôi và xác định những vấn đề liên quan đến lô sản phẩm.

Để tối ưu nguồn lực, Nexora MVP được phân chia thành **04 module nghiệp vụ chính và 01 module AI Support**, kết hợp với các dịch vụ hạ tầng DX-OS dùng chung.

## 6.2. Tổng quan các module

| Mã | Module | Vai trò |
| --- | --- | --- |
| M01 | System & Partner Management | Quản lý doanh nghiệp, tài khoản và kết nối đối tác |
| M02 | Product & Inventory Management | Quản lý sản phẩm, lô hàng và số lượng tồn |
| M03 | Trading & Distribution | Ghi nhận nhập hàng, xuất hàng và giao nhận |
| M04 | Traceability & Federation | Truy xuất nguồn gốc, QR và liên thông giữa các instance |
| AI01 | AI Support | Hỗ trợ tra cứu, tạo chứng từ và phát hiện dấu hiệu bất thường |

Các chức năng báo cáo nâng cao, CRM, quản trị sản xuất, kế toán và POS đầy đủ không thuộc phạm vi MVP.

## 6.3. M01 – System & Partner Management

### 6.3.1. Mục tiêu

Module cung cấp các chức năng quản trị tối thiểu để doanh nghiệp sử dụng Nexora và thiết lập quan hệ với những đối tác trong chuỗi cung ứng.

Mỗi doanh nghiệp sử dụng một bản triển khai Nexora độc lập. Tài khoản, dữ liệu và thông tin kết nối được quản lý trong phạm vi bản triển khai đó.

### 6.3.2. Chức năng triển khai

| Mã chức năng | Tên chức năng | Mô tả |
| --- | --- | --- |
| NX-SYS-01 | Organization Profile | Cấu hình thông tin doanh nghiệp |
| NX-SYS-02 | User & Access | Quản lý tài khoản và quyền cơ bản |
| NX-SYS-03 | Partner Management | Khai báo nhà cung cấp và doanh nghiệp đối tác |
| NX-SYS-04 | Partner Connection | Thiết lập thông tin kết nối với instance đối tác |

### 6.3.3. Giới hạn MVP

Hệ thống chỉ cần các vai trò cơ bản như Administrator và Staff, cùng những quyền cần thiết cho việc xem và xác nhận giao dịch.

Không triển khai hệ thống phân quyền động phức tạp, cơ cấu phòng ban nhiều cấp hoặc những quy trình quản trị nhân sự.

Chức năng đăng nhập và SSO được cung cấp thông qua hệ thống định danh thuộc lớp DX-OS.

## 6.4. M02 – Product & Inventory Management

### 6.4.1. Mục tiêu

Product & Inventory Management là module quản lý thông tin sản phẩm, lô hàng và số lượng tồn kho.

Dữ liệu sản phẩm và lô hàng là cơ sở để hệ thống tạo sự kiện truy xuất và liên kết các hoạt động giao nhận xuyên doanh nghiệp.

### 6.4.2. Chức năng triển khai

| Mã chức năng | Tên chức năng | Mô tả |
| --- | --- | --- |
| NX-PROD-01 | Product Management | Tạo, cập nhật và tra cứu sản phẩm |
| NX-PROD-02 | Product Identifier | Quản lý SKU và mã vạch |
| NX-PROD-03 | Batch/Lot Management | Tạo và quản lý lô sản phẩm |
| NX-PROD-04 | Batch Information | Quản lý ngày sản xuất, hạn sử dụng và nguồn lô khi có dữ liệu |
| NX-INV-01 | Warehouse | Quản lý kho cơ bản |
| NX-INV-02 | Inventory Balance | Theo dõi tồn kho theo sản phẩm và lô |
| NX-INV-03 | Inventory History | Tra cứu lịch sử thay đổi số lượng |
| NX-INV-04 | Batch Status | Theo dõi trạng thái khả dụng, bị hạn chế hoặc cần kiểm tra |

### 6.4.3. Nguyên tắc quản lý

Sản phẩm và lô sản phẩm phải được xác định bằng mã định danh phù hợp.

Khi nhận hàng từ đối tác, Nexora cần lưu được thông tin lô do đối tác phát hành để duy trì quan hệ truy xuất.

Số lượng tồn kho chỉ được cập nhật từ giao dịch nhập, xuất hoặc điều chỉnh hợp lệ.

Các trạng thái chất lượng cơ bản được quản lý trực tiếp tại lô hàng. MVP không phát triển module kiểm định chất lượng chuyên sâu.

## 6.5. M03 – Trading & Distribution

### 6.5.1. Mục tiêu

Trading & Distribution quản lý các giao dịch làm phát sinh sự thay đổi về số lượng và vị trí hàng hóa.

Thay vì xây dựng riêng những hệ thống mua hàng, bán hàng và POS phức tạp, Nexora MVP sử dụng các loại chứng từ nghiệp vụ đơn giản phục vụ hoạt động tiếp nhận và phân phối.

### 6.5.2. Chức năng triển khai

| Mã chức năng | Tên chức năng | Mô tả |
| --- | --- | --- |
| NX-TRD-01 | Goods Receipt | Tạo và xác nhận phiếu nhập hàng |
| NX-TRD-02 | Goods Issue | Tạo và xác nhận phiếu xuất hàng |
| NX-TRD-03 | Partner Transfer | Chuyển giao hàng hóa cho đối tác |
| NX-TRD-04 | Receiving Confirmation | Xác nhận hàng thực nhận từ đối tác |
| NX-TRD-05 | Document History | Tra cứu lịch sử giao dịch |
| NX-TRD-06 | Stocktake | Kiểm kê và ghi nhận chênh lệch cơ bản |
| NX-TRD-07 | Sale/Distribution Record | Ghi nhận hàng đã bán hoặc phân phối theo lô |

### 6.5.3. Giới hạn MVP

Các chứng từ sử dụng trạng thái cơ bản:

**Draft → Confirmed / Cancelled**

Riêng giao dịch giữa các doanh nghiệp có thể bổ sung trạng thái chờ xác nhận tiếp nhận và trạng thái phát sinh sai lệch.

Không triển khai quy trình báo giá, đơn đặt hàng nhiều bước, bảng giá phức tạp, công nợ, thanh toán, kế toán hoặc các chương trình khuyến mãi.

Chức năng bán hàng chỉ cần ghi nhận sản phẩm, lô và số lượng đã bán để phục vụ truy xuất. Không cần xây dựng POS đầy đủ trong MVP.

### 6.5.4. Liên kết truy xuất

Khi một phiếu nhập hoặc xuất hàng được xác nhận, hệ thống phát sinh sự kiện nghiệp vụ có liên kết với sản phẩm, lô, số lượng và giao dịch tương ứng.

Các sự kiện này được chuyển đến Traceability Module để tổ chức lịch sử truy xuất.

## 6.6. M04 – Traceability & Federation

### 6.6.1. Mục tiêu

Traceability & Federation là module trọng tâm của Nexora, hỗ trợ ghi nhận lịch sử sản phẩm và trao đổi thông tin giữa các doanh nghiệp vận hành những hệ thống độc lập.

Module hướng tới việc giải quyết tình trạng dữ liệu truy xuất bị phân tán giữa các tổ chức, đồng thời cho phép mỗi doanh nghiệp giữ quyền kiểm soát dữ liệu nội bộ.

### 6.6.2. Chức năng truy xuất

| Mã chức năng | Tên chức năng | Mô tả |
| --- | --- | --- |
| NX-TRC-01 | Traceability Event | Ghi nhận sự kiện truy xuất |
| NX-TRC-02 | Lot History | Hiển thị lịch sử lô hàng |
| NX-TRC-03 | Backward Traceability | Truy xuất ngược về nguồn cung |
| NX-TRC-04 | Forward Traceability | Xác định những giao dịch và lô liên quan ở các giai đoạn tiếp theo |
| NX-TRC-05 | Traceability QR | Tạo đường dẫn và mã QR truy xuất |
| NX-TRC-06 | Product Passport | Hiển thị thông tin sản phẩm công khai theo quyền chia sẻ |

### 6.6.3. Chức năng liên thông

| Mã chức năng | Tên chức năng | Mô tả |
| --- | --- | --- |
| NX-FED-01 | Event Exchange | Gửi và nhận sự kiện từ đối tác |
| NX-FED-02 | Partner Authentication | Xác thực instance gửi thông điệp |
| NX-FED-03 | Product/Lot Mapping | Liên kết định danh sản phẩm và lô giữa các doanh nghiệp |
| NX-FED-04 | Event Acknowledgement | Ghi nhận kết quả tiếp nhận thông điệp |
| NX-FED-05 | Message Retry & Deduplication | Gửi lại khi lỗi và ngăn ghi nhận trùng |

### 6.6.4. Kịch bản nghiệp vụ trọng tâm

Nexora MVP được thiết kế để chứng minh quá trình lưu chuyển sản phẩm qua ba doanh nghiệp độc lập:

**Doanh nghiệp A – Nhà cung cấp**

Tạo sản phẩm và lô hàng, xác nhận xuất hàng cho doanh nghiệp B.

**Doanh nghiệp B – Nhà phân phối**

Tiếp nhận hàng từ A, xác nhận số lượng, sau đó xuất một phần lô hàng cho doanh nghiệp C.

**Doanh nghiệp C – Nhà bán lẻ**

Tiếp nhận hàng, ghi nhận giao dịch bán và cung cấp mã QR để người tiêu dùng tra cứu nguồn gốc.

Mỗi doanh nghiệp sử dụng cơ sở dữ liệu riêng. Hệ thống chỉ trao đổi những thông tin cần thiết qua các API liên thông.

### 6.6.5. Nguyên tắc bảo đảm dữ liệu

Sự kiện truy xuất phải có định danh, thời điểm, nguồn phát hành và tham chiếu đến giao dịch hoặc bằng chứng phù hợp.

Một thông điệp được gửi lại không được tạo giao dịch hoặc sự kiện trùng lặp.

Việc nhận thông tin xuất hàng không đồng nghĩa bên nhận đã thực tế tiếp nhận đủ số lượng. Hệ thống cần phân biệt xác nhận kỹ thuật với xác nhận nghiệp vụ.

Kết quả truy xuất chỉ hiển thị những sự kiện có dữ liệu hỗ trợ và phải thể hiện rõ các khoảng thông tin còn thiếu.

## 6.7. AI01 – AI Support

### 6.7.1. Mục tiêu

AI Support cung cấp một giao diện tương tác bằng ngôn ngữ tự nhiên, hỗ trợ người dùng tra cứu dữ liệu và chuẩn bị các chứng từ cơ bản của Nexora.

Thay vì phát triển nhiều dịch vụ AI riêng biệt, MVP sử dụng một AI Service có thể gọi những công cụ nghiệp vụ đã được kiểm soát.

### 6.7.2. Chức năng triển khai

| Mã chức năng | Chức năng | Mô tả |
| --- | --- | --- |
| NX-AI-01 | Product & Lot Query | Tra cứu thông tin sản phẩm và lô |
| NX-AI-02 | Traceability Assistant | Hỏi đáp và giải thích lịch sử truy xuất |
| NX-AI-03 | Document Draft Assistant | Hỗ trợ tạo phiếu nhập, phiếu xuất hoặc phiếu kiểm kho dự thảo |
| NX-AI-04 | Batch Risk Assistant | Cảnh báo và giải thích dấu hiệu bất thường liên quan đến lô hàng |

### 6.7.3. Nguyên tắc hoạt động

AI sử dụng các API nghiệp vụ được cấp quyền để truy xuất thông tin.

Những dữ liệu như số lượng tồn kho, trạng thái lô, ngày hết hạn hoặc lịch sử giao nhận phải lấy từ cơ sở dữ liệu thực tế.

Khi tạo chứng từ, AI chỉ tạo dữ liệu ở trạng thái dự thảo. Người dùng kiểm tra và xác nhận trước khi hệ thống thực hiện thao tác nghiệp vụ.

Đối với những vấn đề như hàng hết hạn hoặc số lượng giao nhận không khớp, hệ thống ưu tiên xác định bằng quy tắc nghiệp vụ. AI có thể hỗ trợ giải thích và đề xuất nội dung cần kiểm tra.

Chức năng phát hiện dấu hiệu hàng giả chỉ được xem là cảnh báo dựa trên dữ liệu định danh, lịch sử hoặc bằng chứng bất thường. AI không được tự kết luận một sản phẩm là hàng giả khi không có căn cứ xác minh.

### 6.7.4. Phạm vi AI trong MVP

Để bảo đảm tiến độ, nhóm ưu tiên:

- Tra cứu nguồn gốc của một lô sản phẩm.

- Tạo một loại chứng từ dự thảo bằng ngôn ngữ tự nhiên.

- Hiển thị cảnh báo lô hết hạn hoặc sự kiện truy xuất bất thường theo quy tắc xác định.

Những chức năng đọc hóa đơn bằng OCR, phân tích rủi ro nâng cao và tự động điều phối nhiều nghiệp vụ không thuộc phạm vi bắt buộc.

## 6.8. Các thành phần dùng chung

Ngoài các module nghiệp vụ, Nexora sử dụng các dịch vụ nền tảng để hỗ trợ việc triển khai:

| Thành phần | Trách nhiệm |
| --- | --- |
| Identity/SSO | Xác thực người dùng |
| API Gateway | Điều phối và kiểm soát API |
| Workflow | Thực thi một quy trình phê duyệt mẫu |
| Structured Database | Lưu dữ liệu nghiệp vụ |
| File Storage | Lưu tài liệu và bằng chứng |
| Background Processing | Xử lý sự kiện và thông điệp nền |
| Audit Logging | Ghi nhận lịch sử thao tác quan trọng |

Các thành phần này được tái sử dụng từ những công nghệ hoặc dịch vụ nguồn mở phù hợp, không phát triển lại những chức năng hạ tầng đã có.

## 6.9. Phạm vi không triển khai trong MVP

Để tập trung vào luồng sản phẩm và truy xuất nguồn gốc, những nhóm chức năng sau được loại khỏi phạm vi MVP:

- Quản trị sản xuất, lệnh sản xuất và định mức nguyên liệu.

- POS đầy đủ, hệ thống thanh toán và quản lý khuyến mãi.

- CRM, chăm sóc khách hàng và chương trình khách hàng thân thiết.

- Kế toán, công nợ và quản lý tài chính.

- Quản lý nhân sự và cơ cấu tổ chức phức tạp.

- Kiểm định chất lượng nhiều bước hoặc chứng nhận chuyên ngành.

- Hệ thống quản lý thu hồi sản phẩm đa cấp với quy trình phức tạp.

- Dashboard phân tích kinh doanh nâng cao.

- AI tự động xử lý hoặc phê duyệt giao dịch.

- Hệ thống Workflow Builder có thể tùy chỉnh toàn diện.

Những chức năng này được xem là định hướng phát triển sau khi hệ thống chứng minh được khả năng hoạt động ổn định của luồng truy xuất cốt lõi.

## 6.10. Tiêu chí nghiệm thu MVP

Phiên bản MVP được xem là đạt mục tiêu khi đáp ứng những tiêu chí sau:

**AC-01:** Có thể triển khai ba bản Nexora độc lập với cơ sở dữ liệu riêng.

**AC-02:** Mỗi bản triển khai có thể tạo tài khoản và quản lý thông tin doanh nghiệp.

**AC-03:** Có thể tạo sản phẩm, tạo lô và ghi nhận số lượng tồn kho.

**AC-04:** Có thể tạo phiếu nhập và phiếu xuất hàng gắn với lô sản phẩm.

**AC-05:** Có thể chuyển giao thông tin lô hàng giữa hai doanh nghiệp qua API.

**AC-06:** Có thể xác nhận việc tiếp nhận hàng thực tế ở doanh nghiệp nhận.

**AC-07:** Có thể truy xuất lịch sử lô qua ít nhất ba doanh nghiệp độc lập.

**AC-08:** Có thể tạo mã QR và hiển thị lịch sử truy xuất được phép công bố.

**AC-09:** Có thể xác định những giao dịch hoặc đơn vị tiếp nhận có liên quan đến một lô hàng cần kiểm tra.

**AC-10:** AI có thể tra cứu thông tin lô hàng từ dữ liệu nghiệp vụ có kiểm soát.

**AC-11:** AI có thể hỗ trợ tạo chứng từ dự thảo và cho phép người dùng xác nhận.

**AC-12:** Hệ thống hỗ trợ một quy trình phê duyệt mẫu thông qua thành phần Workflow.

**AC-13:** Hệ thống có thể được cài đặt lại từ repository và tài liệu triển khai nguồn mở.

## 6.11. Kết luận chương

Chương 6 đã xác định lại phạm vi phát triển Nexora theo hướng tập trung vào hoạt động quản lý và truy xuất nguồn gốc sản phẩm, thay vì phát triển đồng thời toàn bộ chức năng ERP.

Việc tinh gọn hệ thống xuống bốn module nghiệp vụ và một module AI Support giúp giảm số lượng chức năng, luồng xử lý và phụ thuộc giữa các thành phần.

Trong đó, Product & Inventory Management cung cấp dữ liệu về sản phẩm và lô hàng; Trading & Distribution ghi nhận hoạt động lưu chuyển; Traceability & Federation liên kết và trao đổi lịch sử sản phẩm giữa các doanh nghiệp; AI Support hỗ trợ người dùng tra cứu và thực hiện các nghiệp vụ đơn giản.

Cấu trúc này tạo điều kiện để nhóm tập trung nguồn lực vào khả năng triển khai độc lập, liên thông dữ liệu và truy xuất xuyên chuỗi cung ứng. Đây là những năng lực trọng tâm cần được chứng minh trong phiên bản MVP của Nexora.

# CHƯƠNG 7. THIẾT KẾ KIẾN TRÚC TỔNG THỂ HỆ THỐNG Nexora

## 7.1. Mục tiêu và nguyên tắc thiết kế kiến trúc

### 7.1.1. Mục tiêu thiết kế

Thiết kế kiến trúc hệ thống là quá trình xác định cấu trúc tổng thể của phần mềm, các thành phần chức năng, cách thức tổ chức dữ liệu và cơ chế tương tác giữa các thành phần nhằm đáp ứng yêu cầu nghiệp vụ và các yêu cầu phi chức năng.

Đối với Nexora, kiến trúc hệ thống phải đáp ứng đồng thời nhu cầu quản trị doanh nghiệp, truy xuất nguồn gốc, trao đổi dữ liệu giữa nhiều tổ chức và khả năng triển khai nguồn mở độc lập.

Khác với hệ thống SaaS đa tenant vận hành tập trung, Nexora được định hướng phân phối dưới dạng mã nguồn mở, cho phép mỗi doanh nghiệp tự triển khai hệ thống trên hạ tầng riêng.

Các mục tiêu thiết kế chính bao gồm:

- Cung cấp kiến trúc ERP có khả năng quản lý những nghiệp vụ kinh doanh cốt lõi.

- Tích hợp truy xuất nguồn gốc vào các giao dịch mua hàng, kho và bán hàng.

- Hỗ trợ triển khai độc lập theo từng doanh nghiệp.

- Cho phép kết nối dữ liệu truy xuất giữa các bản triển khai độc lập.

- Bảo đảm tính nhất quán giữa giao dịch ERP và sự kiện truy xuất.

- Hỗ trợ phân quyền và bảo vệ dữ liệu khi trao đổi giữa các tổ chức.

- Tích hợp AI nhằm hỗ trợ tra cứu thông tin và chuẩn bị chứng từ nghiệp vụ.

- Tạo điều kiện để hệ thống có thể phát triển, kiểm thử, triển khai và mở rộng bằng những công nghệ nguồn mở.

### 7.1.2. Các nguyên tắc kiến trúc

**Modular Architecture:** Hệ thống được chia thành các module có trách nhiệm nghiệp vụ rõ ràng, hạn chế phụ thuộc trực tiếp vào thành phần nội bộ của nhau.

**Domain-Driven Design (DDD):** Các nghiệp vụ được tổ chức theo miền chức năng, tách biệt giữa quy tắc nghiệp vụ và những thành phần kỹ thuật.

**API-first:** Các chức năng cần thiết được cung cấp thông qua giao diện API có cấu trúc, hỗ trợ tích hợp với các ứng dụng khác.

**Self-hosted by Design:** Một bản triển khai Nexora có khả năng hoạt động độc lập mà không yêu cầu kết nối với nền tảng vận hành trung tâm.

**Federated Integration:** Các doanh nghiệp trao đổi thông tin qua giao thức liên thông, không truy cập trực tiếp cơ sở dữ liệu của nhau.

**Security by Design:** Việc xác thực, phân quyền và kiểm soát dữ liệu được xem xét ngay từ quá trình thiết kế.

**Human-in-the-loop AI:** AI hỗ trợ người dùng truy vấn và chuẩn bị nghiệp vụ nhưng không tự thực hiện các giao dịch quan trọng khi chưa có xác nhận và kiểm tra hợp lệ.

**Open-source & Reproducibility:** Hệ thống phải có khả năng được xây dựng và triển khai lại dựa trên mã nguồn, cấu hình và tài liệu được công bố.

## 7.2. Lựa chọn mô hình kiến trúc

### 7.2.1. Đánh giá các mô hình kiến trúc

Đối với hệ thống ERP, hai phương án kiến trúc thường được xem xét là Modular Monolith và Microservices.

**Modular Monolith** tổ chức các miền nghiệp vụ trong một ứng dụng backend thống nhất, nhưng phân tách rõ trách nhiệm và giao diện giữa các module.

**Microservices** chia hệ thống thành nhiều dịch vụ độc lập, có thể triển khai và mở rộng riêng biệt.

Đối với Nexora, mô hình Microservices có khả năng hỗ trợ mở rộng theo từng dịch vụ nhưng đồng thời làm tăng độ phức tạp về triển khai, giao tiếp, giám sát và nhất quán dữ liệu.

Trong khi đó, Modular Monolith cho phép tổ chức nghiệp vụ rõ ràng mà vẫn duy trì quy trình triển khai tương đối đơn giản.

### 7.2.2. Kiến trúc được lựa chọn

Nexora lựa chọn **Modular Monolith làm kiến trúc chính**, triển khai trên **Next.js (App Router)** — vừa phục vụ API nghiệp vụ vừa phục vụ giao diện — kết hợp những dịch vụ độc lập khi thực sự cần thiết.

Các module nghiệp vụ MVP được triển khai trong cùng một ứng dụng Next.js, khớp Chương 6:

- M01 — System & Partner Management.

- M02 — Product & Inventory Management.

- M03 — Trading & Distribution.

- M04 — Traceability & Federation.

- AI01 — AI Support (giao diện trong app; dịch vụ LLM/tool có thể chạy tách nếu cần).

Quality chuyên sâu và thu hồi đa cấp không thuộc phạm vi MVP.

Các thành phần như hệ thống định danh, API Gateway, cơ sở dữ liệu, lưu trữ tệp và hàng đợi được triển khai như những dịch vụ hạ tầng dùng chung.

Cách tiếp cận này giúp giảm số lượng dịch vụ phải vận hành, đồng thời duy trì khả năng phát triển thêm các thành phần độc lập trong tương lai.

## 7.3. Kiến trúc logic tổng thể

Kiến trúc Nexora được đề xuất tổ chức thành năm lớp.

### 7.3.1. Presentation Layer

Presentation Layer chịu trách nhiệm cung cấp giao diện tương tác cho người sử dụng.

Các ứng dụng chính bao gồm:

**ERP Web Application:** Giao diện quản trị doanh nghiệp theo module MVP (tổ chức/đối tác, sản phẩm/lô/kho, chứng từ nhập xuất chuyển giao, truy xuất).

**Sale / Distribution recording:** Giao diện ghi nhận hàng đã bán hoặc phân phối theo lô (NX-TRD-07). MVP không xây dựng POS đầy đủ (thanh toán, khuyến mãi, thiết bị thu ngân).

**Public Product Passport:** Giao diện công khai thông tin truy xuất cho người tiêu dùng (QR).

**AI Assistant Interface:** Giao diện tương tác với AI Support (tra cứu, tạo chứng từ dự thảo, cảnh báo theo quy tắc).

Frontend được xây dựng bằng Next.js, React, TypeScript và Tailwind CSS (có thể dùng shadcn/ui).

### 7.3.2. API & Application Layer

Lớp API tiếp nhận yêu cầu từ Frontend, các hệ thống bên ngoài và các bản triển khai Nexora đối tác.

Lớp này chịu trách nhiệm:

- Xử lý yêu cầu HTTP.

- Kiểm tra xác thực và quyền truy cập.

- Kiểm tra dữ liệu đầu vào.

- Điều phối các thao tác nghiệp vụ.

- Quản lý giao dịch ứng dụng.

- Trả về dữ liệu và trạng thái xử lý.

- Cung cấp các API phục vụ liên thông và tích hợp.

Các API nội bộ và API Federation được tổ chức theo phạm vi truy cập khác nhau.

### 7.3.3. Domain & Business Layer

Đây là lớp triển khai các quy tắc nghiệp vụ của Nexora.

Mỗi module quản lý một nhóm đối tượng và hành vi nghiệp vụ cụ thể.

Ví dụ theo phạm vi MVP (Chương 6):

- System quản lý tổ chức, người dùng và đối tác (M01).

- Catalog / Inventory quản lý sản phẩm, lô và tồn kho (M02).

- Trading quản lý phiếu nhập, xuất, chuyển giao và ghi nhận bán theo lô (M03).

- Traceability / Federation quản lý sự kiện truy xuất và trao đổi giữa instance (M04).

Các module cần sử dụng những giao diện nghiệp vụ được công bố để tương tác thay vì tự ý sửa dữ liệu thuộc module khác.

### 7.3.4. Integration & Intelligence Layer

Lớp này phục vụ các chức năng mở rộng bao gồm:

- Trao đổi sự kiện giữa các doanh nghiệp.

- Kết nối với ERP/POS bên ngoài.

- Đồng bộ và xử lý thông điệp.

- Truy vấn dữ liệu phục vụ AI Knowledge Assistant.

- Chuẩn bị chứng từ thông qua AI Operations Assistant.

- Xử lý các tác vụ nền và thông báo.

### 7.3.5. Infrastructure & Data Layer

Lớp hạ tầng bao gồm:

- Hệ quản trị cơ sở dữ liệu.

- Bộ nhớ đệm và hàng đợi xử lý.

- Hệ thống lưu trữ tệp.

- Nền tảng xác thực.

- API Gateway.

- Logging và Monitoring.

- Dịch vụ xử lý AI nếu được kích hoạt.

Các thành phần được đóng gói bằng container nhằm hỗ trợ triển khai độc lập.

## 7.4. Thiết kế kiến trúc ERP Backend theo DDD

### 7.4.1. Phân chia miền nghiệp vụ

Theo định hướng Domain-Driven Design, mỗi nhóm module được tổ chức thành một Bounded Context có mô hình dữ liệu và quy tắc nghiệp vụ riêng.

| Bounded Context | Module MVP | Trách nhiệm |
| --- | --- | --- |
| System | M01 | Tổ chức, người dùng, quyền cơ bản, đối tác và kết nối instance |
| Catalog | M02 | Sản phẩm, định danh, lô hàng |
| Inventory | M02 | Kho, tồn kho và biến động số lượng |
| Trading | M03 | Phiếu nhập, xuất, chuyển giao, xác nhận nhận hàng, kiểm kê, ghi nhận bán theo lô |
| Traceability | M04 | Sự kiện truy xuất, lịch sử lô, QR và Product Passport |
| Federation | M04 | Trao đổi sự kiện giữa các instance, ack, retry, mapping định danh |
| AI Support | AI01 | Tool-calling qua API nghiệp vụ; chỉ tạo chứng từ ở trạng thái Draft |

Quality chuyên sâu, thu hồi đa cấp, Purchasing/Sales đầy đủ và CRM là định hướng sau MVP.

Các Bounded Context có thể nằm trong cùng một nhóm module trên giao diện.

Ví dụ, Catalog và Inventory cùng thuộc M02 về mặt sản phẩm, nhưng vẫn tách logic để bảo đảm chỉ Inventory được phép đổi số lượng tồn. Trading (M03) gọi cổng Inventory khi xác nhận chứng từ, không cập nhật tồn trực tiếp.

### 7.4.2. Cấu trúc các lớp trong module

Mỗi miền nghiệp vụ được tổ chức theo bốn lớp chính:

**Presentation:** Controller, Request Validation, API Resources.

**Application:** Application Services, Use Cases, Command Handlers và điều phối nghiệp vụ.

**Domain:** Entities, Value Objects, Domain Services, Domain Events và quy tắc nghiệp vụ.

**Infrastructure:** Repository Implementations, ORM Models, External Services và cơ chế lưu trữ dữ liệu.

Cách tổ chức này nhằm hạn chế việc đặt toàn bộ nghiệp vụ vào Controller hoặc phụ thuộc trực tiếp vào cấu trúc ORM.

### 7.4.3. Nguyên tắc sở hữu dữ liệu

Mỗi miền nghiệp vụ phải có trách nhiệm rõ ràng đối với dữ liệu mà mình quản lý.

Ví dụ, Inventory là thành phần có quyền thực hiện những giao dịch thay đổi tồn kho.

Sales không trực tiếp cập nhật số lượng tồn bằng câu lệnh SQL tùy ý, mà thực hiện thao tác thông qua giao diện nghiệp vụ của Inventory.

Tương tự, Traceability không thay đổi giao dịch bán hàng, phiếu nhập hoặc số lượng tồn kho.

Các module chỉ được tạo hoặc điều chỉnh trạng thái thuộc phạm vi trách nhiệm của mình.

## 7.5. Kiến trúc cơ sở dữ liệu

### 7.5.1. Mô hình triển khai dữ liệu

Mỗi doanh nghiệp sử dụng một bản triển khai Nexora và một hệ thống cơ sở dữ liệu độc lập.

Ví dụ:

- Doanh nghiệp A sử dụng Database A.

- Doanh nghiệp B sử dụng Database B.

- Doanh nghiệp C sử dụng Database C.

Các hệ thống không dùng chung Central Tenant Database.

Bên trong mỗi bản triển khai, cơ sở dữ liệu có thể chứa nhiều chi nhánh, kho hàng, phòng ban và người dùng trực thuộc cùng một doanh nghiệp.

### 7.5.2. Hệ quản trị cơ sở dữ liệu

PostgreSQL được đề xuất sử dụng làm hệ quản trị cơ sở dữ liệu chính.

Lý do lựa chọn bao gồm:

- Là hệ quản trị cơ sở dữ liệu nguồn mở.

- Hỗ trợ transaction và các ràng buộc toàn vẹn.

- Phù hợp với dữ liệu ERP dạng quan hệ.

- Hỗ trợ JSONB để lưu trữ các thuộc tính linh hoạt khi phù hợp.

- Có khả năng sử dụng Recursive Common Table Expressions để truy vấn quan hệ theo nhiều cấp.

- Có hệ sinh thái công cụ quản trị, sao lưu và phục hồi tương đối hoàn thiện.

### 7.5.3. Nhóm dữ liệu chính

Dữ liệu MVP được phân chia theo module Chương 6:

**System Data (M01):** Tổ chức, người dùng, vai trò cơ bản, đối tác và cấu hình kết nối instance.

**Catalog Data (M02):** Sản phẩm, đơn vị tính, định danh (SKU/barcode) và lô hàng.

**Inventory Data (M02):** Kho, số dư tồn theo sản phẩm/lô, lịch sử biến động và trạng thái lô.

**Trading Data (M03):** Phiếu nhập, phiếu xuất, chuyển giao đối tác, xác nhận nhận hàng, kiểm kê và ghi nhận bán/phân phối theo lô.

**Traceability Data (M04):** Sự kiện truy xuất, quan hệ sự kiện, token QR và dữ liệu Product Passport được phép công bố.

**Federation Data (M04):** Thông điệp gửi/nhận, ack, retry và mapping định danh sản phẩm/lô giữa các doanh nghiệp.

**Platform Data:** Audit log, outbox, idempotency và metadata tệp đính kèm.

Dữ liệu Purchasing/Sales/Quality đầy đủ (đơn mua nhiều bước, POS, công nợ, phiếu QC chuyên sâu) không thuộc schema MVP.

**Integration Data:** Kết nối đối tác, thông điệp đi/đến, trạng thái trao đổi và lịch sử xác thực.

**System Data:** Cấu hình, nhật ký thao tác, metadata tài liệu và tác vụ nền.

### 7.5.4. Nguyên tắc dữ liệu quan trọng

Thông tin sản phẩm và số lượng tồn kho phải được tách biệt.

Dữ liệu sự kiện truy xuất cần có tham chiếu đến nguồn nghiệp vụ phù hợp và hạn chế sửa trực tiếp sau khi đã được xác nhận hoặc phát hành.

Các sự kiện nhận từ đối tác phải lưu thông tin nguồn phát hành, định danh duy nhất, phiên bản thông điệp và trạng thái xác minh.

Những dữ liệu cần tính chính xác cao như số lượng, đơn giá và tiền tệ phải sử dụng kiểu dữ liệu phù hợp, không sử dụng kiểu số thực dấu phẩy động cho các phép tính tài chính.

## 7.6. Kiến trúc sự kiện nghiệp vụ

### 7.6.1. Mục đích

Trong Nexora, các giao dịch ERP vừa phục vụ hoạt động quản lý nội bộ vừa có thể phát sinh những sự kiện phục vụ truy xuất nguồn gốc.

Ví dụ:

- Hoàn tất nhập kho tạo sự kiện tiếp nhận.

- Xác nhận xuất hàng tạo sự kiện xuất.

- Hoàn tất giao dịch POS tạo sự kiện bán hàng.

- Ghi nhận chuyển đổi lô tạo sự kiện liên kết đầu vào – đầu ra.

- Phê duyệt kết quả kiểm tra tạo thông tin chất lượng có thể được liên kết với lịch sử lô.

### 7.6.2. Domain Events

Các module sử dụng Domain Events để thông báo những thay đổi nghiệp vụ quan trọng.

Ví dụ:

- GoodsReceived.

- GoodsShipped.

- StockAdjusted.

- SalesOrderCompleted.

- LotQualityStatusChanged.

- IncidentCreated.

Domain Event phản ánh một sự kiện đã xảy ra trong phạm vi nghiệp vụ.

Không phải mọi Domain Event đều được công bố thành sự kiện truy xuất hoặc gửi ra ngoài doanh nghiệp.

### 7.6.3. Transactional Outbox

Để hạn chế tình trạng giao dịch ERP được lưu thành công nhưng thông điệp sự kiện bị mất, Nexora định hướng sử dụng Transactional Outbox.

Theo cơ chế này, giao dịch nghiệp vụ và bản ghi Outbox được lưu trong cùng một transaction của cơ sở dữ liệu.

Sau đó, tiến trình xử lý nền đọc Outbox và chuyển thông điệp đến thành phần tiếp nhận phù hợp.

Cách tiếp cận này giúp duy trì tính nhất quán giữa kết quả nghiệp vụ và thông điệp cần xử lý, nhưng vẫn phải kết hợp với cơ chế gửi lại và chống trùng lặp.

## 7.7. Kiến trúc truy xuất nguồn gốc

### 7.7.1. Mô hình dữ liệu truy xuất

Traceability Engine được thiết kế dựa trên những thành phần:

**Traceable Object:** Sản phẩm, lô hàng hoặc đối tượng được định danh để truy xuất.

**Traceability Event:** Sự kiện phản ánh hoạt động liên quan đến đối tượng truy xuất.

**Event Relationship:** Quan hệ giữa các sự kiện, đối tượng hoặc lô hàng.

**Source Reference:** Tham chiếu đến chứng từ hoặc giao dịch nghiệp vụ làm căn cứ.

**Verification Metadata:** Thông tin nguồn phát hành, trạng thái xác minh và bằng chứng liên quan.

### 7.7.2. Truy xuất ngược

Truy xuất ngược xác định các nguồn hoặc sự kiện trước đó có liên quan đến sản phẩm cần truy xuất.

Hệ thống sử dụng các quan hệ đã được ghi nhận để tìm những lô đầu vào, đơn vị cung cấp hoặc giao dịch chuyển giao liên quan.

### 7.7.3. Truy xuất xuôi

Truy xuất xuôi xác định các đối tượng có liên quan đến một lô ban đầu trong những công đoạn tiếp theo.

Chức năng này đóng vai trò quan trọng khi cần xác định phạm vi ảnh hưởng của một vấn đề chất lượng.

### 7.7.4. Công nghệ xử lý quan hệ

Trong giai đoạn đầu, Nexora sử dụng PostgreSQL để lưu trữ các sự kiện và quan hệ truy xuất.

Những truy vấn theo nhiều cấp có thể được thực hiện bằng Recursive CTE hoặc các thuật toán duyệt đồ thị tại tầng ứng dụng.

Việc bổ sung cơ sở dữ liệu đồ thị chuyên dụng chỉ được xem xét khi xuất hiện những yêu cầu rõ ràng về quy mô, độ phức tạp truy vấn hoặc hiệu năng mà phương án hiện tại không đáp ứng được.

## 7.8. Kiến trúc liên thông giữa các doanh nghiệp

### 7.8.1. Nguyên tắc Federated Architecture

Nexora cho phép mỗi doanh nghiệp vận hành một hệ thống ERP độc lập nhưng có thể kết nối với các đối tác trong chuỗi cung ứng.

Mỗi bản triển khai có quyền quản lý dữ liệu nội bộ và tự xác định những thông tin được phép chia sẻ.

Hoạt động liên thông không được thực hiện bằng cách kết nối trực tiếp đến database của đối tác.

### 7.8.2. Các thành phần chính

**Instance Identity:** Định danh bản triển khai và thông tin xác thực hệ thống.

**Partner Connection:** Quản lý quan hệ kết nối với doanh nghiệp đối tác.

**Event Exchange API:** Giao diện gửi và nhận sự kiện truy xuất.

**Inbound Event Processor:** Kiểm tra và xử lý thông điệp nhận được.

**Outbound Event Processor:** Chuẩn bị và gửi thông điệp đến đối tác.

**Data Sharing Policy:** Xác định thông tin có thể chia sẻ.

**Event Mapping:** Ánh xạ định danh, loại sự kiện và thông tin liên quan.

**Delivery Tracking:** Theo dõi trạng thái gửi, nhận và xử lý.

### 7.8.3. Giao thức trao đổi

MVP ưu tiên giao tiếp qua HTTPS và REST API với cấu trúc thông điệp JSON.

Mỗi thông điệp cần chứa các thông tin như:

- Định danh sự kiện.

- Phiên bản cấu trúc dữ liệu.

- Định danh hệ thống phát hành.

- Định danh đối tượng nhận.

- Loại sự kiện.

- Thời điểm xảy ra và thời điểm phát hành.

- Các định danh sản phẩm, lô và giao dịch liên quan.

- Phần dữ liệu được phép chia sẻ.

- Thông tin phục vụ xác thực và đối chiếu.

Thông tin xác thực cần được thiết kế phù hợp với chính sách bảo mật và cơ chế trao đổi được lựa chọn.

### 7.8.4. Quy trình trao đổi sự kiện

Khi doanh nghiệp A hoàn tất một giao dịch xuất hàng, hệ thống tạo sự kiện và chuẩn bị thông điệp gửi đến doanh nghiệp B.

Hệ thống B xác thực nguồn gửi, kiểm tra định dạng, quyền truy cập và khả năng trùng lặp.

Nếu thông điệp hợp lệ, hệ thống B ghi nhận dữ liệu liên thông theo trạng thái phù hợp.

Nhân viên B tiếp tục thực hiện quy trình xác nhận tiếp nhận hàng theo nghiệp vụ nội bộ.

Sau khi hoàn tất, B có thể gửi sự kiện xác nhận tương ứng cho A.

### 7.8.5. Xử lý lỗi và nhất quán dữ liệu

Hệ thống phải xem xét các tình huống:

- Đối tác tạm thời không kết nối được.

- Thông điệp gửi trùng.

- Thông điệp đến không đúng thứ tự.

- Thông tin sản phẩm hoặc lô không khớp.

- Đối tác từ chối xác nhận.

- Hai bên ghi nhận số lượng giao nhận khác nhau.

MVP cần hỗ trợ cơ chế lưu thông điệp chờ gửi, gửi lại có giới hạn, nhận diện trùng lặp và ghi nhận trạng thái đối chiếu.

Các bản triển khai không sử dụng một distributed database transaction chung. Việc đồng bộ liên doanh nghiệp được thực hiện thông qua trao đổi sự kiện và xác nhận, hướng tới sự nhất quán cuối cùng đối với những dữ liệu cần liên thông.

## 7.9. Kiến trúc hệ thống AI Support

### 7.9.1. Định hướng tổng thể

Nexora phát triển hai module AI Support:

- AI Knowledge Assistant.

- AI Operations Assistant.

Hai module có trách nhiệm nghiệp vụ khác nhau nhưng có thể sử dụng chung một dịch vụ AI Backend.

Để bảo đảm khả năng triển khai độc lập, dịch vụ AI được thiết kế như thành phần tùy chọn, có thể sử dụng mô hình cục bộ hoặc kết nối dịch vụ bên ngoài theo cấu hình của doanh nghiệp.

### 7.9.2. AI Knowledge Assistant

AI Knowledge Assistant tiếp nhận yêu cầu bằng ngôn ngữ tự nhiên và xác định công cụ truy vấn nghiệp vụ phù hợp.

Ví dụ, khi người dùng yêu cầu tra cứu tồn kho, hệ thống AI không trực tiếp đọc toàn bộ cơ sở dữ liệu hoặc tự tạo câu lệnh SQL tùy ý.

Thay vào đó, AI lựa chọn những công cụ được cho phép như:

- SearchProducts.

- GetInventoryBalance.

- GetPurchaseOrders.

- GetSalesOrders.

- TraceProductLot.

- GetIncidentDetails.

Các công cụ này thực hiện truy vấn thông qua API hoặc Application Services đã được kiểm soát quyền.

Kết quả được chuyển cho AI để tổng hợp và giải thích.

Những giá trị định lượng hoặc thông tin giao dịch phải được lấy từ dữ liệu nghiệp vụ thực tế.

### 7.9.3. AI Operations Assistant

AI Operations Assistant hỗ trợ người dùng chuẩn bị các chứng từ như đơn hàng, phiếu nhập và phiếu kiểm kho.

Quy trình được tổ chức theo các bước:

1. Tiếp nhận yêu cầu của người dùng.

2. Phân tích ý định nghiệp vụ.

3. Trích xuất các trường dữ liệu cần thiết.

4. Tra cứu định danh sản phẩm, đối tác và kho.

5. Kiểm tra quyền và điều kiện dữ liệu.

6. Tạo chứng từ ở trạng thái dự thảo.

7. Hiển thị kết quả để người dùng kiểm tra.

8. Người dùng xác nhận hoặc điều chỉnh.

9. Module nghiệp vụ thực hiện thao tác theo quy tắc tương ứng.

AI không được tự ý xác nhận nhập hàng thực tế, điều chỉnh tồn hoặc hoàn tất thanh toán chỉ dựa trên nội dung yêu cầu bằng ngôn ngữ tự nhiên.

### 7.9.4. Ranh giới bảo mật của AI

AI phải sử dụng các công cụ giới hạn theo quyền của người dùng.

Dữ liệu truy xuất từ đối tác phải tiếp tục tuân thủ chính sách chia sẻ.

Thông tin bí mật không được mặc định gửi đến dịch vụ AI bên ngoài.

Khi sử dụng mô hình AI qua API của bên thứ ba, doanh nghiệp cần được thông báo và chủ động cấu hình phương thức xử lý dữ liệu phù hợp.

## 7.10. Kiến trúc xác thực và phân quyền

### 7.10.1. Xác thực người dùng

Nexora định hướng sử dụng một hệ thống định danh có hỗ trợ OpenID Connect (OIDC), chẳng hạn Keycloak.

Hệ thống định danh chịu trách nhiệm xác thực tài khoản và cung cấp thông tin định danh phục vụ truy cập ứng dụng.

Việc xác thực thành công không đồng nghĩa người dùng được phép thực hiện mọi nghiệp vụ.

### 7.10.2. Phân quyền nghiệp vụ

Phân quyền được thực hiện tại ứng dụng ERP dựa trên:

- Vai trò người dùng.

- Quyền đối với chức năng.

- Phạm vi chi nhánh.

- Phạm vi kho.

- Trạng thái chứng từ.

- Các điều kiện nghiệp vụ có liên quan.

### 7.10.3. Xác thực liên doanh nghiệp

Xác thực giữa các instance phải độc lập với phiên đăng nhập của người dùng nội bộ.

Mỗi kết nối đối tác cần có cơ chế xác thực phù hợp, chẳng hạn thông tin định danh ứng dụng và chứng thực thông điệp.

MVP có thể sử dụng OAuth 2.0 Client Credentials hoặc cơ chế xác thực máy–máy tương đương, kết hợp kiểm soát quyền truy cập theo đối tác.

Những thông tin xác thực cần được lưu trữ và quản lý an toàn tại từng bản triển khai.

## 7.11. Kiến trúc DX-OS Open-Core

Nexora được định hướng xây dựng trên các thành phần nguồn mở có thể tái sử dụng và phục vụ các module nghiệp vụ.

Các nhóm thành phần được đề xuất:

**Identity & Access:** Hỗ trợ xác thực, SSO và quản lý danh tính.

**API Gateway:** Hỗ trợ định tuyến, bảo vệ và kiểm soát các API được công bố.

**Structured Data:** PostgreSQL phục vụ lưu trữ dữ liệu nghiệp vụ.

**Unstructured Data:** Hệ thống lưu trữ tệp tương thích S3 phục vụ quản lý bằng chứng và chứng từ.

**Workflow:** Cơ chế xử lý và phê duyệt các quy trình có trạng thái.

**Event Processing:** Hệ thống xử lý sự kiện và tác vụ nền.

Trong giai đoạn MVP, Nexora ưu tiên tái sử dụng các thành phần nguồn mở hiện có thay vì tự phát triển toàn bộ hạ tầng từ đầu.

Riêng Workflow, cần phân biệt rõ giữa việc sử dụng một engine có khả năng thực thi quy trình (Flowable theo §7.12) và việc chỉ lập trình máy trạng thái trong mã Next.js/TypeScript. Nếu yêu cầu DX-OS của cuộc thi bắt buộc một dịch vụ Workflow độc lập, hệ thống phải tích hợp Flowable và chứng minh khả năng hoạt động thực tế; cơ chế Approval nội bộ trong mã ứng dụng không tự động thay thế được yêu cầu đó.

## 7.12. Đề xuất công nghệ sử dụng

Các công nghệ được lựa chọn cần bảo đảm tính tương thích, khả năng triển khai nguồn mở và phù hợp với quy mô phát triển.

**NEXORA – Technology Stack (7 Layers)**

| Lớp kiến trúc | Công nghệ lựa chọn | Vai trò chính |
| --- | --- | --- |
| Lớp 1: Trải nghiệm & Giao diện đa kênh | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui | Xây dựng giao diện ERP, POS và AI Assistant |
| Lớp 2: Biên mạng & An toàn thông tin | Keycloak, REST API, HTTPS | Xác thực SSO/OIDC, bảo mật và kiểm soát truy cập API |
| Lớp 3: Tác nghiệp, Logic & Trạng thái thực tế | Next.js, DDD, Modular Monolith, PostgreSQL | Xử lý nghiệp vụ ERP, quản lý dữ liệu và trạng thái hệ thống |
| Lớp 4: Tự động hóa, Quy trình & DevSecOps | Flowable, GitHub Actions, Docker Compose | Điều phối quy trình, phê duyệt nghiệp vụ và CI/CD |
| Lớp 5: Dữ liệu, Truyền phát & Sổ cái | PostgreSQL, Redis, R2-compatible Storage | Lưu trữ dữ liệu, cache, queue, sự kiện và chứng từ |
| Lớp 6: Phân tích, Không gian & Trí tuệ | Python, REST API, LLM | AI Knowledge Assistant và AI Operations Assistant |
| Lớp 7: Quản trị, Tìm kiếm & Giám sát | OpenAPI, Prometheus, Grafana | Tài liệu API, giám sát hiệu năng và trạng thái hệ thống |

**Hình: AGLP**

![][image1]

Danh sách trên là đề xuất công nghệ ở giai đoạn thiết kế, chưa phải toàn bộ thành phần đã được triển khai.

Việc lựa chọn phiên bản và phương thức tích hợp cụ thể cần được xác định sau khi kiểm tra giấy phép, tính tương thích và yêu cầu tài nguyên.

## 7.13. Kiến trúc triển khai Self-hosted

### 7.13.1. Mô hình triển khai

Mỗi doanh nghiệp có thể triển khai Nexora trên máy chủ hoặc môi trường hạ tầng do mình quản lý.

Một bản triển khai bao gồm:

- Next.js Application (UI App Router và API Route Handlers trong Modular Monolith).

- PostgreSQL Database.

- Queue/Cache Service (Redis).

- Identity Service (Keycloak).

- File Storage Service (tương thích S3/R2).

- API biên / kiểm soát truy cập (HTTPS + OIDC; API Gateway riêng khi cần).

- Workflow Service (Flowable) theo cấu hình.

- AI Service nếu được kích hoạt.

### 7.13.2. Phương thức triển khai

MVP sử dụng Docker Compose làm phương thức triển khai chính.

Repository cần cung cấp:

- Tệp cấu hình triển khai.

- Tệp cấu hình môi trường mẫu.

- Hướng dẫn cài đặt.

- Hướng dẫn khởi tạo cơ sở dữ liệu.

- Dữ liệu mẫu phục vụ demo.

- Hướng dẫn nâng cấp.

- Hướng dẫn sao lưu và khôi phục.

- Quy trình kiểm tra trạng thái hoạt động.

Các thông tin bí mật như mật khẩu, khóa API và thông tin xác thực không được đưa trực tiếp vào mã nguồn hoặc các tệp cấu hình công khai.

### 7.13.3. Triển khai nhiều instance

Đối với kịch bản demo, nhóm thiết lập ba bản triển khai Nexora độc lập.

Mỗi bản triển khai có cơ sở dữ liệu riêng, tài khoản quản trị riêng và cấu hình kết nối đối tác riêng.

Các instance chỉ trao đổi dữ liệu thông qua những API được công bố.

Việc dừng một instance không được làm mất khả năng xử lý các nghiệp vụ nội bộ đã được thiết kế hoạt động độc lập tại instance khác.

Các chức năng cần kết nối đối tác có thể tạm thời chuyển sang trạng thái chờ xử lý và tiếp tục khi kết nối được khôi phục.

## 7.14. Kiến trúc bảo mật và bảo vệ dữ liệu

Nexora phải được thiết kế để bảo vệ dữ liệu nghiệp vụ, thông tin người dùng và những dữ liệu được chia sẻ giữa các doanh nghiệp.

Các nguyên tắc bảo mật bao gồm:

**Xác thực và phân quyền:** Mọi thao tác nghiệp vụ phải được kiểm tra theo quyền truy cập và phạm vi dữ liệu.

**Mã hóa khi truyền:** Các API có trao đổi dữ liệu nhạy cảm phải sử dụng kết nối bảo mật.

**Kiểm soát dữ liệu đối tác:** Thông tin trao đổi giữa các instance phải tuân thủ chính sách chia sẻ.

**Quản lý bí mật:** Thông tin đăng nhập, token và khóa xác thực phải được lưu trữ, phân phối và thay đổi bằng cơ chế phù hợp.

**Audit Logging:** Những thao tác quan trọng cần được ghi nhận để hỗ trợ truy vết.

**Bảo vệ tệp:** Chứng từ và bằng chứng không được công khai khi chưa có quyền truy cập.

**Bảo vệ AI:** Công cụ AI không được thực hiện truy vấn vượt quá phạm vi người dùng và không được tự thực hiện các lệnh nghiệp vụ ngoài quyền được cấp.

**Sao lưu và khôi phục:** Hệ thống cần có quy trình bảo vệ dữ liệu trước sự cố hạ tầng hoặc lỗi vận hành.

## 7.15. Yêu cầu phi chức năng và khả năng mở rộng

### 7.15.1. Hiệu năng

Hệ thống cần hỗ trợ thao tác ERP thường xuyên với thời gian phản hồi phù hợp, đặc biệt đối với các nghiệp vụ bán hàng và tra cứu tồn kho.

Những truy vấn truy xuất nhiều cấp hoặc phân tích dữ liệu lớn cần có cơ chế giới hạn, phân trang hoặc xử lý nền tùy theo mức độ phức tạp.

Các chỉ tiêu hiệu năng cụ thể cần được xác định và đo lường trong giai đoạn kiểm thử.

### 7.15.2. Khả năng mở rộng

Kiến trúc Modular Monolith cho phép bổ sung chức năng và module theo từng giai đoạn.

Các thành phần xử lý nền, lưu trữ và AI có thể được mở rộng riêng nếu xuất hiện nhu cầu thực tế.

Việc chuyển một module sang dịch vụ độc lập chỉ nên thực hiện khi có căn cứ về hiệu năng, quy mô hoặc yêu cầu triển khai.

### 7.15.3. Khả năng bảo trì

Mã nguồn cần được tổ chức nhất quán, có phân tách trách nhiệm và sử dụng những quy ước phát triển rõ ràng.

Các module phải có kiểm thử phù hợp, tài liệu API và hướng dẫn cấu hình.

### 7.15.4. Khả năng triển khai lại

Một doanh nghiệp hoặc lập trình viên có thể sử dụng repository và tài liệu để triển khai một bản Nexora mà không phụ thuộc vào môi trường phát triển ban đầu.

Đây là tiêu chí quan trọng đối với một dự án phần mềm nguồn mở.

### 7.15.5. Khả năng tương thích

Các giao diện tích hợp cần có cơ chế quản lý phiên bản để hạn chế việc thay đổi một bản triển khai làm mất khả năng trao đổi với đối tác đang sử dụng phiên bản khác.

Dữ liệu sự kiện cần được xác định bằng cấu trúc và phiên bản rõ ràng.

## 7.16. Định hướng kiểm thử kiến trúc

Nhóm xác định các nhóm kiểm thử chính:

**Unit Testing:** Kiểm thử quy tắc nghiệp vụ của từng module.

**Integration Testing:** Kiểm thử khả năng phối hợp giữa các module ERP.

**API Testing:** Kiểm thử giao diện API, dữ liệu đầu vào và phân quyền.

**Federation Testing:** Kiểm thử trao đổi thông điệp giữa các instance.

**Failure Recovery Testing:** Kiểm thử gửi lại sự kiện, mất kết nối và chống trùng lặp.

**Security Testing:** Kiểm tra các tình huống truy cập trái phép và vượt quyền.

**AI Tool Testing:** Kiểm thử quyền truy vấn, dữ liệu đầu ra và xác nhận chứng từ.

**Deployment Testing:** Kiểm thử cài đặt từ repository trong môi trường mới.

**End-to-end Testing:** Kiểm thử chuỗi nghiệp vụ nhập hàng, quản lý lô, chuyển giao, bán hàng, truy xuất và xử lý sự cố.

## 7.17. Phạm vi triển khai kiến trúc trong MVP

MVP tập trung vào những thành phần cần thiết để hoàn thành kịch bản nghiệp vụ trọng tâm.

**Những thành phần bắt buộc:**

- Next.js Modular Monolith (UI + API) theo DDD.

- Frontend ERP và giao diện ghi nhận bán/phân phối theo lô (không POS đầy đủ).

- PostgreSQL riêng cho từng instance.

- Cơ chế định danh và phân quyền.

- API Gateway và những dịch vụ lõi DX-OS được yêu cầu.

- Event Model và Traceability Engine.

- Federation API và cơ chế xác thực.

- Xử lý sự kiện nền với gửi lại và chống trùng.

- QR Product Passport.

- Hai AI Assistant ở phạm vi chức năng đại diện.

- Bộ Docker Compose và tài liệu triển khai nguồn mở.

**Những thành phần mở rộng:**

- Microservices cho từng miền nghiệp vụ.

- Database đồ thị chuyên dụng.

- Kubernetes và khả năng mở rộng hạ tầng phức tạp.

- Workflow Designer tổng quát.

- Tự động khám phá đối tác trong mạng liên thông.

- Hệ thống AI phân tích chuyên sâu.

- Các module ERP theo ngành sản xuất hoặc dịch vụ.

Việc giới hạn phạm vi nhằm bảo đảm kiến trúc được triển khai hoàn chỉnh ở mức cần thiết, thay vì xây dựng nhiều thành phần nhưng thiếu khả năng vận hành tích hợp.

## 7.18. Kết luận chương

Chương 7 đã trình bày định hướng kiến trúc tổng thể của Nexora dựa trên mô hình Modular Monolith, Domain-Driven Design, Self-hosted Deployment và Federated Integration.

Kiến trúc được thiết kế nhằm đáp ứng nhu cầu quản trị ERP nội bộ, đồng thời hỗ trợ liên kết dữ liệu truy xuất nguồn gốc giữa các doanh nghiệp sử dụng những bản triển khai độc lập.

Các module nghiệp vụ được phân chia theo trách nhiệm rõ ràng, trong khi những thành phần hạ tầng như định danh, API Gateway, lưu trữ, Workflow và xử lý sự kiện được tổ chức thành các dịch vụ dùng chung.

Đặc biệt, kiến trúc sự kiện và cơ chế liên thông đóng vai trò quan trọng trong việc bảo đảm các giao dịch ERP có thể tạo thành lịch sử truy xuất, đồng thời hỗ trợ trao đổi thông tin giữa nhiều tổ chức mà không cần cơ sở dữ liệu tập trung.

Module AI Support (AI01) được tích hợp theo nguyên tắc có kiểm soát, giúp người dùng truy vấn thông tin và chuẩn bị chứng từ dự thảo mà không thay thế các quy tắc nghiệp vụ và quyền phê duyệt.

Những nội dung trong chương là cơ sở để tiếp tục thiết kế chi tiết cơ sở dữ liệu, mô hình Domain, API Contract, cơ chế xác thực liên hệ thống và phương án triển khai phần mềm trong những giai đoạn tiếp theo.

[image1]: <data:image/png;base64,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>
